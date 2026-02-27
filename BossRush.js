// BOSS RUSH MODE Wave Definitions
// 5 Waves, starting with 50s prep time

function generateBossRushWaves() {
    const waves = [];

    waves.push(
        // Wave 1
        {
            groups: [
                // Dummy group for 50s initial delay
                { enemies: {}, spawnInterval: 0, waitAfter: 50000 },
                { enemies: { crystalized_cube_br: 1 }, spawnInterval: 1000, waitAfter: 5000 },
                { enemies: { zeltron_cube_br: 1 }, spawnInterval: 1000, waitAfter: 0 }
            ],
            endWaitTime: 8000
        },
        // Wave 2
        {
            groups: [
                { enemies: { crystalized_titan_cube_br: 1 }, spawnInterval: 1000, waitAfter: 2000 },
                { enemies: { cube_destructor_br: 1 }, spawnInterval: 1000, waitAfter: 0 }
            ],
            endWaitTime: 6000
        },
        // Wave 3
        {
            groups: [
                { enemies: { lord_alpha_cube: 1 }, spawnInterval: 1000, waitAfter: 2000 },
                { enemies: { lord_beta_cube: 1 }, spawnInterval: 1000, waitAfter: 2000 },
                { enemies: { titan_cube_br: 1 }, spawnInterval: 1000, waitAfter: 0 }
            ],
            endWaitTime: 10000
        },
        // Wave 4
        {
            groups: [
                { enemies: { true_rammer: 1 }, spawnInterval: 1000, waitAfter: 3000 },
                { enemies: { corrupted_titan: 1 }, spawnInterval: 1000, waitAfter: 0 }
            ],
            endWaitTime: 30000
        },
        // Wave 5
        {
            groups: [
                { enemies: { true_void: 1 }, spawnInterval: 1000, waitAfter: 20000 },
                { enemies: { omega_cube: 1 }, spawnInterval: 1000, waitAfter: 0 }
            ],
            endWaitTime: 1500000
        }
    );

    return waves;
}
