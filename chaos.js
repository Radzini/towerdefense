// CHAOS MODE Wave Definitions
// Part 1 enemies are defined in enemies.js with the _cm1 suffix.
// Format: Each wave has groups of enemies with spawn timing in MS.
//
// Chaos Mode is the hardest standard mode.
// Boss milestones:
//   Wave 10  - Rioter Cube
//   Wave 20  - Amalgamation
//   Wave 25  - Crystalized Titan Cube + Kamov
//   Wave 30  - Void Zeltron
//   Wave 40  - Super Crystalized Cube + Elite Guardian
//   Wave 45  - Rubik Cube, preceded by 4 Elite Guardians

function generateChaosWaves() {
    const waves = [];

    waves.push(
        // ===== EARLY CHAOS (Waves 1-10) =====

        // Wave 1
        {
            groups: [
                { enemies: { abnormal_cube_cm1: 10 }, spawnInterval: 350, waitAfter: 0 }
            ],
            endWaitTime: 9000
        },

        // Wave 2
        {
            groups: [
                { enemies: { abnormal_cube_cm1: 8 }, spawnInterval: 325, waitAfter: 2500 },
                { enemies: { melting_ice_cm1: 6 }, spawnInterval: 400, waitAfter: 0 }
            ],
            endWaitTime: 11000
        },

        // Wave 3
        {
            groups: [
                { enemies: { melting_ice_cm1: 10 }, spawnInterval: 300, waitAfter: 3000 },
                { enemies: { abnormal_cube_cm1: 12 }, spawnInterval: 275, waitAfter: 0 }
            ],
            endWaitTime: 13000
        },

        // Wave 4
        {
            groups: [
                { enemies: { abnormal_cube_cm1: 14 }, spawnInterval: 250, waitAfter: 3000 },
                { enemies: { melting_ice_cm1: 10 }, spawnInterval: 300, waitAfter: 2500 },
                { enemies: { rusher_cm1: 4 }, spawnInterval: 700, waitAfter: 0 }
            ],
            endWaitTime: 15000
        },

        // Wave 5
        {
            groups: [
                { enemies: { rusher_cm1: 8 }, spawnInterval: 400, waitAfter: 3000 },
                { enemies: { abnormal_cube_cm1: 16 }, spawnInterval: 200, waitAfter: 2500 },
                { enemies: { melting_ice_cm1: 12 }, spawnInterval: 250, waitAfter: 0 }
            ],
            endWaitTime: 18000
        },

        // Wave 6
        {
            groups: [
                { enemies: { boss1_cm1: 1 }, spawnInterval: 0, waitAfter: 5000 },
                { enemies: { rusher_cm1: 10 }, spawnInterval: 350, waitAfter: 0 }
            ],
            endWaitTime: 16000
        },

        // Wave 7
        {
            groups: [
                { enemies: { rusher_cm1: 14 }, spawnInterval: 300, waitAfter: 4000 },
                { enemies: { strider_cube_cm1: 2 }, spawnInterval: 1200, waitAfter: 0 }
            ],
            endWaitTime: 18000
        },

        // Wave 8
        {
            groups: [
                { enemies: { melting_ice_cm1: 15 }, spawnInterval: 220, waitAfter: 3000 },
                { enemies: { strider_cube_cm1: 3 }, spawnInterval: 900, waitAfter: 3000 },
                { enemies: { rusher_cm1: 12 }, spawnInterval: 250, waitAfter: 0 }
            ],
            endWaitTime: 20000
        },

        // Wave 9
        {
            groups: [
                { enemies: { boss1_cm1: 2 }, spawnInterval: 900, waitAfter: 5000 },
                { enemies: { strider_cube_cm1: 4 }, spawnInterval: 800, waitAfter: 0 }
            ],
            endWaitTime: 22000
        },

        // Wave 10 - RIOTER CUBE
        {
            groups: [
                { enemies: { rusher_cm1: 18 }, spawnInterval: 220, waitAfter: 5000 },
                { enemies: { strider_cube_cm1: 3 }, spawnInterval: 700, waitAfter: 6000 },
                { enemies: { rioter_cube_cm1: 1 }, spawnInterval: 0, waitAfter: 0 }
            ],
            endWaitTime: 30000
        },

        // ===== FIRST BOSS ESCALATION (Waves 11-20) =====

        // Wave 11
        {
            groups: [
                { enemies: { green_square_5000: 2 }, spawnInterval: 1500, waitAfter: 4000 },
                { enemies: { rusher_cm1: 20 }, spawnInterval: 180, waitAfter: 3000 },
                { enemies: { boss2_cm1: 1 }, spawnInterval: 0, waitAfter: 0 }
            ],
            endWaitTime: 22000
        },

        // Wave 12
        {
            groups: [
                { enemies: { strider_cube_cm1: 5 }, spawnInterval: 650, waitAfter: 3000 },
                { enemies: { boss3_cm1: 2 }, spawnInterval: 1200, waitAfter: 0 }
            ],
            endWaitTime: 25000
        },

        // Wave 13
        {
            groups: [
                { enemies: { rusher_cm1: 25 }, spawnInterval: 150, waitAfter: 4000 },
                { enemies: { boss2_cm1: 2 }, spawnInterval: 800, waitAfter: 0 }
            ],
            endWaitTime: 25000
        },

        // Wave 14
        {
            groups: [
                { enemies: { melting_ice_cm1: 20 }, spawnInterval: 180, waitAfter: 3000 },
                { enemies: { boss3_cm1: 3 }, spawnInterval: 700, waitAfter: 0 }
            ],
            endWaitTime: 27000
        },

        // Wave 15
        {
            groups: [
                { enemies: { boss4_cm1: 1 }, spawnInterval: 0, waitAfter: 5000 },
                { enemies: { rusher_cm1: 25 }, spawnInterval: 160, waitAfter: 0 }
            ],
            endWaitTime: 30000
        },

        // Wave 16
        {
            groups: [
                { enemies: { stellar_cube_cm1: 1 }, spawnInterval: 1200, waitAfter: 4000 },
                { enemies: { rusher_cm1: 20 }, spawnInterval: 180, waitAfter: 0 }
            ],
            endWaitTime: 28000
        },

        // Wave 17
        {
            groups: [
                { enemies: { galaxy_cube_cm1: 1 }, spawnInterval: 1500, waitAfter: 5000 },
                { enemies: { boss3_cm1: 3 }, spawnInterval: 700, waitAfter: 8000 },
                { enemies: { kuznetsov_cm1: 1 }, spawnInterval: 650, waitAfter: 5000 }, 
            ],
            endWaitTime: 30000
        },

        // Wave 18
        {
            groups: [
                { enemies: { destroyer_cube_cm1: 1 }, spawnInterval: 0, waitAfter: 6000 },
                { enemies: { stellar_cube_cm1: 1 }, spawnInterval: 1000, waitAfter: 4000 },
                { enemies: { rusher_cm1: 20 }, spawnInterval: 170, waitAfter: 0 }
            ],
            endWaitTime: 32000
        },

        // Wave 19
        {
            groups: [
                { enemies: { galaxy_cube_cm1: 2 }, spawnInterval: 1000, waitAfter: 5000 },
                { enemies: { destroyer_cube_cm1: 1 }, spawnInterval: 0, waitAfter: 0 }
            ],
            endWaitTime: 35000
        },

        // Wave 20 - AMALGAMATION
        {
            groups: [
                { enemies: { rusher_cm1: 25 }, spawnInterval: 150, waitAfter: 5000 },
                { enemies: { stellar_cube_cm1: 2 }, spawnInterval: 900, waitAfter: 5000 },
                { enemies: { amalgamation_cm1: 1 }, spawnInterval: 0, waitAfter: 0 }
            ],
            endWaitTime: 40000
        },

        // ===== CRYSTALIZED TITAN BUILD-UP (Waves 21-30) =====

        // Wave 21
        {
            groups: [
                { enemies: { rusher_cm1: 30 }, spawnInterval: 130, waitAfter: 3000 },
                { enemies: { galaxy_cube_cm1: 2 }, spawnInterval: 1000, waitAfter: 0 }
            ],
            endWaitTime: 30000
        },

        // Wave 22
        {
            groups: [
                { enemies: { destroyer_cube_cm1: 2 }, spawnInterval: 1000, waitAfter: 5000 },
                { enemies: { rusher_cm1: 25 }, spawnInterval: 150, waitAfter: 0 }
            ],
            endWaitTime: 32000
        },

        // Wave 23
        {
            groups: [
                { enemies: { stellar_cube_cm1: 4 }, spawnInterval: 800, waitAfter: 3000 },
                { enemies: { armageddon_cube_cm1: 2 }, spawnInterval: 1500, waitAfter: 4000 },
                { enemies: { rusher_cm1: 30 }, spawnInterval: 130, waitAfter: 0 }
            ],
            endWaitTime: 38000
        },

        // Wave 24
        {
            groups: [
                { enemies: { amalgamation_cm1: 1 }, spawnInterval: 0, waitAfter: 6000 },
                { enemies: { galaxy_cube_cm1: 3 }, spawnInterval: 1000, waitAfter: 4000 },
                { enemies: { destroyer_cube_cm1: 1 }, spawnInterval: 0, waitAfter: 0 }
            ],
            endWaitTime: 45000
        },

        // Wave 25 - CRYSTALIZED TITAN + KAMOV DUO
        {
            groups: [
                { enemies: { rusher_cm1: 30 }, spawnInterval: 120, waitAfter: 10000 },
                { enemies: { kamov_cm1: 1 }, spawnInterval: 1500, waitAfter: 6000 },
                { enemies: { crystalized_titan_cube: 1 }, spawnInterval: 0, waitAfter: 0 }
            ],
            endWaitTime: 60000
        },

        // Wave 26
        {
            groups: [
                { enemies: { destroyer_cube_cm1: 2 }, spawnInterval: 900, waitAfter: 4000 },
                { enemies: { armageddon_cube_cm1: 3 }, spawnInterval: 1000, waitAfter: 4000 },
                { enemies: { kuznetsov_cm1: 3 }, spawnInterval: 650, waitAfter: 5000 }, 
                { enemies: { amalgamation_cm1: 2 }, spawnInterval: 140, waitAfter: 0 }
            ],
            endWaitTime: 40000
        },

        // Wave 27
        {
            groups: [
                { enemies: { amalgamation_cm1: 6 }, spawnInterval: 900, waitAfter: 5000 },
                { enemies: { kuznetsov_cm1: 3 }, spawnInterval: 300, waitAfter: 5000 }
            ],
            endWaitTime: 45000
        },

        // Wave 28
        {
            groups: [
                { enemies: { galaxy_cube_cm1: 4 }, spawnInterval: 1200, waitAfter: 5000 },
                { enemies: { stellar_cube_cm1: 6 }, spawnInterval: 900, waitAfter: 0 }
            ],
            endWaitTime: 50000
        },

        // Wave 29
        {
            groups: [
                { enemies: { destroyer_cube_cm1: 2 }, spawnInterval: 700, waitAfter: 5000 },
                { enemies: { kuznetsov_cm1: 1 }, spawnInterval: 650, waitAfter: 5000 }, 
                { enemies: { galaxy_cube_cm1: 4 }, spawnInterval: 800, waitAfter: 5000 }
            ],
            endWaitTime: 50000
        },

        // Wave 30 - VOID ZELTRON
        {
            groups: [
                { enemies: { rusher_cm1: 35 }, spawnInterval: 110, waitAfter: 7000 },
                { enemies: { void_zeltron_cm1: 1 }, spawnInterval: 0, waitAfter: 0 }
            ],
            endWaitTime: 65000
        },

        // ===== LATE CHAOS (Waves 31-40) =====

        // Wave 31
        {
            groups: [
                { enemies: { galaxy_cube_cm1: 4 }, spawnInterval: 750, waitAfter: 4000 },
                { enemies: { destroyer_cube_cm1: 2 }, spawnInterval: 800, waitAfter: 4000 },
                { enemies: { elite_rusher_cm1: 1 }, spawnInterval: 200, waitAfter: 4000 },
                { enemies: { elite_rioter_cm1: 3 }, spawnInterval: 100, waitAfter: 0 }
            ],
            endWaitTime: 45000
        },

        // Wave 32
        {
            groups: [
                { enemies: { goliath_cube_cm1: 1 }, spawnInterval: 0, waitAfter: 5000 },
                { enemies: { destroyer_cube_cm1: 5 }, spawnInterval: 0, waitAfter: 5000 },
                { enemies: { kuznetsov_cm1: 2 }, spawnInterval: 650, waitAfter: 5000 }, 
                { enemies: { galaxy_cube_cm1: 3 }, spawnInterval: 750, waitAfter: 0 }  
            ],
            endWaitTime: 50000
        },

        // Wave 33
        {
            groups: [
                { enemies: { elite_rioter_cm1: 2 }, spawnInterval: 0, waitAfter: 5000 },
                { enemies: { stellar_cube_cm1: 12 }, spawnInterval: 750, waitAfter: 0 }
            ],
            endWaitTime: 50000
        },

        // Wave 34
        {
            groups: [
                { enemies: { goliath_cube_cm1: 6 }, spawnInterval: 500, waitAfter: 3500 },
                { enemies: { elite_rusher_cm1: 8 }, spawnInterval: 200, waitAfter: 8500 }
            ],
            endWaitTime: 50000
        },

        // Wave 35
        {
            groups: [
                { enemies: { elite_rusher_cm1: 6 }, spawnInterval: 200, waitAfter: 7000 },
                { enemies: { mega_cube_cm1: 1 }, spawnInterval: 200, waitAfter: 7000 }
            ],
            endWaitTime: 85000
        },

        // Wave 36
        {
            groups: [
                { enemies: { elite_rioter_cm1: 2 }, spawnInterval: 1200, waitAfter: 5000 },
                { enemies: { galaxy_cube_cm1: 5 }, spawnInterval: 650, waitAfter: 5000 },
                { enemies: { kuznetsov_cm1: 2 }, spawnInterval: 650, waitAfter: 5000 },
                { enemies: { elite_rusher_cm1: 4 }, spawnInterval: 200, waitAfter: 5000 },
                { enemies: { goliath_cube_cm1: 8 }, spawnInterval: 0, waitAfter: 0 }
            ],
            endWaitTime: 55000
        },

        // Wave 37
        {
            groups: [
                { enemies: { goliath_cube_cm1: 15 }, spawnInterval: 100, waitAfter: 10500 },
                { enemies: { mega_cube_cm1: 3 }, spawnInterval: 333, waitAfter: 7000 }
            ],
            endWaitTime: 65000
        },

        // Wave 38
        {
            groups: [
                { enemies: { crystalized_titan_cube: 2 }, spawnInterval: 1000, waitAfter: 17000 },
                { enemies: { elite_rioter_cm1: 2 }, spawnInterval: 1200, waitAfter: 5000 },
                { enemies: { goliath_cube_cm1: 2 }, spawnInterval: 1200, waitAfter: 0 }
            ],
            endWaitTime: 65000
        },

        // Wave 39
        {
            groups: [
                { enemies: { green_square_5000: 5 }, spawnInterval: 1500, waitAfter: 7000 },
            ],
            endWaitTime: 20000
        },

        // Wave 40 - SUPER CRYSTALIZED + ELITE GUARDIAN
        {
            groups: [
                { enemies: { elite_rusher_cm1: 5 }, spawnInterval: 150, waitAfter: 6500 },
                { enemies: { void_zeltron_cm1: 1}, spawnInterval: 80, waitAfter: 5000 },
                { enemies: { elite_rioter_cm1: 3 }, spawnInterval: 1000, waitAfter: 8000 },
                { enemies: { super_crystalized_cube_cm1: 1 }, spawnInterval: 0, waitAfter: 2000 },
                { enemies: { kuznetsov_cm1: 6 }, spawnInterval: 500, waitAfter: 10000 }, 
                { enemies: { elite_guardian_cm1: 1 }, spawnInterval: 0, waitAfter: 0 }
            ],
            endWaitTime: 80000
        },

        // ===== FINAL GAUNTLET (Waves 41-45) =====

        // Wave 41
        {
            groups: [
                { enemies: { elite_rusher_cm1: 20 }, spawnInterval: 250, waitAfter: 14000 },
                { enemies: { elite_guardian_cm1: 1 }, spawnInterval: 0, waitAfter: 7000 },
                { enemies: { void_zeltron_cm1: 2 }, spawnInterval: 0, waitAfter: 7000 },
                { enemies: { elite_rioter_cm1: 6 }, spawnInterval: 1000, waitAfter: 0 }
            ],
            endWaitTime: 65000
        },

        // Wave 42
        {
            groups: [
                { enemies: { super_crystalized_cube_cm1: 2 }, spawnInterval: 1200, waitAfter: 6000 },
                { enemies: { destroyer_cube_cm1: 8 }, spawnInterval: 600, waitAfter: 6000 },
                { enemies: { super_crystalized_cube_cm1: 1 }, spawnInterval: 0, waitAfter: 10000 },
                { enemies: { goliath_cube_cm1: 2 }, spawnInterval: 1000, waitAfter: 0 }
            ],
            endWaitTime: 70000
        },

        // Wave 43
        {
            groups: [
                { enemies: { void_zeltron_cm1: 2 }, spawnInterval: 1200, waitAfter: 7000 },
                { enemies: { elite_rioter_cm1: 6 }, spawnInterval: 900, waitAfter: 7000 },
                { enemies: { super_crystalized_cube_cm1: 3 }, spawnInterval: 0, waitAfter: 10000 },
                { enemies: { elite_guardian_cm1: 1 }, spawnInterval: 0, waitAfter: 0 }
            ],
            endWaitTime: 80000
        },

        // Wave 44 - PRE-FINAL GAUNTLET
        {
            groups: [
                { enemies: { goliath_cube_cm1: 10 }, spawnInterval: 900, waitAfter: 3000 },
                { enemies: { destroyer_cube_cm1: 10 }, spawnInterval: 600, waitAfter: 3000 },
                { enemies: { boss5_cm1: 6 }, spawnInterval: 1100, waitAfter: 4000 },
                { enemies: { elite_rioter_cm1: 3 }, spawnInterval: 900, waitAfter: 2000 },
                { enemies: { mega_cube_cm1: 2 }, spawnInterval: 200, waitAfter: 12000 },
                { enemies: { elite_guardian_cm1: 2 }, spawnInterval: 0, waitAfter: 0 }
            ],
            endWaitTime: 90000
        },

        // Wave 45 - THE LORD
        // Four Elite Guardians are spawned before Rubik.
        // The final group is intentionally separated by a long wait so Rubik
        // enters after his guardians have already arrived.
        {
            groups: [
                { enemies: { golden_titan_nm: 6 }, spawnInterval: 400, waitAfter: 2000 },
                { enemies: { emperor_cube_nm: 3 }, spawnInterval: 800, waitAfter: 2000 },
                { enemies: { kuznetsov_cm1: 4 }, spawnInterval: 250, waitAfter: 1000 },
                { enemies: { mega_cube_cm1: 1 }, spawnInterval: 300, waitAfter: 3000 },
                { enemies: { elite_necromancer_nm: 5 }, spawnInterval: 500, waitAfter: 10000 },
                { enemies: { elite_rusher_cm1: 6 }, spawnInterval: 200, waitAfter: 2500 },
                { enemies: { elite_guardian_cm1: 6 }, spawnInterval: 1500, waitAfter: 12500 },
                { enemies: { rubik_cube_cm1: 1 }, spawnInterval: 0, waitAfter: 0 }
            ],
            endWaitTime: 17600004
        }
    );

    return waves;
}

// Expose for the wave aggregator.
window.CHAOS_WAVES = generateChaosWaves();
