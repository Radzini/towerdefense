// Tower Types Configuration
// All tower stats are defined here for easy modification

const TOWER_TYPES = {
    GUNNER: {
        name: 'Gunner',
        color: 'yellow',
        cost: 150,
        aoe: false,
        summons: false,
        levels: [
            { damage: 1, fireRate: 500, range: 3, upgradeCost: 0 },
            { damage: 2, fireRate: 450, range: 3, upgradeCost: 75 },
            { damage: 5, fireRate: 400, range: 4, upgradeCost: 200 },
            { damage: 8, fireRate: 350, range: 4, upgradeCost: 350 }
        ]
    },

    SNIPER: {
        name: 'Sniper',
        color: 'red',
        cost: 500,
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
        cost: 350,
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
        aoe: false,
        summons: false,
        levels: [
            { damage: 3, fireRate: 100, range: 4, upgradeCost: 0 },
            { damage: 5, fireRate: 90, range: 6, upgradeCost: 750 },
            { damage: 8, fireRate: 80, range: 7, upgradeCost: 2000 },
            { damage: 12, fireRate: 40, range: 8, upgradeCost: 5000 }
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
            { summons: [{ type: 'DARK_RED_L5', spawnRate: 12000 }, { type: 'CYAN', spawnRate: 20000 }], upgradeCost: 10000 }
        ]
    },

    FARM: {
        name: 'Farm',
        color: '#006400',
        cost: 200,
        aoe: false,
        summons: false,
        farm: true,
        levels: [
            { cashPerWave: 100, upgradeCost: 0 },
            { cashPerWave: 350, upgradeCost: 250 },
            { cashPerWave: 1000, upgradeCost: 600 },
            { cashPerWave: 2500, upgradeCost: 1500 }
        ]
    },

    RAILGUNNER: {
        name: 'Railgunner',
        color: '#00B7EB',
        cost: 2500,
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
        limit: 1,
        abilityCooldown: 80000,
        levels: [
            { summons: [{ type: 'BLUE_SQUARE', spawnRate: 12000 }], upgradeCost: 0 },
            { summons: [{ type: 'BLUE_SQUARE_L2', spawnRate: 10000 }, { type: 'PINK_SQUARE', spawnRate: 10000 }], upgradeCost: 5000 },
            { summons: [{ type: 'BLUE_SQUARE_L3', spawnRate: 10000 }, { type: 'PINK_SQUARE_L3', spawnRate: 10000 }, { type: 'ORANGE_SQUARE', spawnRate: 10000 }], upgradeCost: 5000 },
            { summons: [{ type: 'BLUE_SQUARE_L4', spawnRate: 10000 }, { type: 'PINK_SQUARE_L4', spawnRate: 10000 }, { type: 'ORANGE_SQUARE_L4', spawnRate: 10000 }, { type: 'DARK_BLUE_SQUARE', spawnRate: 15000 }], upgradeCost: 20000 },
            { summons: [{ type: 'GREEN_SQUARE', spawnRate: 6000 }, { type: 'PINK_SQUARE_L5', spawnRate: 6000 }, { type: 'DARK_BLUE_SQUARE_L5', spawnRate: 7500 }], upgradeCost: 75000 }
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

    EXECUTIVE: {
        name: 'Executive',
        color: '#DC143C',
        cost: 3000,
        aoe: false,
        summons: false,
        hasAbility: true,
        limit: 1,
        abilityCost: 14000,
        abilityCooldown: 30000,
        levels: [
            { damage: 15, fireRate: 2000, range: 2, upgradeCost: 0 },
            { damage: 20, fireRate: 1000, range: 3, upgradeCost: 800 },
            { damage: 35, fireRate: 500, range: 4, upgradeCost: 3000 },
            { damage: 30, fireRate: 100, range: 5, upgradeCost: 12000 },
            { damage: 75, fireRate: 100, range: 7, upgradeCost: 50000, hasOrbitalStrike: true }
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
        aoe: false,
        summons: false,
        size: 2,
        limit: 1,
        isParagon: true,
        cannotBeBuffed: true,
        rangeBonus: 2,
        hasAlpha: true,
        alphaCost: 7500,
        alphaCooldown: 60000,
        hasBeta: true,
        betaCost: 20000,
        betaCooldown: 90000,
        levels: [
            {
                damage: 75,
                fireRate: 100,
                range: 5,
                radian: 1,
                baseHp: 250,
                alphaMultiplier: 10,
                upgradeCost: 0
            },
            {
                damage: 125,
                fireRate: 80,
                range: 8,
                radian: 2,
                baseHp: 500,
                hasAlpha: true,
                alphaMultiplier: 10,
                upgradeCost: 0
            },
            {
                damage: 200,
                fireRate: 50,
                range: 10,
                radian: 3,
                baseHp: 1000,
                hasAlpha: true,
                alphaMultiplier: 50,
                hasBeta: true,
                upgradeCost: 0
            }
        ]
    },

    SNIPER_PARAGON: {
        name: 'Sniper Paragon',
        color: '#00FFFF',
        cost: 125000,
        aoe: false,
        summons: false,
        size: 2,
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
                fireRate: 2500,
                range: 15,
                radian: 3,
                explosionDamage: 5000,
                explosionDelay: 500,
                sniperBuff: 75,
                railgunnerBuff: 200,
                upgradeCost: 0
            }
        ]
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

    // Gunner Paragon summons
    PARAGON_BASE: { name: 'Paragon Cube', color: '#FF00FF', hp: 250, speed: 1.2, size: 20, isSummon: true },
    PARAGON_ALPHA: { name: 'Alpha Cube', color: '#FFD700', hp: 2500, speed: 1.0, size: 30, isSummon: true },

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
        hp: 35000,
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
        color: 'darkpink',
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
        missileDamage: 1500,
        missileDirectDamage: 2500,
        missileFireRate: 400,
        missileCount: 3,
        missileCooldown: 4000,
        laserDamage: 250,
        laserBurstCount: 25,
        laserFireRate: 40,
        laserCooldown: 2500,
        minigunDamage: 150,
        minigunFireRate: 50,
        mainRailgunDamage: 50000,
        mainRailgunCount: 4,
        mainRailgunFireRate: 250,
        mainRailgunCooldown: 15000,
        mainRailgunUses: 2,
        range: 22
    },

    // Paragon Beta summons (alternative)
    PARAGON_GRAY: {
        name: 'Gray Cube',
        color: '#808080',
        hp: 2000,
        speed: 0.4,
        size: 20,
        isSummon: true,
        damage: 444,
        fireRate: 500,
        range: 7
    },
    PARAGON_BLACK: {
        name: 'Black Cube',
        color: '#000000',
        hp: 5000,
        speed: 0.4,
        size: 22,
        isSummon: true,
        damage: 600,
        fireRate: 1000,
        range: 8
    },
    PARAGON_PURPLE: {
        name: 'Purple Cube',
        color: '#800080',
        hp: 25000,
        speed: 0.4,
        size: 25,
        isSummon: true,
        damage: 50,
        fireRate: 500,
        range: 5
    },
    PARAGON_GRAY_SHIELD: {
        name: 'Gray Cube Shield',
        color: '#A9A9A9',
        hp: 600,
        shieldHp: 400,
        speed: 0.4,
        size: 20,
        isSummon: true,
        hasShield: true
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
    }
};
