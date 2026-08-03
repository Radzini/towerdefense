// C-Base tower module

const CBASE_TOWER_TYPE = {
    name: 'C-Base',
    color: '#8B0000',
    cost: 100000,
    aoe: false,
    summons: true,
    isCBase: true,
    size: 5,
    footprint: { width: 5, height: 5 },
    limit: 1,
    levels: [
        {
            upgradeCost: 0,
            summons: [
                { type: 'CBASE_CASTER', spawnCount: 2, spawnRate: 45000, spawnDelay: 400 },
                { type: 'CBASE_OPPRESSOR', spawnCount: 2, spawnRate: 60000, spawnDelay: 500 }
            ]
        },
        {
            upgradeCost: 100000,
            summons: [
                { type: 'CBASE_CASTER', spawnCount: 2, spawnRate: 45000, spawnDelay: 400 },
                { type: 'CBASE_OPPRESSOR', spawnCount: 2, spawnRate: 60000, spawnDelay: 500 },
                { type: 'CBASE_IMPALER', spawnCount: 2, spawnRate: 50000, spawnDelay: 2000 }
            ]
        },
        {
            upgradeCost: 1000000,
            summons: [
                { type: 'CBASE_CASTER', spawnCount: 4, spawnRate: 45000, spawnDelay: 400 },
                { type: 'CBASE_OPPRESSOR', spawnCount: 2, spawnRate: 60000, spawnDelay: 500 },
                { type: 'CBASE_IMPALER', spawnCount: 3, spawnRate: 50000, spawnDelay: 2000 },
                { type: 'CBASE_RESONATOR', spawnCount: 1, spawnRate: 75000, spawnDelay: 0 },
                { type: 'CBASE_EXECUTIONER', spawnCount: 1, spawnRate: 120000, spawnDelay: 0 },
                { type: 'CBASE_CRUSADER', spawnCount: 1, spawnRate: 160000, spawnDelay: 0 }
            ]
        }
    ]
};

const CBASE_CASTER = {
    name: 'Caster',
    color: '#FF0000',
    hp: 2000,
    shieldHp: 1500,
    hasShield: true,
    speed: 0.4,
    size: 30,
    isSummon: true,
    isCBaseSummon: true,
    cbaseUnitType: 'CASTER',
    armadaCapacity: 5,
    shootRange: 10,
    gunDamage: 700,
    gunFireRate: 500,
    grenadeDamage: 2000,
    grenadeAOERadius: 1,
    grenadeCooldown: 4000,
    grenadeArmadaGain: 2,
    selfDestructDamage: 1500,
    potencyPerHit: 0
};

const CBASE_OPPRESSOR = {
    name: 'Oppressor',
    color: '#FF0000',
    hp: 1000,
    shieldHp: 1500,
    hasShield: true,
    speed: 0.35,
    size: 30,
    isSummon: true,
    isCBaseSummon: true,
    cbaseUnitType: 'OPPRESSOR',
    armadaCapacity: 5,
    laserDamage: 200,
    laserTickRate: 100,
    laserDuration: 5000,
    laserCooldown: 5000,
    laserRange: 12,
    piercingDamage: 1400,
    piercingArmadaGain: 1,
    selfDestructDamage: 1500,
    potencyPerHit: 0
};

const CBASE_IMPALER = {
    name: 'Impaler',
    color: '#FF0000',
    hp: 12500,
    shieldHp: 7500,
    hasShield: true,
    speed: 0.3,
    size: 35,
    isSummon: true,
    isCBaseSummon: true,
    cbaseUnitType: 'IMPALER',
    armadaCapacity: 5,
    impaleDamage: 2000,
    impaleInterval: 500,
    impaleRange: 4,
    selfDestructDamage: 15000,
    selfDestructRange: 4,
    selfDestructArmadaGain: 4,
    collisionBurstMinDamage: 5000,
    collisionBurstMaxDamage: 7500,
    collisionBurstRange: 2,
    armadaHitsRequired: 4,
    armadaGainPerCycle: 2,
    potencyPerHit: 0
};

const CBASE_RESONATOR = {
    name: 'Resonator',
    color: '#ff0400ff',
    hp: 5000,
    shieldHp: 2500,
    hasShield: true,
    speed: 0.35,
    size: 35,
    isSummon: true,
    isCBaseSummon: true,
    cbaseUnitType: 'RESONATOR',
    armadaCapacity: 5,
    shootRange: 14,
    orbCount: 2,
    orbCooldown: 10000,
    orbBeamDamage: 50,
    orbBeamDamageMax: 350,
    orbDamageRamp: 50,
    orbDamageRampInterval: 1000,
    fireRate: 100,
    overheatThreshold: 300,
    overheatGain: 20,
    overheatTickRate: 325,
    overheatCapacity: 750,
    bigOrbDamage: 7500,
    shootArmadaCost: 1,
    selfDestructDamage: 750,
    potencyPerHit: 0
};

const CBASE_EXECUTIONER = {
    name: 'Executioner',
    color: '#6B0000',
    hp: 50000,
    shieldHp: 75000,
    hasShield: true,
    speed: 0.25,
    size: 40,
    isSummon: true,
    isCBaseSummon: true,
    cbaseUnitType: 'EXECUTIONER',
    armadaCapacity: 20,
    missileDamage: 6000,
    missileCount: 5,
    missileAOERadius: 2,
    missileCooldown: 15000,
    missileArmadaCost: 2,
    blasterDamage: 750,
    blasterTickRate: 100,
    blasterDuration: 10000,
    blasterCooldown: 6000,
    beamDamagePerHit: 25000,
    beamHits: 10,
    beamArmadaCost: 15,
    proxExplosionDamage: 10000,
    proxExplosionInterval: 1250,
    proxExplosionRange: 3,
    bombDamage: 10000,
    bombSplashDamage: 5000,
    bombAOERadius: 2,
    bombCooldown: 12000,
    selfDestructDamage: 10000,
    potencyPerHit: 0
};

const CBASE_CRUSADER = {
    name: 'Crimson Crusader',
    color: '#A00000',
    hp: 200000,
    shieldHp: 50000,
    hasShield: true,
    speed: 0.2,
    size: 54,
    isSummon: true,
    isCBaseSummon: true,
    cbaseUnitType: 'CRUSADER',
    armadaCapacity: 20,
    spawnCooldown: 80000,
    spawnArmadaCost: 8,
    fragmentCount: 12,
    fragmentDamage: 5000,
    fragmentAOERadius: 1,
    fragmentDelay: 80,
    fragmentCooldown: 12000,
    potencyStrikeDamage: 20000,
    potencyStrikeAOERadius: 4,
    potencyStrikeCooldown: 4000,
    potencyStrikeArmadaCost: 6,
    proxExplosionDamage: 20000,
    proxExplosionInterval: 1000,
    proxExplosionRange: 4,
    omegaExplosionHeal: 50000,
    omegaExplosionBaseDamage: 50000,
    omegaExplosionMaxHpPct: 0.01,
    omegaExplosionRange: 6,
    omegaExplosionKnockback: 5,
    omegaExplosionCooldown: 140000,
    burstLaserDamage: 600,
    burstLaserTickRate: 50,
    burstLaserCount: 50,
    burstLaserCooldown: 15000,
    burstLaserArmadaCost: 4,
    selfDestructDamage: 25000,
    collisionBurstMinDamage: 5000,
    collisionBurstMaxDamage: 10000,
    collisionBurstRange: 3,
    potencyPerHit: 0
};

let cbase_death_potency_this_wave = 0;
let cbase_death_potency_last_trigger = -99999;
let cbase_current_wave_tracked = -1;
let cbase_pending_timeouts = [];
let cbase_last_exec_crusader_gift_time = 0;
let cbase_distribution_rotors = {
    priority: 0,
    fallback: 0,
    syphon: 0,
    all: 0
};

function cbase_register_summon_types() {
    if (typeof SUMMON_TYPES === 'undefined') return;
    SUMMON_TYPES.CBASE_CASTER = CBASE_CASTER;
    SUMMON_TYPES.CBASE_OPPRESSOR = CBASE_OPPRESSOR;
    SUMMON_TYPES.CBASE_IMPALER = CBASE_IMPALER;
    SUMMON_TYPES.CBASE_RESONATOR = CBASE_RESONATOR;
    SUMMON_TYPES.CBASE_EXECUTIONER = CBASE_EXECUTIONER;
    SUMMON_TYPES.CBASE_CRUSADER = CBASE_CRUSADER;
}

function cbase_schedule_timeout(callback, delay) {
    const timeoutId = setTimeout(() => {
        cbase_pending_timeouts = cbase_pending_timeouts.filter(id => id !== timeoutId);
        if (typeof waveActive !== 'undefined' && !waveActive) return;
        if (typeof isGameOver !== 'undefined' && isGameOver) return;
        callback();
    }, delay);
    cbase_pending_timeouts.push(timeoutId);
    return timeoutId;
}

function clear_cbase_timeouts() {
    cbase_pending_timeouts.forEach(timeoutId => clearTimeout(timeoutId));
    cbase_pending_timeouts = [];
}

function cbase_get_armada_capacity(entity) {
    return entity?.armadaCapacity || entity?.type?.armadaCapacity || 5;
}

function cbase_get_armada_power(entity) {
    return entity ? (entity.armadaPower ?? entity.potency ?? 0) : 0;
}

function cbase_set_armada_power(entity, amount) {
    if (!entity) return 0;
    const clamped = Math.max(0, Math.min(cbase_get_armada_capacity(entity), Math.floor(amount)));
    entity.armadaPower = clamped;
    entity.potency = clamped;
    return clamped;
}

function cbase_add_armada_power(entity, amount) {
    return cbase_set_armada_power(entity, cbase_get_armada_power(entity) + amount);
}

function cbase_spend_armada_power(entity, amount) {
    if (cbase_get_armada_power(entity) < amount) return false;
    cbase_set_armada_power(entity, cbase_get_armada_power(entity) - amount);
    return true;
}

function cbase_add_potency(entity, amount) {
    cbase_add_armada_power(entity, amount);
}

function cbase_add_hit_potency(unit, hitCount = 1) {
    if (!unit || hitCount <= 0) return;
    const potencyPerHit = unit.type?.potencyPerHit || 0;
    if (potencyPerHit <= 0) return;
    cbase_add_armada_power(unit, potencyPerHit * hitCount);
}

function cbase_damage_boost_active(unit, timestamp) {
    if (!Number.isFinite(unit?.spawnTime)) return false;
    const elapsed = timestamp - unit.spawnTime;
    if (elapsed < 50000) return false;
    return ((elapsed - 50000) % 50000) < 10000;
}

function cbase_effective_damage(unit, baseDamage, timestamp = performance.now()) {
    return Math.floor(baseDamage * (cbase_damage_boost_active(unit, timestamp) ? 1.5 : 1));
}

function cbase_roll_damage(minDamage, maxDamage) {
    return Math.floor(minDamage + Math.random() * (maxDamage - minDamage + 1));
}

function cbase_get_all_field_units(unitType) {
    return enemies.filter(enemy => enemy.isCBaseSummon && enemy.cbaseUnitType === unitType && enemy.hp > 0);
}

function cbase_get_executioners_and_crusaders() {
    return enemies.filter(enemy =>
        enemy.isCBaseSummon &&
        (enemy.cbaseUnitType === 'EXECUTIONER' || enemy.cbaseUnitType === 'CRUSADER') &&
        enemy.hp > 0
    );
}

function cbase_give_potency_to_execs_crusaders(amount) {
    cbase_get_executioners_and_crusaders().forEach(unit => cbase_add_armada_power(unit, amount));
}

function cbase_feed_random_resonator(amount) {
    const resonators = cbase_get_all_field_units('RESONATOR');
    if (resonators.length === 0) return;
    const chosen = resonators[Math.floor(Math.random() * resonators.length)];
    cbase_add_armada_power(chosen, amount);
}

function cbase_distribute_armada_power_round_robin(targets, total, bucketKey) {
    if (!Array.isArray(targets) || targets.length === 0 || total <= 0) return;
    const rotorKey = bucketKey || 'all';
    const startIndex = cbase_distribution_rotors[rotorKey] % targets.length;
    for (let i = 0; i < total; i++) {
        cbase_add_armada_power(targets[(startIndex + i) % targets.length], 1);
    }
    cbase_distribution_rotors[rotorKey] = (startIndex + total) % targets.length;
}

function cbase_spawn_unit(unitTypeDef, towerX, towerY) {
    if (!path || path.length === 0) return null;
    const now = performance.now();
    const hp = unitTypeDef.hp;
    const shield = unitTypeDef.hasShield ? unitTypeDef.shieldHp : 0;
    const entity = {
        type: unitTypeDef,
        x: path[path.length - 1].x,
        y: path[path.length - 1].y,
        hp,
        maxHp: hp,
        shield,
        maxShield: shield,
        hasShield: unitTypeDef.hasShield || false,
        speed: unitTypeDef.speed,
        size: unitTypeDef.size,
        distanceTraveled: getPathLength(),
        isSummon: true,
        isAlly: true,
        isCBaseSummon: true,
        cbaseUnitType: unitTypeDef.cbaseUnitType,
        armadaCapacity: unitTypeDef.armadaCapacity || 5,
        armadaPower: 0,
        potency: 0,
        spawnTime: now,
        lastFired: 0,
        lastGrenade: 0,
        lastMissile: 0,
        lastBeam: 0,
        lastProxExplosion: 0,
        lastBlaster: now,
        lastBomb: now,
        lastFragment: 0,
        lastFragmentCooldown: now,
        lastPotencyStrike: now,
        lastSpawnAbility: now,
        lastBurstLaser: now,
        lastLaserTick: 0,
        laserStartTime: 0,
        laserEnterCooldownTime: 0,
        isLaserActive: false,
        isBlasterActive: false,
        blasterStartTime: 0,
        lastBlasterTick: 0,
        beamUsed: false,
        beamActive: false,
        beamTarget: null,
        beamHitsRemaining: 0,
        impaleBoosted: false,
        impalerHitCounter: 0,
        isStopped: false,
        isLockedByProx: false,
        fragmentActive: false,
        fragmentQueue: [],
        spawnAbilityActive: false,
        spawnQueue: [],
        potencyStrikeActive: false,
        potencyStrikeTarget: null,
        isBurstLaserActive: false,
        burstLaserShotsRemaining: 0,
        resonatorBeamDamage: unitTypeDef.cbaseUnitType === 'RESONATOR' ? unitTypeDef.orbBeamDamage : 0,
        resonatorOverheat: 0,
        resonatorLockedTarget: null,
        resonatorOrbCooldownUntil: 0,
        resonatorBigOrb: null,
        resonatorOrbAngle: 0,
        lastResonatorOrbitUpdate: now
    };
    const startsWithAP = ['RESONATOR', 'EXECUTIONER', 'CRUSADER'];
    if (startsWithAP.includes(unitTypeDef.cbaseUnitType)) entity.armadaPower = entity.potency = 1;
    enemies.push(entity);
    return entity;
}

window.cbase_spawn_unit = cbase_spawn_unit;
window.clear_cbase_timeouts = clear_cbase_timeouts;

function update_cbase_towers(timestamp) {
    for (const tower of towers) {
        if (!tower.type?.isCBase) continue;
        if (typeof window.isTowerStunned === 'function' && window.isTowerStunned(tower, timestamp)) continue;
        if (!tower.cbaseSpawnTimers) tower.cbaseSpawnTimers = {};

        const levelData = tower.type.levels[tower.level - 1];
        if (!levelData?.summons) continue;

        for (const summonDef of levelData.summons) {
            if (tower.cbaseSpawnTimers[summonDef.type] === undefined) {
                tower.cbaseSpawnTimers[summonDef.type] = timestamp;
                continue;
            }
            if (timestamp - tower.cbaseSpawnTimers[summonDef.type] < summonDef.spawnRate) continue;

            tower.cbaseSpawnTimers[summonDef.type] = timestamp;

            let typeDef = null;
            if (summonDef.type === 'CBASE_CASTER') typeDef = CBASE_CASTER;
            else if (summonDef.type === 'CBASE_OPPRESSOR') typeDef = CBASE_OPPRESSOR;
            else if (summonDef.type === 'CBASE_IMPALER') typeDef = CBASE_IMPALER;
            else if (summonDef.type === 'CBASE_RESONATOR') typeDef = CBASE_RESONATOR;
            else if (summonDef.type === 'CBASE_EXECUTIONER') typeDef = CBASE_EXECUTIONER;
            else if (summonDef.type === 'CBASE_CRUSADER') typeDef = CBASE_CRUSADER;
            if (!typeDef) continue;

            for (let i = 0; i < summonDef.spawnCount; i++) {
                const delay = i * summonDef.spawnDelay;
                if (delay === 0) {
                    cbase_spawn_unit(typeDef, tower.x, tower.y);
                } else {
                    cbase_schedule_timeout(() => {
                        if (!towers.includes(tower) || !tower.type?.isCBase) return;
                        cbase_spawn_unit(typeDef, tower.x, tower.y);
                    }, delay);
                }
            }
        }
    }
}

function cbase_find_random_enemy() {
    const validTargets = enemies.filter(enemy => !enemy.isSummon && enemy.hp > 0);
    if (validTargets.length === 0) return null;
    return validTargets[Math.floor(Math.random() * validTargets.length)];
}

function cbase_find_nearest_enemy(unit, rangeGridSquares) {
    const rangePixels = rangeGridSquares * GRID_SIZE;
    let nearest = null;
    let nearestDist = Infinity;
    for (const enemy of enemies) {
        if (enemy.isSummon || enemy.hp <= 0) continue;
        const dx = unit.x - enemy.x;
        const dy = unit.y - enemy.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist <= rangePixels && dist < nearestDist) {
            nearest = enemy;
            nearestDist = dist;
        }
    }
    return nearest;
}

function cbase_find_highest_hp_enemy() {
    let best = null;
    let bestHp = -1;
    for (const enemy of enemies) {
        if (enemy.isSummon || enemy.hp <= 0) continue;
        const totalHp = enemy.hp + (enemy.shield || 0);
        if (totalHp > bestHp) {
            bestHp = totalHp;
            best = enemy;
        }
    }
    return best;
}

function cbase_any_enemy_in_range(unit, rangeGridSquares) {
    const rangePixels = rangeGridSquares * GRID_SIZE;
    for (const enemy of enemies) {
        if (enemy.isSummon || enemy.hp <= 0) continue;
        const dx = unit.x - enemy.x;
        const dy = unit.y - enemy.y;
        if (Math.sqrt(dx * dx + dy * dy) <= rangePixels) return true;
    }
    return false;
}

function cbase_aoe_damage(unit, cx, cy, radiusGridSquares, damage, timestamp) {
    const radiusPixels = radiusGridSquares * GRID_SIZE;
    let hitCount = 0;
    for (const enemy of enemies) {
        if (enemy.isSummon || enemy.hp <= 0) continue;
        const dx = cx - enemy.x;
        const dy = cy - enemy.y;
        if (Math.sqrt(dx * dx + dy * dy) <= radiusPixels) {
            applyDamage(enemy, cbase_effective_damage(unit, damage, timestamp), 'explosive', 'summonerRange');
            hitCount++;
        }
    }
    explosions.push({ x: cx, y: cy, size: 0, maxSize: radiusPixels * 2, startTime: timestamp, duration: 500 });
    return hitCount;
}

function cbase_knockback_enemy(enemy, knockbackGridSquares) {
    if (!enemy || enemy.isSummon || enemy.type?.cannotBeKnockedBack || !Number.isFinite(enemy.distanceTraveled)) return;
    enemy.distanceTraveled = Math.max(0, enemy.distanceTraveled - knockbackGridSquares * GRID_SIZE);

    let distanceAlongPath = enemy.distanceTraveled;
    let currentDist = 0;
    for (let i = 0; i < path.length - 1; i++) {
        const segmentDist = calculateDistance(path[i].x, path[i].y, path[i + 1].x, path[i + 1].y);
        if (currentDist + segmentDist >= distanceAlongPath) {
            const ratio = (distanceAlongPath - currentDist) / segmentDist;
            enemy.x = path[i].x + (path[i + 1].x - path[i].x) * ratio;
            enemy.y = path[i].y + (path[i + 1].y - path[i].y) * ratio;
            return;
        }
        currentDist += segmentDist;
    }
}

function cbase_sync_summon_position(unit) {
    if (!unit || !path || path.length === 0) return;

    const pathLength = getPathLength();
    const clampedDistance = Math.max(0, Math.min(unit.distanceTraveled || 0, pathLength));
    const distanceAlongPath = pathLength - clampedDistance;
    let currentLength = 0;

    for (let i = path.length - 1; i > 0; i--) {
        const segmentLength = calculateDistance(path[i].x, path[i].y, path[i - 1].x, path[i - 1].y);
        if (distanceAlongPath <= currentLength + segmentLength) {
            const t = (distanceAlongPath - currentLength) / segmentLength;
            unit.x = path[i].x + t * (path[i - 1].x - path[i].x);
            unit.y = path[i].y + t * (path[i - 1].y - path[i].y);
            return;
        }
        currentLength += segmentLength;
    }

    unit.x = path[0].x;
    unit.y = path[0].y;
}

function cbase_apply_death_potency(totalPotency, timestamp, sourceEnemy = null) {
    if (typeof waveNumber !== 'undefined' && waveNumber !== cbase_current_wave_tracked) {
        cbase_death_potency_this_wave = 0;
        cbase_current_wave_tracked = waveNumber;
    }
    if (cbase_death_potency_this_wave >= 2) return;
    if (timestamp - cbase_death_potency_last_trigger < 15000) return;

    cbase_death_potency_last_trigger = timestamp;
    cbase_death_potency_this_wave++;

    const allUnits = enemies.filter(enemy => enemy.isCBaseSummon && enemy.hp > 0);
    if (allUnits.length === 0) return;

    const priority = allUnits.filter(enemy => enemy.cbaseUnitType === 'EXECUTIONER' || enemy.cbaseUnitType === 'CRUSADER');
    const others = allUnits.filter(enemy => enemy.cbaseUnitType !== 'EXECUTIONER' && enemy.cbaseUnitType !== 'CRUSADER');

    if (priority.length > 0) {
        const priorityPool = Math.min(totalPotency, Math.ceil(totalPotency * 0.67));
        const otherPool = totalPotency - priorityPool;
        cbase_distribute_armada_power_round_robin(priority, priorityPool, 'priority');
        const fallbackTargets = others.length > 0 ? others : priority;
        cbase_distribute_armada_power_round_robin(fallbackTargets, otherPool, 'fallback');
    } else {
        cbase_distribute_armada_power_round_robin(allUnits, totalPotency, 'all');
    }

    if (sourceEnemy) {
        sourceEnemy._cbaseDeathMark = false;
        sourceEnemy._cbaseDeathMarkPotency = 0;
    }
}

function cbase_mark_enemy_for_death(enemy, deadUnit) {
    if (!enemy || enemy.isSummon) return;
    const baseHp = deadUnit.type.hp || deadUnit.maxHp || deadUnit.hp;
    if (!Number.isFinite(baseHp) || baseHp <= 0) return;
    const firstDigit = Math.floor(baseHp / Math.pow(10, Math.floor(Math.log10(baseHp))));
    enemy._cbaseDeathMark = true;
    enemy._cbaseDeathMarkPotency = (enemy._cbaseDeathMarkPotency || 0) + firstDigit;
}

function cbase_on_marked_enemy_death(enemy, timestamp) {
    if (!enemy || !enemy._cbaseDeathMark) return;
    cbase_apply_death_potency(enemy._cbaseDeathMarkPotency || 0, timestamp, enemy);
}

function cbase_track_impaler_hits(unit, hitCount) {
    if (!unit || unit.cbaseUnitType !== 'IMPALER' || hitCount <= 0) return;
    unit.impalerHitCounter = (unit.impalerHitCounter || 0) + hitCount;
    while (unit.impalerHitCounter >= unit.type.armadaHitsRequired) {
        unit.impalerHitCounter -= unit.type.armadaHitsRequired;
        cbase_add_armada_power(unit, unit.type.armadaGainPerCycle);
    }
}

function cbase_check_shield_break(unit) {
    if (unit.cbaseUnitType !== 'IMPALER' || unit.impaleBoosted) return;
    if (unit.shield > 0 || unit.maxShield <= 0) return;
    unit.impaleBoosted = true;
    unit.type = Object.assign({}, unit.type);
    unit.impaleDamageOverride = 2000;
    unit.impaleIntervalOverride = 350;
    cbase_give_potency_to_execs_crusaders(2);
}

function update_cbase_caster(unit, timestamp) {
    const target = cbase_find_nearest_enemy(unit, unit.type.shootRange);
    if (!target) {
        unit.isStopped = false;
        return;
    }

    unit.isStopped = true;
    if (timestamp - unit.lastFired >= unit.type.gunFireRate) {
        applyDamage(target, cbase_effective_damage(unit, unit.type.gunDamage, timestamp), 'piercing', 'summonerRange');
        projectiles.push({ x1: unit.x, y1: unit.y, x2: target.x, y2: target.y, color: 'red', width: 2, startTime: timestamp, duration: 80 });
        unit.lastFired = timestamp;
    }

    if (timestamp - unit.lastGrenade >= unit.type.grenadeCooldown) {
        unit.lastGrenade = timestamp;
        cbase_aoe_damage(unit, target.x, target.y, unit.type.grenadeAOERadius, unit.type.grenadeDamage, timestamp);
        cbase_add_armada_power(unit, unit.type.grenadeArmadaGain);
        projectiles.push({ x1: unit.x, y1: unit.y, x2: target.x, y2: target.y, color: '#FF6600', width: 4, startTime: timestamp, duration: 200 });
    }
}

function update_cbase_oppressor(unit, timestamp) {
    const target = cbase_find_nearest_enemy(unit, unit.type.laserRange);

    if (unit.isLaserActive) {
        if (timestamp - unit.laserStartTime < unit.type.laserDuration) {
            unit.isStopped = true;
            if (target && timestamp - unit.lastLaserTick >= unit.type.laserTickRate) {
                applyDamage(target, cbase_effective_damage(unit, unit.type.laserDamage, timestamp), 'laser', 'summonerRange', { fireRate: unit.type.laserTickRate });
                projectiles.push({ x1: unit.x, y1: unit.y, x2: target.x, y2: target.y, color: '#FF3300', width: 3, startTime: timestamp, duration: 60 });
                unit.lastLaserTick = timestamp;
            }
            return;
        }

        unit.isLaserActive = false;
        unit.laserEnterCooldownTime = timestamp;
        unit.isStopped = !!target;
        if (target) {
            applyDamage(target, cbase_effective_damage(unit, unit.type.piercingDamage, timestamp), 'piercing', 'summonerRange');
            railgunShots.push({ x1: unit.x, y1: unit.y, x2: target.x, y2: target.y, alpha: 1, startTime: timestamp, duration: 400, color: '#FF2200' });
            cbase_add_armada_power(unit, unit.type.piercingArmadaGain);
            cbase_feed_random_resonator(1);
        }
        return;
    }

    unit.isStopped = !!target;
    if (target && timestamp - unit.laserEnterCooldownTime >= unit.type.laserCooldown) {
        unit.isLaserActive = true;
        unit.laserStartTime = timestamp;
        unit.lastLaserTick = timestamp;
        unit.isStopped = true;
    }
}

function update_cbase_impaler(unit, timestamp) {
    if (!unit.impaleBoosted && unit.hasShield && unit.shield <= 0 && unit.maxShield > 0) {
        cbase_check_shield_break(unit);
    }

    if (!cbase_any_enemy_in_range(unit, unit.type.impaleRange)) {
        unit.isStopped = false;
        return;
    }

    unit.isStopped = true;
    const damage = unit.impaleBoosted ? unit.impaleDamageOverride : unit.type.impaleDamage;
    const interval = unit.impaleBoosted ? unit.impaleIntervalOverride : unit.type.impaleInterval;
    if (timestamp - unit.lastFired >= interval) {
        const hitCount = cbase_aoe_damage(unit, unit.x, unit.y, unit.type.impaleRange, damage, timestamp);
        cbase_track_impaler_hits(unit, hitCount);
        unit.lastFired = timestamp;
    }
}

function update_cbase_resonator(unit, timestamp) {
    if (!Number.isFinite(unit.resonatorOrbAngle)) {
        unit.resonatorOrbAngle = ((unit.spawnTime || timestamp) * 0.001) % (Math.PI * 2);
    }
    if (!Number.isFinite(unit.lastResonatorOrbitUpdate)) {
        unit.lastResonatorOrbitUpdate = timestamp;
    }
    const orbitDelta = Math.max(0, timestamp - unit.lastResonatorOrbitUpdate);
    const damageRatio = Math.max(0, Math.min(1, ((unit.resonatorBeamDamage || unit.type.orbBeamDamage) - unit.type.orbBeamDamage) / Math.max(1, unit.type.orbBeamDamageMax - unit.type.orbBeamDamage)));
    const orbitSpeed = 0.0025 + damageRatio * 0.0075;
    unit.resonatorOrbAngle = (unit.resonatorOrbAngle + orbitDelta * orbitSpeed) % (Math.PI * 2);
    unit.lastResonatorOrbitUpdate = timestamp;

    if (unit.resonatorBigOrb) {
        const orb = unit.resonatorBigOrb;
        const target = orb.target;
        if (!target || target.hp <= 0 || !enemies.includes(target)) {
            unit.resonatorBigOrb = null;
        } else {
            const dx = target.x - orb.x;
            const dy = target.y - orb.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const speed = 18;
            if (dist <= speed) {
                applyDamage(target, cbase_effective_damage(unit, unit.type.bigOrbDamage, timestamp), 'laser', 'summonerRange');
                explosions.push({ x: target.x, y: target.y, size: 0, maxSize: GRID_SIZE * 3, startTime: timestamp, duration: 400 });
                unit.resonatorBigOrb = null;
            } else {
                orb.x += (dx / dist) * speed;
                orb.y += (dy / dist) * speed;
            }
        }
    }

    if (timestamp < (unit.resonatorOrbCooldownUntil || 0)) {
        unit.resonatorLockedTarget = null;
        unit.resonatorBeamDamage = unit.type.orbBeamDamage;
        unit.resonatorOverheat = 0;
        unit.isStopped = false; // cooldown = move freely
        return;
    }

    let target = unit.resonatorLockedTarget;
    if (!target || target.hp <= 0 || !enemies.includes(target)) {
        target = cbase_find_nearest_enemy(unit, unit.type.shootRange);
        if (!target) {
            unit.resonatorLockedTarget = null;
            unit.resonatorBeamDamage = unit.type.orbBeamDamage;
            unit.resonatorOverheat = 0;
            unit.isStopped = false; // no target = keep walking
            return;
        }
        if (!cbase_spend_armada_power(unit, unit.type.shootArmadaCost)) {
            unit.resonatorLockedTarget = null;
            unit.isStopped = false; // no AP = keep walking
            return;
        }
        unit.resonatorLockedTarget = target;
        unit.resonatorBeamDamage = unit.type.orbBeamDamage;
        unit.resonatorOverheat = 0;
        unit.lastResonatorRamp = timestamp;
        unit.lastResonatorShot = timestamp - unit.type.fireRate;
        unit.lastResonatorOverheat = timestamp;
    }

    unit.isStopped = true; // actively shooting = plant your feet

    if (timestamp - (unit.lastResonatorRamp || 0) >= unit.type.orbDamageRampInterval) {
        unit.resonatorBeamDamage = Math.min(unit.type.orbBeamDamageMax, (unit.resonatorBeamDamage || unit.type.orbBeamDamage) + unit.type.orbDamageRamp);
        unit.lastResonatorRamp = timestamp;
    }

    if (timestamp - (unit.lastResonatorShot || 0) >= unit.type.fireRate) {
        const tickDamage = cbase_effective_damage(unit, unit.resonatorBeamDamage || unit.type.orbBeamDamage, timestamp);
        for (let i = 0; i < unit.type.orbCount; i++) {
            applyDamage(target, tickDamage, 'laser', 'summonerRange', { fireRate: unit.type.fireRate });
        }
        unit.lastResonatorShot = timestamp;
    }

    if ((unit.resonatorBeamDamage || 0) >= unit.type.overheatThreshold &&
        timestamp - (unit.lastResonatorOverheat || 0) >= unit.type.overheatTickRate) {
        unit.resonatorOverheat = Math.min(unit.type.overheatCapacity, (unit.resonatorOverheat || 0) + unit.type.overheatGain);
        unit.lastResonatorOverheat = timestamp;
    }

    if ((unit.resonatorOverheat || 0) >= unit.type.overheatCapacity) {
        unit.resonatorBigOrb = { x: unit.x, y: unit.y, target };
        unit.resonatorOrbCooldownUntil = timestamp + unit.type.orbCooldown;
        unit.resonatorLockedTarget = null;
        unit.resonatorBeamDamage = unit.type.orbBeamDamage;
        unit.resonatorOverheat = 0;
    }
}

function update_cbase_executioner(unit, timestamp) {
    if (cbase_any_enemy_in_range(unit, unit.type.proxExplosionRange)) {
        unit.isLockedByProx = true;
        unit.isStopped = true;
        if (timestamp - unit.lastProxExplosion >= unit.type.proxExplosionInterval) {
            const hitCount = cbase_aoe_damage(unit, unit.x, unit.y, unit.type.proxExplosionRange, unit.type.proxExplosionDamage, timestamp);
            unit.lastProxExplosion = timestamp;
            if (window.triggerShake) window.triggerShake(4, 200);
        }
        return;
    }

    unit.isLockedByProx = false;

    if (unit.isBlasterActive) {
        unit.isStopped = true;
        if (timestamp - unit.blasterStartTime < unit.type.blasterDuration) {
            const target = cbase_find_nearest_enemy(unit, Infinity);
            if (target && timestamp - unit.lastBlasterTick >= unit.type.blasterTickRate) {
                applyDamage(target, cbase_effective_damage(unit, unit.type.blasterDamage, timestamp), 'laser', 'summonerRange', { fireRate: unit.type.blasterTickRate });
                projectiles.push({ x1: unit.x, y1: unit.y, x2: target.x, y2: target.y, color: '#FF4400', width: 2, startTime: timestamp, duration: 50 });
                unit.lastBlasterTick = timestamp;
            }
        } else {
            unit.isBlasterActive = false;
            unit.lastBlaster = timestamp;
            unit.isStopped = false;
        }
        return;
    }

    if (unit.beamActive) {
        unit.isStopped = true;
        if (unit.beamTarget && unit.beamTarget.hp > 0 && unit.beamHitsRemaining > 0) {
            if (timestamp - unit.lastBeam >= 500) {
                applyDamage(unit.beamTarget, cbase_effective_damage(unit, unit.type.beamDamagePerHit, timestamp), 'piercing', 'summonerRange');
                railgunShots.push({ x1: unit.x, y1: unit.y, x2: unit.beamTarget.x, y2: unit.beamTarget.y, alpha: 1, startTime: timestamp, duration: 400, color: '#FF0000' });
                unit.lastBeam = timestamp;
                unit.beamHitsRemaining--;
                if (window.triggerShake) window.triggerShake(6, 300);
            }
        } else {
            unit.beamActive = false;
            unit.isStopped = false;
        }
        return;
    }

    unit.isStopped = false;

    if (!unit.beamUsed && cbase_get_armada_power(unit) >= unit.type.beamArmadaCost) {
        const target = cbase_find_highest_hp_enemy();
        if (target) {
            unit.beamUsed = true;
            unit.beamActive = true;
            unit.beamTarget = target;
            unit.beamHitsRemaining = unit.type.beamHits;
            cbase_spend_armada_power(unit, unit.type.beamArmadaCost);
            unit.lastBeam = timestamp - 500;
            unit.isStopped = true;
            return;
        }
    }

    if (timestamp - (unit.lastBomb || 0) >= unit.type.bombCooldown) {
        const target = cbase_find_random_enemy();
        if (target) {
            unit.lastBomb = timestamp;
            unit.isStopped = true;
            applyDamage(target, cbase_effective_damage(unit, unit.type.bombDamage, timestamp), 'explosive', 'summonerRange');
            const hitCount = cbase_aoe_damage(unit, target.x, target.y, unit.type.bombAOERadius, unit.type.bombSplashDamage, timestamp);
            projectiles.push({ x1: unit.x, y1: unit.y, x2: target.x, y2: target.y, color: '#FFAA00', width: 5, startTime: timestamp, duration: 180 });
            if (window.triggerShake) window.triggerShake(5, 220);
            return;
        }
    }

    if (!unit.isMissilesActive &&
        cbase_get_armada_power(unit) >= unit.type.missileArmadaCost &&
        timestamp - unit.lastMissile >= unit.type.missileCooldown) {
        const target = cbase_find_nearest_enemy(unit, Infinity);
        if (target) {
            cbase_spend_armada_power(unit, unit.type.missileArmadaCost);
            unit.lastMissile = timestamp;
            unit.isMissilesActive = true;
            unit.missileEndTime = timestamp + unit.type.missileCount * 200 + 100;
            unit.isStopped = true;
            for (let i = 0; i < unit.type.missileCount; i++) {
                cbase_schedule_timeout(() => {
                    if (!enemies.includes(unit) || unit.hp <= 0) return;
                    const missileTarget = (target.hp > 0 && enemies.includes(target)) ? target : cbase_find_nearest_enemy(unit, Infinity);
                    if (!missileTarget) return;
                    const hitCount = cbase_aoe_damage(unit, missileTarget.x, missileTarget.y, unit.type.missileAOERadius, unit.type.missileDamage, performance.now());
                    projectiles.push({ x1: unit.x, y1: unit.y, x2: missileTarget.x, y2: missileTarget.y, color: '#FF6600', width: 4, startTime: performance.now(), duration: 200 });
                }, i * 200);
            }
        }
    }

    if (unit.isMissilesActive && timestamp >= unit.missileEndTime) {
        unit.isMissilesActive = false;
        unit.isStopped = false;
        return;
    }

    if (unit.isMissilesActive) {
        unit.isStopped = true;
        return;
    }

    if (!unit.isBlasterActive && timestamp - unit.lastBlaster >= unit.type.blasterCooldown) {
        const target = cbase_find_nearest_enemy(unit, Infinity);
        if (target) {
            unit.isBlasterActive = true;
            unit.blasterStartTime = timestamp;
            unit.lastBlasterTick = timestamp;
            unit.isStopped = true;
        }
    }
}

function update_cbase_crusader(unit, timestamp) {
    if (unit.isBurstLaserActive && timestamp - (unit.burstLaserStartTime || 0) > unit.type.burstLaserTickRate * (unit.type.burstLaserCount + 2)) {
        unit.isBurstLaserActive = false;
        unit.burstLaserShotsRemaining = 0;
        unit.isStopped = false;
    }
    if (unit.fragmentActive && timestamp - (unit.fragmentStartTime || 0) > unit.type.fragmentDelay * (unit.type.fragmentCount + 2)) {
        unit.fragmentActive = false;
        unit.fragmentQueue = [];
        unit.isStopped = false;
    }
    if (unit.spawnAbilityActive && timestamp - (unit.spawnAbilityStartTime || 0) > 4000) {
        unit.spawnAbilityActive = false;
        unit.spawnQueue = [];
        unit.isStopped = false;
    }
    if (unit.potencyStrikeActive && timestamp - (unit.potencyStrikeStartTime || 0) > 1000) {
        unit.potencyStrikeActive = false;
        unit.isStopped = false;
    }

    if (cbase_any_enemy_in_range(unit, unit.type.proxExplosionRange)) {
        unit.isLockedByProx = true;
        unit.isStopped = true;
        if (timestamp - unit.lastProxExplosion >= unit.type.proxExplosionInterval) {
            const hitCount = cbase_aoe_damage(unit, unit.x, unit.y, unit.type.proxExplosionRange, unit.type.proxExplosionDamage, timestamp);
            unit.lastProxExplosion = timestamp;
            if (window.triggerShake) window.triggerShake(6, 300);
        }
        return;
    }

    unit.isLockedByProx = false;

    if (unit.isBurstLaserActive) {
        unit.isStopped = true;
        if ((unit.burstLaserShotsRemaining || 0) > 0 && timestamp - (unit.lastBurstLaserShot || 0) >= unit.type.burstLaserTickRate) {
            const target = cbase_find_nearest_enemy(unit, Infinity);
            if (target) {
                applyDamage(target, cbase_effective_damage(unit, unit.type.burstLaserDamage, timestamp), 'laser', 'summonerRange', { fireRate: unit.type.burstLaserTickRate });
                projectiles.push({ x1: unit.x, y1: unit.y, x2: target.x, y2: target.y, color: '#FF3355', width: 3, startTime: timestamp, duration: 60 });
            }
            unit.burstLaserShotsRemaining--;
            unit.lastBurstLaserShot = timestamp;
        }
        if ((unit.burstLaserShotsRemaining || 0) <= 0) {
            unit.isBurstLaserActive = false;
            unit.lastBurstLaser = timestamp;
            unit.isStopped = false;
        }
        return;
    }

    if (unit.fragmentActive) {
        unit.isStopped = true;
        if ((unit.fragmentQueue || []).length > 0 && timestamp - unit.lastFragment >= unit.type.fragmentDelay) {
            const target = unit.fragmentQueue.shift();
            if (target && target.hp > 0 && enemies.includes(target)) {
                const hitCount = cbase_aoe_damage(unit, target.x, target.y, unit.type.fragmentAOERadius, unit.type.fragmentDamage, timestamp);
            }
            projectiles.push({ x1: unit.x, y1: unit.y, x2: (target ? target.x : unit.x), y2: (target ? target.y : unit.y), color: '#FF8800', width: 3, startTime: timestamp, duration: 150 });
            unit.lastFragment = timestamp;
        }
        if ((unit.fragmentQueue || []).length === 0) {
            unit.fragmentActive = false;
            unit.lastFragmentCooldown = timestamp;
            unit.isStopped = false;
        }
        return;
    }

    if (unit.potencyStrikeActive) {
        unit.isStopped = true;
        const target = unit.potencyStrikeTarget;
        if (target && target.hp > 0 && enemies.includes(target)) {
            const hitCount = cbase_aoe_damage(unit, target.x, target.y, unit.type.potencyStrikeAOERadius, unit.type.potencyStrikeDamage, timestamp);
            if (window.triggerShake) window.triggerShake(8, 400);
        }
        unit.potencyStrikeActive = false;
        unit.lastPotencyStrike = timestamp;
        unit.isStopped = false;
        return;
    }

    if (unit.spawnAbilityActive) {
        unit.isStopped = true;
        if ((unit.spawnQueue || []).length === 0) {
            unit.spawnAbilityActive = false;
            unit.isStopped = false;
        }
        return;
    }

    unit.isStopped = false;

    if (cbase_get_armada_power(unit) >= unit.type.spawnArmadaCost &&
        timestamp - (unit.lastSpawnAbility || 0) >= unit.type.spawnCooldown) {
        cbase_spend_armada_power(unit, unit.type.spawnArmadaCost);
        unit.lastSpawnAbility = timestamp;
        unit.spawnAbilityStartTime = timestamp;
        unit.spawnAbilityActive = true;
        unit.spawnQueue = [];
        unit.isStopped = true;

        let delay = 0;
        for (let i = 0; i < 3; i++) {
            const scheduledDelay = delay;
            unit.spawnQueue.push(scheduledDelay);
            cbase_schedule_timeout(() => {
                if (!enemies.includes(unit) || unit.hp <= 0) return;
                cbase_spawn_unit(CBASE_IMPALER, unit.x, unit.y);
                unit.spawnQueue.shift();
            }, scheduledDelay);
            delay += 500;
        }
        for (let i = 0; i < 2; i++) {
            const scheduledDelay = delay;
            unit.spawnQueue.push(scheduledDelay);
            cbase_schedule_timeout(() => {
                if (!enemies.includes(unit) || unit.hp <= 0) return;
                cbase_spawn_unit(CBASE_OPPRESSOR, unit.x, unit.y);
                unit.spawnQueue.shift();
            }, scheduledDelay);
            delay += 500;
        }
        return;
    }

    if (!unit.isBurstLaserActive &&
        cbase_get_armada_power(unit) >= unit.type.burstLaserArmadaCost &&
        timestamp - (unit.lastBurstLaser || 0) >= unit.type.burstLaserCooldown) {
        const target = cbase_find_nearest_enemy(unit, Infinity);
        if (target) {
            cbase_spend_armada_power(unit, unit.type.burstLaserArmadaCost);
            unit.isBurstLaserActive = true;
            unit.burstLaserStartTime = timestamp;
            unit.burstLaserShotsRemaining = unit.type.burstLaserCount;
            unit.lastBurstLaserShot = timestamp - unit.type.burstLaserTickRate;
            unit.isStopped = true;
            return;
        }
    }

    if (!unit.fragmentActive && timestamp - (unit.lastFragmentCooldown || 0) >= unit.type.fragmentCooldown) {
        const target = cbase_find_nearest_enemy(unit, Infinity);
        if (target) {
            unit.fragmentActive = true;
            unit.fragmentStartTime = timestamp;
            unit.lastFragment = timestamp;
            unit.fragmentQueue = Array(unit.type.fragmentCount).fill(target);
            unit.isStopped = true;
            return;
        }
    }

    if (!unit.potencyStrikeActive &&
        cbase_get_armada_power(unit) >= unit.type.potencyStrikeArmadaCost &&
        timestamp - unit.lastPotencyStrike >= unit.type.potencyStrikeCooldown) {
        const target = cbase_find_nearest_enemy(unit, Infinity);
        if (target) {
            cbase_spend_armada_power(unit, unit.type.potencyStrikeArmadaCost);
            unit.potencyStrikeActive = true;
            unit.potencyStrikeStartTime = timestamp;
            unit.potencyStrikeTarget = target;
            unit.isStopped = true;
        }
    }
}

function cbase_handle_ram(unit, unitIndex, timestamp) {
    let ramOccurred = false;
    for (let i = enemies.length - 1; i >= 0 && !ramOccurred; i--) {
        const enemy = enemies[i];
        if (!enemy || enemy === unit || enemy.isSummon || enemy.hp <= 0) continue;
        if (calculateDistance(unit.x, unit.y, enemy.x, enemy.y) >= (unit.size + enemy.size) / 2) continue;

        if (unit.cbaseUnitType === 'IMPALER') {
            const burstDamage = cbase_roll_damage(unit.type.collisionBurstMinDamage, unit.type.collisionBurstMaxDamage);
            const hitCount = cbase_aoe_damage(unit, unit.x, unit.y, unit.type.collisionBurstRange, burstDamage, timestamp);
            cbase_track_impaler_hits(unit, hitCount);
        }

        const damage = Math.min(unit.hp, enemy.hp);
        unit.hp -= damage;
        applyDamage(enemy, damage, 'bullet', 'summonerCollision');

        if (unit.hp <= 0) {
            if (typeof cbase_try_trigger_omega_explosion === 'function' && cbase_try_trigger_omega_explosion(unit, timestamp)) {
                ramOccurred = true;
                continue;
            }
            cbase_on_unit_death(unit, timestamp, enemy);
            enemies.splice(unitIndex, 1);
        }

        if (enemy.hp <= 0) {
            cbase_on_marked_enemy_death(enemy, timestamp);
            enemies.splice(i, 1);
        }
        ramOccurred = true;
    }
}

function update_cbase_units(timestamp) {
    // 1. PASSIVE TIMER (30s) - Resonator, Executioner, Crusader get +1 AP
    if (timestamp - cbase_last_exec_crusader_gift_time >= 30000) {
        enemies.forEach(unit => {
            if (unit && unit.isCBaseSummon && unit.hp > 0) {
                const type = unit.cbaseUnitType;
                if (type === 'RESONATOR' || type === 'EXECUTIONER' || type === 'CRUSADER') {
                    cbase_add_armada_power(unit, 1);
                }
            }
        });
        cbase_last_exec_crusader_gift_time = timestamp;
    }

    // 2. FUEL SYPHON TIMER (5s) - Big units grab from Small units
    // Initialize a separate tracker if it doesn't exist
    if (typeof cbase_last_fuel_syphon === 'undefined') window.cbase_last_fuel_syphon = 0;

    if (timestamp - window.cbase_last_fuel_syphon >= 5000) {
        const bigUnits = enemies.filter(e =>
            e && e.isCBaseSummon && e.hp > 0 &&
            (e.cbaseUnitType === 'EXECUTIONER' || e.cbaseUnitType === 'CRUSADER')
        );

        if (bigUnits.length > 0) {
            // Find small units with power to give
            const fuelSources = enemies.filter(e =>
                e && e.isCBaseSummon && e.hp > 0 &&
                ['CASTER', 'OPPRESSOR', 'IMPALER'].includes(e.cbaseUnitType)
            );

            fuelSources.forEach(source => {
                // If the small unit has power in its capacity, syphon it
                if (cbase_get_armada_power(source) > 0) {
                    cbase_add_armada_power(source, -1); // Drain fuel

                    // Rotate fairly so one big unit doesn't starve the others.
                    const target = bigUnits[cbase_distribution_rotors.syphon % bigUnits.length];
                    cbase_distribution_rotors.syphon = (cbase_distribution_rotors.syphon + 1) % bigUnits.length;
                    cbase_add_armada_power(target, 1);
                }
            });
        }
        window.cbase_last_fuel_syphon = timestamp;
    }

    // --- REMAINDER OF YOUR LOOP (Movement & Switching) ---
    for (let i = enemies.length - 1; i >= 0; i--) {
        const unit = enemies[i];
        if (!unit || !unit.isCBaseSummon || unit.hp <= 0) continue;

        if (unit.cbaseUnitType === 'IMPALER' && !unit.impaleBoosted && unit.hasShield && unit.shield <= 0 && unit.maxShield > 0) {
            cbase_check_shield_break(unit);
        }

        switch (unit.cbaseUnitType) {
            case 'CASTER': update_cbase_caster(unit, timestamp); break;
            case 'OPPRESSOR': update_cbase_oppressor(unit, timestamp); break;
            case 'IMPALER': update_cbase_impaler(unit, timestamp); break;
            case 'RESONATOR': update_cbase_resonator(unit, timestamp); break;
            case 'EXECUTIONER': update_cbase_executioner(unit, timestamp); break;
            case 'CRUSADER': update_cbase_crusader(unit, timestamp); break;
        }

        if (!unit.isStopped && !unit.isLockedByProx) {
            moveEntity(unit, true);
        }

        cbase_sync_summon_position(unit);
        cbase_handle_ram(unit, i, timestamp);
        if (!enemies.includes(unit)) continue;

        if (unit.distanceTraveled <= 0) {
            enemies.splice(i, 1);
        }
    }
}

function cbase_on_unit_death(deadUnit, timestamp, killer = null) {
    if (killer) cbase_mark_enemy_for_death(killer, deadUnit);

    if (deadUnit.cbaseUnitType === 'IMPALER') {
        cbase_add_armada_power(deadUnit, deadUnit.type.selfDestructArmadaGain || 0);
        const blastRangePx = deadUnit.type.selfDestructRange * GRID_SIZE;
        for (const enemy of enemies) {
            if (enemy.isSummon || enemy.hp <= 0) continue;
            const dx = deadUnit.x - enemy.x;
            const dy = deadUnit.y - enemy.y;
            if (Math.sqrt(dx * dx + dy * dy) <= blastRangePx) {
                applyDamage(enemy, deadUnit.type.selfDestructDamage, 'explosive', 'summonerRange');
            }
        }
        explosions.push({ x: deadUnit.x, y: deadUnit.y, size: 0, maxSize: blastRangePx * 2, startTime: timestamp, duration: 700 });
        if (window.triggerShake) window.triggerShake(10, 400);
        return;
    }

    if (deadUnit.type.selfDestructDamage) {
        const radiusPixels = 2 * GRID_SIZE;
        for (const enemy of enemies) {
            if (enemy.isSummon || enemy.hp <= 0) continue;
            const dx = deadUnit.x - enemy.x;
            const dy = deadUnit.y - enemy.y;
            if (Math.sqrt(dx * dx + dy * dy) <= radiusPixels) {
                applyDamage(enemy, deadUnit.type.selfDestructDamage, 'explosive', 'summonerRange');
            }
        }
        explosions.push({ x: deadUnit.x, y: deadUnit.y, size: 0, maxSize: radiusPixels * 2, startTime: timestamp, duration: 450 });
    }
}

function cbase_try_trigger_omega_explosion(unit, timestamp) {
    if (!unit || unit.cbaseUnitType !== 'CRUSADER') return false;
    const lastTrigger = unit.lastOmegaExplosion === undefined ? -Infinity : unit.lastOmegaExplosion;
    if (timestamp - lastTrigger < unit.type.omegaExplosionCooldown) return false;

    unit.lastOmegaExplosion = timestamp;
    unit.hp = unit.type.omegaExplosionHeal;

    const radiusPixels = unit.type.omegaExplosionRange * GRID_SIZE;
    let hitCount = 0;
    for (const enemy of enemies) {
        if (!enemy || enemy.isSummon || enemy.hp <= 0) continue;
        const dx = unit.x - enemy.x;
        const dy = unit.y - enemy.y;
        if (Math.sqrt(dx * dx + dy * dy) > radiusPixels) continue;

        const maxHp = Number.isFinite(enemy.maxHp) ? enemy.maxHp : enemy.hp;
        const omegaDamage = unit.type.omegaExplosionBaseDamage + Math.floor(maxHp * unit.type.omegaExplosionMaxHpPct);
        applyDamage(enemy, cbase_effective_damage(unit, omegaDamage, timestamp), 'explosive', 'summonerRange');
        cbase_knockback_enemy(enemy, unit.type.omegaExplosionKnockback);
        hitCount++;
    }

    explosions.push({ x: unit.x, y: unit.y, size: 0, maxSize: radiusPixels * 2, startTime: timestamp, duration: 800 });
    if (window.triggerShake) window.triggerShake(12, 500);
    return true;
}

window.cbase_try_trigger_omega_explosion = cbase_try_trigger_omega_explosion;

function draw_cbase_resonator(ctxRef, unit, now) {
    const baseDamage = unit.type.orbBeamDamage;
    const maxDamage = unit.type.orbBeamDamageMax;
    const beamDamage = unit.resonatorBeamDamage || baseDamage;
    const damageRatio = Math.max(0, Math.min(1, (beamDamage - baseDamage) / Math.max(1, maxDamage - baseDamage)));
    const orbitRadius = unit.size * 0.95;
    const baseAngle = unit.resonatorOrbAngle || 0;

    if (!unit.resonatorBigOrb && now >= (unit.resonatorOrbCooldownUntil || 0)) {
        for (let i = 0; i < unit.type.orbCount; i++) {
            const angle = baseAngle + (Math.PI * 2 * i / unit.type.orbCount);
            const orbX = unit.x + Math.cos(angle) * orbitRadius;
            const orbY = unit.y + Math.sin(angle) * orbitRadius;

            if (unit.resonatorLockedTarget && unit.resonatorLockedTarget.hp > 0) {
                ctxRef.strokeStyle = 'rgba(255, 173, 214, 0.9)';
                ctxRef.lineWidth = 3;
                ctxRef.beginPath();
                ctxRef.moveTo(orbX, orbY);
                ctxRef.lineTo(unit.resonatorLockedTarget.x, unit.resonatorLockedTarget.y);
                ctxRef.stroke();

                ctxRef.strokeStyle = 'rgba(255,255,255,0.6)';
                ctxRef.lineWidth = 1.5;
                ctxRef.beginPath();
                ctxRef.moveTo(orbX, orbY);
                ctxRef.lineTo(unit.resonatorLockedTarget.x, unit.resonatorLockedTarget.y);
                ctxRef.stroke();
            }

            ctxRef.fillStyle = '#FFD6E7';
            ctxRef.beginPath();
            ctxRef.arc(orbX, orbY, unit.size * 0.12, 0, Math.PI * 2);
            ctxRef.fill();

            ctxRef.strokeStyle = '#FFFFFF';
            ctxRef.lineWidth = 1.5;
            ctxRef.stroke();
        }
    }

    if (unit.resonatorBigOrb) {
        ctxRef.fillStyle = '#FFFFFF';
        ctxRef.beginPath();
        ctxRef.arc(unit.resonatorBigOrb.x, unit.resonatorBigOrb.y, unit.size * 0.22, 0, Math.PI * 2);
        ctxRef.fill();
        ctxRef.strokeStyle = '#FFD6E7';
        ctxRef.lineWidth = 3;
        ctxRef.stroke();
    }

    if ((unit.resonatorOverheat || 0) > 0) {
        const overheatRatio = Math.max(0, Math.min(1, unit.resonatorOverheat / unit.type.overheatCapacity));
        ctxRef.strokeStyle = `rgba(255, 102, 163, ${0.3 + overheatRatio * 0.6})`;
        ctxRef.lineWidth = 3;
        ctxRef.beginPath();
        ctxRef.arc(unit.x, unit.y, unit.size * 0.85, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * overheatRatio);
        ctxRef.stroke();
    }
}

function draw_cbase_potency(ctxRef) {
    const now = performance.now();
    for (const unit of enemies) {
        if (!unit.isCBaseSummon || unit.hp <= 0) continue;

        if (unit.cbaseUnitType === 'RESONATOR') {
            draw_cbase_resonator(ctxRef, unit, now);
        }

        const armada = cbase_get_armada_power(unit);
        const capacity = cbase_get_armada_capacity(unit);
        const shouldDrawBar = armada > 0 || unit.cbaseUnitType === 'EXECUTIONER' || unit.cbaseUnitType === 'CRUSADER' || unit.cbaseUnitType === 'RESONATOR';
        if (!shouldDrawBar) continue;

        const barW = unit.size * 1.6;
        const barH = 5;
        const bx = unit.x - barW / 2;
        const by = unit.y - unit.size / 2 - 20;

        ctxRef.fillStyle = 'rgba(0,0,0,0.6)';
        ctxRef.fillRect(bx, by, barW, barH);

        const ratio = capacity > 0 ? armada / capacity : 0;
        ctxRef.fillStyle = ratio >= 1 ? '#FF3355' : ratio >= 0.5 ? '#FF8800' : '#FFCC00';
        ctxRef.fillRect(bx, by, barW * ratio, barH);

        ctxRef.fillStyle = 'white';
        ctxRef.font = 'bold 9px Arial';
        ctxRef.textAlign = 'center';
        ctxRef.fillText(`AP ${armada}/${capacity}`, unit.x, by - 1);
    }
}
