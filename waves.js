// Wave Definitions for Different Game Modes
// Organized by: Early Game (1-15), Mid Game (16-30), Late Game (31-40/50)

// Helper function to generate wave configurations
function generateWaves(mode) {
    const waves = [];
    
    if (mode === 'NORMAL') {
        // ===== EARLY GAME (Waves 1-15) =====
        waves.push(
            { red_cube: 5 },
            { red_cube: 8, blue_cube: 2 },
            { red_cube: 6, blue_cube: 4 },
            { red_cube: 10, blue_cube: 5 },
            { red_cube: 8, blue_cube: 6, gray_cube: 2 },
            { red_cube: 12, blue_cube: 8, gray_cube: 3 },
            { red_cube: 10, blue_cube: 10, gray_cube: 5 },
            { red_cube: 15, blue_cube: 12, gray_cube: 6, boss_cube: 1 },
            { green_square_500: 1 },
            { red_cube: 20, blue_cube: 15, gray_cube: 8, boss_cube: 2 },
            { crystal_cube: 5, eclise_cube: 5 },
            { red_cube: 25, blue_cube: 20, crystal_cube: 8 },
            { boss_cube: 5, crystal_cube: 10 },
            { red_cube: 30, blue_cube: 25, gray_cube: 15, eclise_cube: 10 },
            { slow_boss_cube: 1 }
        );
        
        // ===== MID GAME (Waves 16-30) =====
        waves.push(
            { red_cube: 35, blue_cube: 30, gray_cube: 20, crystal_cube: 15 },
            { fast_boss_cube: 2, eclise_cube: 20 },
            { lava_cube: 15, crystal_cube: 20 },
            { green_square_1000: 1 },
            { red_cube: 40, blue_cube: 35, lava_cube: 20, eclise_cube: 25 },
            { crystal_boss_cube: 1 },
            { gargantuar: 1, boss_cube: 5 },
            { red_cube: 50, blue_cube: 40, gray_cube: 30, lava_cube: 25 },
            { eclise_boss_cube: 1, fast_boss_cube: 2 },
            { crystal_cube: 40, lava_cube: 30, eclise_cube: 30 },
            { slow_boss_cube: 2, fast_boss_cube: 2 },
            { gargantuar: 2, crystal_boss_cube: 1 },
            { red_cube: 60, blue_cube: 50, gray_cube: 40, lava_cube: 35 },
            { green_square_2500: 1 },
            { guardian_cube: 1 }
        );
        
        // ===== LATE GAME (Waves 31-40) =====
        waves.push(
            { eclise_boss_cube: 2, crystal_boss_cube: 2 },
            { gargantuar: 3, slow_boss_cube: 2 },
            { red_cube: 80, blue_cube: 70, gray_cube: 60, lava_cube: 50 },
            { fast_boss_cube: 4, eclise_boss_cube: 3 },
            { guardian_cube: 1, gargantuar: 2 },
            { crystal_cube: 60, lava_cube: 50, eclise_cube: 50 },
            { slow_boss_cube: 3, crystal_boss_cube: 3 },
            { green_square_5000: 1 },
            { gargantuar: 5, guardian_cube: 1 },
            { crysalized_cube: 1 } // Final boss
        );
        
    } else if (mode === 'HARDMODE') {
        // ===== EARLY GAME (Waves 1-15) =====
        waves.push(
            { red_cube_hard: 6 },
            { red_cube_hard: 10, blue_cube_hard: 3 },
            { red_cube_hard: 8, blue_cube_hard: 6 },
            { red_cube_hard: 12, blue_cube_hard: 8 },
            { red_cube_hard: 10, blue_cube_hard: 8, gray_cube_hard: 3 },
            { red_cube_hard: 15, blue_cube_hard: 12, gray_cube_hard: 5 },
            { red_cube_hard: 12, blue_cube_hard: 15, gray_cube_hard: 8 },
            { red_cube_hard: 20, blue_cube_hard: 18, gray_cube_hard: 10, boss_cube_hard: 1 },
            { green_square_500: 1 },
            { red_cube_hard: 25, blue_cube_hard: 20, gray_cube_hard: 12, boss_cube_hard: 2 },
            { crystal_cube_hard: 8, lightning_cube: 6 },
            { red_cube_hard: 30, blue_cube_hard: 25, crystal_cube_hard: 12 },
            { boss_cube_hard: 6, crystal_cube_hard: 15 },
            { red_cube_hard: 35, blue_cube_hard: 30, gray_cube_hard: 20, lightning_cube: 15 },
            { slow_boss_cube_hard: 1 }
        );
        
        // ===== MID GAME (Waves 16-30) =====
        waves.push(
            { red_cube_hard: 40, blue_cube_hard: 35, gray_cube_hard: 25, crystal_cube_hard: 20 },
            { fast_boss_cube_hard: 2, lightning_cube: 25 },
            { lava_cube_hard: 20, crystal_cube_hard: 25 },
            { green_square_1000: 1 },
            { red_cube_hard: 45, blue_cube_hard: 40, lava_cube_hard: 25, lightning_cube: 30 },
            { crystal_boss_cube_hard: 1 },
            { gargantuar_x: 1, boss_cube_hard: 6 },
            { red_cube_hard: 55, blue_cube_hard: 50, gray_cube_hard: 35, lava_cube_hard: 30 },
            { eclise_boss_cube_hard: 1, fast_boss_cube_hard: 3 },
            { crystal_cube_hard: 50, lava_cube_hard: 40, lightning_cube: 40 },
            { slow_boss_cube_hard: 2, fast_boss_cube_hard: 3 },
            { gargantuar_x: 2, crystal_boss_cube_hard: 2 },
            { red_cube_hard: 70, blue_cube_hard: 60, gray_cube_hard: 50, lava_cube_hard: 45 },
            { green_square_2500: 1 },
            { guardian_cube_2: 1 }
        );
        
        // ===== LATE GAME (Waves 31-40) =====
        waves.push(
            { eclise_boss_cube_hard: 2, crystal_boss_cube_hard: 3 },
            { gargantuar_x: 3, slow_boss_cube_hard: 3 },
            { red_cube_hard: 90, blue_cube_hard: 80, gray_cube_hard: 70, lava_cube_hard: 60 },
            { fast_boss_cube_hard: 5, eclise_boss_cube_hard: 4 },
            { guardian_cube_2: 1, gargantuar_x: 3 },
            { crystal_cube_hard: 80, lava_cube_hard: 70, lightning_cube: 60 },
            { slow_boss_cube_hard: 4, crystal_boss_cube_hard: 4 },
            { green_square_5000: 1 },
            { gargantuar_x: 6, zeltron_cube: 1 },
            { crystalized_titan_cube: 1 } // Final boss
        );
        
    } else if (mode === 'INSANE') {
        // ===== EARLY GAME (Waves 1-15) =====
        waves.push(
            { red_cube_insane: 6 },
            { red_cube_insane: 8, blue_cube_insane: 4 },
            { red_cube_insane: 10, blue_cube_insane: 8 },
            { red_cube_insane: 15, blue_cube_insane: 12 },
            { red_cube_insane: 10, blue_cube_insane: 10, gray_cube_insane: 5 },
            { red_cube_insane: 18, blue_cube_insane: 15, gray_cube_insane: 8 },
            { red_cube_insane: 15, blue_cube_insane: 18, gray_cube_insane: 12 },
            { red_cube_insane: 20, blue_cube_insane: 15, gray_cube_insane: 14, boss_cube_insane: 1 },
            { green_square_500: 1 },
            { red_cube_insane: 25, blue_cube_insane: 20, gray_cube_insane: 15, boss_cube_insane: 3 },
            { frozen_cube: 4, light_cube: 4 },
            { frozen_cube: 15 },
            { boss_cube_insane: 8, frozen_cube: 20 },
            { red_cube_insane: 10, blue_cube_insane: 10, gray_cube_insane: 10, light_cube: 5 },
            { destructor_cube: 1 }
        );
        
        // ===== MID GAME (Waves 16-30) =====
        waves.push(
            { light_cube: 15 }, // 16
            { destructor_boss_cube: 1, light_cube: 20 }, // 17
            { icarus_cube: 25, frozen_cube: 30 }, // 18
            { green_square_1000: 1 }, // 19
            { red_cube_insane: 60, blue_cube_insane: 55, icarus_cube: 30, light_cube: 35 }, // 20
            { frost_boss_cube: 1 }, // 21
            { gargantuar_z: 1, boss_cube_insane: 10 }, // 22
            { red_cube_insane: 70, blue_cube_insane: 65, gray_cube_insane: 50, icarus_cube: 40 }, // 23
            { lightning_boss_cube: 2, destructor_cube: 2 }, // 24
            { frozen_cube: 60, icarus_cube: 50, light_cube: 50 }, // 25
            { lord_cube: 1 }, // 26
            { gargantuar_z: 2, frost_boss_cube: 2 }, // 27
            { corrupted_red_cube: 20, corrupted_blue_cube: 15, corrupted_gray_cube: 5 }, // 28
            { green_square_2500: 1 }, // 29
            { king_slow_cube: 1, king_fast_cube: 1 }, // 30
        );
        
        // ===== LATE GAME (Waves 31-50) =====
        waves.push(
            { lightning_boss_cube: 3, frost_boss_cube: 3 }, // 31
            { gargantuar_z: 4, destructor_boss_cube: 2 }, // 32
            { corrupted_red_cube: 30, corrupted_blue_cube: 25, corrupted_gray_cube: 10 }, // 33
            { hidden_icarus_cube: 1 }, // 34
            { ram_cube: 5, icarus_cube: 60 }, // 35
            { titan_cube: 1 }, // 36
            { celgar_cube: 2, gargantuar_z: 5 }, // 37
            { green_square_5000: 1 }, // 38
            { corrupted_red_cube: 40, corrupted_blue_cube: 30, corrupted_gray_cube: 20 }, // 39
            { corrupted_titan_cube: 1 }, // 40
            { ram_cube: 4, celgar_cube: 6 }, // 41
            { celgar_cube: 5 }, // 42
            { manager_cube: 1 }, // 43
            { hidden_icarus_cube: 1, manager_cube: 1 }, // 44
            { gargantuar_z: 10, celgar_cube: 3 }, // 45
            { corrupted_red_cube: 20, corrupted_blue_cube: 15, corrupted_gray_cube: 10 }, // 46
            { ram_cube: 10 }, //47
            { green_square_5000: 3 }, //48
            { hidden_icarus_cube: 3 }, //49
            { manager_cube: 2, void_cube: 1 } // Final boss
        );
        
    }
    return waves;
}

// Generate waves for each mode
const NORMAL_WAVES = generateWaves('NORMAL');
const HARDMODE_WAVES = generateWaves('HARDMODE');
const INSANE_WAVES = generateWaves('INSANE');
