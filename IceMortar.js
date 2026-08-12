// Ice Mortar: player-controlled, charge-based area artillery.
const ICE_MORTAR_TOWER_TYPE = {
    name: 'Ice Mortar',
    color: '#38D9E8',
    cost: 3000,
    damageType: 'piercing',
    aoe: true,
    summons: false,
    isIceMortar: true,
    cannotBeBuffed: true,
    limit: 2,
    size: 1,
    footprint: { width: 1, height: 1 },
    levels: [
        { damage: 450, fireRate: 8000, range: Infinity, chargeRequirement: 1, explosionTiles: 1.5, upgradeCost: 0 },
        { damage: 600, fireRate: 9000, range: Infinity, chargeRequirement: 1, explosionTiles: 1.5, slowAmount: 0.05, slowDuration: 5000, upgradeCost: 1500 },
        { damage: 2000, fireRate: 10000, range: Infinity, chargeRequirement: 1, explosionTiles: 1.5, stunDuration: 3000, upgradeCost: 6500 },
        { damage: 6000, fireRate: 11000, range: Infinity, chargeRequirement: 1, explosionTiles: 1.5, shardRequirement: 3, frostlockLevel: 1, upgradeCost: 20000 },
        { damage: 12000, fireRate: 12000, range: Infinity, chargeRequirement: 1, explosionTiles: 1.5, shardRequirement: 4, frostlockLevel: 2, upgradeCost: 65000 }
    ]
};

window.iceMortarTargetingTower = null;

function beginIceMortarTargeting(tower) {
    if (!tower || tower.iceMortarProjectileActive) return false;
    const stats = tower.type.levels[tower.level - 1];
    if ((tower.iceMortarCharge || 0) < stats.chargeRequirement) return false;
    window.iceMortarTargetingTower = tower;
    const cursorIcon = tower.iceMortarFrostlockReady ? 'frostlock.png' : 'iceshard.png';
    canvas.style.cursor = `url("${cursorIcon}") 16 16, crosshair`;
    abilityTowerBtn.textContent = 'Click a target location';
    return true;
}

function cancelIceMortarTargeting() {
    window.iceMortarTargetingTower = null;
    if (typeof refreshCanvasCursor === 'function') refreshCanvasCursor();
}

function iceMortarApplyStatus(enemy, stats, timestamp) {
    if (stats.slowAmount) {
        enemy.iceMortarSlowAmount = stats.slowAmount;
        enemy.iceMortarSlowUntil = Math.max(enemy.iceMortarSlowUntil || 0, timestamp + stats.slowDuration);
    }
    if (stats.stunDuration) {
        enemy.iceMortarStunUntil = Math.max(enemy.iceMortarStunUntil || 0, timestamp + stats.stunDuration);
    }
}

function iceMortarProcFrostlock(enemy, level, timestamp) {
    const frostlock = level === 2
        ? { damage: 50000, slow: 0.20, slowDuration: 6000, stunDuration: 5000, hpLimit: 500000 }
        : { damage: 15000, slow: 0.15, slowDuration: 4000, stunDuration: 4000, hpLimit: 200000 };
    enemy.iceMortarSlowAmount = frostlock.slow;
    enemy.iceMortarSlowUntil = Math.max(enemy.iceMortarSlowUntil || 0, timestamp + frostlock.slowDuration);
    if ((enemy.maxHp || 0) <= frostlock.hpLimit) {
        enemy.iceMortarStunUntil = Math.max(enemy.iceMortarStunUntil || 0, timestamp + frostlock.stunDuration);
    }
    applyDamage(enemy, frostlock.damage, 'true', null, { noDamageBoosts: true, bypassResistances: true });
}

function updateIceMortarTower(tower, stats, timestamp) {
    if ((timestamp - (tower.iceMortarLastCharge || 0)) >= stats.fireRate && (tower.iceMortarCharge || 0) < stats.chargeRequirement) {
        tower.iceMortarCharge = Math.min(stats.chargeRequirement, (tower.iceMortarCharge || 0) + 1);
        tower.iceMortarLastCharge = timestamp;
    }
    if (tower.iceMortarCharge > 0 && !tower.iceMortarLastCharge) tower.iceMortarLastCharge = timestamp;
}

function fireIceMortar(tower, targetX = window.currentMouseX || tower.x, targetY = window.currentMouseY || tower.y) {
    if (!tower || tower.iceMortarProjectileActive) return false;
    const timestamp = performance.now();
    const stats = tower.type.levels[tower.level - 1];
    if ((tower.iceMortarCharge || 0) < stats.chargeRequirement) return false;

    const triggersFrostlock = !!tower.iceMortarFrostlockReady;
    if (!triggersFrostlock && stats.shardRequirement) {
        tower.iceShardCount = Math.min(stats.shardRequirement, (tower.iceShardCount || 0) + 1);
        if (tower.iceShardCount >= stats.shardRequirement) tower.iceMortarFrostlockReady = true;
    }
    const distance = Math.hypot(targetX - tower.x, targetY - tower.y);
    const duration = Math.max(100, Math.min(700, distance / (GRID_SIZE * 12) * 1000));
    tower.iceMortarProjectileActive = true;
    tower.iceMortarCharge = 0;
    tower.iceMortarLastCharge = timestamp;
    projectiles.push({
        x1: tower.x, y1: tower.y, x2: targetX, y2: targetY,
        color: '#38D9E8', width: 7, startTime: timestamp, duration,
        renderStyle: 'ice-mortar',
        onImpact: () => {
            const impactTime = performance.now();
            const radiusPx = stats.explosionTiles * GRID_SIZE;
            const hitEnemies = enemies.filter(enemy => !enemy.isSummon && enemy.hp > 0 && Math.abs(enemy.x - targetX) <= radiusPx && Math.abs(enemy.y - targetY) <= radiusPx);
            hitEnemies.forEach(enemy => {
                applyDamage(enemy, stats.damage, 'piercing', null, { fireRate: stats.fireRate });
                iceMortarApplyStatus(enemy, stats, impactTime);
            });
            if (triggersFrostlock) {
                hitEnemies.forEach(enemy => iceMortarProcFrostlock(enemy, stats.frostlockLevel, impactTime));
                tower.iceMortarFrostlockReady = false;
                tower.iceShardCount = 0;
                tower.lastFrostlock = impactTime;
            }
            createColoredExplosionEffect(targetX, targetY, stats.explosionTiles, impactTime, 420, '#38D9E8', '#D8FFFF');
            tower.iceMortarProjectileActive = false;
        }
    });
    return true;
}

function updateIceMortarShootButton(tower) {
    if (!tower || typeof abilityTowerBtn === 'undefined') return;
    abilityTowerBtn.classList.add('ice-mortar-shoot-btn');
    const stats = tower.type.levels[tower.level - 1];
    const ready = (tower.iceMortarCharge || 0) >= stats.chargeRequirement && !tower.iceMortarProjectileActive;
    abilityTowerBtn.textContent = tower.iceMortarProjectileActive
        ? '💠 Ball in flight...'
        : ready ? '💠 SHOOT' : `💠 Charging ${tower.iceMortarCharge || 0}/${stats.chargeRequirement}`;
    abilityTowerBtn.disabled = !ready;
    abilityTowerBtn.style.display = 'inline-block';
    abilityTowerBtn.onclick = () => beginIceMortarTargeting(tower);
}

function drawIceMortarCharge(ctx, tower) {
    const stats = tower.type.levels[tower.level - 1];
    const charge = tower.iceMortarCharge || 0;
    const ratio = charge / stats.chargeRequirement;
    const radius = GRID_SIZE * (0.18 + ratio * 0.18);
    ctx.save();
    ctx.shadowBlur = 14;
    ctx.shadowColor = '#38D9E8';
    ctx.fillStyle = '#BFFFFF';
    ctx.beginPath(); ctx.arc(tower.x, tower.y, radius, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
}
