// Tower Types Configuration
// All tower stats are defined here for easy modification

const TOWER_TYPES = {
    GUNNER: {
        name: 'Gunner',
        color: 'yellow',
        cost: 100,
        damageType: 'bullet',
        aoe: false,
        summons: false,
        levels: [
            { damage: 1, fireRate: 500, range: 3, upgradeCost: 0 },
            { damage: 2, fireRate: 450, range: 3, upgradeCost: 75 },
            { damage: 5, fireRate: 400, range: 4, upgradeCost: 200 },
            { damage: 8, fireRate: 350, range: 4, upgradeCost: 350 }
        ]
    },

    Operator: {
        name: 'Operator',
        color: 'gray',
        cost: 250,
        damageType: 'bullet',
        aoe: false,
        summons: false,
        levels: [
            { damage: 2, fireRate: 1750, range: 4, burstcount: 3, burstfirerate: 250, upgradeCost: 0 },
            { damage: 4, fireRate: 1600, range: 5, burstcount: 5, burstfirerate: 250, upgradeCost: 200 },
            { damage: 6, fireRate: 1500, range: 6, burstcount: 6, burstfirerate: 150, upgradeCost: 500 },
            { damage: 10, fireRate: 1250, range: 7, burstcount: 8, burstfirerate: 125, upgradeCost: 800 }
        ]
    },

    SNIPER: {
        name: 'Sniper',
        color: 'red',
        cost: 350,
        damageType: 'piercing',
        aoe: false,
        summons: false,
        levels: [
            { damage: 10, fireRate: 3000, range: 8, upgradeCost: 0 },
            { damage: 35, fireRate: 2800, range: 9, upgradeCost: 300 },
            { damage: 75, fireRate: 2500, range: 10, upgradeCost: 500 },
            { damage: 125, fireRate: 2000, range: 12, upgradeCost: 800 }
        ]
    },

    ROCKETER: {
        name: 'Rocketer',
        color: 'orange',
        cost: 650,
        damageType: 'explosive',
        aoe: true,
        summons: false,
        levels: [
            { damage: 10, directDamage: 25, fireRate: 2500, range: 4, upgradeCost: 0 },
            { damage: 25, directDamage: 50, fireRate: 2500, range: 4, upgradeCost: 350 },
            { damage: 40, directDamage: 80, fireRate: 2000, range: 5, upgradeCost: 800 },
            { damage: 60, directDamage: 120, fireRate: 2000, range: 6, upgradeCost: 1500 }
        ]
    },

    RAYGUNNER: {
        name: 'Raygunner',
        color: 'purple',
        cost: 2000,
        damageType: 'laser',
        aoe: false,
        summons: false,
        levels: [
            { damage: 4, fireRate: 100, range: 4, upgradeCost: 0 },
            { damage: 6, fireRate: 90, range: 6, upgradeCost: 750 },
            { damage: 10, fireRate: 80, range: 7, upgradeCost: 2000 },
            { damage: 15, fireRate: 40, range: 8, upgradeCost: 5000 }
        ]
    },

    SUMMONER: {
        name: 'Summoner',
        color: 'green',
        cost: 6000,
        aoe: false,
        summons: true,
        limit: 2,
        levels: [
            { summons: [{ type: 'RED', spawnRate: 10000 }], upgradeCost: 0 },
            { summons: [{ type: 'RED', spawnRate: 10000 }, { type: 'YELLOW', spawnRate: 6000 }], upgradeCost: 1000 },
            { summons: [{ type: 'RED', spawnRate: 10000 }, { type: 'YELLOW', spawnRate: 6000 }, { type: 'GRAY', spawnRate: 15000 }], upgradeCost: 2500 },
            { summons: [{ type: 'RED_L4', spawnRate: 9000 }, { type: 'YELLOW_L4', spawnRate: 9000 }, { type: 'GRAY_L4', spawnRate: 9000 }, { type: 'DARK_RED', spawnRate: 18000 }], upgradeCost: 6250 },
            { summons: [{ type: 'DARK_RED_L5', spawnRate: 20000 }, { type: 'CYAN', spawnRate: 40000 }], upgradeCost: 15000 }
        ]
    },

    FARM: {
        name: 'Farm',
        color: '#006400',
        cost: 500,
        aoe: false,
        summons: false,
        farm: true,
        levels: [
            { cashPerWave: 200, upgradeCost: 0 },
            { cashPerWave: 500, upgradeCost: 1000 },
            { cashPerWave: 2000, upgradeCost: 4000 },
            { cashPerWave: 5000, upgradeCost: 10000 }
        ]
    },

    RAILGUNNER: {
        name: 'Railgunner',
        color: '#00B7EB',
        cost: 2500,
        damageType: 'piercing',
        aoe: false,
        summons: false,
        levels: [
            { damage: 100, fireRate: 3500, range: 5, upgradeCost: 0 },
            { damage: 250, fireRate: 3200, range: 7, upgradeCost: 1000 },
            { damage: 600, fireRate: 3000, range: 9, upgradeCost: 3000 },
            { damage: 1000, fireRate: 3500, range: 12, upgradeCost: 5000 }
        ]
    },

    ELITE_SPAWNER: {
        name: 'Elite Spawner',
        color: '#FFD700',
        cost: 25000,
        aoe: false,
        summons: true,
        size: 2,
        footprint: { width: 2, height: 2 },
        limit: 1,
        abilityCooldown: 120000,
        levels: [
            { summons: [{ type: 'BLUE_SQUARE', spawnRate: 10000 }], upgradeCost: 0 },
            { summons: [{ type: 'BLUE_SQUARE_L2', spawnRate: 12000 }, { type: 'PINK_SQUARE', spawnRate: 12000 }], upgradeCost: 5000 },
            { summons: [{ type: 'BLUE_SQUARE_L3', spawnRate: 12000 }, { type: 'PINK_SQUARE_L3', spawnRate: 12000 }, { type: 'ORANGE_SQUARE', spawnRate: 12000 }], upgradeCost: 20000 },
            { summons: [{ type: 'BLUE_SQUARE_L4', spawnRate: 15000 }, { type: 'PINK_SQUARE_L4', spawnRate: 15000 }, { type: 'ORANGE_SQUARE_L4', spawnRate: 15000 }, { type: 'DARK_BLUE_SQUARE', spawnRate: 15000 }], upgradeCost: 40000 },
            { summons: [{ type: 'GREEN_SQUARE', spawnRate: 20000 }, { type: 'PINK_SQUARE_L5', spawnRate: 20000 }, { type: 'DARK_BLUE_SQUARE_L5', spawnRate: 20000 }], upgradeCost: 100000 }
        ]
    },

    COMMANDER: {
        name: 'Commander',
        color: '#4169E1',
        cost: 1200,
        limit: 4,
        aoe: false,
        summons: false,
        support: true,
        levels: [
            { rangeBoost: 0.5, fireRateBoost: 0.05, damageBoost: 0.05, range: 3, upgradeCost: 0 },
            { rangeBoost: 1, fireRateBoost: 0.1, damageBoost: 0.1, range: 4, upgradeCost: 800 },
            { rangeBoost: 1.5, fireRateBoost: 0.15, damageBoost: 0.15, range: 5, upgradeCost: 1500 },
            { rangeBoost: 2, fireRateBoost: 0.2, damageBoost: 0.2, range: 6, upgradeCost: 3000 },
            { rangeBoost: 3, fireRateBoost: 0.25, damageBoost: 0.3, range: 7, upgradeCost: 6000 }
        ]
    },

    AGENT: {
        name: 'Agent',
        color: '#2F4F4F',
        cost: 500,
        aoe: false,
        summons: false,
        isAgent: true,
        levels: [
            {
                upgradeCost: 0,
                abilities: {
                    stun: { duration: 1000, cooldown: 10000, targeted: true },
                    slowdown: { amount: 0.10, duration: 3000, cooldown: 10000, targeted: true }
                }
            },
            {
                upgradeCost: 2000,
                abilities: {
                    stun: { duration: 2000, cooldown: 10000, targeted: true },
                    slowdown: { amount: 0.15, duration: 4000, cooldown: 10000, targeted: true },
                    index: { cashBonus: 50, damageVulnerability: 0.05, cooldown: 20000, potencyGain: 0, targeted: true }
                }
            },
            {
                upgradeCost: 4000,
                potencyCap: 10,
                abilities: {
                    stun: { duration: 3000, cooldown: 10000, targeted: true },
                    slowdown: { amount: 0.20, duration: 5000, cooldown: 10000, targeted: true },
                    index: { cashBonus: 150, damageVulnerability: 0.10, cooldown: 15000, potencyGain: 1, targeted: true },
                    hijack: { duration: 5000, cooldown: 30000, mode: 'necromancer' },
                    sweeper: { durationWaves: 2, hpPercent: 0.05, affectsHpBarOnlyFalse: true, affectsShield: false, potencyCost: 5, cooldown: 80000 }
                }
            },
            {
                upgradeCost: 12000,
                potencyCap: 10,
                abilities: {
                    stun: { duration: 5000, cooldown: 10000, targeted: true },
                    slowdown: { amount: 0.25, duration: 6000, cooldown: 10000, targeted: true },
                    index: { cashBonus: 250, damageVulnerability: 0.15, cooldown: 15000, potencyGain: 2, targeted: true },
                    hijack: { duration: 5000, cooldown: 30000, mode: 'all' },
                    sweeper: { durationWaves: 3, hpPercent: 0.10, affectsHpBarOnlyFalse: true, affectsShield: true, potencyCost: 8, cooldown: 60000 },
                    shieldBreaker: { shieldDamage: 250000, potencyCost: 4, cooldown: 30000 },
                    paralyzer: { stunDuration: 1000, slowAmount: 0.70, slowDuration: 2000, resistanceDebuff: 0.10, duration: 2000, potencyCost: 6, cooldown: 45000, targeted: true }
                }
            }
        ]
    },

    COMMANDO: {
        name: 'Commando',
        color: '#6B8E23',
        cost: 2500,
        limit: 6,
        damageType: 'bullet',
        aoe: false,
        summons: false,
        isCommando: true,
        levels: [
            { damage: 20, fireRate: 1000, range: 4, upgradeCost: 0 },
            { damage: 25, fireRate: 800, range: 5, rocketDamage: 50, rocketFireRate: 2000, rocketAOE: 1, upgradeCost: 700 },
            { damage: 40, fireRate: 650, range: 5, rocketDamage: 75, rocketFireRate: 2000, rocketAOE: 1, upgradeCost: 1600 },
            { damage: 50, fireRate: 500, range: 7, rocketDamage: 125, rocketFireRate: 2000, rocketAOE: 2, upgradeCost: 3000 },
            {
                damage: 250,
                fireRate: 400,
                range: 8,
                primaryDamageType: 'piercing',
                rocketDamage: 300,
                rocketFireRate: 2000,
                rocketAOE: 2,
                taserDamage: 1000,
                taserFireRate: 30000,
                taserStun: 2500,
                taserSlow: 0.25,
                taserSlowDuration: 4000,
                goldenDuration: 15000,
                goldenActivationCost: 1000,
                goldenDamageMultiplier: 2,
                goldenPrimaryFireRate: 250,
                goldenRocketFireRate: 1000,
                goldenTaserFireRate: 25000,
                goldenCashDrainDuration: 10000,
                goldenShotCost: 25,
                goldenRocketShotCost: 50,
                goldenTaserShotCost: 200,
                abilityCooldown: 60000,
                upgradeCost: 6000
            }
        ]
    },

    LUNAR_CUBE: {
        name: 'Lunar Cube',
        color: '#B0C4DE',
        cost: 10000,
        limit: 4,
        damageType: 'bullet',
        aoe: false,
        summons: false,
        isLunarCube: true,
        cannotBeBuffed: true,
        levels: [
            { damage: 20, fireRate: 200, range: 7, laserDamage: 200, laserFireRate: 4000, upgradeCost: 0 },
            { damage: 25, fireRate: 100, range: 8, laserDamage: 500, laserFireRate: 4000, upgradeCost: 5000 },
            { damage: 40, fireRate: 100, range: 10, laserDamage: 750, laserFireRate: 3000, explosiveDamage: 100, explosiveCount: 10, explosiveBurstRate: 75, explosiveFireRate: 12000, explosiveAOE: 1, upgradeCost: 15000 },
            { damage: 75, fireRate: 100, range: 12, laserDamage: 1500, laserFireRate: 3000, explosiveDamage: 200, explosiveCount: 10, explosiveBurstRate: 65, explosiveFireRate: 12000, explosiveAOE: 1, adaptiveMainGun: true, adaptiveResistanceThreshold: 0.3, upgradeCost: 40000 },
            { damage: 100, fireRate: 50, range: 14, laserDamage: 4000, laserFireRate: 4000, explosiveDamage: 250, explosiveCount: 20, explosiveBurstRate: 65, explosiveFireRate: 10000, explosiveAOE: 1, globalExplosionDamage: 5000, globalExplosionAOE: 4, globalExplosionFireRate: 20000, omegaDamage: 20000, omegaChargeTime: 2000, omegaFireRate: 40000, omegaLaserRequirement: 5, adaptiveMainGun: true, adaptiveResistanceThreshold: 0.3, upgradeCost: 100000 }
        ]
    },

    EXECUTIVE: {
        name: 'Executive',
        color: '#DC143C',
        cost: 3500,
        damageType: 'piercing',
        aoe: false,
        summons: true,
        isHybrid: true,
        hasAbility: true,
        limit: 1,
        abilityCost: 14000,
        abilityCooldown: 30000,
        levels: [
            { damage: 20, fireRate: 2000, range: 2, upgradeCost: 0 },
            { damage: 30, fireRate: 1000, range: 3, upgradeCost: 800 },
            { damage: 50, fireRate: 500, range: 4, upgradeCost: 3000, summons: [{ type: 'ELITE_OPERATOR', spawnRate: 12000, count: 2 }] },
            { damage: 45, fireRate: 100, range: 5, upgradeCost: 12000, summons: [{ type: 'ELITE_OPERATOR', spawnRate: 20000, count: 2 }, { type: 'EXEC_TANK', spawnRate: 50000, count: 1 }] },
            { damage: 85, fireRate: 100, range: 7, upgradeCost: 50000, hasOrbitalStrike: true, summons: [{ type: 'ELITE_OPERATOR_L5', spawnRate: 30000, count: 3 }, { type: 'EXEC_TANK', spawnRate: 60000, count: 1 }, { type: 'EXEC_ARTILLERY', spawnRate: 80000, count: 1 }] }
        ]
    },


    CHARGER: {
        name: 'Charger',
        color: 'cyan',
        cost: 20000,
        damageType: 'laser',
        aoe: false,
        summons: false,
        limit: 8,
        isCharger: true,
        targetCooldown: 3500,
        levels: [
            { damageMin: 10, damageMax: 20, fireRate: 200, range: 6, upgradeCost: 0 },
            { damageMin: 25, damageMax: 35, fireRate: 150, range: 7, upgradeCost: 5000 },
            { damageMin: 70, damageMax: 100, fireRate: 100, range: 8, upgradeCost: 15000 },
            { damageMin: 75, damageMax: 100, chargeMaxMin: 250, chargeMaxMax: 300, chargeRate: 2, chargeInterval: 200, fireRate: 100, range: 8, upgradeCost: 30000, cannotBeBuffed: true },
            { damageMin: 100, damageMax: 200, chargeMaxMin: 450, chargeMaxMax: 500, chargeRate: 5, chargeInterval: 250, fireRate: 100, range: 12, upgradeCost: 100000, cannotBeBuffed: true }
        ]
    },

    CUBE_FACTORY: {
        name: 'Cube Factory',
        color: '#17a92c64',
        cost: 50000,
        aoe: false,
        summons: true,
        limit: 1,
        maxActiveSummons: 3,
        size: 3,
        footprint: { width: 3, height: 3 },
        globalSpawnCooldown: 10000,
        cooldownReductionOnUpgrade: 10000,
        levels: [
            { summons: [{ type: 'FACTORY_CUBE_L1', spawnRate: 50000 }], upgradeCost: 0 },
            { summons: [{ type: 'FACTORY_CUBE_L2', spawnRate: 50000 }], upgradeCost: 75000 },
            { summons: [{ type: 'FACTORY_CUBE_L3', spawnRate: 60000 }], upgradeCost: 175000 }
        ]
    },

    GUNNER_PARAGON: {
        name: 'Gunner Paragon',
        color: '#FF00FF',
        cost: 100000,
        damageType: 'piercing',
        aoe: false,
        summons: false,
        size: 2,
        footprint: { width: 2, height: 2 },
        limit: 1,
        isParagon: true,
        cannotBeBuffed: true,
        rangeBonus: 2,
        hasAlpha: true,
        alphaCost: 50000,
        alphaCooldown: 60000,
        hasBeta: true,
        betaCost: 10000,
        betaCooldown: 180000,
        levels: [
            {
                damage: 100,
                fireRate: 100,
                range: 5,
                radian: 1,
                baseHp: 250,
                alphaMultiplier: 10,
                upgradeCost: 0
            },
            {
                damage: 175,
                fireRate: 80,
                range: 8,
                radian: 2,
                baseHp: 500,
                hasAlpha: true,
                alphaMultiplier: 35,
                upgradeCost: 0
            },
            {
                damage: 250,
                fireRate: 50,
                range: 10,
                radian: 3,
                baseHp: 1000,
                hasAlpha: true,
                alphaMultiplier: 100,
                upgradeCost: 0
            }
        ]
    },

    SNIPER_PARAGON: {
        name: 'Sniper Paragon',
        color: '#00FFFF',
        cost: 125000,
        damageType: 'piercing',
        aoe: false,
        summons: false,
        size: 2,
        footprint: { width: 2, height: 2 },
        limit: 1,
        isParagon: true,
        cannotBeBuffed: true,
        rangeBonus: 2,
        levels: [
            {
                damage: 8000,
                fireRate: 3000,
                range: 8,
                radian: 1,
                upgradeCost: 0
            },
            {
                damage: 16000,
                fireRate: 3000,
                range: 12,
                radian: 2,
                upgradeCost: 0
            },
            {
                damage: 20000,
                fireRate: 4000,
                range: 15,
                radian: 3,
                explosionDamage: 5000,
                explosionDelay: 500,
                sniperBuff: 75,
                railgunnerBuff: 200,
                hasBeta: true,
                upgradeCost: 0
            }
        ]
    },

    ROCKETER_PARAGON: {
        name: 'Rocketer Paragon',
        color: '#FF6A00',
        cost: 125000,
        damageType: 'explosive',
        aoe: true,
        summons: false,
        size: 2,
        footprint: { width: 2, height: 2 },
        limit: 1,
        isParagon: true,
        cannotBeBuffed: true,
        clusterCost: 100000,
        clusterCooldown: 180000,
        clusterRequiredMaxedRocketers: 10,
        clusterDamagePerHit: 500,
        clusterHitCount: 100,
        clusterMoabDamage: 250000,
        clusterSlowAmount: 0.05,
        levels: [
            {
                damage: 750,
                directDamage: 550,
                fireRate: 2500,
                range: 5,
                radian: 1,
                explosionTiles: 2,
                passiveRocketerMultiplier: 2,
                upgradeCost: 0
            },
            {
                damage: 2000,
                directDamage: 1500,
                fireRate: 2000,
                range: 6,
                radian: 2,
                explosionTiles: 3,
                passiveRocketerMultiplier: 2,
                acidDamage: 50,
                acidTickRate: 200,
                acidPoolLengthTiles: 2,
                acidPoolDuration: 3000,
                acidEnemyDuration: 7000,
                acidCooldown: 10000,
                upgradeCost: 0
            },
            {
                damage: 6000,
                directDamage: 6000,
                fireRate: 2000,
                range: 8,
                radian: 3,
                explosionTiles: 4,
                passiveRocketerMultiplier: 2,
                acidDamage: 250,
                acidTickRate: 200,
                acidPoolLengthTiles: 3,
                acidPoolDuration: 5000,
                acidEnemyDuration: 10000,
                acidCooldown: 10000,
                upgradeCost: 0
            }
        ]
    },

    DRONE: typeof DRONE_TOWER_TYPE !== 'undefined' ? DRONE_TOWER_TYPE : {
        name: 'Drone',
        color: '#00FA9A',
        cost: 5000,
        aoe: false,
        summons: false,
        size: 1.5,
        limit: 1,
        levels: []
    },

    MAFIA: typeof MAFIA_TOWER_TYPE !== 'undefined' ? MAFIA_TOWER_TYPE : {
        name: 'Mafia',
        color: '#1A1A1A',
        cost: 500,
        aoe: false,
        summons: true,
        isHybrid: true,
        isMafia: true,
        limit: 2,
        levels: []
    },

    CBASE: typeof CBASE_TOWER_TYPE !== 'undefined' ? CBASE_TOWER_TYPE : {
        name: 'C-Base',
        color: '#8B0000',
        cost: 100000,
        aoe: false,
        summons: true,
        isCBase: true,
        size: 5,
        footprint: { width: 5, height: 5 },
        limit: 1,
        levels: []
    }
};

// ===== SUMMON TYPES =====
// Units spawned by towers (not enemies)

const SUMMON_TYPES = {
    // Basic Summoner cubes
    RED: { name: 'Red Cube', color: 'red', hp: 20, speed: 1, size: 20, isSummon: true },
    YELLOW: { name: 'Yellow Cube', color: 'yellow', hp: 10, speed: 1.5, size: 15, isSummon: true },
    GRAY: { name: 'Gray Cube', color: 'gray', hp: 50, speed: 0.6, size: 20, isSummon: true },
    RED_L4: { name: 'Red Cube L4', color: 'red', hp: 120, speed: 1, size: 20, isSummon: true },
    YELLOW_L4: { name: 'Yellow Cube L4', color: 'yellow', hp: 100, speed: 1.5, size: 15, isSummon: true },
    GRAY_L4: { name: 'Gray Cube L4', color: 'gray', hp: 150, speed: 0.6, size: 20, isSummon: true },
    DARK_RED: { name: 'Dark Red Cube', color: 'darkred', hp: 500, speed: 0.3, size: 30, isSummon: true },
    DARK_RED_L5: { name: 'Dark Red Cube L5', color: 'darkred', hp: 1000, speed: 0.3, size: 30, isSummon: true },

    // Beta Protocol summons (Gunner Paragon L3)
    BETA_GRAY: {
        name: 'Beta Gray Cube',
        color: '#808080',
        hp: 1250,
        speed: 0.65,
        size: 22,
        isSummon: true,
        damage: 200,
        fireRate: 200,
        range: 6
    },
    BETA_BLACK: {
        name: 'Beta Black Cube',
        color: '#1A1A1A',
        hp: 6000,
        speed: 0.4,
        size: 28,
        isSummon: true,
        damage: 3000,
        fireRate: 2000,
        range: 6,
        aoe: true,
        aoeRange: 3
    },
    BETA_YELLOW: {
        name: 'Beta Yellow Cube',
        color: '#FFFF00',
        hp: 25000,
        speed: 0.25,
        size: 32,
        isSummon: true,
        isKamikaze: true,
        collisionDamage: 5000,
        deathDamage: 15000,
        deathRange: 5
    },
    BETA_SHIELD: {
        name: 'Beta Cube Shield',
        color: '#418554',
        hp: 10000,
        shieldHp: 5000,
        speed: 0.35,
        size: 25,
        isSummon: true,
        hasShield: true
    },

    // Cyan Cube (Summoner L5)
    CYAN: {
        name: 'Cyan Cube',
        color: 'cyan',
        hp: 5000,
        speed: 0.4,
        size: 35,
        isSummon: true,
        minigunDamage: 150,
        minigunFireRate: 100,
        missileDirectDamage: 1000,
        missileAOEDamage: 500,
        missileCooldown: 2500,
        missileCount: 2,
        missileBurstRate: 400,
        missileRange: 7,
        railgunDamage: 2500,
        railgunFireRate: 2000,
        range: 10
    },

    // Elite Spawner summons
    BLUE_SQUARE: {
        name: 'Blue Square',
        color: 'blue',
        hp: 100,
        speed: 0.4,
        size: 25,
        isSummon: true,
        damage: 10,
        fireRate: 500,
        range: 7
    },
    BLUE_SQUARE_L2: {
        name: 'Blue Square L2',
        color: 'blue',
        hp: 250,
        speed: 0.4,
        size: 25,
        isSummon: true,
        damage: 10,
        fireRate: 250,
        range: 7
    },
    PINK_SQUARE: {
        name: 'Pink Square',
        color: 'pink',
        hp: 200,
        speed: 0.4,
        size: 20,
        isSummon: true,
        damage: 20,
        fireRate: 1000,
        range: 7
    },
    BLUE_SQUARE_L3: {
        name: 'Blue Square L3',
        color: 'blue',
        hp: 500,
        speed: 0.4,
        size: 25,
        isSummon: true,
        damage: 50,
        fireRate: 250,
        range: 7
    },
    PINK_SQUARE_L3: {
        name: 'Pink Square L3',
        color: 'pink',
        hp: 500,
        speed: 0.4,
        size: 20,
        isSummon: true,
        damage: 20,
        fireRate: 100,
        range: 7
    },
    ORANGE_SQUARE: {
        name: 'Orange Square',
        color: 'orange',
        hp: 500,
        speed: 0.4,
        size: 25,
        isSummon: true,
        damage: 125,
        directDamage: 300,
        fireRate: 2000,
        range: 8,
        aoe: true
    },
    BLUE_SQUARE_L4: {
        name: 'Blue Square L4',
        color: 'blue',
        hp: 1000,
        speed: 0.5,
        size: 25,
        isSummon: true,
        damage: 200,
        fireRate: 250,
        range: 5
    },
    PINK_SQUARE_L4: {
        name: 'Pink Square L4',
        color: 'pink',
        hp: 1000,
        speed: 0.5,
        size: 20,
        isSummon: true,
        damage: 60,
        fireRate: 100,
        range: 5
    },
    ORANGE_SQUARE_L4: {
        name: 'Orange Square L4',
        color: 'orange',
        hp: 1000,
        speed: 0.5,
        size: 25,
        isSummon: true,
        damage: 300,
        directDamage: 750,
        fireRate: 1500,
        range: 8,
        aoe: true
    },
    DARK_BLUE_SQUARE: {
        name: 'Dark Blue Square',
        color: 'darkblue',
        hp: 5000,
        speed: 0.3,
        size: 30,
        isSummon: true,
        selfDestructDamage: 2000
    },
    GREEN_SQUARE: {
        name: 'Green Square',
        color: 'green',
        hp: 2500,
        speed: 0.4,
        size: 27,
        isSummon: true,
        damage: 2000,
        fireRate: 1000,
        range: 14
    },
    PINK_SQUARE_L5: {
        name: 'Pink Square L5',
        color: 'pink',
        hp: 2000,
        speed: 0.5,
        size: 27,
        isSummon: true,
        burstDamage: 125,
        burstCount: 20,
        burstFireRate: 50,
        burstCooldown: 1500,
        range: 12
    },
    DARK_BLUE_SQUARE_L5: {
        name: 'Dark Blue Square L5',
        color: 'darkblue',
        hp: 10000,
        speed: 0.3,
        size: 35,
        isSummon: true,
        selfDestructDamage: 5000
    },

    // Rainbow Cube (Elite Spawner ability)
    RAINBOW_CUBE: {
        name: 'Rainbow Cube',
        color: 'rainbow',
        hp: 100000,
        speed: 0.25,
        size: 50,
        isSummon: true,
        railgunDamage: 5000,
        railgunFireRate: 500,
        railgunCount: 2,
        railgunCooldown: 3000,
        missileDamage: 1000,
        missileDirectDamage: 2000,
        missileFireRate: 200,
        missileCount: 3,
        missileCooldown: 4000,
        laserDamage: 250,
        laserBurstCount: 20,
        laserFireRate: 50,
        laserCooldown: 3000,
        minigunDamage: 125,
        minigunFireRate: 50,
        mainRailgunDamage: 25000,
        mainRailgunCount: 4,
        mainRailgunFireRate: 250,
        mainRailgunCooldown: 15000,
        mainRailgunUses: 2,
        range: 20
    },

    // Cube Factory summons
    FACTORY_CUBE_L1: {
        name: 'Factory Cube L1',
        color: '#8B0000',
        hp: 15000,
        speed: 0.25,
        size: 35,
        isSummon: true,
        range: 12,
        minigunDamage: 200,
        minigunFireRate: 100,
        rocketDamage: 400,
        rocketDirectDamage: 600,
        rocketFireRate: 250,
        rocketCount: 4,
        rocketCooldown: 3500,
        rocketAOERange: 2
    },
    FACTORY_CUBE_L2: {
        name: 'Factory Cube L2',
        color: '#CD5C5C',
        hp: 54000,
        speed: 0.175,
        size: 40,
        isSummon: true,
        range: 12,
        minigunDamage: 250,
        minigunFireRate: 80,
        rocketDamage: 600,
        rocketDirectDamage: 1000,
        rocketFireRate: 200,
        rocketCount: 4,
        rocketCooldown: 4000,
        rocketAOERange: 3,
        railgunDamage: 10000,
        railgunCooldown: 7000,
        railgunRange: 100,
        knockbackCooldown: 5000,
        knockbackExplosionRange: 3,
        knockbackExplosionDamage: 2000,
        knockbackDirectDamage: 5000,
        knockbackPower: 3,
        isBossKnockbacker: true
    },
    FACTORY_CUBE_L3: {
        name: 'Factory Cube L3',
        color: '#FFD700',
        hp: 250000,
        speed: 0.12,
        size: 54,
        isSummon: true,
        range: 14,
        minigunDamage: 500,
        minigunFireRate: 80,
        rocketDamage: 2500,
        rocketDirectDamage: 3500,
        rocketFireRate: 200,
        rocketCount: 6,
        rocketCooldown: 5000,
        rocketAOERange: 5,
        railgunDamage: 25000,
        railgunCooldown: 6000,
        railgunRange: Infinity,
        knockbackCooldown: 6000,
        knockbackExplosionRange: 3,
        knockbackExplosionDamage: 5000,
        knockbackDirectDamage: 10000,
        knockbackPower: 5,
        isBossKnockbacker: true
    },

    // Executive summons
    ELITE_OPERATOR: {
        name: 'Elite Operator',
        color: '#DC143C',
        hp: 200,
        speed: 0.4,
        size: 22,
        isSummon: true,
        damage: 5,
        fireRate: 100,
        range: 6,
        stopsToShoot: true
    },
    ELITE_OPERATOR_L5: {
        name: 'Elite Operator',
        color: '#FF1744',
        hp: 200,
        speed: 0.4,
        size: 22,
        isSummon: true,
        damage: 10,
        fireRate: 80,
        range: 8,
        stopsToShoot: true
    },
    EXEC_TANK: {
        name: 'Exec Tank',
        color: '#8B0000',
        hp: 5000,
        speed: 0.25,
        size: 35,
        isSummon: true,
        damage: 25,
        fireRate: 100,
        range: 10
    },
    EXEC_ARTILLERY: {
        name: 'Exec Artillery',
        color: '#FF6347',
        hp: 3000,
        speed: 0.175,
        size: 30,
        isSummon: true,
        damage: 250,
        fireRate: 500,
        range: Infinity,
        aoe: true,
        aoeRange: 2
    },

    // Mafia tower summons
    MAFIA_GUNNER_L1: typeof MAFIA_GUNNER_L1 !== 'undefined' ? MAFIA_GUNNER_L1 : { name: 'Mafia Gunner L1', color: '#333333', hp: 50, speed: 0.25, size: 18, isSummon: true, damage: 10, fireRate: 500, range: 5, isMafiaGunner: true, stopsToShoot: true },
    MAFIA_GUNNER_L2: typeof MAFIA_GUNNER_L2 !== 'undefined' ? MAFIA_GUNNER_L2 : { name: 'Mafia Gunner L2', color: '#222222', hp: 500, speed: 0.25, size: 22, isSummon: true, damage: 50, fireRate: 600, range: 6, isMafiaGunner: true, stopsToShoot: true },
    MAFIA_GOLDEN_GUNNER: typeof MAFIA_GOLDEN_GUNNER !== 'undefined' ? MAFIA_GOLDEN_GUNNER : { name: 'Golden Gunner', color: '#FFD700', hp: 10000, speed: 0.25, size: 28, isSummon: true, damage: 1000, fireRate: 500, range: 8, isMafiaGunner: true, stopsToShoot: true },

    // C-Base tower summons (registered by CBase.js cbase_register_summon_types)
    CBASE_CASTER: typeof CBASE_CASTER !== 'undefined' ? CBASE_CASTER : { name: 'Caster', color: '#FF0000', hp: 500, speed: 0.35, size: 18, isSummon: true, isCBaseSummon: true },
    CBASE_OPPRESSOR: typeof CBASE_OPPRESSOR !== 'undefined' ? CBASE_OPPRESSOR : { name: 'Oppressor', color: '#FF0000', hp: 3000, speed: 0.3, size: 24, isSummon: true, isCBaseSummon: true },
    CBASE_IMPALER: typeof CBASE_IMPALER !== 'undefined' ? CBASE_IMPALER : { name: 'Impaler', color: '#FF0000', hp: 6000, speed: 0.25, size: 28, isSummon: true, isCBaseSummon: true },
    CBASE_RESONATOR: typeof CBASE_RESONATOR !== 'undefined' ? CBASE_RESONATOR : { name: 'Resonator', color: '#F06292', hp: 5000, speed: 0.35, size: 35, isSummon: true, isCBaseSummon: true },
    CBASE_EXECUTIONER: typeof CBASE_EXECUTIONER !== 'undefined' ? CBASE_EXECUTIONER : { name: 'Executioner', color: '#6B0000', hp: 50000, speed: 0.15, size: 40, isSummon: true, isCBaseSummon: true },
    CBASE_CRUSADER: typeof CBASE_CRUSADER !== 'undefined' ? CBASE_CRUSADER : { name: 'Crimson Crusader', color: '#A00000', hp: 200000, speed: 0.12, size: 54, isSummon: true, isCBaseSummon: true }
};

// Expose to window for command terminal
window.SUMMON_TYPES = SUMMON_TYPES;

// Register C-Base summon types into the SUMMON_TYPES table (overwrites placeholders with full defs)
if (typeof cbase_register_summon_types === 'function') cbase_register_summon_types();
