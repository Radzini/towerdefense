// HARD MODE Wave Definitions
// Format: Each wave has groups of enemies with spawn timing

function generateHardWaves() {
    const waves = [];

    // ===== EARLY GAME (Waves 1-15) =====
    waves.push(
        // Wave 1
        {
            groups: [
                { enemies: { red_cube_hard: 6 }, spawnInterval: 300, waitAfter: 0 }
            ],
            endWaitTime: 5000
        },
        // Wave 2
        {
            groups: [
                { enemies: { red_cube_hard: 10 }, spawnInterval: 300, waitAfter: 500 },
                { enemies: { blue_cube_hard: 3 }, spawnInterval: 400, waitAfter: 0 }
            ],
            endWaitTime: 5000
        },
        // Wave 3
        {
            groups: [
                { enemies: { red_cube_hard: 8 }, spawnInterval: 300, waitAfter: 500 },
                { enemies: { blue_cube_hard: 6 }, spawnInterval: 400, waitAfter: 0 }
            ],
            endWaitTime: 5000
        },
        // Wave 4
        {
            groups: [
                { enemies: { red_cube_hard: 12 }, spawnInterval: 300, waitAfter: 500 },
                { enemies: { blue_cube_hard: 8 }, spawnInterval: 400, waitAfter: 0 }
            ],
            endWaitTime: 6000
        },
        // Wave 5
        {
            groups: [
                { enemies: { red_cube_hard: 10 }, spawnInterval: 300, waitAfter: 500 },
                { enemies: { blue_cube_hard: 8 }, spawnInterval: 400, waitAfter: 500 },
                { enemies: { gray_cube_hard: 3 }, spawnInterval: 600, waitAfter: 0 }
            ],
            endWaitTime: 6000
        },
        // Wave 6
        {
            groups: [
                { enemies: { red_cube_hard: 15 }, spawnInterval: 300, waitAfter: 500 },
                { enemies: { blue_cube_hard: 12 }, spawnInterval: 400, waitAfter: 500 },
                { enemies: { gray_cube_hard: 5 }, spawnInterval: 600, waitAfter: 0 }
            ],
            endWaitTime: 6000
        },
        // Wave 7
        {
            groups: [
                { enemies: { red_cube_hard: 12 }, spawnInterval: 300, waitAfter: 500 },
                { enemies: { blue_cube_hard: 15 }, spawnInterval: 400, waitAfter: 500 },
                { enemies: { gray_cube_hard: 8 }, spawnInterval: 600, waitAfter: 0 }
            ],
            endWaitTime: 7000
        },
        // Wave 8
        {
            groups: [
                { enemies: { red_cube_hard: 20 }, spawnInterval: 300, waitAfter: 500 },
                { enemies: { blue_cube_hard: 18 }, spawnInterval: 400, waitAfter: 500 },
                { enemies: { gray_cube_hard: 10 }, spawnInterval: 600, waitAfter: 1000 },
                { enemies: { boss_cube_hard: 1 }, spawnInterval: 1000, waitAfter: 0 }
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
                { enemies: { red_cube_hard: 25 }, spawnInterval: 250, waitAfter: 500 },
                { enemies: { blue_cube_hard: 20 }, spawnInterval: 300, waitAfter: 500 },
                { enemies: { gray_cube_hard: 12 }, spawnInterval: 400, waitAfter: 1000 },
                { enemies: { boss_cube_hard: 2 }, spawnInterval: 1000, waitAfter: 0 }
            ],
            endWaitTime: 8000
        },
        // Wave 11
        {
            groups: [
                { enemies: { crystal_cube_hard: 8 }, spawnInterval: 400, waitAfter: 500 },
                { enemies: { lightning_cube: 6 }, spawnInterval: 400, waitAfter: 0 }
            ],
            endWaitTime: 8000
        },
        // Wave 12
        {
            groups: [
                { enemies: { red_cube_hard: 30 }, spawnInterval: 250, waitAfter: 500 },
                { enemies: { blue_cube_hard: 25 }, spawnInterval: 300, waitAfter: 500 },
                { enemies: { crystal_cube_hard: 12 }, spawnInterval: 400, waitAfter: 0 }
            ],
            endWaitTime: 8000
        },
        // Wave 13
        {
            groups: [
                { enemies: { boss_cube_hard: 6 }, spawnInterval: 800, waitAfter: 1000 },
                { enemies: { crystal_cube_hard: 15 }, spawnInterval: 400, waitAfter: 0 }
            ],
            endWaitTime: 10000
        },
        // Wave 14
        {
            groups: [
                { enemies: { red_cube_hard: 35 }, spawnInterval: 250, waitAfter: 500 },
                { enemies: { blue_cube_hard: 30 }, spawnInterval: 300, waitAfter: 500 },
                { enemies: { gray_cube_hard: 20 }, spawnInterval: 350, waitAfter: 500 },
                { enemies: { lightning_cube: 15 }, spawnInterval: 400, waitAfter: 0 }
            ],
            endWaitTime: 10000
        },
        // Wave 15
        {
            groups: [
                { enemies: { slow_boss_cube_hard: 1 }, spawnInterval: 1000, waitAfter: 0 }
            ],
            endWaitTime: 10000
        },

        // ===== MID GAME (Waves 16-30) =====
        // Wave 16
        {
            groups: [
                { enemies: { red_cube_hard: 40 }, spawnInterval: 250, waitAfter: 500 },
                { enemies: { blue_cube_hard: 35 }, spawnInterval: 250, waitAfter: 500 },
                { enemies: { gray_cube_hard: 25 }, spawnInterval: 300, waitAfter: 500 },
                { enemies: { crystal_cube_hard: 20 }, spawnInterval: 350, waitAfter: 0 }
            ],
            endWaitTime: 10000
        },
        // Wave 17
        {
            groups: [
                { enemies: { fast_boss_cube_hard: 2 }, spawnInterval: 1000, waitAfter: 1000 },
                { enemies: { lightning_cube: 25 }, spawnInterval: 300, waitAfter: 0 }
            ],
            endWaitTime: 10000
        },
        // Wave 18
        {
            groups: [
                { enemies: { lava_cube_hard: 20 }, spawnInterval: 350, waitAfter: 500 },
                { enemies: { crystal_cube_hard: 25 }, spawnInterval: 300, waitAfter: 0 }
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
                { enemies: { red_cube_hard: 45 }, spawnInterval: 200, waitAfter: 500 },
                { enemies: { blue_cube_hard: 40 }, spawnInterval: 200, waitAfter: 500 },
                { enemies: { lava_cube_hard: 25 }, spawnInterval: 300, waitAfter: 500 },
                { enemies: { lightning_cube: 30 }, spawnInterval: 300, waitAfter: 0 }
            ],
            endWaitTime: 12000
        },
        // Wave 21
        {
            groups: [
                { enemies: { crystal_boss_cube_hard: 1 }, spawnInterval: 1000, waitAfter: 0 }
            ],
            endWaitTime: 12000
        },
        // Wave 22
        {
            groups: [
                { enemies: { gargantuar_x: 1 }, spawnInterval: 1000, waitAfter: 1000 },
                { enemies: { boss_cube_hard: 6 }, spawnInterval: 800, waitAfter: 0 }
            ],
            endWaitTime: 12000
        },
        // Wave 23
        {
            groups: [
                { enemies: { red_cube_hard: 55 }, spawnInterval: 200, waitAfter: 500 },
                { enemies: { blue_cube_hard: 50 }, spawnInterval: 200, waitAfter: 500 },
                { enemies: { gray_cube_hard: 35 }, spawnInterval: 250, waitAfter: 500 },
                { enemies: { lava_cube_hard: 30 }, spawnInterval: 300, waitAfter: 0 }
            ],
            endWaitTime: 12000
        },
        // Wave 24
        {
            groups: [
                { enemies: { eclise_boss_cube_hard: 1 }, spawnInterval: 1000, waitAfter: 1000 },
                { enemies: { fast_boss_cube_hard: 3 }, spawnInterval: 1000, waitAfter: 0 }
            ],
            endWaitTime: 12000
        },
        // Wave 25
        {
            groups: [
                { enemies: { crystal_cube_hard: 50 }, spawnInterval: 250, waitAfter: 500 },
                { enemies: { lava_cube_hard: 40 }, spawnInterval: 250, waitAfter: 500 },
                { enemies: { lightning_cube: 40 }, spawnInterval: 250, waitAfter: 0 }
            ],
            endWaitTime: 12000
        },
        // Wave 26
        {
            groups: [
                { enemies: { slow_boss_cube_hard: 2 }, spawnInterval: 1000, waitAfter: 1000 },
                { enemies: { fast_boss_cube_hard: 3 }, spawnInterval: 1000, waitAfter: 0 }
            ],
            endWaitTime: 12000
        },
        // Wave 27
        {
            groups: [
                { enemies: { gargantuar_x: 2 }, spawnInterval: 1000, waitAfter: 1000 },
                { enemies: { crystal_boss_cube_hard: 2 }, spawnInterval: 1000, waitAfter: 0 }
            ],
            endWaitTime: 15000
        },
        // Wave 28
        {
            groups: [
                { enemies: { red_cube_hard: 70 }, spawnInterval: 200, waitAfter: 500 },
                { enemies: { blue_cube_hard: 60 }, spawnInterval: 200, waitAfter: 500 },
                { enemies: { gray_cube_hard: 50 }, spawnInterval: 200, waitAfter: 500 },
                { enemies: { lava_cube_hard: 45 }, spawnInterval: 250, waitAfter: 0 }
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
                { enemies: { guardian_cube_2: 1 }, spawnInterval: 1000, waitAfter: 0 }
            ],
            endWaitTime: 15000
        },

        // ===== LATE GAME (Waves 31-40) =====
        // Wave 31
        {
            groups: [
                { enemies: { eclise_boss_cube_hard: 2 }, spawnInterval: 1000, waitAfter: 1000 },
                { enemies: { crystal_boss_cube_hard: 2 }, spawnInterval: 1000, waitAfter: 0 }
            ],
            endWaitTime: 15000
        },
        // Wave 32
        {
            groups: [
                { enemies: { gargantuar_x: 3 }, spawnInterval: 1000, waitAfter: 1000 },
                { enemies: { slow_boss_cube_hard: 2 }, spawnInterval: 1000, waitAfter: 0 }
            ],
            endWaitTime: 15000
        },
        // Wave 33
        {
            groups: [
                { enemies: { red_cube_hard: 90 }, spawnInterval: 150, waitAfter: 500 },
                { enemies: { blue_cube_hard: 80 }, spawnInterval: 150, waitAfter: 500 },
                { enemies: { gray_cube_hard: 70 }, spawnInterval: 200, waitAfter: 500 },
                { enemies: { lava_cube_hard: 60 }, spawnInterval: 200, waitAfter: 0 }
            ],
            endWaitTime: 15000
        },
        // Wave 34
        {
            groups: [
                { enemies: { fast_boss_cube_hard: 5 }, spawnInterval: 800, waitAfter: 1000 },
                { enemies: { eclise_boss_cube_hard: 4 }, spawnInterval: 1000, waitAfter: 0 }
            ],
            endWaitTime: 15000
        },
        // Wave 35
        {
            groups: [
                { enemies: { guardian_cube_2: 2 }, spawnInterval: 1000, waitAfter: 1000 },
                { enemies: { gargantuar_x: 3 }, spawnInterval: 1000, waitAfter: 0 }
            ],
            endWaitTime: 15000
        },
        // Wave 36
        {
            groups: [
                { enemies: { crystal_cube_hard: 70 }, spawnInterval: 200, waitAfter: 500 },
                { enemies: { lava_cube_hard: 60 }, spawnInterval: 200, waitAfter: 500 },
                { enemies: { lightning_cube: 60 }, spawnInterval: 200, waitAfter: 0 }
            ],
            endWaitTime: 15000
        },
        // Wave 37
        {
            groups: [
                { enemies: { slow_boss_cube_hard: 3 }, spawnInterval: 1000, waitAfter: 1000 },
                { enemies: { crystal_boss_cube_hard: 3 }, spawnInterval: 1000, waitAfter: 0 }
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
                { enemies: { gargantuar_x: 6 }, spawnInterval: 1000, waitAfter: 1000 },
                { enemies: { guardian_cube_2: 2 }, spawnInterval: 1000, waitAfter: 0 }
            ],
            endWaitTime: 18000
        },
        // Wave 40 - Final Boss
        {
            groups: [
                { enemies: { zeltron_cube: 1 }, spawnInterval: 1000, waitAfter: 0 }
            ],
            endWaitTime: 20000
        }
    );

    return waves;
}
