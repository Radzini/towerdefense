// Compounder tower mechanics
const COMPOUNDER_FLASKS = {
    golden: { name: 'Golden Compound', icon: 'goldencompound.png', buyCost: 100, useCost: 50, cooldown: 80000, description: 'On death: deals 500 explosive damage in 4 tiles and awards 15% of max HP as cash, capped at $5,000.' },
    volatile: { name: 'Volatile Compound', icon: 'volatilecompound.png', buyCost: 50, useCost: 20, cooldown: 60000, description: 'On death: deals 5,000 explosive damage plus 10% of max HP to enemies within 5 tiles, capped at 20,000.' },
    cryogel: { name: 'Cryogel', icon: 'cryogel.png', buyCost: 120, useCost: 75, cooldown: 0, description: 'Slows the target for 12s: 35% normally or 10% if it is a boss.' },
    catalyst: { name: 'Catalyst', icon: 'catalyst.png', buyCost: 150, useCost: 50, cooldown: 0, description: "Extends the target's active effects by 4–6s." },
    corrosive: { name: 'Corrosive Acid', icon: 'corrosiveacid.png', buyCost: 200, useCost: 100, cooldown: 150000, description: 'Reduces all target resistances for 30s: 25% normally or 10% if it is a boss.' }
};
let compounderSluggishPools = [];

function ensureCompounderState(tower) {
    if (!tower.compounderResearch) tower.compounderResearch = 0;
    if (!tower.compounderHitCounts) tower.compounderHitCounts = {};
    if (!tower.compounderFlasks) tower.compounderFlasks = {};
    if (!tower.compounderFlaskCooldowns) tower.compounderFlaskCooldowns = {};
    if (tower.lastCompounderSluggish === undefined) tower.lastCompounderSluggish = -Infinity;
}

function compounderEnemyKey(enemy) {
    return enemy?.type?.name || enemy?.type?.id || 'Unknown';
}

function compounderRecordHit(tower, enemy, stats) {
    ensureCompounderState(tower);
    const key = compounderEnemyKey(enemy);
    tower.compounderHitCounts[key] = (tower.compounderHitCounts[key] || 0) + 1;
    if (tower.compounderHitCounts[key] >= stats.researchHitsRequired) {
        tower.compounderHitCounts[key] -= stats.researchHitsRequired;
        tower.compounderResearch = Math.min(stats.researchLimit, tower.compounderResearch + 1);
    }
}

function updateCompounderTower(tower, stats, timestamp) {
    ensureCompounderState(tower);
    const buffs = tower.level >= 3 ? { rangeBoost: 0, fireRateBoost: 0, damageBoost: 0 } : getCommanderBuffs(tower);
    const target = (!tower.target || tower.target.hp <= 0 || !enemies.includes(tower.target) || !isInRange(tower, tower.target))
        ? findBestEnemyInRange(tower.x, tower.y, stats.range * GRID_SIZE)
        : tower.target;
    tower.target = target || null;
    const fireRate = stats.fireRate * (1 - buffs.fireRateBoost);
    if (target && timestamp - (tower.lastFired || 0) >= fireRate) {
        applyDamage(target, Math.floor(stats.damage * (1 + buffs.damageBoost)), 'piercing', null, { fireRate });
        projectiles.push({ x1: tower.x, y1: tower.y, x2: target.x, y2: target.y, color: '#B87333', width: 3, startTime: timestamp, duration: 130 });
        compounderRecordHit(tower, target, stats);
        tower.lastFired = timestamp;
    }

    if (tower.level >= 3 && target && timestamp - tower.lastCompounderSluggish >= 16000) {
        compounderSluggishPools.push({
            x: target.x, y: target.y, sizeTiles: 3, createdAt: timestamp, expiresAt: timestamp + 8000,
            damageUntil: timestamp + (tower.level >= 4 ? 6000 : 4000),
            damage: tower.level >= 4 ? 250 : 100, tickRate: tower.level >= 4 ? 400 : 500,
            lastTicks: new Map()
        });
        tower.lastCompounderSluggish = timestamp;
    }
}

function updateCompounderEffects(timestamp) {
    compounderSluggishPools = compounderSluggishPools.filter(pool => pool.expiresAt > timestamp);
    for (const pool of compounderSluggishPools) {
        const half = pool.sizeTiles * GRID_SIZE / 2;
        for (const enemy of enemies) {
            if (!enemy || enemy.isSummon || enemy.hp <= 0) continue;
            if (Math.abs(enemy.x - pool.x) > half || Math.abs(enemy.y - pool.y) > half) continue;
            enemy.compounderSluggishUntil = Math.max(enemy.compounderSluggishUntil || 0, pool.expiresAt);
            enemy.compounderSluggishAmount = 0.05;
            if (timestamp <= pool.damageUntil) {
                const last = pool.lastTicks.get(enemy) || 0;
                if (timestamp - last >= pool.tickRate) {
                    applyDamage(enemy, pool.damage, 'normal');
                    pool.lastTicks.set(enemy, timestamp);
                }
            }
        }
    }
}

function drawCompounderEffects(ctxRef, timestamp) {
    for (const pool of compounderSluggishPools) {
        const alpha = Math.max(0.12, (pool.expiresAt - timestamp) / 8000);
        const half = pool.sizeTiles * GRID_SIZE / 2;
        ctxRef.save();
        ctxRef.fillStyle = `rgba(191, 145, 64, ${Math.min(0.28, alpha * 0.35)})`;
        ctxRef.strokeStyle = `rgba(255, 215, 100, ${Math.min(0.8, alpha)})`;
        ctxRef.fillRect(pool.x - half, pool.y - half, half * 2, half * 2);
        ctxRef.strokeRect(pool.x - half, pool.y - half, half * 2, half * 2);
        ctxRef.restore();
    }
}

function compounderCooldownReady(tower, key, now = performance.now()) {
    return now >= (tower.compounderFlaskCooldowns?.[key] || 0);
}

function beginCompounderFlask(tower, key) {
    ensureCompounderState(tower);
    const flask = COMPOUNDER_FLASKS[key];
    if (!flask || !tower.compounderFlasks[key]) return false;
    if (tower.compounderResearch < flask.useCost || !compounderCooldownReady(tower, key)) return false;
    window.compounderTargeting = { tower, key };
    refreshCanvasCursor();
    return true;
}

function buyOrUseCompounderFlask(tower, key) {
    ensureCompounderState(tower);
    const flask = COMPOUNDER_FLASKS[key];
    if (!flask) return;
    if (!tower.compounderFlasks[key]) {
        if (tower.compounderResearch < flask.buyCost) return;
        tower.compounderResearch -= flask.buyCost;
        tower.compounderFlasks[key] = true;
        showTowerInfo(tower);
        return;
    }
    beginCompounderFlask(tower, key);
}

function showCompounderCashPopup(entity, amount) {
    if (!amount || typeof document === 'undefined') return;
    const popup = document.createElement('div');
    const rect = typeof canvas !== 'undefined' ? canvas.getBoundingClientRect() : { left: 0, top: 0 };
    popup.style.cssText = `position:fixed;left:${rect.left + entity.x}px;top:${rect.top + entity.y - 35}px;color:#FFD700;font-size:18px;font-weight:bold;pointer-events:none;z-index:9999;text-shadow:0 0 8px #FFD700;transform:translate(-50%,0);transition:transform 1.2s ease,opacity 1.2s ease;`;
    popup.textContent = `💰 Golden Compound +$${amount.toLocaleString()}`;
    document.body.appendChild(popup);
    requestAnimationFrame(() => { popup.style.transform = 'translate(-50%,-32px)'; popup.style.opacity = '0'; });
    setTimeout(() => popup.remove(), 1300);
}

function triggerCompounderDeathEffects(entity, timestamp = performance.now()) {
    if (!entity || entity.isSummon || entity.compounderDeathEffectsTriggered) return;
    if (!entity.compounderGoldenPending && !entity.compounderVolatilePending) return;
    entity.compounderDeathEffectsTriggered = true;

    if (entity.compounderGoldenPending) {
        entity.compounderGoldenPending = false;
        entity.compounderGoldenUntil = timestamp + 1200;
        applyExplosionDamageAt(entity.x, entity.y, 4, 500, 'explosive');
        createColoredExplosionEffect(entity.x, entity.y, 4, timestamp, 500, '#FFD700', '#FFF1A8');
        const earnedCash = Math.min(5000, Math.floor((entity.compounderGoldenMaxHp || entity.maxHp || 0) * 0.15));
        cash += earnedCash;
        showCompounderCashPopup(entity, earnedCash);
    }

    if (entity.compounderVolatilePending) {
        entity.compounderVolatilePending = false;
        entity.compounderVolatileUntil = timestamp + 1200;
        const volatileDamage = Math.min(20000, Math.floor((entity.maxHp || 0) * 0.10));
        const affectedEnemies = enemies.filter(enemy => !enemy.isSummon && enemy.hp > 0 && calculateDistance(entity.x, entity.y, enemy.x, enemy.y) <= 5 * GRID_SIZE);
        applyExplosionDamageAt(entity.x, entity.y, 5, 5000, 'explosive');
        createColoredExplosionEffect(entity.x, entity.y, 5, timestamp, 600, '#FF7A3D', '#FFD1A8');
        if (volatileDamage > 0) {
            affectedEnemies.forEach(enemy => {
                if (enemy.hp > 0) applyDamage(enemy, volatileDamage, 'explosive');
            });
        }
    }
    updateCashDisplay();
}

function executeCompounderFlask(target) {
    const state = window.compounderTargeting;
    if (!state || !target) return false;
    const tower = state.tower;
    const key = state.key;
    const flask = COMPOUNDER_FLASKS[key];
    ensureCompounderState(tower);
    if (tower.compounderResearch < flask.useCost || !compounderCooldownReady(tower, key)) return false;
    tower.compounderResearch -= flask.useCost;
    tower.compounderFlaskCooldowns[key] = performance.now() + flask.cooldown;
    const now = performance.now();

    if (key === 'golden') {
        target.compounderGoldenPending = true;
        target.compounderGoldenMaxHp = target.maxHp || target.hp || 0;
        target.compounderGoldenUntil = Infinity;
    } else if (key === 'volatile') {
        target.compounderVolatilePending = true;
        target.compounderVolatileUntil = Infinity;
    } else if (key === 'cryogel') {
        target.compounderCryogelUntil = now + 12000;
        target.compounderCryogelAmount = target.type.isBoss ? 0.10 : 0.35;
        addAgentSlowEffect(target, target.compounderCryogelAmount, 12000, now);
    } else if (key === 'catalyst') {
        const extension = Math.random() < 0.60 ? 6000 : 4000;
        target.compounderCatalystUntil = now + extension;
        (target.agentSlowEffects || []).forEach(effect => { effect.until += extension; });
        if (target.rocketerAcidUntil) target.rocketerAcidUntil += extension;
        if (target.compounderSluggishUntil) target.compounderSluggishUntil += extension;
        if (target.compounderResistanceDebuffUntil) target.compounderResistanceDebuffUntil += extension;
        Object.values(target.compounderResistanceChanges || {}).forEach(change => { change.until += extension; });
        if (target.agentStunUntil) target.agentStunUntil += extension;
        if (target.agentResistDebuffUntil) target.agentResistDebuffUntil += extension;
    } else if (key === 'corrosive') {
        const amount = target.type.isBoss ? 0.10 : 0.25;
        target.compounderResistanceDebuffs = target.compounderResistanceDebuffs || {};
        target.compounderResistanceDebuffUntil = now + 30000;
        const resistanceTypes = new Set([
            'global', 'bullet', 'piercing', 'explosive', 'laser', 'summonerRange', 'summonerCollision', 'summonerCollisionShield',
            ...Object.keys(target.type?.resistances || {}),
            ...Object.keys(target.resistance || {})
        ]);
        target.compounderResistanceChanges = {};
        resistanceTypes.forEach(type => {
            const baseResistance = target.type?.resistances?.[type] ?? target.resistance?.[type] ?? 0;
            const tankHunterBonus = type === 'explosive' ? (target.tankHunterExplosiveResistanceDebuff || 0) : 0;
            const from = baseResistance + tankHunterBonus;
            target.compounderResistanceDebuffs[type] = amount;
            target.compounderResistanceChanges[type] = { from, to: from - amount, until: now + 30000 };
        });
    }
    window.compounderTargeting = null;
    refreshCanvasCursor();
    if (window.currentInfoTower === tower) showTowerInfo(tower);
    return true;
}

function handleCompounderTargetingClick(mouseX, mouseY) {
    const state = window.compounderTargeting;
    if (!state) return false;
    const target = enemies.find(enemy => {
        if (enemy.isSummon || enemy.hp <= 0) return false;
        return calculateDistance(mouseX, mouseY, enemy.x, enemy.y) <= (enemy.type.size || 20);
    });
    if (target) executeCompounderFlask(target);
    else { window.compounderTargeting = null; refreshCanvasCursor(); }
    return true;
}

function getCompounderInfoHTML(tower, stats) {
    ensureCompounderState(tower);
    let html = `<div class="info-row"><div class="info-label">Research</div><div class="info-value">${tower.compounderResearch}/${stats.researchLimit} RP</div></div>`;
    html += `<div class="info-row"><div class="info-label">Research Gain</div><div class="info-value">+1 RP every ${stats.researchHitsRequired} hits per enemy type</div></div>`;
    if (tower.level >= 3) html += `<div class="info-row"><div class="info-label"><img src="sluggishcompound.png" alt="" style="width:22px;height:22px;object-fit:contain;vertical-align:middle;margin-right:4px;">Sluggish Compound</div><div class="info-value">${tower.level >= 4 ? '250 every 0.4s' : '100 every 0.5s'} | 3x3 | 8s</div></div>`;
    html += '<div style="margin-top:8px;color:#FFE2AA;font-weight:bold;">Flask Effects</div>';
    Object.values(COMPOUNDER_FLASKS).forEach(flask => {
        html += `<div class="info-row" style="align-items:flex-start;"><div class="info-label">${flask.name}</div><div class="info-value" style="white-space:normal;text-align:right;">${flask.description}</div></div>`;
    });
    return html;
}

function renderCompounderFlaskButtons(tower) {
    document.querySelectorAll('.compounder-flask-btn').forEach(btn => btn.remove());
    const panel = document.getElementById('carrierSpawnPanel');
    const container = document.getElementById('carrierUnitsGrid');
    if (!panel || !container || !tower || !tower.type.isCompounder) return;
    ensureCompounderState(tower);
    const title = panel.querySelector('.panel-header h3');
    if (title) title.textContent = 'Compounder Lab';
    panel.style.display = 'block';
    container.innerHTML = '';
    container.style.display = 'grid';
    container.style.gridTemplateColumns = 'repeat(2, 1fr)';
    container.style.gap = '8px';
    container.style.marginTop = '10px';
    const stats = tower.type.levels[tower.level - 1];
    const rp = tower.compounderResearch || 0;
    const bar = document.getElementById('emcProgressBar') || document.createElement('div');
    bar.id = 'emcProgressBar';
    bar.innerHTML = `<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;"><span style="font-size:12px;color:#E8C27A;font-weight:bold;">Research Points</span><span style="font-size:14px;color:#fff;font-weight:bold;">${rp}/${stats.researchLimit} RP</span></div><div style="width:100%;height:10px;background:rgba(0,0,0,.5);border-radius:5px;overflow:hidden;border:1px solid rgba(232,194,122,.4);"><div style="width:${Math.min(100, rp / stats.researchLimit * 100)}%;height:100%;background:linear-gradient(90deg,#B87333,#FFD27A);transition:width .3s ease;"></div></div>`;
    if (!bar.parentNode) panel.insertBefore(bar, container);
    Object.entries(COMPOUNDER_FLASKS).forEach(([key, flask]) => {
        const button = document.createElement('button');
        button.className = 'carrier-unit-btn compounder-flask-btn';
        const cooldown = Math.max(0, ((tower.compounderFlaskCooldowns[key] || 0) - performance.now()) / 1000);
        const owned = !!tower.compounderFlasks[key];
        const ready = owned && cooldown <= 0 && rp >= flask.useCost;
        button.disabled = owned ? !ready : rp < flask.buyCost;
        button.style.cssText = `font-size:11px;padding:8px 5px;background:linear-gradient(135deg,rgba(111,74,37,.95),rgba(184,115,51,.65));border:2px solid ${ready || !owned && rp >= flask.buyCost ? '#E8C27A' : '#555'};border-radius:8px;color:#fff;min-height:92px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:3px;cursor:${button.disabled ? 'default' : 'pointer'};opacity:${button.disabled ? '.6' : '1'};`;
        const status = !owned ? `Buy ${flask.buyCost} RP` : cooldown > 0 ? `CD ${cooldown.toFixed(1)}s` : `Use ${flask.useCost} RP`;
        button.innerHTML = `<img src="${flask.icon}" alt="" style="width:42px;height:42px;object-fit:contain;display:block;"><div style="font-weight:bold;color:#FFE2AA;">${flask.name}</div><div style="font-size:10px;color:${ready || !owned && rp >= flask.buyCost ? '#A8FFB0' : '#FFB0B0'};">${status}</div>`;
        button.onclick = () => buyOrUseCompounderFlask(tower, key);
        container.appendChild(button);
    });
}
const compounderOverheadImages = {};
function drawCompounderStatusOverhead(ctxRef, entity, timestamp) {
    if (!entity || entity.isSummon) return;
    const effects = [];
    const addEffect = (key, label, color, until) => {
        if ((until || 0) > timestamp) effects.push({ key, label, color, until });
    };
    if (entity.compounderGoldenPending) addEffect('golden', 'GOLD ON DEATH', '#FFD700', Infinity);
    else addEffect('golden', 'GOLD', '#FFD700', entity.compounderGoldenUntil);
    if (entity.compounderVolatilePending) addEffect('volatile', 'VOLATILE ON DEATH', '#FF7A3D', Infinity);
    else addEffect('volatile', 'VOLATILE', '#FF7A3D', entity.compounderVolatileUntil);
    addEffect('cryogel', `${Math.round((entity.compounderCryogelAmount || 0) * 100)}% SLOW`, '#8BE9FD', entity.compounderCryogelUntil);
    addEffect('catalyst', 'CATALYST', '#D6A8FF', entity.compounderCatalystUntil);
    addEffect('sluggish', '5% SLOW', '#E8C27A', entity.compounderSluggishUntil);
    if (!effects.length) return;

    const iconSize = Math.max(18, Math.min(26, entity.type.size * 0.45));
    const gap = 4;
    const totalWidth = effects.length * iconSize + (effects.length - 1) * gap;
    const startX = entity.x - totalWidth / 2;
    const y = entity.y - entity.type.size / 2 - iconSize - 28;
    ctxRef.save();
    ctxRef.textAlign = 'center';
    ctxRef.font = 'bold 9px Arial';
    effects.forEach((effect, index) => {
        const x = startX + index * (iconSize + gap);
        let image = compounderOverheadImages[effect.key];
        if (!image && typeof Image !== 'undefined') {
            image = new Image();
            image.src = COMPOUNDER_FLASKS[effect.key]?.icon || `${effect.key}compound.png`;
            compounderOverheadImages[effect.key] = image;
        }
        ctxRef.fillStyle = 'rgba(0,0,0,0.78)';
        ctxRef.fillRect(x - 2, y - 2, iconSize + 4, iconSize + 16);
        ctxRef.strokeStyle = effect.color;
        ctxRef.lineWidth = 1.5;
        ctxRef.strokeRect(x - 2, y - 2, iconSize + 4, iconSize + 16);
        if (image?.complete && image.naturalWidth > 0) ctxRef.drawImage(image, x, y, iconSize, iconSize);
        else {
            ctxRef.fillStyle = effect.color;
            ctxRef.beginPath();
            ctxRef.arc(x + iconSize / 2, y + iconSize / 2, iconSize * 0.35, 0, Math.PI * 2);
            ctxRef.fill();
        }
        ctxRef.fillStyle = effect.color;
        ctxRef.fillText(effect.label, x + iconSize / 2, y + iconSize + 10);
    });

    ctxRef.restore();
}
window.drawCompounderStatusOverhead = drawCompounderStatusOverhead;
window.triggerCompounderDeathEffects = triggerCompounderDeathEffects;
window.ensureCompounderState = ensureCompounderState;
window.COMPOUNDER_FLASKS = COMPOUNDER_FLASKS;
window.updateCompounderTower = updateCompounderTower;
window.updateCompounderEffects = updateCompounderEffects;
window.drawCompounderEffects = drawCompounderEffects;
window.handleCompounderTargetingClick = handleCompounderTargetingClick;
window.getCompounderInfoHTML = getCompounderInfoHTML;
window.renderCompounderFlaskButtons = renderCompounderFlaskButtons;