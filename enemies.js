// Enemy Types Configuration
// Organized by difficulty: Normal, Hard, Insane

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
    crystal_cube_hard: { name: 'Crystal Cube', baseHp: 75, speed: 0.425, color: '#00FFFF', size: 24 },
    lightning_cube: { name: 'Lightning Cube', baseHp: 120, speed: 0.65, color: '#FFFF00', size: 22 },
    slow_boss_cube_hard: { name: 'Slow Boss Cube', baseHp: 1600, speed: 0.25, color: '#2F4F4F', size: 35, isBoss: true },
    fast_boss_cube_hard: { name: 'Fast Boss Cube', baseHp: 500, speed: 0.5, color: '#FF4500', size: 32, isBoss: true },
    crystal_boss_cube_hard: { name: 'Crystal Boss Cube', baseHp: 2500, speed: 0.4, color: '#00CED1', size: 38, isBoss: true },
    gargantuar_x: { name: 'Gargantuar-X', baseHp: 600, shieldHp: 400, speed: 0.38, color: '#654321', size: 42, hasShield: true, isBoss: true },
    eclise_boss_cube_hard: { name: 'Eclise Boss Cube', baseHp: 1000, speed: 0.6, color: '#9400D3', size: 36, isBoss: true },
    lava_cube_hard: { name: 'Lava Cube', baseHp: 125, speed: 0.5, color: '#FF6347', size: 26 },
    guardian_cube_2: { name: 'Guardian Cube-2', baseHp: 15000, speed: 0.5, color: '#FFD700', size: 44, isBoss: true },
    zeltron_cube: { name: 'Zeltron Cube', baseHp: 35000, speed: 0.45, color: '#00FF7F', size: 46, isBoss: true, showHpBar: true },
    crystalized_titan_cube: { name: 'Crystalized Titan Cube', baseHp: 250000, speed: 0.32, color: '#B0E0E6', size: 50, isBoss: true, isKing: true, showHpBar: true },
    
    // ===== INSANE MODE ENEMIES =====
    red_cube_insane: { name: 'Red Cube', baseHp: 10, speed: 0.4, color: '#FF0000', size: 20 },
    blue_cube_insane: { name: 'Blue Cube', baseHp: 12, speed: 0.55, color: '#0000FF', size: 18 },
    gray_cube_insane: { name: 'Gray Cube', baseHp: 50, speed: 0.25, color: '#808080', size: 22 },
    boss_cube_insane: { name: 'Boss Cube', baseHp: 500, speed: 0.2, color: '#8B0000', size: 30 },
    frozen_cube: { name: 'Frozen Cube', baseHp: 150, speed: 0.35, color: '#87CEEB', size: 24 },
    light_cube: { name: 'Light Cube', baseHp: 100, speed: 1.2, color: '#FFFACD', size: 18 },
    destructor_cube: { name: 'Destructor Cube', baseHp: 4000, shieldHp: 1000, speed: 0.34, color: '#DC143C', size: 36, hasShield: true, showHpBar: true },
    destructor_boss_cube: { name: 'Destructor Boss Cube', baseHp: 8000, shieldHp: 2000, speed: 0.25, color: '#B22222', size: 42, hasShield: true, isBoss: true },
    frost_boss_cube: { name: 'Frost Boss Cube', baseHp: 5000, speed: 0.3, color: '#ADD8E6', size: 40, isBoss: true },
    gargantuar_z: { name: 'Gargantuar-Z', baseHp: 6500, shieldHp: 1500, speed: 0.5, color: '#8B0000', size: 45, hasShield: true, isBoss: true },
    lightning_boss_cube: { name: 'Lightning Boss Cube', baseHp: 850, speed: 0.75, color: '#FFD700', size: 34, isBoss: true },
    king_slow_cube: { name: 'King Alpha Cube', baseHp: 54000, shieldHp: 6000, speed: 0.3, color: '#483D8B', size: 45, hasShield: true, isBoss: true, isKing: true, showHpBar: true, insaneHp: 20000, insaneShield: 7000, insaneSpeed: 0.3  },
    king_fast_cube: { name: 'King Beta Cube', baseHp: 35000, shieldHp: 5000, speed: 0.3, color: '#FF1493', size: 45, hasShield: true, isBoss: true, isKing: true, showHpBar: true, insaneHp: 20000, insaneShield: 7000, insaneSpeed: 0.3  },
    lord_cube: { name: 'Lord Cube', baseHp: 20000, shieldHp: 10000, speed: 0.2, color: '#be511fff', size: 45, hasShield: true, isBoss: true, isKing: true, showHpBar: true, insaneHp: 30000, insaneShield: 5000, insaneSpeed: 0.1  },
    icarus_cube: { name: 'Icarus Cube', baseHp: 1000, speed: 0.35, color: '#FFA500', size: 26 },
    hidden_icarus_cube: { name: 'Hidden Icarus Cube', baseHp: 120000, shieldHp: 30000, speed: 0.5, color: '#FF8C00', size: 50, hasShield: true, isBoss: true, isKing: true },
    titan_cube: { name: 'Titan Cube', baseHp: 150000, shieldHp: 50000, speed: 0.3, color: '#000000', size: 40, hasShield: true, isBoss: true, isKing: true, showHpBar: true, insaneHp: 125000, insaneShield: 125000, insaneSpeed: 0.25 },
    corrupted_red_cube: { name: 'Corrupted Red Cube', baseHp: 6500, speed: 0.3, color: '#8B0000', size: 28 },
    corrupted_blue_cube: { name: 'Corrupted Blue Cube', baseHp: 4000, speed: 0.35, color: '#00008B', size: 25 },
    corrupted_gray_cube: { name: 'Corrupted Gray Cube', baseHp: 30000, speed: 0.25, color: '#2F4F4F', size: 32 },
    corrupted_titan_cube: { name: 'Corrupted Titan Cube', baseHp: 520000, shieldHp: 80000, speed: 0.25, color: '#191970', size: 55, hasShield: true, isBoss: true, isKing: true, showHpBar: true, insaneHp: 600000, insaneShield: 400000, insaneSpeed: 0.1 },
    ram_cube: { name: 'Ram Cube', baseHp: 20000, shieldHp: 80000, speed: 0.26 , color: '#CD5C5C', size: 42, hasShield: true, isBoss: true, insaneHp: 20000, insaneShield: 60000, insaneSpeed: 0.2  },
    celgar_cube: { name: 'Celgar Cube', baseHp: 60000, shieldHp: 20000, speed: 0.32, color: '#4682B4', size: 40, hasShield: true, isBoss: true, insaneHp: 40000, insaneShield: 20000, insaneSpeed: 0.3 },
    manager_cube: { name: 'Manager Cube', baseHp: 125000, speed: 0.5, color: '#9370DB', size: 46, isBoss: true, isKing: true },
    void_cube: { name: 'THE VOID CUBE', baseHp: 1600000, shieldHp: 400000, speed: 0.1, color: '#000000', size: 60, hasShield: true, isBoss: true, isKing: true, showHpBar: true, insaneHp: 5000000, insaneShield: 0, insaneSpeed: 0.065 },
    
    // ===== BONUS ENEMIES (Cash rewards) =====
    green_square_500: { name: 'Green Square', baseHp: 100, speed: 0.8, color: '#00FF00', size: 25, cashReward: 500 },
    green_square_1000: { name: 'Green Square', baseHp: 100, speed: 0.8, color: '#00FF00', size: 25, cashReward: 1000 },
    green_square_2500: { name: 'Green Square', baseHp: 100, speed: 0.8, color: '#00FF00', size: 25, cashReward: 2500 },
    green_square_5000: { name: 'Green Square', baseHp: 100, speed: 0.8, color: '#00FF00', size: 25, cashReward: 5000 },

    // ===== TEST DUMMY =====
    test_dummy: { name: 'Test Dummy', baseHp: 10000000, speed: 0.1, color: '#FFD700', size: 50, isBoss: true, showHpBar: true, isTestDummy: true }
};
