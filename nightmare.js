// NIGHTMARE MODE Wave Definitions
// Format: Each wave has groups of enemies with spawn timing

function generateNightmareWaves() {
    const waves = [];

    // ===== EARLY GAME (Waves 1-15) =====
    waves.push(
        // Wave 1
        {
            groups: [
                { enemies: { yellow_cube_nm: 8 }, spawnInterval: 350, waitAfter: 0 }
            ],
            endWaitTime: 8000
        },
        // Wave 2
        {
            groups: [
                { enemies: { yellow_cube_nm: 8 }, spawnInterval: 350, waitAfter: 3000 },
                { enemies: { purple_cube_nm: 6 }, spawnInterval: 350, waitAfter: 0 }
            ],
            endWaitTime: 12000
        },
        // Wave 3
        {
            groups: [
                { enemies: { yellow_cube_nm: 10 }, spawnInterval: 250, waitAfter: 8000 },
                { enemies: { purple_cube_nm: 10 }, spawnInterval: 250, waitAfter: 0 }
            ],
            endWaitTime: 12000
        },
        // Wave 4
        {
            groups: [
                { enemies: { yellow_cube_nm: 12 }, spawnInterval: 250, waitAfter: 6000 },
                { enemies: { purple_cube_nm: 12 }, spawnInterval: 250, waitAfter: 6000 },
                { enemies: { green_cube_nm: 6 }, spawnInterval: 250, waitAfter: 0 }
            ],
            endWaitTime: 20000
        },
        // Wave 5
        {
            groups: [
                { enemies: { yellow_cube_nm: 14 }, spawnInterval: 250, waitAfter: 6000 },
                { enemies: { purple_cube_nm: 14 }, spawnInterval: 250, waitAfter: 4000 },
                { enemies: { green_cube_nm: 10 }, spawnInterval: 500, waitAfter: 0 }
            ],
            endWaitTime: 25000
        },
        // Wave 6
        {
            groups: [
                { enemies: { yellow_cube_nm: 8 }, spawnInterval: 250, waitAfter: 4000 },
                { enemies: { purple_cube_nm: 8 }, spawnInterval: 250, waitAfter: 4000 },
                { enemies: { green_cube_nm: 4 }, spawnInterval: 500, waitAfter: 2500 },
                { enemies: { boss_cube_insane: 1 }, spawnInterval: 500, waitAfter: 0 }
            ],
            endWaitTime: 6000
        },
        // Wave 7
        {
            groups: [
                { enemies: { green_cube_nm: 20 }, spawnInterval: 200, waitAfter: 16000 },
                { enemies: { boss_cube_insane: 2 }, spawnInterval: 1000, waitAfter: 0 }
            ],
            endWaitTime: 30000
        },
        // Wave 8
        {
            groups: [
                { enemies: { red_cube_insane: 20 }, spawnInterval: 200, waitAfter: 500 },
                { enemies: { blue_cube_insane: 15 }, spawnInterval: 250, waitAfter: 500 },
                { enemies: { gray_cube_insane: 14 }, spawnInterval: 300, waitAfter: 1000 },
                { enemies: { boss_cube_insane: 1 }, spawnInterval: 1000, waitAfter: 0 }
            ],
            endWaitTime: 12000
        },
        // Wave 9 - Green Square
        {
            groups: [
                { enemies: { green_square_1000: 1 }, spawnInterval: 500, waitAfter: 0 }
            ],
            endWaitTime: 8000
        },
        // Wave 10
        {
            groups: [
                { enemies: { boss_cube_insane: 3 }, spawnInterval: 1000, waitAfter: 0 }
            ],
            endWaitTime: 12000
        },
        // Wave 11
        {
            groups: [
                { enemies: { frozen_cube: 4 }, spawnInterval: 400, waitAfter: 500 },
                { enemies: { light_cube: 4 }, spawnInterval: 400, waitAfter: 0 }
            ],
            endWaitTime: 10000
        },
        // Wave 12
        {
            groups: [
                { enemies: { boss_cube_insane: 3 }, spawnInterval: 333, waitAfter: 6000 },
                { enemies: { golden_cube_nm: 1 }, spawnInterval: 1000, waitAfter: 0 }
            ],
            endWaitTime: 15000
        },
        // Wave 13
        {
            groups: [
                { enemies: { boss_cube_insane: 12 }, spawnInterval: 400, waitAfter: 0 },
            ],
            endWaitTime: 25000
        },
        // Wave 14
        {
            groups: [
                { enemies: { boss_cube_insane: 6 }, spawnInterval: 200, waitAfter: 5000 },
                { enemies: { golden_cube_nm: 1 }, spawnInterval: 1000, waitAfter: 0 }
            ],
            endWaitTime: 25000
        },
        // Wave 15
        {
            groups: [
                { enemies: { golden_cube_nm: 2 }, spawnInterval: 1000, waitAfter: 0 }
            ],
            endWaitTime: 15000
        },

        // ===== MID GAME (Waves 16-30) =====
        // Wave 16
        {
            groups: [
                { enemies: { gargantuar_x: 20 }, spawnInterval: 100, waitAfter: 0 }
            ],
            endWaitTime: 10000
        },
        // Wave 17
        {
            groups: [
                { enemies: { gargantuar_x: 6 }, spawnInterval: 1000, waitAfter: 5000 },
                { enemies: { light_cube: 20 }, spawnInterval: 300, waitAfter: 0 }
            ],
            endWaitTime: 12500
        },
        // Wave 18
        {
            groups: [
                { enemies: { icarus_cube: 10 }, spawnInterval: 200, waitAfter: 6000 },
                { enemies: { gargantuar_x: 4 }, spawnInterval: 1000, waitAfter: 0 }
            ],
            endWaitTime: 12500
        },
        // Wave 19
        {
            groups: [
                { enemies: { green_square_1000: 1 }, spawnInterval: 500, waitAfter: 0 }
            ],
            endWaitTime: 12000
        },
        // Wave 20
        {
            groups: [
                { enemies: { gargantuar_x: 10 }, spawnInterval: 250, waitAfter: 5000 },
                { enemies: { icarus_cube: 5 }, spawnInterval: 200, waitAfter: 2000 },
                { enemies: { boss_cube_insane: 6 }, spawnInterval: 200, waitAfter: 8000 },
                { enemies: { golden_cube_nm: 1 }, spawnInterval: 500, waitAfter: 12000 },
                { enemies: { berserker_cube_nm: 1 }, spawnInterval: 800, waitAfter: 0 },
            ],
            endWaitTime: 62000
        },
        // Wave 21
        {
            groups: [
                { enemies: { frozen_cube_nm: 5 }, spawnInterval: 500, waitAfter: 250 },
                { enemies: { lava_cube_nm: 5 }, spawnInterval: 500, waitAfter: 0 }
            ],
            endWaitTime: 12000
        },
        // Wave 22
        {
            groups: [
                { enemies: { golden_cube_nm: 3 }, spawnInterval: 500, waitAfter: 0 },
            ],
            endWaitTime: 15000
        },
        // Wave 23
        {
            groups: [
                { enemies: { frozen_cube_nm: 20 }, spawnInterval: 500, waitAfter: 250 },
                { enemies: { lava_cube_nm: 20 }, spawnInterval: 500, waitAfter: 250 },
                { enemies: { boss_cube_insane: 5 }, spawnInterval: 1000, waitAfter: 0 },

            ],
            endWaitTime: 16000
        },
        // Wave 24
        {
            groups: [
                { enemies: { lightning_boss_cube: 4 }, spawnInterval: 1000, waitAfter: 0 },
            ],
            endWaitTime: 4000
        },
        // Wave 25
        {
            groups: [
                { enemies: { necromancer_nm: 1 }, spawnInterval: 0, waitAfter: 0 }
            ],
            endWaitTime: 14000
        },
        // Wave 26
        {
            groups: [
                { enemies: { unstable_crystal_nm: 6 }, spawnInterval: 1000, waitAfter: 0 }
            ],
            endWaitTime: 12000
        },
        // Wave 27
        {
            groups: [
                { enemies: { unstable_crystal_nm: 8 }, spawnInterval: 1000, waitAfter: 0 },
                { enemies: { frozen_cube_nm: 11 }, spawnInterval: 5250, waitAfter: 250 },
                { enemies: { lava_cube_nm: 11 }, spawnInterval: 500, waitAfter: 0 }
            ],
            endWaitTime: 30000
        },
        // Wave 28
        {
            groups: [
                { enemies: { necromancer_nm: 3 }, spawnInterval: 1000, waitAfter: 0 },
                { enemies: { unstable_crystal_nm: 10 }, spawnInterval: 200, waitAfter: 0 }
            ],
            endWaitTime: 45000
        },
        // Wave 29
        {
            groups: [
                { enemies: { green_square_2500: 2 }, spawnInterval: 500, waitAfter: 0 }
            ],
            endWaitTime: 15000
        },
        // Wave 30
        {
            groups: [
                { enemies: { gargantuar_x: 20 }, spawnInterval: 100, waitAfter: 2000 },
                { enemies: { gargantuar_z: 5 }, spawnInterval: 500, waitAfter: 8000 },
                { enemies: { gargantuar_king: 1 }, spawnInterval: 0, waitAfter: 0 }
            ],
            endWaitTime: 60000
        },
        // ===== LATE GAME (Waves 31-50) =====
        // Wave 31
        {
            groups: [
                { enemies: { obsidian_cube_nm: 5 }, spawnInterval: 1000, waitAfter: 0 },
            ],
            endWaitTime: 15000
        },
        // Wave 32
        {
            groups: [
                { enemies: { obsidian_cube_nm: 8 }, spawnInterval: 500, waitAfter: 6000 },
                { enemies: { necromancer_nm: 6 }, spawnInterval: 200, waitAfter: 0 }
            ],
            endWaitTime: 20000
        },
        // Wave 33
        {
            groups: [
                { enemies: { silver_cube_nm: 3 }, spawnInterval: 2000, waitAfter: 0 },

            ],
            endWaitTime: 15000
        },
        // Wave 34
        {
            groups: [
                { enemies: { shielder_cube_nm: 1 }, spawnInterval: 1000, waitAfter: 0 },
                { enemies: { obsidian_cube_nm: 3 }, spawnInterval: 333, waitAfter: 0 }
            ],
            endWaitTime: 17500
        },
        // Wave 35
        {
            groups: [
                { enemies: { ram_cube_nm: 3 }, spawnInterval: 800, waitAfter: 1000 },
            ],
            endWaitTime: 15000
        },
        // Wave 36
        {
            groups: [
                { enemies: { corrupted_red_cube: 20 }, spawnInterval: 150, waitAfter: 500 },
                { enemies: { corrupted_blue_cube: 20 }, spawnInterval: 200, waitAfter: 500 },
                { enemies: { corrupted_gray_cube: 20 }, spawnInterval: 250, waitAfter: 0 }
            ],
            endWaitTime: 25000
        },
        // Wave 37
        {
            groups: [
                { enemies: { obsidian_cube_nm: 5 }, spawnInterval: 333, waitAfter: 0 },
                { enemies: { ram_cube_nm: 1 }, spawnInterval: 800, waitAfter: 1000 },
                { enemies: { silver_cube_nm: 4 }, spawnInterval: 2000, waitAfter: 0 },
                { enemies: { shielder_cube_nm: 2 }, spawnInterval: 1000, waitAfter: 1000 },
            ],
            endWaitTime: 18000
        },
        // Wave 38
        {
            groups: [
                { enemies: { green_square_5000: 4 }, spawnInterval: 500, waitAfter: 0 }
            ],
            endWaitTime: 2000
        },
        // Wave 39
        {
            groups: [
                { enemies: { ram_cube_nm: 6 }, spawnInterval: 500, waitAfter: 0 },
            ],
            endWaitTime: 30000
        },
        // Wave 40
        {
            groups: [
                { enemies: { ram_cube_nm: 2 }, spawnInterval: 500, waitAfter: 6000 },
                { enemies: { celgar_cube_nm: 1 }, spawnInterval: 666, waitAfter: 0 },
            ],
            endWaitTime: 80000
        },
        // Wave 41
        {
            groups: [
                { enemies: { elite_necromancer_nm: 1 }, spawnInterval: 200, waitAfter: 10000 },
                { enemies: { emperor_cube_nm: 3 }, spawnInterval: 1000, waitAfter: 0 },
            ],
            endWaitTime: 20000
        },
        // Wave 42
        {
            groups: [
                { enemies: { emperor_cube_nm: 3 }, spawnInterval: 1000, waitAfter: 200 },
                { enemies: { golden_titan_nm: 3 }, spawnInterval: 1000, waitAfter: 0 },
            ],
            endWaitTime: 20000
        },
        // Wave 43
        {
            groups: [
                { enemies: { ram_cube_nm: 8 }, spawnInterval: 1000, waitAfter: 6000 },
                { enemies: { shielder_cube_nm: 4 }, spawnInterval: 1000, waitAfter: 0 },
            ],
            endWaitTime: 26000
        },
        // Wave 44
        {
            groups: [
                { enemies: { hidden_icarus_cube: 5 }, spawnInterval: 1000, waitAfter: 1000 },
                { enemies: { emperor_cube_nm: 4 }, spawnInterval: 1000, waitAfter: 200 },
                { enemies: { golden_titan_nm: 4 }, spawnInterval: 1000, waitAfter: 0 },
            ],
            endWaitTime: 32000
        },
        // Wave 45
        {
            groups: [
                { enemies: { ram_cube_nm: 10 }, spawnInterval: 250, waitAfter: 5000 },
                { enemies: { true_void: 1 }, spawnInterval: 1000, waitAfter: 0 }
            ],
            endWaitTime: 35000
        },
        // Wave 46 --- Final Wave
        {
            groups: [
                { enemies: { green_square_5000: 10 }, spawnInterval: 100, waitAfter: 1000 },
                { enemies: { ram_cube_nm: 4 }, spawnInterval: 250, waitAfter: 3000 },
                { enemies: { hidden_icarus_cube: 5 }, spawnInterval: 1000, waitAfter: 7000 },
                { enemies: { emperor_cube_nm: 2 }, spawnInterval: 4000, waitAfter: 8000 },
                { enemies: { golden_titan_nm: 2 }, spawnInterval: 4000, waitAfter: 12000 },
                { enemies: { elite_necromancer_nm: 3 }, spawnInterval: 1500, waitAfter: 30000 },
                { enemies: { omega_cube_nm: 1 }, spawnInterval: 1000, waitAfter: 0 }

            ],
            endWaitTime: 360000
        },
    );

    return waves;
}
