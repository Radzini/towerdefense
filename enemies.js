// Enemy Types Configuration
// Organized by difficulty: Normal, Hard, Insane, Nightmare

const ENEMY_TYPES = {
    // ===== NORMAL MODE ENEMIES =====
    red_cube: { name: 'Red Cube', baseHp: 4, speed: 0.425, color: '#FF0000', size: 20 },
    blue_cube: { name: 'Blue Cube', baseHp: 3, speed: 0.65, color: '#0000FF', size: 18 },
    gray_cube: { name: 'Gray Cube', baseHp: 15, speed: 0.3, color: '#808080', size: 22 },
    boss_cube: { name: 'Boss Cube', baseHp: 125, speed: 0.275, color: '#8B0000', size: 30, isBoss: true },
    crystal_cube: { name: 'Crystal Cube', baseHp: 50, speed: 0.4, color: '#00FFFF', size: 24 },
    eclise_cube: { name: 'Eclise Cube', baseHp: 35, speed: 0.6, color: '#4B0082', size: 20 },
    slow_boss_cube: { name: 'Slow Boss Cube', baseHp: 1200, speed: 0.2, color: '#2F4F4F', size: 35, isBoss: true },
    fast_boss_cube: { name: 'Fast Boss Cube', baseHp: 325, speed: 0.45, color: '#FF4500', size: 32, isBoss: true },
    crystal_boss_cube: { name: 'Crystal Boss Cube', baseHp: 2000, speed: 0.4, color: '#00CED1', size: 38, isBoss: true },
    gargantuar: { name: 'Gargantuar', baseHp: 350, shieldHp: 150, speed: 0.35, color: '#8B4513', size: 40, hasShield: true, isBoss: true },
    eclise_boss_cube: { name: 'Eclise Boss Cube', baseHp: 500, speed: 0.5, color: '#9400D3', size: 36, isBoss: true },
    lava_cube: { name: 'Lava Cube', baseHp: 100, speed: 0.425, color: '#FF6347', size: 26 },
    guardian_cube: { name: 'Guardian Cube', baseHp: 5000, speed: 0.325, color: '#FFD700', size: 42, isBoss: true, isKing: true },
    crysalized_cube: { name: 'Crysalized Cube', baseHp: 40000, speed: 0.285, color: '#E0FFFF', size: 45, isBoss: true, isKing: true, showHpBar: true },

    // ===== HARD MODE ENEMIES =====
    red_cube_hard: { name: 'Red Cube', baseHp: 6, speed: 0.45, color: '#FF0000', size: 20 },
    blue_cube_hard: { name: 'Blue Cube', baseHp: 4, speed: 0.65, color: '#0000FF', size: 18 },
    gray_cube_hard: { name: 'Gray Cube', baseHp: 20, speed: 0.35, color: '#808080', size: 22 },
    boss_cube_hard: { name: 'Boss Cube', baseHp: 200, speed: 0.3, color: '#8B0000', size: 30 },
    crystal_cube_hard: { name: 'Crystal Cube', baseHp: 75, speed: 0.425, color: '#00FFFF', size: 24, resistances: { global: 0.4, bullet: 0.4, laser: 0.4, piercing: -0.25, explosive: -0.25, summonerRange: 0.1, summonerCollision: 0.5 } },
    lightning_cube: { name: 'Lightning Cube', baseHp: 150, speed: 0.7, color: '#FFFF00', size: 22, resistances: { global: -0.1, bullet: -0.1, laser: 0.65, piercing: -0.1, explosive: -0.25, summonerRange: 0.4, summonerCollision: 0.6 } },
    slow_boss_cube_hard: { name: 'Slow Boss Cube', baseHp: 3000, speed: 0.25, color: '#2F4F4F', size: 35, isBoss: true, resistances: { global: 0.3, bullet: 0.5, laser: 0.4, piercing: 0.2, explosive: 0.6, summonerRange: 0.3, summonerCollision: 0.5 } },
    fast_boss_cube_hard: { name: 'Fast Boss Cube', baseHp: 1000, speed: 0.5, color: '#FF4500', size: 32, isBoss: true },
    crystal_boss_cube_hard: { name: 'Crystal Boss Cube', baseHp: 2500, speed: 0.4, color: '#00CED1', size: 38, isBoss: true, resistances: { global: 0.4, bullet: 0.4, laser: 0.4, piercing: -0.25, explosive: -0.25, summonerRange: 0.1, summonerCollision: 0.5 } },
    gargantuar_x: { name: 'Gargantuar-X', baseHp: 1000, shieldHp: 400, speed: 0.38, color: '#654321', size: 42, hasShield: true, isBoss: true },
    cube_of_doom: { name: 'Stone Titan', baseHp: 200000, shieldHp: 50000, speed: 0.3, color: '#6e6968ff', size: 42, hasShield: true, showHpBar: true, isBoss: true, resistances: { global: 0.25, bullet: 0.5, laser: 0.5, piercing: 0.4, explosive: 0.4, summonerRange: 0.6, summonerCollision: 0.5 } },
    eclise_boss_cube_hard: { name: 'Eclise Boss Cube', baseHp: 5000, speed: 0.6, color: '#9400D3', size: 36, isBoss: true },
    lava_cube_hard: { name: 'Lava Cube', baseHp: 750, speed: 0.5, color: '#FF6347', size: 26, resistances: { global: 0.6, bullet: 0.4, laser: 0.4, piercing: -0.25, explosive: 1, summonerRange: 0.2, summonerCollision: 0.75 } },
    guardian_cube_2: { name: 'Guardian Cube-2', baseHp: 50000, speed: 0.5, color: '#FFD700', size: 44, isBoss: true, resistances: { global: 0.2, bullet: 0.25, laser: 0.25, piercing: 0.25, explosive: 0.4, summonerRange: 0.2, summonerCollision: 0.2 } },
    rock_cube: { name: 'Rock Cube', baseHp: 6000, speed: 0.4, color: '#b99d9bd4', size: 40, resistances: { global: 0.35, bullet: 0.6, laser: 0.32, piercing: 0.4, explosive: 0.2, summonerRange: 0.4, summonerCollision: 0.7 } },
    rock_cube_small: { name: 'Rock Cube Small', baseHp: 500, speed: 0.55, color: '#b99d9bd4', size: 30, resistances: { global: 0.4, bullet: 0.6, laser: 0.3, piercing: 0.4, explosive: -0.15, summonerRange: 0.4, summonerCollision: 0.4 } },
    zeltron_cube: { name: 'Zeltron Cube', baseHp: 150000, speed: 0.45, color: '#00FF7F', size: 46, isBoss: true, showHpBar: true, resistances: { global: 0.5, bullet: 0.4, laser: 0.4, piercing: 0.3, explosive: 0.4, summonerRange: 0.2, summonerCollision: 0.2 } },
    crystalized_titan_cube: { name: 'Crystalized Titan Cube', baseHp: 750000, speed: 0.26, color: '#B0E0E6', size: 55, isBoss: true, isKing: true, showHpBar: true, resistances: { global: 0.25, bullet: 0.4, laser: 0.4, piercing: 0.7, explosive: 0.2, summonerRange: 0.62, summonerCollision: 0.62 } },


    // ===== INSANE MODE ENEMIES =====
    red_cube_insane: { name: 'Red Cube', baseHp: 10, speed: 0.4, color: '#FF0000', size: 20 },
    blue_cube_insane: { name: 'Blue Cube', baseHp: 12, speed: 0.55, color: '#0000FF', size: 18 },
    gray_cube_insane: { name: 'Gray Cube', baseHp: 50, speed: 0.25, color: '#808080', size: 22 },
    boss_cube_insane: { name: 'Boss Cube', baseHp: 600, speed: 0.2, color: '#8B0000', size: 30 },
    frozen_cube: { name: 'Frozen Cube', baseHp: 150, speed: 0.35, color: '#87CEEB', size: 24 },
    light_cube: { name: 'Light Cube', baseHp: 100, speed: 1.2, color: '#FFFACD', size: 18 },
    destructor_cube: { name: 'Destructor Cube', baseHp: 4000, shieldHp: 1000, speed: 0.34, color: '#DC143C', size: 36, hasShield: true, showHpBar: true },
    destructor_boss_cube: { name: 'Destructor Boss Cube', baseHp: 8000, shieldHp: 2000, speed: 0.25, color: '#B22222', size: 42, hasShield: true, isBoss: true },
    frost_boss_cube: { name: 'Frost Boss Cube', baseHp: 5000, speed: 0.3, color: '#ADD8E6', size: 40, isBoss: true },
    gargantuar_z: { name: 'Gargantuar-Z', baseHp: 6500, shieldHp: 1500, speed: 0.5, color: '#8B0000', size: 45, hasShield: true, isBoss: true },
    lightning_boss_cube: { name: 'Lightning Boss Cube', baseHp: 850, speed: 0.75, color: '#FFD700', size: 34, isBoss: true },
    king_slow_cube: { name: 'King Alpha Cube', baseHp: 54000, shieldHp: 6000, speed: 0.3, color: '#483D8B', size: 45, hasShield: true, isBoss: true, isKing: true, showHpBar: true, insaneHp: 20000, insaneShield: 7000, insaneSpeed: 0.3 },
    king_fast_cube: { name: 'King Beta Cube', baseHp: 35000, shieldHp: 5000, speed: 0.3, color: '#FF1493', size: 45, hasShield: true, isBoss: true, isKing: true, showHpBar: true, insaneHp: 20000, insaneShield: 7000, insaneSpeed: 0.3 },
    lord_cube: { name: 'Lord Cube', baseHp: 20000, shieldHp: 10000, speed: 0.2, color: '#be511fff', size: 45, hasShield: true, isBoss: true, isKing: true, showHpBar: true, insaneHp: 30000, insaneShield: 5000, insaneSpeed: 0.1 },
    icarus_cube: { name: 'Icarus Cube', baseHp: 1000, speed: 0.35, color: '#FFA500', size: 26 },
    hidden_icarus_cube: { name: 'Hidden Icarus Cube', baseHp: 120000, shieldHp: 30000, speed: 0.5, color: '#FF8C00', size: 50, hasShield: true, isBoss: true, isKing: true },
    titan_cube: { name: 'Titan Cube', baseHp: 150000, shieldHp: 50000, speed: 0.3, color: '#000000', size: 40, hasShield: true, isBoss: true, isKing: true, showHpBar: true, insaneHp: 125000, insaneShield: 125000, insaneSpeed: 0.25 },
    corrupted_red_cube: { name: 'Corrupted Red Cube', baseHp: 6500, speed: 0.3, color: '#8B0000', size: 28 },
    corrupted_blue_cube: { name: 'Corrupted Blue Cube', baseHp: 4000, speed: 0.35, color: '#00008B', size: 25 },
    corrupted_gray_cube: { name: 'Corrupted Gray Cube', baseHp: 30000, speed: 0.25, color: '#2F4F4F', size: 32 },
    corrupted_titan_cube: { name: 'Corrupted Titan Cube', baseHp: 520000, shieldHp: 80000, speed: 0.25, color: '#191970', size: 55, hasShield: true, isBoss: true, isKing: true, showHpBar: true, insaneHp: 600000, insaneShield: 400000, insaneSpeed: 0.1 },
    ram_cube: { name: 'Ram Cube', baseHp: 20000, shieldHp: 80000, speed: 0.26, color: '#CD5C5C', size: 42, hasShield: true, isBoss: true, insaneHp: 20000, insaneShield: 60000, insaneSpeed: 0.2 },
    celgar_cube: { name: 'Celgar Cube', baseHp: 60000, shieldHp: 20000, speed: 0.32, color: '#4682B4', size: 40, hasShield: true, isBoss: true, insaneHp: 40000, insaneShield: 20000, insaneSpeed: 0.3 },
    manager_cube: { name: 'Manager Cube', baseHp: 125000, speed: 0.5, color: '#9370DB', size: 46, isBoss: true, isKing: true },
    void_cube: { name: 'THE VOID CUBE', baseHp: 1600000, shieldHp: 400000, speed: 0.1, color: '#000000', size: 60, hasShield: true, isBoss: true, isKing: true, showHpBar: true, insaneHp: 5000000, insaneShield: 0, insaneSpeed: 0.065 },

    // ===== BONUS ENEMIES (Cash rewards) =====
    green_square_500: { name: 'Green Square', baseHp: 100, speed: 0.8, color: '#00FF00', size: 25, cashReward: 500 },
    green_square_1000: { name: 'Green Square', baseHp: 100, speed: 0.8, color: '#00FF00', size: 25, cashReward: 1000 },
    green_square_2500: { name: 'Green Square', baseHp: 100, speed: 0.8, color: '#00FF00', size: 25, cashReward: 2500 },
    green_square_5000: { name: 'Green Square', baseHp: 100, speed: 0.8, color: '#00FF00', size: 25, cashReward: 5000 },

    // ===== TEST DUMMY =====
    test_dummy: { name: 'Test Dummy', baseHp: 100000000, speed: 0.1, color: '#FFD700', size: 50, isBoss: true, showHpBar: true, isTestDummy: true },
    // ===== ENDLESS MODE BOSSES =====
    devastator: { name: 'Devastator', baseHp: 35000, speed: 0.3, color: '#800000', size: 40, isBoss: true, showHpBar: true },
    gargantuar_king: { name: 'Gargantuar King', baseHp: 150000, shieldHp: 50000, speed: 0.17, color: '#800000', size: 35, hasShield: true, isBoss: true, isKing: true, showHpBar: true },
    cube_destructor: { name: 'Cube Destructor', baseHp: 600000, speed: 0.25, color: '#800000', size: 45, isBoss: true, showHpBar: true },

    // ===== BOSS RUSH ENEMIES =====
    crystalized_cube_br: { name: 'Crystalized Cube', baseHp: 400000, speed: 0.5, color: '#E0FFFF', size: 45, isBoss: true, showHpBar: false },
    zeltron_cube_br: { name: 'Zeltron Cube', baseHp: 350000, speed: 0.4, color: '#00FF7F', size: 46, isBoss: false, showHpBar: false },
    crystalized_titan_cube_br: { name: 'Crystalized Titan Cube', baseHp: 800000, speed: 0.3, color: '#B0E0E6', size: 50, isBoss: true, showHpBar: false },
    cube_destructor_br: { name: 'Cube Destructor', baseHp: 600000, speed: 0.66, color: '#DC143C', size: 45, isBoss: true, showHpBar: false },
    lord_alpha_cube: { name: 'Lord Alpha Cube', baseHp: 450000, shieldHp: 50000, speed: 0.25, color: '#483D8B', size: 45, hasShield: true, isBoss: true, showHpBar: false },
    lord_beta_cube: { name: 'Lord Beta Cube', baseHp: 450000, shieldHp: 50000, speed: 0.25, color: '#FF1493', size: 45, hasShield: true, isBoss: true, showHpBar: false },
    titan_cube_br: { name: 'Titan Cube', baseHp: 1000000, speed: 0.35, color: '#000000', size: 55, isBoss: true, showHpBar: true },
    true_rammer: { name: 'True Rammer', baseHp: 350000, shieldHp: 150000, speed: 0.22, color: '#CD5C5C', size: 48, hasShield: true, isBoss: false, showHpBar: false },
    corrupted_titan: { name: 'Corrupted Titan', baseHp: 1500000, shieldHp: 500000, speed: 0.12, color: '#191970', size: 55, hasShield: true, isBoss: false, showHpBar: false },
    true_void: { name: 'True Void', baseHp: 3000000, shieldHp: 2000000, speed: 0.15, color: '#000000', size: 65, hasShield: true, isBoss: false, showHpBar: true, resistances: { global: 0.10, bullet: 0.10, laser: 0.10, piercing: 0.10, explosive: 0.10 } },

    // ===== CHAOS MODE PART 2 (console testing only) =====
    // Damage type mapping: "Collusion" is summonerCollision and "Collusion R" is summonerRange.
    abnormal_cube_cm1: { name: 'Abnormal Cube', baseHp: 250, speed: 0.4, color: '#808080', size: 25, resistances: { piercing: -0.1, bullet: 0.2, laser: 0.2, explosive: 0.6 } },
    melting_ice_cm1: { name: 'Melting Ice', baseHp: 600, speed: 0.45, color: '#00FFFF', size: 24, resistances: { laser: 0.9, explosive: -0.4 } },
    boss1_cm1: { name: 'Boss1', baseHp: 3000, speed: 0.35, color: '#008000', size: 30, isBoss: true, showHpBar: false, resistances: { piercing: 0.6, global: 0.15 } },
    strider_cube_cm1: { name: 'Strider Cube', baseHp: 3000, shieldHp: 500, speed: 0.8, color: '#555555', size: 35, hasShield: true, isBoss: false, showHpBar: false, strideMoveMs: 1000, stridePauseMs: 200, attackMissChance: 0.2, resistances: { piercing: 0.8, bullet: -0.2 } },
    boss2_cm1: { name: 'Boss2', baseHp: 10000, speed: 0.2, color: '#006400', size: 40, isBoss: true, showHpBar: false, deathTowerStun: { sizeTiles: 3, durationMs: 3000, color: '#496B49' }, resistances: { explosive: 0.8, summonerCollision: 0.6, global: 0.1 } },
    rusher_cm1: { name: 'Rusher', baseHp: 1400, speed: 2.0, color: '#555555', size: 30, resistances: { global: 0.15, summonerCollision: 0.7, bullet: 0.3, summonerRange: 0.25, explosive: -0.15 } },
    elite_rusher_cm1: { name: 'Elite Rusher', baseHp: 14000, shieldHp: 126000, hasShield: true, speed: 2.0, color: '#555555', size: 40, resistances: { global: 0.25, summonerCollision: 0.8, bullet: 0.4, summonerRange: 0.4, laser: 0.15, explosive: -0.25 } },
    boss3_cm1: { name: 'Boss3', baseHp: 30000, speed: 0.5, color: '#FFD700', size: 38, isBoss: true, showHpBar: false, cashReward: 300, resistances: { explosive: 0.8, summonerCollision: 0.2, bullet: 0.4, laser: 0.2, piercing: -0.25 } },
    boss4_cm1: { name: 'Boss4', baseHp: 75000, speed: 0.4, color: '#008000', size: 45, isBoss: true, showHpBar: false, nearbyTowerStun: { rangeTiles: 3, durationMs: 2000, cooldownMs: 4000, color: '#76B576' }, resistances: { explosive: 0.6, summonerCollision: 0.4, bullet: 0.9, laser: -0.2 } },
    boss5_cm1: { name: 'Boss5', baseHp: 150000, speed: 0.4, color: '#00008B', size: 50, isBoss: true, showHpBar: false, rageAtHpPercent: 0.6, ragePauseMs: 2000, rageGlobalResistance: 0.95, rageSpeed: 1.6, resistances: { global: 0.15, summonerCollision: 0.4, bullet: 0.2, laser: 0.6, piercing: 0.2 } },
    kuznetsov_cm1: { name: 'Kuznetsov', baseHp: 350000, speed: 0.25, color: '#008000', size: 55, isBoss: true, showHpBar: false, unitShot: { cooldownMs: 10000, percentCurrentHp: 0.05, flatDamage: 5000, color: '#7CFC00' }, resistances: { global: 0.6, summonerCollision: 1 } },
    stellar_cube_cm1: { name: 'Stellar Cube', baseHp: 40000, shieldHp: 60000, speed: 0.25, color: '#6C5CE7', texture: 'galaxy', size: 40, hasShield: true, isBoss: true, showHpBar: false, allowedDamageTypes: ['piercing', 'explosive'], resistances: { explosive: 0.4, piercing: -0.8 } },
    galaxy_cube_cm1: { name: 'Galaxy Cube', baseHp: 200000, shieldHp: 50000, speed: 0.25, color: '#6C5CE7', texture: 'galaxy', size: 60, hasShield: true, isBoss: true, showHpBar: false, resistances: { piercing: 0.1, bullet: 0.1, laser: 0.1, explosive: 0.1, summonerCollision: 0.75, summonerRange: 0.35 }, dynamicResistanceEvery: 50000, dynamicResistanceMin: 0.2, dynamicResistanceMax: 0.5, dynamicResistanceTypes: ['piercing', 'bullet', 'laser', 'explosive', 'summonerCollision', 'summonerRange'], dynamicGlobalResistance: 0.1 },
    destroyer_cube_cm1: { name: 'Destroyer Cube', baseHp: 120000, shieldHp: 200000, speed: 0.2, color: '#D3D3D3', centerMarkColor: '#FF0000', size: 55, hasShield: true, isBoss: true, showHpBar: false, towerShot: { durationMs: 1000, cooldownMs: 3000, color: '#FF3B30' }, resistances: { explosive: -0.4, summonerCollision: -0.1, summonerRange: -0.1, bullet: 0.4, laser: 0.4 } },
    armageddon_cube_cm1: { name: 'Armageddon Cube', baseHp: 50000, shieldHp: 100000, speed: 0.12, color: '#4B2E1F', size: 50, hasShield: true, isBoss: true, showHpBar: false, shieldDamageReduction: 0.6, shieldBreakSpeedMultiplier: 3, resistances: { global: 0.8 } },
    goliath_cube_cm1: { name: 'Goliath Cube', baseHp: 600000, speed: 0.15, color: '#8B4513', size: 62, isBoss: true, showHpBar: false, minimumDamage: 3000, postResistanceDamageMultiplier: 0.8, cashRewardMultiplier: 0.35, resistances: { global: 0.6 } },
    mega_cube_cm1: { name: 'Mega Goliath Cube', baseHp: 1000000, shieldHp: 500000, hasShield: true,speed: 0.2, color: '#8B4513', size: 65, isBoss: true, showHpBar: false, minimumDamage: 500, cashRewardMultiplier: 0.20, resistances: { global: 0.7 } },
    rubik_cube_cm1: { name: 'Rubik Cube', baseHp: 100000000, shieldHp: 25000000, speed: 0.215, color: '#FFFFFF', rainbow: true, size: 100, hasShield: true, isBoss: true, showHpBar: true, regeneration: { amount: 100, intervalMs: 100 }, backdashHpPercents: [0.8, 0.6, 0.4, 0.2], backdashTiles: 6, chaosAbilityRecoveryMs: 5000, chaosAbilities: [{ kind: 'cluster', count: 20, durationMs: 8000, cooldownMs: 30000 }, { kind: 'proxima', sizeTiles: 5, durationMs: 10000, cooldownMs: 12500 }, { kind: 'beam', widthTiles: 4, lengthTiles: 100, durationMs: 20000, cooldownMs: 60000 }, { kind: 'teleport', count: 8, durationMs: 12000, cooldownMs: 60000 }, { kind: 'bouncy', count: 5, bounces: 5, durationMs: 6000, cooldownMs: 25000 }] },
    super_crystalized_cube_cm1: { name: 'Super Crystalized Cube', baseHp: 20000000, shieldHp: 5000000, speed: 0.15, color: '#FF8C00', size: 65, hasShield: true, isBoss: true, showHpBar: true, chaosAbilityRecoveryMs: 5000, chaosAbilities: [{ kind: 'cluster', count: 8, durationMs: 4000, cooldownMs: 20000 }, { kind: 'proxima', sizeTiles: 3, durationMs: 7000, cooldownMs: 10000 }, { kind: 'bouncy', count: 3, bounces: 2, durationMs: 4000, cooldownMs: 40000 }] },
    void_zeltron_cm1: { name: 'Void Zeltron', baseHp: 1000000, shieldHp: 2000000, speed: 0.2, color: '#D8B4FE', size: 60, hasShield: true, isBoss: true, showHpBar: true, chaosAbilities: [{ kind: 'gun', count: 4, durationMs: 4000, cooldownMs: 6000 }, { kind: 'proxima', sizeTiles: 3, durationMs: 6000, cooldownMs: 15000 }, { kind: 'beam', widthTiles: 2, lengthTiles: 100, durationMs: 15000, cooldownMs: 50000 }] },
    kamov_cm1: { name: 'Kamov', baseHp: 150000, shieldHp: 250000, speed: 0.22, color: '#000000', size: 55, hasShield: true, isBoss: true, showHpBar: true, chaosAbilities: [{ kind: 'gun', count: 3, durationMs: 3000, cooldownMs: 5000 }, { kind: 'proxima', sizeTiles: 3, durationMs: 5000, cooldownMs: 12000 }] },
    rioter_cube_cm1: { name: 'Rioter Cube', baseHp: 20000, shieldHp: 4000, speed: 0.225, color: '#1C1C1C', size: 40, hasShield: true, isBoss: true, showHpBar: true, shieldResistances: { global: 0.7 }, chaosAbilities: [{ kind: 'gun', count: 1, durationMs: 4000, cooldownMs: 6000 }, { kind: 'proxima', sizeTiles: 2, durationMs: 3000, cooldownMs: 4000 }, { kind: 'proximaRam', sizeTiles: 2, durationMs: 3000, cooldownMs: 10000 }] },
    elite_guardian_cm1: { name: 'Elite Guardian', baseHp: 750000, shieldHp: 250000, speed: 0.2, color: '#800080', size: 60, hasShield: true, isBoss: true, showHpBar: false, regeneration: { amount: 100, intervalMs: 100 }, resistances: { global: 0.6 }, chaosAbilities: [{ kind: 'proxima', sizeTiles: 3, durationMs: 12000, cooldownMs: 7000 }, { kind: 'gun', count: 2, durationMs: 4000, cooldownMs: 7000 }] },
    elite_rioter_cm1: { name: 'Elite Rioter', baseHp: 350000, shieldHp: 250000, speed: 0.22, color: '#1C1C1C', size: 54, hasShield: true, isBoss: true, showHpBar: false, resistances: { global: 0.1 }, shieldResistances: { global: 0.5 }, chaosAbilities: [{ kind: 'proxima', sizeTiles: 3, durationMs: 7000, cooldownMs: 5000 }, { kind: 'gun', count: 1, durationMs: 5000, cooldownMs: 12000 }, { kind: 'proximaRam', sizeTiles: 3, durationMs: 6000, cooldownMs: 12000 }] },
    amalgamation_cm1: { name: 'Amalgamation', baseHp: 100000, speed: 0.4, color: '#FF0000', size: 55, isBoss: true, showHpBar: false, regeneration: { amount: 500, intervalMs: 100 }, resistances: { global: 0.25 }, helperThresholds: [0.8, 0.6, 0.4, 0.2], helperType: 'mini_helper_cm1', helperCount: 3 },
    mini_helper_cm1: { name: 'Mini Helper', baseHp: 600, speed: 0.62, color: '#FF0000', size: 32, regeneration: { amount: 100, intervalMs: 250 }, resistances: { global: 0.925, explosive: 1 } },

    // ===== NIGHTMARE MODE ENEMIES =====
    yellow_cube_nm: { name: 'Yellow Cube', baseHp: 125, speed: 0.4, color: '#d8f500ff', size: 22, resistances: { explosive: 0.65 } },
    purple_cube_nm: { name: 'Purple Cube', baseHp: 50, speed: 0.46, color: '#9618e4ff', size: 20, resistances: { explosive: 0.65 } },
    green_cube_nm: { name: 'Green Cube', baseHp: 500, speed: 0.3, color: '#22b32fff', size: 22, resistances: { explosive: 0.5 } },
    golden_cube_nm: { name: 'Golden Cube', baseHp: 10000, speed: 0.25, color: '#FFD700', size: 30, resistances: { explosive: 0.7, laser: 0.20, bullet: 0.3 } },
    // before w20
    berserker_cube_nm: { name: 'Berserker Cube', baseHp: 40000, shieldHp: 60000, speed: 0.275, color: '#FFD700', size: 35, hasShield: true, isBoss: true, showHpBar: true, resistances: { global: 0.05, bullet: 0.10, laser: 0.10, piercing: -0.10, explosive: 0.60, summonerRange: 0.3, summonerCollision: 0.3 } },
    // after w20
    frozen_cube_nm: { name: 'Frozen Cube', baseHp: 750, speed: 0.35, color: '#87CEEB', size: 25, resistances: { global: 0.1, bullet: 0.40, laser: 0.60, piercing: -0.35, explosive: 1 } },
    lava_cube_nm: { name: 'Lava Cube', baseHp: 750, speed: 0.35, color: '#FF6347', size: 25, resistances: { global: 0.2, bullet: 0, laser: 0, piercing: 0.6, explosive: 1 } },
    // after w25
    necromancer_nm: { name: 'Necromancer', baseHp: 15000, speed: 0.2, color: '#4A3A5C', size: 30, isSummoner: true, summonType: 'nmsummon_nm', summoncooldown: 8000, summoncount: 3 },
    nmsummon_nm: { name: 'Summoned Cube', baseHp: 1000, speed: 0.25, color: '#6B5B7A', size: 20, isSummoned: true, resistances: { global: 0.3, bullet: 0.10, laser: 0.10, piercing: -0.2 } },
    unstable_crystal_nm: { name: 'Unstable Crystal', baseHp: 7000, speed: 0.325, color: '#1f7eb1c2', size: 22, resistances: { global: 0.20, bullet: 0.50, laser: 0.50, piercing: -0.40, explosive: 0.50 } },
    // after w30
    shielder_cube_nm: { name: 'Shielder Cube', baseHp: 7500, shieldHp: 2500, speed: 0.35, color: '#4dd2ff', size: 24, isSupport: true },
    obsidian_cube_nm: { name: 'Obsidian Cube', baseHp: 20000, speed: 0.3, color: '#1a1a1a', size: 26, resistances: { global: 0.10, bullet: 0.80, laser: 0.50, piercing: -0.20, explosive: 0.90, summonerRange: 0.4, summonerCollision: 0.6 } },
    silver_cube_nm: { name: 'Silver Cube', baseHp: 15000, speed: 0.4, color: '#C0C0C0', size: 25, isQuantum: true, phaseTwoHp: 5000, phaseTwoBonusHp: 10000, phaseTwoSpeedMultiplier: 2, showHpBar: false, resistances: { global: 0.10, bullet: 0.30, laser: 1, piercing: -0.70, explosive: 0.80, summonerRange: 0.3, summonerCollision: 1 } },
    gargantuar_king_nm: { name: 'Gargantuar King', baseHp: 250000, shieldHp: 250000, speed: 0.24, color: '#800000', size: 35, hasShield: true, isBoss: true, isKing: true, showHpBar: true, resistances: { global: 0.10, bullet: 0.50, laser: -0.20, piercing: 0.35, explosive: 0.95, summonerRange: 0.1, summonerCollision: 0.5 } },
    // after w35
    ram_cube_nm: { name: 'Ram Cube-X', baseHp: 100000, shieldHp: 50000, speed: 0.26, color: '#CD5C5C', size: 42, hasShield: true, isBoss: true, insaneHp: 60000, insaneShield: 60000, insaneSpeed: 0.2, resistances: { global: 0.20, bullet: 0.70, laser: 0.70, piercing: -0.50, explosive: 0.40, summonerRange: 0.6, summonerCollision: 0.6 } },
    // before w40
    celgar_cube_nm: { name: 'General Celgar', baseHp: 1500000, shieldHp: 1000000, speed: 0.2, color: '#1f61e4ff', size: 60, hasShield: true, isBoss: false, showHpBar: true, resistances: { global: 0.1, bullet: 0.20, laser: 0.20, piercing: 0.20, explosive: 1, summonerRange: 0.2, summonerCollision: 0.2 } },
    // after w40
    emperor_cube_nm: { name: 'Emperor Cube', baseHp: 200000, shieldHp: 100000, speed: 0.275, color: '#ffffffff', size: 50, hasShield: true, isBoss: true, resistances: { global: 0.10, bullet: -0.20, laser: 0.80, piercing: -0.20, explosive: 0.3, summonerRange: 0.2, summonerCollision: 0.2 } },
    golden_titan_nm: { name: 'Golden Titan', baseHp: 150000, shieldHp: 350000, speed: 0.25, color: '#FFD700', size: 50, hasShield: true, isBoss: true, resistances: { global: 0.10, bullet: 0.80, laser: -0.20, piercing: -0.20, explosive: 0.3, summonerRange: 0.2, summonerCollision: 0.2 } },
    elite_necromancer_nm: { name: 'Elite Necromancer', baseHp: 100000, shieldHp: 100000, speed: 0.20, color: '#2D1B3D', size: 40, isSummoner: true, summonType: 'nmsummon2_nm', summoncooldown: 15000, summoncount: 2, hasShield: true, resistances: { global: 0.15, bullet: 0.25, laser: 0.10, piercing: -0.30, explosive: 0.40 } },
    nmsummon2_nm: { name: 'Elite Summoned Cube', baseHp: 20000, speed: 0.4, color: '#4A3A5C', size: 20, isSummoned: true, resistances: { global: 0.4, bullet: 0.40, laser: 0.20, piercing: 0, explosive: 1, summonerRange: 0.1, summonerCollision: 0.6 } },
    // w50 
    omega_cube_nm: { name: 'THE OMEGA CUBE', baseHp: 20000000, shieldHp: 5000000, speed: 0.125, color: '#ffffffff', size: 80, hasShield: true, isBoss: false, showHpBar: true, loopcount: 1, insaneLoopcount: 2, loopSummonType: 'omegasummon_nm', loopSummonCount: 2, isSummoner: true, resistances: { global: 0.10, bullet: 0.20, laser: 0.20, piercing: 0.1, explosive: 0.30, summonerRange: 0.2, summonerCollision: 0.2 } },
    omegasummon_nm: { name: 'Omega Summon', baseHp: 500000, speed: 0.35, color: '#ffffffff', size: 25, isBoss: true, isSummoned: true, summonType: 'omegasummon_nm', resistances: { global: 0.60, piercing: -0.40, summonerRange: 0.5, summonerCollision: 0.5 } },
    // Secret-Wave
    Lunar_Cube: { name: 'Lunar Cube', baseHp: 100000, shieldHp: 100000, speed: 0.3, color: '#ffffffff', size: 35, hasShield: true, isBoss: true, resistances: { global: 0.20, bullet: 0.40, laser: 0.40, piercing: 0.10, explosive: 0.5, summonerRange: 0.3, summonerCollision: 0.4 } },
    Lunar_Gargantuar: { name: 'Lunar Gargantuar', baseHp: 350000, shieldHp: 50000, speed: 0.2, color: '#ffffffff', size: 40, hasShield: true, isBoss: true, resistances: { global: 0.20, bullet: 0.30, laser: 0.30, piercing: 0.10, explosive: 0.4, summonerRange: 0.3, summonerCollision: 0.3 } },
    Lunar_Titan: { name: 'Lunar Titan Cube', baseHp: 1000000, shieldHp: 500000, speed: 0.265, color: '#ffffffff', size: 45, hasShield: true, isBoss: true, showHpBar: true, resistances: { global: 0.20, bullet: 0.40, laser: 0.40, piercing: 0.10, explosive: 0.5, summonerRange: 0.3, summonerCollision: 0.4 } },
    Moon_Cube: { name: 'The Moon Cube', baseHp: 10000000, shieldHp: 10000000, speed: 0.225, color: '#ffffff80', size: 60, hasShield: true, isBoss: false, showHpBar: true, loopcount: 1, insaneLoopcount: 2, isSummoner: true, resistances: { global: 0.20, bullet: 0.60, laser: 0.60, piercing: 0.2, explosive: 0.50, summonerRange: 0.6, summonerCollision: 0.6 } }

};

// Expose to window for command terminal
window.ENEMY_TYPES = ENEMY_TYPES;


// Omega Criterias:
// 1. Omega Cube must have 2 loops (this means it gets inside the base twice then after 3rd you lose)
// 2. Omega Cube must have 3 insane loops (this means it gets inside the base 3 times then after 4th you lose(only for straight line map)))
// 3. Omega Cube must summon after each loop (spawns instantly after spawned in w50)
// 4. each time he loops, or after he got spawned. He will instantly spawn 2 omegasummon_nm.
// 5. Omega Cube regens 1m shield hp every 60 seconds.
