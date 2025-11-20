
function generateExtraWaves() {
    const waves = [];
    const TOTAL_WAVES = 500;

    // Boss Configurations
    const bosses = {
        devastator: {
            type: 'devastator',
            interval: 15,
            hpScale: 1.2,
            count: 0
        },
        gargantuar_king: {
            type: 'gargantuar_king',
            interval: 30,
            hpScale: 1.5,
            shieldScale: 1.1,
            count: 0
        },
        cube_destructor: {
            type: 'cube_destructor',
            interval: 50,
            hpScale: 2.0,
            count: 0
        }
    };

    for (let waveNum = 1; waveNum <= TOTAL_WAVES; waveNum++) {
        const waveGroups = [];
        let isBossWave = false;

        // 1. Cube Destructor (Every 50)
        if (waveNum % bosses.cube_destructor.interval === 0) {
            bosses.cube_destructor.count++;
            const scaleMult = Math.pow(bosses.cube_destructor.hpScale, bosses.cube_destructor.count - 1);

            waveGroups.push({
                enemies: { cube_destructor: 1 },
                spawnInterval: 1000,
                waitAfter: 2000,
                statOverrides: {
                    cube_destructor: {
                        hp: 600000 * scaleMult
                    }
                }
            });
            isBossWave = true;
        }

        // 2. Gargantuar King (Every 30)
        if (waveNum % bosses.gargantuar_king.interval === 0) {
            bosses.gargantuar_king.count++;
            const hpMult = Math.pow(bosses.gargantuar_king.hpScale, bosses.gargantuar_king.count - 1);
            const shieldMult = Math.pow(bosses.gargantuar_king.shieldScale, bosses.gargantuar_king.count - 1);

            waveGroups.push({
                enemies: { gargantuar_king: 1 },
                spawnInterval: 1000,
                waitAfter: 2000,
                statOverrides: {
                    gargantuar_king: {
                        hp: 150000 * hpMult,
                        shield: 50000 * shieldMult
                    }
                }
            });
            isBossWave = true;
        }

        // 3. Devastator (Every 15)
        if (waveNum % bosses.devastator.interval === 0) {
            bosses.devastator.count++;
            const hpMult = Math.pow(bosses.devastator.hpScale, bosses.devastator.count - 1);

            waveGroups.push({
                enemies: { devastator: 1 },
                spawnInterval: 1000,
                waitAfter: 2000,
                statOverrides: {
                    devastator: {
                        hp: 35000 * hpMult
                    }
                }
            });
            isBossWave = true;
        }

        // Non-Boss Wave Logic (Filler)
        if (!isBossWave) {
            const enemyPool = ['red_cube_insane', 'blue_cube_insane', 'gray_cube_insane', 'frozen_cube', 'light_cube'];
            const count = Math.min(50, 10 + Math.floor(waveNum / 5));

            const enemiesObj = {};
            const type1 = enemyPool[Math.floor(Math.random() * enemyPool.length)];
            let type2 = enemyPool[Math.floor(Math.random() * enemyPool.length)];
            while (type2 === type1) type2 = enemyPool[Math.floor(Math.random() * enemyPool.length)];

            enemiesObj[type1] = Math.floor(count * 0.6);
            enemiesObj[type2] = Math.floor(count * 0.4);

            waveGroups.push({
                enemies: enemiesObj,
                spawnInterval: Math.max(100, 400 - waveNum),
                waitAfter: 1000
            });
        }

        waves.push({
            groups: waveGroups,
            endWaitTime: 3000
        });
    }

    return waves;
}

// Export the waves
window.EXTRA_WAVES = generateExtraWaves();
console.log("Extra.js loaded, EXTRA_WAVES generated:", window.EXTRA_WAVES.length);

// Helper function for procedural endless waves beyond the pre-generated ones
window.getProceduralEndlessWave = function (waveNum) {
    const waveGroups = [];
    let isBossWave = false;

    // Boss Configurations (Same as generateExtraWaves)
    const bosses = {
        devastator: { type: 'devastator', interval: 15, hpScale: 1.2 },
        gargantuar_king: { type: 'gargantuar_king', interval: 30, hpScale: 1.5, shieldScale: 1.1 },
        cube_destructor: { type: 'cube_destructor', interval: 50, hpScale: 2.0 }
    };

    // 1. Cube Destructor (Every 50)
    if (waveNum % bosses.cube_destructor.interval === 0) {
        const count = Math.floor(waveNum / bosses.cube_destructor.interval);
        const scaleMult = Math.pow(bosses.cube_destructor.hpScale, count - 1);

        waveGroups.push({
            enemies: { cube_destructor: 1 },
            spawnInterval: 1000,
            waitAfter: 2000,
            statOverrides: {
                cube_destructor: {
                    hp: 600000 * scaleMult
                }
            }
        });
        isBossWave = true;
    }

    // 2. Gargantuar King (Every 30)
    if (waveNum % bosses.gargantuar_king.interval === 0) {
        const count = Math.floor(waveNum / bosses.gargantuar_king.interval);
        const hpMult = Math.pow(bosses.gargantuar_king.hpScale, count - 1);
        const shieldMult = Math.pow(bosses.gargantuar_king.shieldScale, count - 1);

        waveGroups.push({
            enemies: { gargantuar_king: 1 },
            spawnInterval: 1000,
            waitAfter: 2000,
            statOverrides: {
                gargantuar_king: {
                    hp: 150000 * hpMult,
                    shield: 50000 * shieldMult
                }
            }
        });
        isBossWave = true;
    }

    // 3. Devastator (Every 15)
    if (waveNum % bosses.devastator.interval === 0) {
        const count = Math.floor(waveNum / bosses.devastator.interval);
        const hpMult = Math.pow(bosses.devastator.hpScale, count - 1);

        waveGroups.push({
            enemies: { devastator: 1 },
            spawnInterval: 1000,
            waitAfter: 2000,
            statOverrides: {
                devastator: {
                    hp: 35000 * hpMult
                }
            }
        });
        isBossWave = true;
    }

    // Non-Boss Wave Logic (Filler)
    if (!isBossWave) {
        const enemyPool = ['red_cube_insane', 'blue_cube_insane', 'gray_cube_insane', 'frozen_cube', 'light_cube'];
        const count = Math.min(50, 10 + Math.floor(waveNum / 5));

        const enemiesObj = {};
        const type1 = enemyPool[Math.floor(Math.random() * enemyPool.length)];
        let type2 = enemyPool[Math.floor(Math.random() * enemyPool.length)];
        while (type2 === type1) type2 = enemyPool[Math.floor(Math.random() * enemyPool.length)];

        enemiesObj[type1] = Math.floor(count * 0.6);
        enemiesObj[type2] = Math.floor(count * 0.4);

        waveGroups.push({
            enemies: enemiesObj,
            spawnInterval: Math.max(100, 400 - waveNum),
            waitAfter: 1000
        });
    }

    return {
        groups: waveGroups,
        endWaitTime: 3000
    };
};
