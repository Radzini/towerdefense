// INSANE MODE Wave Definitions
// Format: Each wave has groups of enemies with spawn timing

function generateInsaneWaves() {
    const waves = [];

    // ===== EARLY GAME (Waves 1-15) =====
    waves.push(
        // Wave 1
        {
            groups: [
                { enemies: { red_cube_insane: 6 }, spawnInterval: 300, waitAfter: 0 }
            ],
            endWaitTime: 5000
        },
        // Wave 2
        {
            groups: [
                { enemies: { red_cube_insane: 8 }, spawnInterval: 300, waitAfter: 500 },
                { enemies: { blue_cube_insane: 4 }, spawnInterval: 350, waitAfter: 0 }
            ],
            endWaitTime: 5000
        },
        // Wave 3
        {
            groups: [
                { enemies: { red_cube_insane: 10 }, spawnInterval: 250, waitAfter: 500 },
                { enemies: { blue_cube_insane: 8 }, spawnInterval: 300, waitAfter: 0 }
            ],
            endWaitTime: 5000
        },
        // Wave 4
        {
            groups: [
                { enemies: { red_cube_insane: 15 }, spawnInterval: 250, waitAfter: 500 },
                { enemies: { blue_cube_insane: 12 }, spawnInterval: 300, waitAfter: 0 }
            ],
            endWaitTime: 6000
        },
        // Wave 5
        {
            groups: [
                { enemies: { red_cube_insane: 10 }, spawnInterval: 250, waitAfter: 500 },
                { enemies: { blue_cube_insane: 10 }, spawnInterval: 300, waitAfter: 500 },
                { enemies: { gray_cube_insane: 5 }, spawnInterval: 400, waitAfter: 0 }
            ],
            endWaitTime: 6000
        },
        // Wave 6
        {
            groups: [
                { enemies: { red_cube_insane: 18 }, spawnInterval: 200, waitAfter: 500 },
                { enemies: { blue_cube_insane: 15 }, spawnInterval: 250, waitAfter: 500 },
                { enemies: { gray_cube_insane: 8 }, spawnInterval: 350, waitAfter: 0 }
            ],
            endWaitTime: 6000
        },
        // Wave 7
        {
            groups: [
                { enemies: { red_cube_insane: 15 }, spawnInterval: 200, waitAfter: 500 },
                { enemies: { blue_cube_insane: 18 }, spawnInterval: 250, waitAfter: 500 },
                { enemies: { gray_cube_insane: 12 }, spawnInterval: 350, waitAfter: 0 }
            ],
            endWaitTime: 7000
        },
        // Wave 8
        {
            groups: [
                { enemies: { red_cube_insane: 20 }, spawnInterval: 200, waitAfter: 500 },
                { enemies: { blue_cube_insane: 15 }, spawnInterval: 250, waitAfter: 500 },
                { enemies: { gray_cube_insane: 14 }, spawnInterval: 300, waitAfter: 1000 },
                { enemies: { boss_cube_insane: 1 }, spawnInterval: 1000, waitAfter: 0 }
            ],
            endWaitTime: 8000
        },
        // Wave 9 - Green Square
        {
            groups: [
                { enemies: { green_square_500: 1 }, spawnInterval: 500, waitAfter: 0 }
            ],
            endWaitTime: 8000
        },
        // Wave 10
        {
            groups: [
                { enemies: { red_cube_insane: 25 }, spawnInterval: 150, waitAfter: 500 },
                { enemies: { blue_cube_insane: 20 }, spawnInterval: 200, waitAfter: 500 },
                { enemies: { gray_cube_insane: 15 }, spawnInterval: 250, waitAfter: 1000 },
                { enemies: { boss_cube_insane: 3 }, spawnInterval: 1000, waitAfter: 0 }
            ],
            endWaitTime: 8000
        },
        // Wave 11
        {
            groups: [
                { enemies: { frozen_cube: 4 }, spawnInterval: 400, waitAfter: 500 },
                { enemies: { light_cube: 4 }, spawnInterval: 400, waitAfter: 0 }
            ],
            endWaitTime: 8000
        },
        // Wave 12
        {
            groups: [
                { enemies: { frozen_cube: 15 }, spawnInterval: 350, waitAfter: 0 }
            ],
            endWaitTime: 8000
        },
        // Wave 13
        {
            groups: [
                { enemies: { boss_cube_insane: 8 }, spawnInterval: 800, waitAfter: 1000 },
                { enemies: { frozen_cube: 20 }, spawnInterval: 300, waitAfter: 0 }
            ],
            endWaitTime: 10000
        },
        // Wave 14
        {
            groups: [
                { enemies: { red_cube_insane: 10 }, spawnInterval: 150, waitAfter: 500 },
                { enemies: { blue_cube_insane: 10 }, spawnInterval: 200, waitAfter: 500 },
                { enemies: { gray_cube_insane: 10 }, spawnInterval: 250, waitAfter: 500 },
                { enemies: { light_cube: 5 }, spawnInterval: 350, waitAfter: 0 }
            ],
            endWaitTime: 10000
        },
        // Wave 15
        {
            groups: [
                { enemies: { destructor_cube: 1 }, spawnInterval: 1000, waitAfter: 0 }
            ],
            endWaitTime: 10000
        },

        // ===== MID GAME (Waves 16-30) =====
        // Wave 16
        {
            groups: [
                { enemies: { light_cube: 15 }, spawnInterval: 300, waitAfter: 0 }
            ],
            endWaitTime: 10000
        },
        // Wave 17
        {
            groups: [
                { enemies: { destructor_boss_cube: 1 }, spawnInterval: 1000, waitAfter: 1000 },
                { enemies: { light_cube: 20 }, spawnInterval: 300, waitAfter: 0 }
            ],
            endWaitTime: 10000
        },
        // Wave 18
        {
            groups: [
                { enemies: { icarus_cube: 25 }, spawnInterval: 300, waitAfter: 500 },
                { enemies: { frozen_cube: 30 }, spawnInterval: 300, waitAfter: 0 }
            ],
            endWaitTime: 10000
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
                { enemies: { red_cube_insane: 60 }, spawnInterval: 150, waitAfter: 500 },
                { enemies: { blue_cube_insane: 55 }, spawnInterval: 150, waitAfter: 500 },
                { enemies: { icarus_cube: 30 }, spawnInterval: 250, waitAfter: 500 },
                { enemies: { light_cube: 35 }, spawnInterval: 250, waitAfter: 0 }
            ],
            endWaitTime: 12000
        },
        // Wave 21
        {
            groups: [
                { enemies: { frost_boss_cube: 1 }, spawnInterval: 1000, waitAfter: 0 }
            ],
            endWaitTime: 12000
        },
        // Wave 22
        {
            groups: [
                { enemies: { gargantuar_z: 1 }, spawnInterval: 1000, waitAfter: 1000 },
                { enemies: { boss_cube_insane: 10 }, spawnInterval: 600, waitAfter: 0 }
            ],
            endWaitTime: 12000
        },
        // Wave 23
        {
            groups: [
                { enemies: { red_cube_insane: 70 }, spawnInterval: 150, waitAfter: 500 },
                { enemies: { blue_cube_insane: 65 }, spawnInterval: 150, waitAfter: 500 },
                { enemies: { gray_cube_insane: 50 }, spawnInterval: 200, waitAfter: 500 },
                { enemies: { icarus_cube: 40 }, spawnInterval: 250, waitAfter: 0 }
            ],
            endWaitTime: 12000
        },
        // Wave 24
        {
            groups: [
                { enemies: { lightning_boss_cube: 2 }, spawnInterval: 1000, waitAfter: 1000 },
                { enemies: { destructor_cube: 2 }, spawnInterval: 1000, waitAfter: 0 }
            ],
            endWaitTime: 12000
        },
        // Wave 25
        {
            groups: [
                { enemies: { frozen_cube: 60 }, spawnInterval: 200, waitAfter: 500 },
                { enemies: { icarus_cube: 50 }, spawnInterval: 200, waitAfter: 500 },
                { enemies: { light_cube: 50 }, spawnInterval: 200, waitAfter: 0 }
            ],
            endWaitTime: 12000
        },
        // Wave 26
        {
            groups: [
                { enemies: { lord_cube: 1 }, spawnInterval: 1000, waitAfter: 0 }
            ],
            endWaitTime: 12000
        },
        // Wave 27
        {
            groups: [
                { enemies: { gargantuar_z: 2 }, spawnInterval: 1000, waitAfter: 1000 },
                { enemies: { frost_boss_cube: 2 }, spawnInterval: 1000, waitAfter: 0 }
            ],
            endWaitTime: 15000
        },
        // Wave 28
        {
            groups: [
                { enemies: { corrupted_red_cube: 20 }, spawnInterval: 200, waitAfter: 500 },
                { enemies: { corrupted_blue_cube: 15 }, spawnInterval: 250, waitAfter: 500 },
                { enemies: { corrupted_gray_cube: 5 }, spawnInterval: 300, waitAfter: 0 }
            ],
            endWaitTime: 15000
        },
        // Wave 29
        {
            groups: [
                { enemies: { green_square_2500: 1 }, spawnInterval: 500, waitAfter: 0 }
            ],
            endWaitTime: 15000
        },
        // Wave 30
        {
            groups: [
                { enemies: { king_slow_cube: 1 }, spawnInterval: 1000, waitAfter: 1000 },
                { enemies: { king_fast_cube: 1 }, spawnInterval: 1000, waitAfter: 0 }
            ],
            endWaitTime: 15000
        },

        // ===== LATE GAME (Waves 31-50) =====
        // Wave 31
        {
            groups: [
                { enemies: { lightning_boss_cube: 3 }, spawnInterval: 1000, waitAfter: 1000 },
                { enemies: { frost_boss_cube: 3 }, spawnInterval: 1000, waitAfter: 0 }
            ],
            endWaitTime: 15000
        },
        // Wave 32
        {
            groups: [
                { enemies: { gargantuar_z: 4 }, spawnInterval: 1000, waitAfter: 1000 },
                { enemies: { destructor_boss_cube: 2 }, spawnInterval: 1000, waitAfter: 0 }
            ],
            endWaitTime: 15000
        },
        // Wave 33
        {
            groups: [
                { enemies: { corrupted_red_cube: 30 }, spawnInterval: 150, waitAfter: 500 },
                { enemies: { corrupted_blue_cube: 25 }, spawnInterval: 200, waitAfter: 500 },
                { enemies: { corrupted_gray_cube: 10 }, spawnInterval: 250, waitAfter: 0 }
            ],
            endWaitTime: 15000
        },
        // Wave 34
        {
            groups: [
                { enemies: { hidden_icarus_cube: 1 }, spawnInterval: 1000, waitAfter: 0 }
            ],
            endWaitTime: 15000
        },
        // Wave 35
        {
            groups: [
                { enemies: { ram_cube: 5 }, spawnInterval: 800, waitAfter: 1000 },
                { enemies: { icarus_cube: 60 }, spawnInterval: 200, waitAfter: 0 }
            ],
            endWaitTime: 15000
        },
        // Wave 36
        {
            groups: [
                { enemies: { titan_cube: 1 }, spawnInterval: 1000, waitAfter: 0 }
            ],
            endWaitTime: 15000
        },
        // Wave 37
        {
            groups: [
                { enemies: { celgar_cube: 2 }, spawnInterval: 1000, waitAfter: 1000 },
                { enemies: { gargantuar_z: 5 }, spawnInterval: 1000, waitAfter: 0 }
            ],
            endWaitTime: 18000
        },
        // Wave 38
        {
            groups: [
                { enemies: { green_square_5000: 1 }, spawnInterval: 500, waitAfter: 0 }
            ],
            endWaitTime: 18000
        },
        // Wave 39
        {
            groups: [
                { enemies: { corrupted_red_cube: 40 }, spawnInterval: 150, waitAfter: 500 },
                { enemies: { corrupted_blue_cube: 30 }, spawnInterval: 200, waitAfter: 500 },
                { enemies: { corrupted_gray_cube: 20 }, spawnInterval: 250, waitAfter: 0 }
            ],
            endWaitTime: 18000
        },
        // Wave 40
        {
            groups: [
                { enemies: { corrupted_titan_cube: 1 }, spawnInterval: 1000, waitAfter: 0 }
            ],
            endWaitTime: 18000
        },
        // Wave 41
        {
            groups: [
                { enemies: { ram_cube: 4 }, spawnInterval: 800, waitAfter: 1000 },
                { enemies: { celgar_cube: 6 }, spawnInterval: 1000, waitAfter: 0 }
            ],
            endWaitTime: 18000
        },
        // Wave 42
        {
            groups: [
                { enemies: { celgar_cube: 5 }, spawnInterval: 1000, waitAfter: 0 }
            ],
            endWaitTime: 18000
        },
        // Wave 43
        {
            groups: [
                { enemies: { manager_cube: 1 }, spawnInterval: 1000, waitAfter: 0 }
            ],
            endWaitTime: 18000
        },
        // Wave 44
        {
            groups: [
                { enemies: { hidden_icarus_cube: 1 }, spawnInterval: 1000, waitAfter: 1000 },
                { enemies: { manager_cube: 1 }, spawnInterval: 1000, waitAfter: 0 }
            ],
            endWaitTime: 18000
        },
        // Wave 45
        {
            groups: [
                { enemies: { gargantuar_z: 10 }, spawnInterval: 800, waitAfter: 1000 },
                { enemies: { celgar_cube: 3 }, spawnInterval: 1000, waitAfter: 0 }
            ],
            endWaitTime: 18000
        },
        // Wave 46
        {
            groups: [
                { enemies: { corrupted_red_cube: 20 }, spawnInterval: 150, waitAfter: 500 },
                { enemies: { corrupted_blue_cube: 15 }, spawnInterval: 200, waitAfter: 500 },
                { enemies: { corrupted_gray_cube: 10 }, spawnInterval: 250, waitAfter: 0 }
            ],
            endWaitTime: 18000
        },
        // Wave 47
        {
            groups: [
                { enemies: { ram_cube: 10 }, spawnInterval: 600, waitAfter: 0 }
            ],
            endWaitTime: 18000
        },
        // Wave 48
        {
            groups: [
                { enemies: { green_square_5000: 3 }, spawnInterval: 500, waitAfter: 0 }
            ],
            endWaitTime: 18000
        },
        // Wave 49
        {
            groups: [
                { enemies: { hidden_icarus_cube: 3 }, spawnInterval: 1000, waitAfter: 0 }
            ],
            endWaitTime: 18000
        },
        // Wave 50 - Final Boss
        {
            groups: [
                { enemies: { manager_cube: 2 }, spawnInterval: 1000, waitAfter: 1000 },
                { enemies: { void_cube: 1 }, spawnInterval: 1000, waitAfter: 0 }
            ],
            endWaitTime: 20000
        }
    );

    return waves;
}
