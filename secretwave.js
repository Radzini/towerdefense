// SECRET WAVE Nightmare extension
// These are used only when the hidden secret wave activates after Omega Cube dies.

function generateSecretWaves() {
    const waves = [];

    waves.push(
        // Wave 47
        {
            groups: [
                { enemies: { Lunar_Cube: 6 }, spawnInterval: 300, waitAfter: 4000 },
                { enemies: { Lunar_Gargantuar: 2 }, spawnInterval: 1000, waitAfter: 0 }
            ],
            endWaitTime: 30000
        },
        // Wave 48
        {
            groups: [
                { enemies: { Lunar_Cube: 10 }, spawnInterval: 325, waitAfter: 6500 },
                { enemies: { Lunar_Gargantuar: 3 }, spawnInterval: 1000, waitAfter: 0 },
            ],
            endWaitTime: 50000
        },
        // Wave 49
        {
            groups: [
                { enemies: { Lunar_Cube: 12 }, spawnInterval: 300, waitAfter: 2000 },
                { enemies: { Lunar_Gargantuar: 4 }, spawnInterval: 500, waitAfter: 10000 },
                { enemies: { Lunar_Titan: 1 }, spawnInterval: 500, waitAfter: 0 }
            ],
            endWaitTime: 85000
        },
        // Wave 50
        {
            groups: [
                { enemies: { Lunar_Cube: 3 }, spawnInterval: 200, waitAfter: 2200 },
                { enemies: { Lunar_Gargantuar: 3 }, spawnInterval: 250, waitAfter: 2200 },
                { enemies: { Lunar_Titan: 1 }, spawnInterval: 100, waitAfter: 100 },
                { enemies: { Moon_Cube: 1 }, spawnInterval: 0, waitAfter: 0 }
            ],
            endWaitTime: 240000
        }
    );

    return waves;
}

window.SECRET_WAVES = generateSecretWaves();
