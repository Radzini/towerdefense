// Golden Mafia tower: an ammo/reload Mafia variant with persistent status passives.
const GOLDEN_MAFIA_TOWER_TYPE = {
    name: 'Golden Mafia',
    color: '#FFD700',
    cost: 1500,
    damageType: 'laser',
    aoe: false,
    summons: false,
    isMafia: true,
    isGoldenMafia: true,
    limit: 2,
    levels: [
        { damage: 20, fireRate: 400, ammo: 2, reloadTime: 2000, reloadCash: 50, range: 6, upgradeCost: 0 },
        { damage: 50, fireRate: 400, ammo: 2, reloadTime: 2000, reloadCash: 75, range: 8, bankPerReload: 1, bankThreshold: 4, upgradeCost: 500 },
        { damage: 125, fireRate: 400, ammo: 3, reloadTime: 2000, reloadCash: 200, range: 10, bankPerReload: 1, bankThreshold: 4, upgradeCost: 3000 },
        { damage: 400, fireRate: 350, ammo: 3, reloadTime: 1750, reloadCash: 500, range: 11, bankPerReload: 1, bankThreshold: 6, goldenBulletDamageThreshold: 5000, goldenBulletModeCost: 5, goldenModeReloads: 5, upgradeCost: 10000 },
        { damage: 1000, fireRate: 400, ammo: 4, reloadTime: 1500, reloadCash: 1250, range: 12, damageType: 'piercing', bankPerReload: 1, bankThreshold: 8, goldenBulletDamageThreshold: 10000, goldenBulletModeCost: 6, goldenModeReloads: 5, highHpThreshold: 100000, highHpDamageBonus: 0.30, highHpReloadReduction: 250, upgradeCost: 60000 }
    ]
};

function initGoldenMafiaState(tower) {
    const stats = tower.type.levels[tower.level - 1];
    tower.goldenMafia = {
        ammo: stats.ammo,
        bank: 0,
        goldenEconomy: false,
        goldenBullets: 0,
        damageProgress: 0,
        goldenModeReloads: 0,
        isReloading: false,
        reloadStartTime: 0,
        reloadDuration: stats.reloadTime,
        lastFired: -Infinity,
        level: tower.level
    };
}

function goldenMafiaStats(tower) {
    return tower.type.levels[Math.max(0, tower.level - 1)];
}

function goldenMafiaTarget(tower, stats) {
    const buffs = getCommanderBuffs(tower);
    const range = (stats.range + (buffs.rangeBoost || 0) + (tower.type.rangeBonus || 0)) * GRID_SIZE;
    return findBestEnemyInRange(tower.x, tower.y, range, enemy => enemy && !enemy.isSummon && enemy.hp > 0);
}

function goldenMafiaIsHighHp(enemy, stats) {
    const maxHp = enemy?.maxHp || enemy?.type?.hp || 0;
    return !!stats.highHpThreshold && maxHp >= stats.highHpThreshold;
}

function goldenMafiaShowCash(tower, amount) {
    if (amount <= 0) return;
    cash += amount;
    updateCashDisplay();
    if (typeof cashEffects !== 'undefined') {
        cashEffects.push({ x: tower.x, y: tower.y - 10, text: `+$${amount}`, alpha: 1, time: 0 });
    }
    // Also use the same floating cash popup style as Mafia/Farm reload income.
    const div = document.createElement('div');
    div.className = 'cash-effect';
    div.style.left = `${tower.x}px`;
    div.style.top = `${tower.y - 10}px`;
    div.style.color = '#FFD700';
    div.textContent = `+$${amount}`;
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 1000);
}

function goldenMafiaConvertPassives(tower, stats, timestamp) {
    const m = tower.goldenMafia;
    if (stats.bankThreshold && m.bank >= stats.bankThreshold) {
        m.bank = 0;
        m.goldenEconomy = true;
    }
    if (stats.goldenBulletDamageThreshold && stats.goldenBulletModeCost) {
        while (m.goldenBullets >= stats.goldenBulletModeCost) {
            m.goldenBullets -= stats.goldenBulletModeCost;
            m.goldenModeReloads = Math.max(m.goldenModeReloads, stats.goldenModeReloads || 3);
        }
    }
}

function goldenMafiaReload(tower, stats, timestamp) {
    const m = tower.goldenMafia;
    m.isReloading = false;
    m.ammo = stats.ammo;
    if (stats.bankPerReload) m.bank += stats.bankPerReload;
    goldenMafiaConvertPassives(tower, stats, timestamp);
    const reloadCash = m.goldenEconomy ? stats.reloadCash * 3 : stats.reloadCash;
    m.goldenEconomy = false;
    goldenMafiaShowCash(tower, reloadCash);
    if (m.goldenModeReloads > 0) m.goldenModeReloads--;
}

function goldenMafiaApplyModeStatus(enemy, timestamp) {
    enemy.goldenMafiaSlowUntil = timestamp + 10000;
    enemy.goldenMafiaSlowAmount = 0.05;
    enemy.goldenTowerDamageTakenUntil = timestamp + 10000;
    enemy.goldenTowerDamageTakenAmount = 0.10;
}

function goldenMafiaFire(tower, stats, timestamp) {
    const m = tower.goldenMafia;
    const target = tower.target;
    if (!target || target.hp <= 0 || !isInRange(tower, target)) return;

    const buffs = getCommanderBuffs(tower);
    const goldenMode = m.goldenModeReloads > 0;
    const highHp = goldenMafiaIsHighHp(target, stats);
    let damage = stats.damage * (1 + (buffs.damageBoost || 0));
    if (highHp) damage *= 1 + (stats.highHpDamageBonus || 0);
    if (goldenMode) damage *= 2;
    damage = Math.floor(damage);

    const damageType = goldenMode ? 'true' : (stats.damageType || 'laser');
    const options = {
        fireRate: stats.fireRate,
        isGoldenTowerAttack: true,
        bypassResistances: goldenMode
    };
    const dealt = applyDamage(target, damage, damageType, null, options);
    if (goldenMode) goldenMafiaApplyModeStatus(target, timestamp);
    if (!goldenMode && stats.goldenBulletDamageThreshold) {
        m.damageProgress += Math.max(0, dealt || damage);
        while (m.damageProgress >= stats.goldenBulletDamageThreshold) {
            m.damageProgress -= stats.goldenBulletDamageThreshold;
            m.goldenBullets++;
        }
        goldenMafiaConvertPassives(tower, stats, timestamp);
    }

    projectiles.push({
        x1: tower.x, y1: tower.y, x2: target.x, y2: target.y,
        color: goldenMode ? '#FFF4A3' : '#FFD700',
        width: goldenMode ? 6 : 3,
        startTime: timestamp,
        duration: goldenMode ? 220 : 150
    });

    m.ammo--;
    m.lastFired = timestamp;
    if (m.ammo <= 0) {
        m.isReloading = true;
        m.reloadStartTime = timestamp;
        m.reloadDuration = Math.max(0, stats.reloadTime - (highHp ? (stats.highHpReloadReduction || 0) : 0));
    }
}

function updateGoldenMafiaTower(tower, timestamp) {
    const stats = goldenMafiaStats(tower);
    if (!stats) return;
    if (!tower.goldenMafia || tower.goldenMafia.level !== tower.level) initGoldenMafiaState(tower);
    const m = tower.goldenMafia;
    const target = goldenMafiaTarget(tower, stats);
    tower.target = target;

    if (m.isReloading) {
        if (timestamp - m.reloadStartTime >= m.reloadDuration) goldenMafiaReload(tower, stats, timestamp);
        return;
    }
    if (!target || m.ammo <= 0) {
        if (m.ammo <= 0) {
            m.isReloading = true;
            m.reloadStartTime = timestamp;
            m.reloadDuration = stats.reloadTime;
        }
        return;
    }
    if (timestamp - m.lastFired >= stats.fireRate) goldenMafiaFire(tower, stats, timestamp);
}

function get_golden_mafia_info_html(tower) {
    const stats = goldenMafiaStats(tower);
    const m = tower.goldenMafia || {};
    const mode = (m.goldenModeReloads || 0) > 0 ? `Active (${m.goldenModeReloads} reloads)` : 'Inactive';
    const reload = m.isReloading ? Math.max(0, (m.reloadDuration - (performance.now() - m.reloadStartTime)) / 1000).toFixed(1) + 's' : 'Ready';
    return `
        <div class="info-row"><div class="info-label">Damage</div><div class="info-value">${stats.damage}${stats.damageType === 'piercing' ? ' Piercing' : ' Laser'}</div></div>
        <div class="info-row"><div class="info-label">Ammo</div><div class="info-value">${m.ammo ?? stats.ammo}/${stats.ammo}</div></div>
        <div class="info-row"><div class="info-label">Range</div><div class="info-value">${stats.range} tiles</div></div>
        <div class="info-row"><div class="info-label">Reload</div><div class="info-value">${reload}</div></div>
        <div class="info-row"><div class="info-label">Bank</div><div class="info-value">${m.bank || 0}/${stats.bankThreshold || '—'} ${m.goldenEconomy ? '(Golden Economy ready)' : ''}</div></div>
        <div class="info-row"><div class="info-label">Golden Bullets</div><div class="info-value">${m.goldenBullets || 0}/${stats.goldenBulletModeCost || '—'}</div></div>
        <div class="info-row"><div class="info-label">Golden Mode</div><div class="info-value">${mode}</div></div>
    `;
}


function drawGoldenMafiaElectricity(ctx, tower, timestamp = performance.now()) {
    const footprint = getTowerFootprint(tower);
    const cx = tower.x;
    const cy = tower.y;
    const pulse = 0.55 + Math.sin(timestamp / 95) * 0.25;
    ctx.save();
    ctx.globalAlpha = Math.max(0.35, pulse);
    ctx.strokeStyle = '#FFF36A';
    ctx.shadowColor = '#FFD700';
    ctx.shadowBlur = 14;
    ctx.lineWidth = 2;
    for (let i = 0; i < 6; i++) {
        const angle = timestamp / 500 + i * Math.PI / 3;
        const startX = cx + Math.cos(angle) * (footprint.widthPx * 0.28);
        const startY = cy + Math.sin(angle) * (footprint.heightPx * 0.28);
        const endX = cx + Math.cos(angle) * (footprint.widthPx * 0.58);
        const endY = cy + Math.sin(angle) * (footprint.heightPx * 0.58);
        const midX = (startX + endX) / 2 + Math.sin(timestamp / 80 + i) * 6;
        const midY = (startY + endY) / 2 + Math.cos(timestamp / 90 + i) * 6;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(midX, midY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
    }
    ctx.restore();
}
window.GOLDEN_MAFIA_TOWER_TYPE = GOLDEN_MAFIA_TOWER_TYPE;
window.initGoldenMafiaState = initGoldenMafiaState;
window.updateGoldenMafiaTower = updateGoldenMafiaTower;
window.get_golden_mafia_info_html = get_golden_mafia_info_html;