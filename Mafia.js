// ═══════════════════════════════════════════════════════════════
// MAFIA TOWER — Full self-contained module
// Color: #1A1A1A (black), Placement limit: 2
// Selectable abilities target a SPECIFIC enemy (like carrier airstrike)
// ═══════════════════════════════════════════════════════════════

// ───────────────────────── SUMMON TYPES ─────────────────────────
const MAFIA_GUNNER_L1 = {
    name: 'Mafia Gunner L1',
    color: '#333333',
    hp: 50,
    speed: 0.25,
    size: 20,
    isSummon: true,
    damage: 10,
    fireRate: 500,
    range: 5,
    isMafiaGunner: true,
    stopsToShoot: true
};

const MAFIA_GUNNER_L2 = {
    name: 'Mafia Gunner L2',
    color: '#222222',
    hp: 200,
    speed: 0.25,
    size: 22,
    isSummon: true,
    damage: 50,
    fireRate: 600,
    range: 6,
    isMafiaGunner: true,
    stopsToShoot: true
};

const MAFIA_GOLDEN_GUNNER = {
    name: 'Golden Gunner',
    color: '#FFD700',
    hp: 1500,
    speed: 0.25,
    size: 25,
    isSummon: true,
    damage: 300,
    fireRate: 650,
    range: 8,
    isMafiaGunner: true,
    stopsToShoot: true
};

// ───────────────────────── TOWER TYPE ─────────────────────────
const MAFIA_TOWER_TYPE = {
    name: 'Mafia',
    color: '#1A1A1A',
    cost: 500,
    damageType: 'piercing',
    aoe: false,
    summons: true,
    isHybrid: true,
    isMafia: true,
    limit: 2,
    levels: [
        // ── Level 1: Placement ──
        // 5 damage every 1.2s, no burst, no summons
        // Passives: crit 10% base, x1.05 buff, +2%/reload max 40%
        {
            damage: 5,
            fireRate: 1200,
            range: 4,
            upgradeCost: 0,
            // no burst at this level
            burstCount: 0,
            reloadTime: 0,
            // crit passive
            critChance: 0.10,
            critMultiplier: 1.05,
            critReloadBonus: 0.02,
            critMaxChance: 0.40,
            // no summons
            summons: null,
            // no abilities
            abilities: null,
            // mafia target passive: OFF at lvl 1-2
            hasMafiaTarget: false,
            // reload cash: none
            reloadCash: 0
        },
        // ── Level 2 ──
        // 25 damage every 0.7s, no burst
        // Spawns Gunner L1 (50hp, 10dmg/0.5s, every 20s)
        // Passives: same crit as lvl 1
        {
            damage: 25,
            fireRate: 700,
            range: 5,
            upgradeCost: 1050,
            burstCount: 3,
            reloadTime: 1250,
            critChance: 0.10,
            critMultiplier: 1.2,
            critReloadBonus: 0.02,
            critMaxChance: 0.40,
            summons: [{ type: 'MAFIA_GUNNER_L1', spawnRate: 40000 }],
            abilities: null,
            hasMafiaTarget: false,
            reloadCash: 50
        },
        // ── Level 3 ──
        // 200 damage, 3 burst, 0.4s between shots, 2s reload
        // Spawns Gunner L2 (500hp, 50dmg/0.6s, every 40s)
        // Passives: crit 20% base x1.10, +2%/reload max 50%, mafia target ON, +100$/reload
        // Ability 1: Bounty (5% maxHP, max 5000, 60s CD)
        // Ability 2: Target (+1 mafia target/shot 3s, max 10, 50s CD)
        {
            damage: 200,
            fireRate: 400,
            range: 6,
            upgradeCost: 5400,
            burstCount: 3,
            reloadTime: 2000,
            critChance: 0.20,
            critMultiplier: 1.25,
            critReloadBonus: 0.02,
            critMaxChance: 0.50,
            summons: [{ type: 'MAFIA_GUNNER_L2', spawnRate: 50000 }],
            abilities: {
                bounty: { hpPercent: 0.05, maxCash: 5000, cooldown: 60000 },
                target: { stacksPerShot: 1, duration: 3000, maxStacks: 10, failReduce: 2, failFireRateDebuff: 0.20, failDebuffDuration: 6000, decayRate: 10000, damageBonus: 0.15, cooldown: 50000 }
            },
            hasMafiaTarget: true,
            mafiaTargetHpThreshold: 50000,
            reloadCash: 300
        },
        // ── Level 4 ──
        // 400 damage, 3 burst, 0.4s between shots, 2s reload
        // Passives: golden gunner, mafia target ON, crit 30% x1.10 (+5% per mafia target on self),
        //           +5%/reload max 60%, bomb (100k+ hp enemies), +500$/reload
        // Ability 1: Bounty (10% maxHP, max 20000, 80s CD)
        // Ability 2: Traps (-25% speed 8s, 50s CD, GLOBAL)
        // Ability 3: Target (+2 mafia target/shot 3s, max 10, 50s CD)
        {
            damage: 400,
            fireRate: 400,
            range: 7,
            upgradeCost: 20000,
            burstCount: 3,
            reloadTime: 2000,
            critChance: 0.30,
            critMultiplier: 1.4,
            critReloadBonus: 0.05,
            critMaxChance: 0.60,
            summons: [{ type: 'MAFIA_GOLDEN_GUNNER', spawnRate: 80000 }],
            abilities: {
                bounty: { hpPercent: 0.10, maxCash: 20000, cooldown: 80000 },
                traps: { speedDebuff: 0.25, duration: 8000, cooldown: 50000, isGlobal: true },
                target: { stacksPerShot: 2, duration: 3000, maxStacks: 10, failReduce: 3, failFireRateDebuff: 0.20, failDebuffDuration: 6000, decayRate: 10000, damageBonus: 0.30, cooldown: 50000 }
            },
            hasMafiaTarget: true,
            mafiaTargetHpThreshold: 50000,
            // crit per mafia target count on self
            critPerMafiaTarget: 0.05,
            reloadCash: 750,
            // bomb passive
            hasBomb: true,
            bombHpThreshold: 100000,
            bombDamage: 6000,
            bombMaxHpPercent: 0.02,
            bombExplosionDamage: 1500,
            bombExplosionRange: 2,
            bombDetonationTime: 3000,
            bombCooldown: 45000
        }
    ]
};

// ───────────────────────── GLOBAL STATE ─────────────────────────
let mafia_targeting_active = false;
let mafia_targeting_data = null; // { tower, ability_id, ... }
let mafia_global_traps_cooldown = 0; // shared across all mafia towers
let mafia_count = 0;

// ───────────────────────── HELPER: INIT TOWER STATE ─────────────────────────
function init_mafia_tower_state(tower) {
    tower.mafia = {
        // crit
        currentCritChance: 0,
        // burst state
        burstRemaining: 0,
        lastBurstShot: 0,
        isReloading: false,
        reloadStartTime: 0,
        // mafia target on self (buff from "target" ability)
        selfMafiaTargetCount: 0,
        // ability cooldowns
        lastBountyTime: 0,
        lastTargetTime: 0,
        lastTrapsTime: 0,
        // target ability state
        targetAbilityActive: false,
        targetAbilityStartTime: 0,
        targetAbilityEnemy: null,
        targetAbilityFailed: false,
        targetFailDebuffEndTime: 0,
        targetDecayTimer: 0,
        // bomb cooldown
        lastBombTime: 0,
        // firerate debuff from failed target
        fireRateDebuffActive: false,
        fireRateDebuffEndTime: 0
    };
}

// Custom targeting for Mafia: Prioritizes Targeted -> Bountied -> Furthest
function findMafiaTarget(tower) {
    const stats = tower.type.levels[tower.level - 1];
    const buffs = tower.type.cannotBeBuffed ? { rangeBoost: 0 } : getCommanderBuffs(tower);
    const rangeBonus = tower.type.rangeBonus || 0;
    const buffedRange = stats.range + buffs.rangeBoost + rangeBonus;
    const sqRange = (buffedRange * GRID_SIZE) * (buffedRange * GRID_SIZE);

    let bestTarget = null;
    let highestPriority = -1; // 2 = Targeted, 1 = Bountied, 0 = Normal
    let maxDistanceTraveled = -Infinity;

    for (const enemy of enemies) {
        if (enemy.hp > 0 && !enemy.isSummon) {
            const sqDist = calculateDistanceSq(tower.x, tower.y, enemy.x, enemy.y);
            if (sqDist <= sqRange) {
                let priority = 0;
                if (enemy._mafiaTargetDamageBonus) priority = 2; // Priority 1: Target ability
                else if (enemy._mafiaBounty) priority = 1;       // Priority 2: Bounty ability

                // If higher priority, or same priority but further along path
                if (priority > highestPriority || (priority === highestPriority && enemy.distanceTraveled > maxDistanceTraveled)) {
                    highestPriority = priority;
                    maxDistanceTraveled = enemy.distanceTraveled;
                    bestTarget = enemy;
                }
            }
        }
    }
    return bestTarget;
}

// ───────────────────────── CORE UPDATE ─────────────────────────
function update_mafia_towers(timestamp) {
    for (const tower of towers) {
        if (!tower.type || !tower.type.isMafia) continue;
        if (typeof window.isTowerStunned === 'function' && window.isTowerStunned(tower, timestamp)) continue;
        if (tower.level < 1 || tower.level > tower.type.levels.length) continue;

        const stats = tower.type.levels[tower.level - 1];

        // Initialize mafia state if needed
        if (!tower.mafia) init_mafia_tower_state(tower);
        const m = tower.mafia;

        // Reset crit chance on level change
        if (m.currentCritChance === undefined) m.currentCritChance = 0;

        // ── Summon logic (handled by script.js updateTowers summoner section) ──
        // Nothing extra needed here, the main updateTowers handles tower.type.summons

        // ── get buffs ──
        const buffs = tower.type.cannotBeBuffed ? { rangeBoost: 0, fireRateBoost: 0, damageBoost: 0 } : getCommanderBuffs(tower);
        let buffedFireRate = stats.fireRate * (1 - buffs.fireRateBoost);

        // Apply firerate debuff from failed target ability
        if (m.fireRateDebuffActive && timestamp < m.fireRateDebuffEndTime) {
            buffedFireRate *= (1 + 0.20); // -20% firerate = slower = multiply interval
        } else {
            m.fireRateDebuffActive = false;
        }

        const buffedDamage = Math.floor(stats.damage * (1 + buffs.damageBoost));
        const rangeBonus = tower.type.rangeBonus || 0;

        // ── Target acquisition ──
        if (!tower.target || tower.target.hp <= 0 || !enemies.includes(tower.target) || !isInRange(tower, tower.target)) {
            // Check if current target lost its priority status compared to others
            tower.target = findMafiaTarget(tower);
        } else {
            // Even if we have a target, check if a newly prioritized target appeared
            const newTarget = findMafiaTarget(tower);
            // If the new target has a higher priority flag than the current one, switch.
            // We use the presence of the flags to determine priority quickly.
            const currentPriority = (tower.target._mafiaTargetDamageBonus ? 2 : (tower.target._mafiaBounty ? 1 : 0));
            const newPriority = (newTarget && newTarget._mafiaTargetDamageBonus ? 2 : (newTarget && newTarget._mafiaBounty ? 1 : 0));
            if (newPriority > currentPriority) {
                tower.target = newTarget;
            }
        }

        if (!tower.target || tower.target.isSummon) continue;

        // ── Calculate mafia self-damage buff ──
        let mafiaSelfBuff = 1.0;
        if (stats.hasMafiaTarget) {
            mafiaSelfBuff += m.selfMafiaTargetCount * 0.05;
        }

        // ── ATTACK LOGIC ──
        if (stats.burstCount > 0) {
            // ── BURST FIRE (Level 3-4) ──
            // Check reload state
            if (m.isReloading) {
                if (timestamp - m.reloadStartTime >= stats.reloadTime) {
                    m.isReloading = false;
                    m.burstRemaining = stats.burstCount;

                    // ── On reload events ──
                    // Increase crit chance
                    m.currentCritChance += stats.critReloadBonus;
                    if (m.currentCritChance >= stats.critMaxChance) {
                        m.currentCritChance = 0; // reset upon reaching max
                    }

                    // Reload cash
                    if (stats.reloadCash > 0) {
                        cash += stats.reloadCash;
                        updateCashDisplay();
                        // Visual effect
                        cashEffects.push({ x: tower.x, y: tower.y - 10, text: `+$${stats.reloadCash}`, alpha: 1, time: 0 });
                        const div = document.createElement('div');
                        div.className = 'cash-effect';
                        div.style.left = `${tower.x}px`;
                        div.style.top = `${tower.y - 10}px`;
                        div.textContent = `+$${stats.reloadCash}`;
                        document.body.appendChild(div);
                        setTimeout(() => div.remove(), 1000);
                    }

                    // Mafia target per shoot (from "target" ability)
                    if (m.targetAbilityActive && timestamp < m.targetAbilityStartTime + (stats.abilities.target.duration || 3000)) {
                        // Will add stacks per shot in the fire section
                    } else if (m.targetAbilityActive) {
                        // Duration ended
                        m.targetAbilityActive = false;
                    }
                }
                continue; // Skip firing while reloading
            }

            // Start new burst if none active
            if (m.burstRemaining <= 0) {
                m.burstRemaining = stats.burstCount;
                m.lastBurstShot = 0;
            }

            // Fire burst shots
            if (m.burstRemaining > 0 && timestamp - m.lastBurstShot >= buffedFireRate) {
                if (tower.target && tower.target.hp > 0 && !tower.target.isSummon && isInRange(tower, tower.target)) {
                    let shotDamage = buffedDamage;

                    // Apply mafia self buff
                    shotDamage = Math.floor(shotDamage * mafiaSelfBuff);

                    // ── CRITICAL HIT ──
                    let isCrit = false;
                    let effectiveCritChance = stats.critChance + m.currentCritChance;

                    // Lvl 4: crit chance increased by mafia target count on self
                    if (stats.critPerMafiaTarget) {
                        effectiveCritChance += m.selfMafiaTargetCount * stats.critPerMafiaTarget;
                    }

                    if (Math.random() < effectiveCritChance) {
                        shotDamage = Math.floor(shotDamage * stats.critMultiplier);
                        isCrit = true;
                    }

                    // ── MAFIA TARGET on enemy ──
                    if (stats.hasMafiaTarget) {
                        const totalEnemyHp = (tower.target.hp || 0) + (tower.target.shield || 0);
                        if (totalEnemyHp >= stats.mafiaTargetHpThreshold) {
                            // Enemy gains +1 mafia target per shoot
                            tower.target.mafiaTargetCount = Math.min((tower.target.mafiaTargetCount || 0) + 1, 20); // capped at 20
                        }
                        // Apply mafia target vulnerability: +1% more damage per count on enemy
                        const enemyMafiaCount = tower.target.mafiaTargetCount || 0;
                        if (enemyMafiaCount > 0) {
                            shotDamage = Math.floor(shotDamage * (1 + enemyMafiaCount * 0.01));
                        }
                    }

                    // ── TARGET ABILITY: add stacks per shot ──
                    if (m.targetAbilityActive && m.targetAbilityEnemy === tower.target) {
                        if (timestamp < m.targetAbilityStartTime + (stats.abilities.target.duration || 3000)) {
                            const stacksToAdd = stats.abilities.target.stacksPerShot;
                            m.selfMafiaTargetCount += stacksToAdd; // uncapped for mafias
                        }
                    }

                    // ── TARGET ABILITY: enemy takes extra damage from mafias ──
                    if (tower.target._mafiaTargetDamageBonus) {
                        shotDamage = Math.floor(shotDamage * (1 + tower.target._mafiaTargetDamageBonus));
                    }

                    const wasAlive = tower.target.hp > 0;
                    const hadHighHp = (tower.target.maxHp || 0) >= 10000;

                    // Mark that it was hit by mafia
                    tower.target._lastHitByMafia = true;
                    applyDamage(tower.target, shotDamage, tower.type.damageType || 'piercing');

                    if (wasAlive && tower.target.hp <= 0 && hadHighHp) {
                        m.selfMafiaTargetCount += 1; // reward for killing big enemy
                    }

                    // Projectile visual
                    projectiles.push({
                        x1: tower.x, y1: tower.y,
                        x2: tower.target.x, y2: tower.target.y,
                        color: isCrit ? '#FFD700' : tower.type.color,
                        width: isCrit ? 4 : 2,
                        startTime: timestamp,
                        duration: isCrit ? 150 : 100
                    });

                    // Crit visual
                    if (isCrit) {
                        cashEffects.push({ x: tower.target.x, y: tower.target.y - 15, text: `CRIT! ${shotDamage}`, alpha: 1, time: 0 });
                        const critDiv = document.createElement('div');
                        critDiv.className = 'cash-effect';
                        critDiv.style.left = `${tower.target.x}px`;
                        critDiv.style.top = `${tower.target.y - 15}px`;
                        critDiv.style.color = '#FFD700';
                        critDiv.textContent = `💥CRIT ${shotDamage}`;
                        document.body.appendChild(critDiv);
                        setTimeout(() => critDiv.remove(), 800);
                    }

                    m.lastBurstShot = timestamp;
                    m.burstRemaining--;

                    // After last burst shot, start reload
                    if (m.burstRemaining <= 0) {
                        m.isReloading = true;
                        m.reloadStartTime = timestamp;
                        tower.lastFired = timestamp;
                    }
                }
            }
        } else {
            // ── SINGLE FIRE (Level 1-2) ──
            if (tower.target && tower.target.hp > 0 && !tower.target.isSummon && isInRange(tower, tower.target) && timestamp - tower.lastFired >= buffedFireRate) {
                let shotDamage = buffedDamage;
                shotDamage = Math.floor(shotDamage * mafiaSelfBuff);

                // ── CRITICAL HIT ──
                let isCrit = false;
                let effectiveCritChance = stats.critChance + m.currentCritChance;
                if (Math.random() < effectiveCritChance) {
                    shotDamage = Math.floor(shotDamage * stats.critMultiplier);
                    isCrit = true;
                }

                const wasAlive = tower.target.hp > 0;
                const hadHighHp = (tower.target.maxHp || 0) >= 10000;

                // Mark that it was hit by mafia
                tower.target._lastHitByMafia = true;
                applyDamage(tower.target, shotDamage, tower.type.damageType || 'piercing');

                if (wasAlive && tower.target.hp <= 0 && hadHighHp) {
                    m.selfMafiaTargetCount += 1; // reward for killing big enemy
                }

                // Projectile visual
                projectiles.push({
                    x1: tower.x, y1: tower.y,
                    x2: tower.target.x, y2: tower.target.y,
                    color: isCrit ? '#FFD700' : tower.type.color,
                    width: isCrit ? 4 : 2,
                    startTime: timestamp,
                    duration: isCrit ? 150 : 100
                });

                if (isCrit) {
                    const critDiv = document.createElement('div');
                    critDiv.className = 'cash-effect';
                    critDiv.style.left = `${tower.target.x}px`;
                    critDiv.style.top = `${tower.target.y - 15}px`;
                    critDiv.style.color = '#FFD700';
                    critDiv.textContent = `💥CRIT ${shotDamage}`;
                    document.body.appendChild(critDiv);
                    setTimeout(() => critDiv.remove(), 800);
                }

                tower.lastFired = timestamp;

                // "Reload" for single-fire: every shot counts as a reload for crit stacking
                m.currentCritChance += stats.critReloadBonus;
                if (m.currentCritChance >= stats.critMaxChance) {
                    m.currentCritChance = 0;
                }
            }
        }

        // ── BOMB PASSIVE (Level 4) ──
        if (stats.hasBomb && timestamp - m.lastBombTime >= stats.bombCooldown) {
            // Find strongest enemy in range with >100k HP
            let strongestEnemy = null;
            let highestHp = 0;
            const towerStats = tower.type.levels[tower.level - 1];
            const towerBuffs = tower.type.cannotBeBuffed ? { rangeBoost: 0 } : getCommanderBuffs(tower);
            const towerRange = (towerStats.range + towerBuffs.rangeBoost + (tower.type.rangeBonus || 0)) * GRID_SIZE;

            for (const enemy of enemies) {
                if (enemy.isSummon || enemy.hp <= 0) continue;
                const totalHp = enemy.hp + (enemy.shield || 0);
                if (totalHp < stats.bombHpThreshold) continue;
                const dist = Math.sqrt((tower.x - enemy.x) ** 2 + (tower.y - enemy.y) ** 2);
                if (dist > towerRange) continue;
                if (totalHp > highestHp) {
                    highestHp = totalHp;
                    strongestEnemy = enemy;
                }
            }

            if (strongestEnemy) {
                m.lastBombTime = timestamp;
                const bombTarget = strongestEnemy;
                const bombX = bombTarget.x;
                const bombY = bombTarget.y;
                const directDamage = stats.bombDamage + Math.floor(bombTarget.maxHp * stats.bombMaxHpPercent);
                const explosionRange = stats.bombExplosionRange * GRID_SIZE;

                // Visual: bomb indicator
                const bombDiv = document.createElement('div');
                bombDiv.className = 'cash-effect';
                bombDiv.style.left = `${bombX}px`;
                bombDiv.style.top = `${bombY - 20}px`;
                bombDiv.style.color = '#FF4444';
                bombDiv.style.fontSize = '14px';
                bombDiv.textContent = `💣 3s...`;
                document.body.appendChild(bombDiv);
                setTimeout(() => bombDiv.remove(), 3000);

                // Detonate after 3s
                setTimeout(() => {
                    // Direct damage to target
                    if (bombTarget.hp > 0 && enemies.includes(bombTarget)) {
                        applyDamage(bombTarget, directDamage, 'explosive');
                    }

                    // Explosion damage to nearby
                    const currentBombX = bombTarget.hp > 0 ? bombTarget.x : bombX;
                    const currentBombY = bombTarget.hp > 0 ? bombTarget.y : bombY;

                    for (const enemy of enemies) {
                        if (enemy.isSummon || enemy === bombTarget) continue;
                        const dist = Math.sqrt((currentBombX - enemy.x) ** 2 + (currentBombY - enemy.y) ** 2);
                        if (dist <= explosionRange) {
                            applyDamage(enemy, stats.bombExplosionDamage, 'explosive');
                        }
                    }

                    // Explosion visual
                    explosions.push({
                        x: currentBombX,
                        y: currentBombY,
                        size: 0,
                        maxSize: explosionRange,
                        startTime: performance.now(),
                        duration: 600
                    });

                    window.triggerShake(8, 300);
                }, stats.bombDetonationTime);
            }
        }

        // ── TARGET ABILITY: decay stacks ──
        if (m.selfMafiaTargetCount > 0) {
            m.targetDecayTimer = m.targetDecayTimer || timestamp;
            if (timestamp - m.targetDecayTimer >= 10000) {
                m.selfMafiaTargetCount = Math.max(0, m.selfMafiaTargetCount - 1);
                m.targetDecayTimer = timestamp;
            }
        }

        // ── TARGET ABILITY: check if targeted enemy died ──
        if (m.targetAbilityEnemy && m.targetAbilityEnemy.hp <= 0) {
            if (m.targetAbilityActive) {
                if (m.targetAbilityEnemy._lastHitByMafia) {
                    // Successfully killed during target window by Mafia — no penalty
                    m.targetAbilityActive = false;
                    m.targetAbilityEnemy = null;
                } else {
                    // Died, but not killed by Mafia — apply penalty
                    const abilityStats = stats.abilities ? stats.abilities.target : null;
                    if (abilityStats) {
                        m.selfMafiaTargetCount = Math.max(0, m.selfMafiaTargetCount - abilityStats.failReduce);
                        m.fireRateDebuffActive = true;
                        m.fireRateDebuffEndTime = timestamp + abilityStats.failDebuffDuration;
                        m.targetAbilityFailed = true;
                    }
                    m.targetAbilityActive = false;
                    m.targetAbilityEnemy = null;
                }
            } else if (m.targetAbilityEnemy && !m.targetAbilityActive) {
                // Enemy died outside active window — ability can be reused now
                m.targetAbilityEnemy = null;
            }
        }

        // ── TARGET ABILITY: active duration expiry (timeout) ──
        if (m.targetAbilityActive && m.targetAbilityEnemy) {
            const abilityStats = stats.abilities ? stats.abilities.target : null;
            if (abilityStats && timestamp > m.targetAbilityStartTime + abilityStats.duration) {
                // Duration expired - no penalty on timeout! Just end active hunting phase.
                m.targetAbilityActive = false;
            }
        }
    }

    // ── UPDATE MAFIA GUNNER SUMMONS (stop to shoot) ──
    update_mafia_gunners(timestamp);
}

// ───────────────────────── MAFIA GUNNER BEHAVIOR ─────────────────────────
function update_mafia_gunners(timestamp) {
    for (const entity of enemies) {
        if (!entity.isSummon || !entity.type.isMafiaGunner) continue;
        if (entity.hp <= 0) continue;

        // Find nearest non-summon enemy in range
        let nearestEnemy = null;
        let nearestDist = Infinity;
        const gunnerRange = (entity.type.range || 5) * GRID_SIZE;

        for (const enemy of enemies) {
            if (enemy.isSummon || enemy.hp <= 0) continue;
            const dist = Math.sqrt((entity.x - enemy.x) ** 2 + (entity.y - enemy.y) ** 2);
            if (dist < nearestDist && dist <= gunnerRange) {
                nearestDist = dist;
                nearestEnemy = enemy;
            }
        }

        if (nearestEnemy) {
            // Stop moving to shoot
            entity._mafiaGunnerStopped = true;

            if (timestamp - (entity.lastFired || 0) >= entity.type.fireRate) {
                nearestEnemy._lastHitByMafia = true;
                applyDamage(nearestEnemy, entity.type.damage, 'piercing');
                entity.lastFired = timestamp;

                // Projectile visual
                projectiles.push({
                    x1: entity.x, y1: entity.y,
                    x2: nearestEnemy.x, y2: nearestEnemy.y,
                    color: entity.type.color,
                    width: 2,
                    startTime: timestamp,
                    duration: 80
                });
            }
        } else {
            entity._mafiaGunnerStopped = false;
        }
    }
}

// ───────────────────────── ABILITY ACTIVATION ─────────────────────────
function activate_mafia_ability(tower, ability_id) {
    if (!tower || !tower.type.isMafia) return;
    if (typeof window.isTowerStunned === 'function' && window.isTowerStunned(tower)) return;
    const stats = tower.type.levels[tower.level - 1];
    if (!stats.abilities || !stats.abilities[ability_id]) return;

    const now = performance.now();
    const m = tower.mafia;
    const abilityStats = stats.abilities[ability_id];

    // ── BOUNTY ──
    if (ability_id === 'bounty') {
        const cooldownKey = 'lastBountyTime';
        if (now - m[cooldownKey] < abilityStats.cooldown) return;

        // Enter targeting mode
        mafia_targeting_active = true;
        mafia_targeting_data = { tower: tower, ability_id: 'bounty' };
        const canvas = document.getElementById('gameCanvas');
        if (canvas) canvas.style.cursor = 'crosshair';

        // Close tower info panel
        const towerInfoPanel = document.getElementById('towerInfoPanel');
        const towerActions = document.getElementById('towerActions');
        if (towerInfoPanel) towerInfoPanel.style.display = 'none';
        if (towerActions) towerActions.style.display = 'none';
        return;
    }

    // ── TARGET ──
    if (ability_id === 'target') {
        const cooldownKey = 'lastTargetTime';
        if (now - m[cooldownKey] < abilityStats.cooldown) return;
        // Can only activate when previous target is dead
        if (m.targetAbilityEnemy && m.targetAbilityEnemy.hp > 0) return;

        mafia_targeting_active = true;
        mafia_targeting_data = { tower: tower, ability_id: 'target' };
        const canvas = document.getElementById('gameCanvas');
        if (canvas) canvas.style.cursor = 'crosshair';

        const towerInfoPanel = document.getElementById('towerInfoPanel');
        const towerActions = document.getElementById('towerActions');
        if (towerInfoPanel) towerInfoPanel.style.display = 'none';
        if (towerActions) towerActions.style.display = 'none';
        return;
    }

    // ── TRAPS ──
    if (ability_id === 'traps') {
        const cooldownKey = 'lastTrapsTime';
        if (now - m[cooldownKey] < abilityStats.cooldown) return;
        // Global cooldown check
        if (now - mafia_global_traps_cooldown < abilityStats.cooldown) return;

        mafia_targeting_active = true;
        mafia_targeting_data = { tower: tower, ability_id: 'traps' };
        const canvas = document.getElementById('gameCanvas');
        if (canvas) canvas.style.cursor = 'crosshair';

        const towerInfoPanel = document.getElementById('towerInfoPanel');
        const towerActions = document.getElementById('towerActions');
        if (towerInfoPanel) towerInfoPanel.style.display = 'none';
        if (towerActions) towerActions.style.display = 'none';
        return;
    }
}

// ───────────────────────── EXECUTE TARGETED ABILITY ─────────────────────────
function execute_mafia_targeted_ability(enemy) {
    if (!mafia_targeting_data || !enemy) return;

    const tower = mafia_targeting_data.tower;
    if (typeof window.isTowerStunned === 'function' && window.isTowerStunned(tower)) {
        mafia_targeting_active = false;
        mafia_targeting_data = null;
        return;
    }
    const ability_id = mafia_targeting_data.ability_id;
    const stats = tower.type.levels[tower.level - 1];
    const abilityStats = stats.abilities[ability_id];
    const m = tower.mafia;
    const now = performance.now();

    if (ability_id === 'bounty') {
        const baseHp = enemy.maxHp || enemy.hp || 0;
        const reward = Math.min(Math.floor(baseHp * abilityStats.hpPercent), abilityStats.maxCash);

        // Mark enemy with bounty — cash is paid on kill, not now
        enemy._mafiaBounty = true;
        enemy._mafiaBountyReward = reward;

        m.lastBountyTime = now;

        // Floating bounty marker above enemy
        const div = document.createElement('div');
        div.className = 'cash-effect';
        div.style.cssText = `position:fixed;left:${enemy.x}px;top:${enemy.y - 28}px;color:#FFD700;font-size:16px;font-weight:bold;pointer-events:none;z-index:9999;`;
        div.textContent = `🎯 BOUNTY ($${reward})`;
        document.body.appendChild(div);
        setTimeout(() => div.remove(), 2000);
    }

    if (ability_id === 'target') {
        m.lastTargetTime = now;
        m.targetAbilityActive = true;
        m.targetAbilityStartTime = now;
        m.targetAbilityEnemy = enemy;
        m.targetAbilityFailed = false;

        // Apply damage bonus to target from mafias
        enemy._mafiaTargetDamageBonus = abilityStats.damageBonus;

        // Visual
        const div = document.createElement('div');
        div.className = 'cash-effect';
        div.style.left = `${enemy.x}px`;
        div.style.top = `${enemy.y - 20}px`;
        div.style.color = '#FF4444';
        div.style.fontSize = '12px';
        div.textContent = `🎯 TARGETED`;
        document.body.appendChild(div);
        setTimeout(() => div.remove(), 1500);
    }

    if (ability_id === 'traps') {
        m.lastTrapsTime = now;
        mafia_global_traps_cooldown = now; // global cooldown affects all mafias

        // Apply speed debuff
        const originalSpeed = enemy.speed;
        enemy.speed *= (1 - abilityStats.speedDebuff);
        enemy._mafiaTrapActive = true;
        enemy._mafiaTrapEndTime = now + abilityStats.duration;

        // Restore speed after duration
        setTimeout(() => {
            if (enemy.hp > 0 && enemies.includes(enemy)) {
                enemy.speed = originalSpeed;
                enemy._mafiaTrapActive = false;
            }
        }, abilityStats.duration);

        // Visual
        const div = document.createElement('div');
        div.className = 'cash-effect';
        div.style.left = `${enemy.x}px`;
        div.style.top = `${enemy.y - 20}px`;
        div.style.color = '#8844FF';
        div.style.fontSize = '12px';
        div.textContent = `🪤 TRAPPED -25% SPD`;
        document.body.appendChild(div);
        setTimeout(() => div.remove(), 1500);
    }

    // Clear targeting mode
    mafia_targeting_active = false;
    mafia_targeting_data = null;
    const canvas = document.getElementById('gameCanvas');
    if (canvas) canvas.style.cursor = 'default';

    // Re-select tower and show panel to make it feel fluid
    window.selectedCell = { x: Math.floor(tower.x / window.GRID_SIZE), y: Math.floor(tower.y / window.GRID_SIZE) };
    if (typeof updateTowerSelection === 'function') updateTowerSelection();
    if (typeof showTowerInfo === 'function') showTowerInfo(tower);
    window.currentInfoTower = tower;
}

// ───────────────────────── TOWER INFO HTML ─────────────────────────
function get_mafia_info_html(tower) {
    const stats = tower.type.levels[tower.level - 1];
    const m = tower.mafia || {};
    const buffs = tower.type.cannotBeBuffed ? { rangeBoost: 0, fireRateBoost: 0, damageBoost: 0 } : getCommanderBuffs(tower);
    const buffedDamage = Math.floor(stats.damage * (1 + buffs.damageBoost));
    const buffedRange = stats.range + buffs.rangeBoost;
    let buffedFireRate = stats.fireRate * (1 - buffs.fireRateBoost);
    if (m.fireRateDebuffActive && performance.now() < m.fireRateDebuffEndTime) {
        buffedFireRate *= 1.20;
    }

    let html = '';

    // ── Combat Stats ──
    if (stats.burstCount > 0) {
        const burstDps = ((buffedDamage * stats.burstCount) / ((stats.burstCount * buffedFireRate + stats.reloadTime) / 1000)).toFixed(1);
        html += `
            <div class="info-row"><div class="info-label">Damage</div><div class="info-value">${buffedDamage} × ${stats.burstCount} burst</div></div>
            <div class="info-row"><div class="info-label">Burst Rate</div><div class="info-value">${(buffedFireRate / 1000).toFixed(2)}s</div></div>
            <div class="info-row"><div class="info-label">Reload</div><div class="info-value">${(stats.reloadTime / 1000).toFixed(1)}s</div></div>
            <div class="info-row"><div class="info-label">Range</div><div class="info-value">${buffedRange} tiles</div></div>
            <div class="info-row"><div class="info-label" style="color:#FF1744;">DPS</div><div class="info-value" style="color:#FF1744;">${burstDps}/s</div></div>
        `;
    } else {
        const dps = ((buffedDamage / buffedFireRate) * 1000).toFixed(1);
        html += `
            <div class="info-row"><div class="info-label">Damage</div><div class="info-value">${buffedDamage}${buffs.damageBoost > 0 ? ` (+${Math.floor(stats.damage * buffs.damageBoost)})` : ''}</div></div>
            <div class="info-row"><div class="info-label">Fire Rate</div><div class="info-value">${(buffedFireRate / 1000).toFixed(2)}s</div></div>
            <div class="info-row"><div class="info-label">Range</div><div class="info-value">${buffedRange} tiles</div></div>
            <div class="info-row"><div class="info-label" style="color:#FF1744;">DPS</div><div class="info-value" style="color:#FF1744;">${dps}/s</div></div>
        `;
    }

    // ── Separator ──
    html += `<div style="height:1px;background:rgba(255,255,255,0.1);margin:6px 0;"></div>`;

    // ── Passives ──
    html += `<div class="info-row"><div class="info-label" style="color:#FFD700;font-weight:bold;">⚡ Passives</div></div>`;

    // Crit
    const effectiveCrit = (stats.critChance + (m.currentCritChance || 0)) * 100;
    let critExtra = '';
    if (stats.critPerMafiaTarget && m.selfMafiaTargetCount > 0) {
        critExtra = ` (+${(m.selfMafiaTargetCount * stats.critPerMafiaTarget * 100).toFixed(0)}% from targets)`;
    }
    html += `<div class="info-row" style="margin-left:8px;"><div class="info-label">Critical Hit</div><div class="info-value">${effectiveCrit.toFixed(0)}% chance, x${stats.critMultiplier} dmg${critExtra}</div></div>`;
    html += `<div class="info-row" style="margin-left:8px;font-size:10px;color:#888;"><div class="info-value">+${(stats.critReloadBonus * 100).toFixed(0)}%/reload, max ${(stats.critMaxChance * 100).toFixed(0)}% (resets)</div></div>`;

    // Mafia Target
    if (stats.hasMafiaTarget) {
        html += `<div class="info-row" style="margin-left:8px;"><div class="info-label" style="color:#FF4444;">Mafia Target</div><div class="info-value">Self: ${m.selfMafiaTargetCount || 0} stacks (+${((m.selfMafiaTargetCount || 0) * 5)}% dmg)</div></div>`;
        html += `<div class="info-row" style="margin-left:8px;font-size:10px;color:#888;"><div class="info-value">Enemies >50k HP gain +1 target/shot (+1% vuln each)</div></div>`;
    }

    // Reload cash
    if (stats.reloadCash > 0) {
        html += `<div class="info-row" style="margin-left:8px;"><div class="info-label" style="color:#32CD32;">💰 Reload Cash</div><div class="info-value">+$${stats.reloadCash}/reload</div></div>`;
    }

    // Bomb
    if (stats.hasBomb) {
        const bombCdRemain = Math.max(0, (stats.bombCooldown - (performance.now() - (m.lastBombTime || 0))) / 1000);
        html += `<div class="info-row" style="margin-left:8px;"><div class="info-label" style="color:#FF6600;">💣 Bomb</div><div class="info-value">${stats.bombDamage}+2% maxHP (>100k HP enemies)${bombCdRemain > 0 ? ` [${bombCdRemain.toFixed(1)}s]` : ' [Ready]'}</div></div>`;
    }

    // Firerate debuff indicator
    if (m.fireRateDebuffActive && performance.now() < m.fireRateDebuffEndTime) {
        const remain = ((m.fireRateDebuffEndTime - performance.now()) / 1000).toFixed(1);
        html += `<div class="info-row" style="margin-left:8px;"><div class="info-value" style="color:#FF4444;">⚠️ -20% Firerate Debuff (${remain}s)</div></div>`;
    }

    // ── Summons ──
    if (stats.summons) {
        html += `<div style="height:1px;background:rgba(255,255,255,0.1);margin:6px 0;"></div>`;
        html += `<div class="info-row"><div class="info-label" style="color:#00ff88;font-weight:bold;">📦 Summons</div></div>`;
        stats.summons.forEach(summon => {
            const sType = SUMMON_TYPES[summon.type];
            if (!sType) return;
            const dps = sType.damage && sType.fireRate ? Math.floor(sType.damage / (sType.fireRate / 1000)) : 0;
            html += `
                <div class="info-row" style="margin-left:8px;padding:4px 0;border-left:2px solid ${sType.color};padding-left:8px;">
                    <div style="display:flex;justify-content:space-between;align-items:center;width:100%;">
                        <span style="color:${sType.color};font-weight:bold;">${sType.name}</span>
                        <span style="color:#aaa;font-size:11px;">${summon.spawnRate / 1000}s</span>
                    </div>
                    <div style="display:flex;justify-content:space-between;font-size:10px;color:#888;margin-top:2px;">
                        <span>❤️ ${sType.hp.toLocaleString()} HP</span>
                        <span>⚔️ ${dps} DPS</span>
                    </div>
                </div>
            `;
        });
    }

    return html;
}

// ───────────────────────── ENTITY STAT INSPECTOR ─────────────────────────
function show_entity_stats_panel(entity, isUpdate = false) {
    if (!entity) return;

    // Reuse the tower info panel
    window.currentSelectedTower = null; // Clear tower selection
    currentInfoTower = null;

    const isEnemy = !entity.isSummon;
    const typeName = entity.type.name || 'Unknown';
    const color = entity.type.color || '#fff';

    let html = `
        <div class="info-row">
            <div class="info-label">Name</div>
            <div class="info-value" style="color:${color};font-weight:bold;">${typeName}</div>
        </div>
    `;

    // HP
    const hpPercent = entity.maxHp > 0 ? ((entity.hp / entity.maxHp) * 100).toFixed(1) : 0;
    html += `
        <div class="info-row">
            <div class="info-label">❤️ HP</div>
            <div class="info-value">${Math.floor(entity.hp).toLocaleString()} / ${entity.maxHp.toLocaleString()} (${hpPercent}%)</div>
        </div>
    `;

    // Shield
    if (entity.hasShield || entity.maxShield > 0) {
        html += `
            <div class="info-row">
                <div class="info-label">🛡️ Shield</div>
                <div class="info-value">${Math.floor(entity.shield || 0).toLocaleString()} / ${(entity.maxShield || 0).toLocaleString()}</div>
            </div>
        `;
    }

    // Speed
    html += `
        <div class="info-row">
            <div class="info-label">🏃 Speed</div>
            <div class="info-value">${entity.speed}</div>
        </div>
    `;

    // Size
    html += `
        <div class="info-row">
            <div class="info-label">📐 Size</div>
            <div class="info-value">${entity.size || entity.type.size}</div>
        </div>
    `;

    // Type info
    html += `
        <div class="info-row">
            <div class="info-label">Type</div>
            <div class="info-value">${entity.isSummon ? '🟢 Summon (Ally)' : '🔴 Enemy'}</div>
        </div>
    `;

    // Resistances
    const resistances = entity.type?.resistances || entity.resistance;
    if (resistances) {
        html += `<div style="height:1px;background:rgba(255,255,255,0.1);margin:6px 0;"></div>`;
        html += `<div class="info-row"><div class="info-label" style="color:#4488FF;font-weight:bold;">🛡️ Resistances</div></div>`;
        if (resistances.global) html += `<div class="info-row" style="margin-left:8px;"><div class="info-label">Global</div><div class="info-value">${(resistances.global * 100).toFixed(0)}%</div></div>`;
        if (resistances.bullet) html += `<div class="info-row" style="margin-left:8px;"><div class="info-label">Bullet</div><div class="info-value">${(resistances.bullet * 100).toFixed(0)}%</div></div>`;
        if (resistances.piercing) html += `<div class="info-row" style="margin-left:8px;"><div class="info-label">Piercing</div><div class="info-value">${(resistances.piercing * 100).toFixed(0)}%</div></div>`;
        if (resistances.explosive) html += `<div class="info-row" style="margin-left:8px;"><div class="info-label">Explosive</div><div class="info-value">${(resistances.explosive * 100).toFixed(0)}%</div></div>`;
        if (resistances.laser) html += `<div class="info-row" style="margin-left:8px;"><div class="info-label">Laser</div><div class="info-value">${(resistances.laser * 100).toFixed(0)}%</div></div>`;
    }

    // ── Status Effects ──
    html += `<div style="height:1px;background:rgba(255,255,255,0.1);margin:6px 0;"></div>`;
    html += `<div class="info-row"><div class="info-label" style="color:#FF88FF;font-weight:bold;">✨ Status Effects</div></div>`;

    let hasStatus = false;

    // Mafia target count (passive stacking, set by update_mafia_towers)
    if (entity.mafiaTargetCount > 0) {
        const isMax = entity.mafiaTargetCount >= 20 ? ' (MAX)' : '';
        html += `<div class="info-row" style="margin-left:8px;"><div class="info-label" style="color:#FF4444;">🎯 Mafia Target</div><div class="info-value">${entity.mafiaTargetCount} stacks${isMax} (+${entity.mafiaTargetCount}% vuln)</div></div>`;
        hasStatus = true;
    }

    // Mafia target damage bonus
    if (entity._mafiaTargetDamageBonus) {
        html += `<div class="info-row" style="margin-left:8px;"><div class="info-label" style="color:#FF6666;">🎯 Marked</div><div class="info-value">+${(entity._mafiaTargetDamageBonus * 100).toFixed(0)}% dmg from Mafias</div></div>`;
        hasStatus = true;
    }

    // Mafia trap
    if (entity._mafiaTrapActive) {
        const remain = Math.max(0, ((entity._mafiaTrapEndTime || 0) - performance.now()) / 1000).toFixed(1);
        html += `<div class="info-row" style="margin-left:8px;"><div class="info-label" style="color:#8844FF;">🪤 Trapped</div><div class="info-value">-25% speed (${remain}s)</div></div>`;
        hasStatus = true;
    }

    // Drone sight
    if (entity.hasDroneSight) {
        html += `<div class="info-row" style="margin-left:8px;"><div class="info-label" style="color:#00FA9A;">👁️ Drone Sight</div><div class="info-value">+10% damage taken</div></div>`;
        hasStatus = true;
    }

    // Mafia bounty (mark-on-click, reward on kill)
    if (entity._mafiaBounty) {
        html += `<div class="info-row" style="margin-left:8px;"><div class="info-label" style="color:#FFD700;">💰 Bounty</div><div class="info-value">Kill for $${entity._mafiaBountyReward || 0}</div></div>`;
        hasStatus = true;
    }

    // Drone bounty
    if (entity.isDroneBounty) {
        html += `<div class="info-row" style="margin-left:8px;"><div class="info-label" style="color:#FFD700;">💰 Drone Bounty</div><div class="info-value">Kill for bonus</div></div>`;
        hasStatus = true;
    }

    if (!hasStatus) {
        html += `<div class="info-row" style="margin-left:8px;"><div class="info-value" style="color:#666;">None</div></div>`;
    }

    // ── Attack Stats (for summons) ──
    if (entity.isSummon && entity.type.damage && entity.type.fireRate) {
        html += `<div style="height:1px;background:rgba(255,255,255,0.1);margin:6px 0;"></div>`;
        html += `<div class="info-row"><div class="info-label" style="color:#FF8800;font-weight:bold;">⚔️ Attack Stats</div></div>`;
        const dps = Math.floor(entity.type.damage / (entity.type.fireRate / 1000));
        html += `<div class="info-row" style="margin-left:8px;"><div class="info-label">Damage</div><div class="info-value">${entity.type.damage}</div></div>`;
        html += `<div class="info-row" style="margin-left:8px;"><div class="info-label">Fire Rate</div><div class="info-value">${(entity.type.fireRate / 1000).toFixed(2)}s</div></div>`;
        html += `<div class="info-row" style="margin-left:8px;"><div class="info-label">DPS</div><div class="info-value">${dps}/s</div></div>`;
        if (entity.type.range) html += `<div class="info-row" style="margin-left:8px;"><div class="info-label">Range</div><div class="info-value">${entity.type.range} tiles</div></div>`;
    }

    // Multi-weapon summons
    if (entity.isSummon && entity.type.minigunDamage) {
        html += `<div style="height:1px;background:rgba(255,255,255,0.1);margin:6px 0;"></div>`;
        html += `<div class="info-row"><div class="info-label" style="color:#FF8800;font-weight:bold;">⚔️ Weapons</div></div>`;
        const mgDps = Math.floor(entity.type.minigunDamage / (entity.type.minigunFireRate / 1000));
        html += `<div class="info-row" style="margin-left:8px;"><div class="info-label">Minigun</div><div class="info-value">${mgDps} DPS</div></div>`;
        if (entity.type.railgunDamage) {
            html += `<div class="info-row" style="margin-left:8px;"><div class="info-label">Railgun</div><div class="info-value">${entity.type.railgunDamage} dmg</div></div>`;
        }
        if (entity.type.missileDamage) {
            html += `<div class="info-row" style="margin-left:8px;"><div class="info-label">Missiles</div><div class="info-value">${entity.type.missileDamage} × ${entity.type.missileCount || 1}</div></div>`;
        }
    }

    // Distance traveled
    if (entity.distanceTraveled !== undefined) {
        html += `<div style="height:1px;background:rgba(255,255,255,0.1);margin:6px 0;"></div>`;
        html += `<div class="info-row"><div class="info-label">📏 Distance</div><div class="info-value">${Math.floor(entity.distanceTraveled)} px</div></div>`;
    }

    const towerInfoContent = document.getElementById('towerInfoContent');
    if (towerInfoContent) towerInfoContent.innerHTML = html;

    // Hide tower action buttons (this is an entity, not a tower)
    const upgradeTowerBtn = document.getElementById('upgradeTowerBtn');
    const sellTowerBtn = document.getElementById('sellTowerBtn');
    const abilityTowerBtn = document.getElementById('abilityTowerBtn');
    const ability2TowerBtn = document.getElementById('ability2TowerBtn');

    if (upgradeTowerBtn) upgradeTowerBtn.style.display = 'none';
    if (sellTowerBtn) sellTowerBtn.style.display = 'none';
    if (abilityTowerBtn) abilityTowerBtn.style.display = 'none';
    if (ability2TowerBtn) ability2TowerBtn.style.display = 'none';
    const trapsBtn = document.getElementById('mafiaTrapsBtn');
    if (trapsBtn) trapsBtn.style.display = 'none';

    // Show panel
    const towerInfoPanel = document.getElementById('towerInfoPanel');
    const towerActions = document.getElementById('towerActions');
    towerInfoPanel.style.display = 'flex';
    if (!isUpdate) {
        towerInfoPanel.classList.add('panel-hidden');
        void towerInfoPanel.offsetWidth;
        towerInfoPanel.classList.remove('panel-hidden');
    }
    towerActions.style.display = 'block';

    // Store ref for periodic update
    window._inspectedEntity = entity;
}

let lastEntityInfoUpdate = 0;
// Periodically update the entity stats panel if open
function update_entity_stats_panel(timestamp) {
    if (!window._inspectedEntity) return;
    const entity = window._inspectedEntity;

    // If entity died or removed, close panel
    if (entity.hp <= 0 || !enemies.includes(entity)) {
        const towerInfoPanel = document.getElementById('towerInfoPanel');
        const towerActions = document.getElementById('towerActions');
        if (towerInfoPanel) towerInfoPanel.style.display = 'none';
        if (towerActions) towerActions.style.display = 'none';
        window._inspectedEntity = null;
        return;
    }

    if (!timestamp || timestamp - lastEntityInfoUpdate > 500) {
        lastEntityInfoUpdate = timestamp || performance.now();
        // Refresh the HTML (skip animation)
        show_entity_stats_panel(entity, true);
    }
}
