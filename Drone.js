// Drone Tower Definition
const DRONE_TOWER_TYPE = {
    name: 'Drone',
    color: '#00FA9A',
    cost: 5000,
    aoe: false,
    summons: false,
    isDrone: true, // Specific flag for script.js to catch
    size: 2, // Drone rendering scale
    limit: 1,
    hardLimit: 1,
    cannotBeBuffed: true, // "does NOT receive buffs from commanded (global)"
    levels: [
        {
            name: 'Placement',
            description: 'Unlocks Minigun. Passive: every 2 reloads gain +5% dmg buff for 4s.',
            minigunDamage: 10,
            minigunFireRate: 200,
            minigunAmmo: 25,
            minigunReloadTime: 3000,
            dmgBuffAmount: 0.05,
            dmgBuffDuration: 4000,
            upgradeCost: 2000
        },
        {
            name: 'Upgrade 1',
            description: 'Better Minigun. Passive: +7% dmg buff for 5s.',
            minigunDamage: 25,
            minigunFireRate: 150,
            minigunAmmo: 35,
            minigunReloadTime: 3000,
            dmgBuffAmount: 0.07,
            dmgBuffDuration: 5000,
            upgradeCost: 6000
        },
        {
            name: 'Upgrade 2',
            description: 'Unlocks Rockets. Passive: +10% dmg buff for 7s.',
            minigunDamage: 50,
            minigunFireRate: 100,
            minigunAmmo: 75,
            minigunReloadTime: 3000,
            rocketDamage: 100,
            rocketRange: 1.5,
            rocketFireRate: 400,
            rocketAmmo: 12, // "2- rockets 12 ammo reload takes 15s"
            rocketReloadTime: 10000,
            dmgBuffAmount: 0.10,
            dmgBuffDuration: 7000,
            upgradeCost: 14000
        },
        {
            name: 'Upgrade 3',
            description: 'Unlocks Laser & Sight. kill +50k hp enemy -> +10% dmg for 5s.',
            minigunDamage: 125,
            minigunFireRate: 50,
            minigunAmmo: 200,
            minigunReloadTime: 3000,
            rocketDamage: 500,
            rocketRange: 2.5,
            rocketFireRate: 100,
            rocketAmmo: 12,
            rocketReloadTime: 15000,
            laserDamage: 500,
            laserTickRate: 75,
            laserDuration: 10000,
            laserCooldown: 45000,
            sightBuffAmount: 0.20, // fixed resistance reduction basically
            sightCooldown: 30000,
            dmgBuffAmount: 0.15,
            dmgBuffDuration: 10000,
            killBuffAmount: 0.60,
            killBuffDuration: 7000,
            upgradeCost: 50000 // max level
        }
    ]
};

// Global variables to track drone state
let droneUnit = null;

function clearDroneUnits() {
    droneUnit = null;
}

function spawnDrone(tower) {
    if (droneUnit) return droneUnit; // only 1 drone allowed

    droneUnit = {
        x: tower.x,
        y: tower.y,
        owner: tower,
        active: true,

        // Weapon states
        minigunAmmo: 0,
        minigunReloading: false,
        minigunReloadStartTime: 0,
        lastMinigunFireTime: 0,
        reloadsCompleted: 0, // Track reloads for passive

        rocketAmmo: 0,
        rocketReloading: false,
        rocketReloadStartTime: 0,
        lastRocketFireTime: 0,

        laserActive: false,
        laserStartTime: 0,
        laserCooldownStartTime: -60000, // available immediately
        lastLaserTickTime: 0,
        laserMouseX: 0,
        laserMouseY: 0,

        lastSightTime: -30000,

        // Buffs
        dmgBuffStack: 0,
        dmgBuffEndTime: 0,
        killBuffStack: 0,
        killBuffEndTime: 0
    };

    // initialize ammo
    const levelData = tower.type.levels[tower.level - 1];
    droneUnit.minigunAmmo = levelData.minigunAmmo;
    if (levelData.rocketAmmo) droneUnit.rocketAmmo = levelData.rocketAmmo;
    droneUnit._lastLevel = tower.level;

    return droneUnit;
}

function updateDroneUnits() {
    if (!droneUnit || !droneUnit.active) return;
    if (typeof window.isTowerStunned === 'function' && window.isTowerStunned(droneUnit.owner)) return;

    // Cleanup buffs if expired
    const currentTime = performance.now();
    if (currentTime > droneUnit.dmgBuffEndTime) droneUnit.dmgBuffStack = 0;
    if (currentTime > droneUnit.killBuffEndTime) droneUnit.killBuffStack = 0;

    const levelData = droneUnit.owner.type.levels[droneUnit.owner.level - 1];

    // Clear expired bounty buffs
    if (currentTime > (droneUnit.bountyBuffEndTime || 0)) droneUnit.bountyBuffStack = 0;
    if (currentTime > (droneUnit.bountyDebuffEndTime || 0)) droneUnit.bountyDebuffStack = 0;

    let damageMultiplier = 1 + droneUnit.dmgBuffStack + droneUnit.killBuffStack + (droneUnit.bountyBuffStack || 0) + (droneUnit.bountyDebuffStack || 0);

    // Sync ammo if upgraded
    if (droneUnit._lastLevel !== droneUnit.owner.level) {
        droneUnit.minigunAmmo = levelData.minigunAmmo;
        if (levelData.rocketAmmo) droneUnit.rocketAmmo = levelData.rocketAmmo;
        droneUnit._lastLevel = droneUnit.owner.level;
    }

    // Handle minigun reload
    if (droneUnit.minigunReloading) {
        if (currentTime - droneUnit.minigunReloadStartTime >= levelData.minigunReloadTime) {
            droneUnit.minigunReloading = false;
            droneUnit.minigunAmmo = levelData.minigunAmmo;
            droneUnit.reloadsCompleted++;
            if (droneUnit.reloadsCompleted % 2 === 0) {
                droneUnit.dmgBuffStack = levelData.dmgBuffAmount;
                droneUnit.dmgBuffEndTime = currentTime + levelData.dmgBuffDuration;
            }
        }
    }

    // Handle rocket reload
    if (levelData.rocketAmmo && droneUnit.rocketReloading) {
        if (currentTime - droneUnit.rocketReloadStartTime >= levelData.rocketReloadTime) {
            droneUnit.rocketReloading = false;
            droneUnit.rocketAmmo = levelData.rocketAmmo;
        }
    }

    // Handle laser duration
    if (droneUnit.laserActive) {
        if (currentTime - droneUnit.laserStartTime >= levelData.laserDuration) {
            droneUnit.laserActive = false;
        }
    }

    // Process continuous abilities if drone is selected
    if (window.currentSelectedTower && window.currentSelectedTower.type === TOWER_TYPES.DRONE && window.keysPressed) {
        const mouseX = window.currentMouseX || 0;
        const mouseY = window.currentMouseY || 0;

        // Minigun (Hold 1)
        if (window.keysPressed['1']) {
            if (!droneUnit.minigunReloading && droneUnit.minigunAmmo > 0 && currentTime - droneUnit.lastMinigunFireTime >= levelData.minigunFireRate) {
                droneUnit.minigunAmmo--;
                droneUnit.lastMinigunFireTime = currentTime;

                if (droneUnit.minigunAmmo <= 0) {
                    droneUnit.minigunReloading = true;
                    droneUnit.minigunReloadStartTime = currentTime;
                }

                const radius = GRID_SIZE / 2;
                if (typeof enemies !== 'undefined') {
                    enemies.forEach(enemy => {
                        if (enemy.isSummon || enemy.hp <= 0) return;
                        const dx = Math.abs(enemy.x - mouseX);
                        const dy = Math.abs(enemy.y - mouseY);
                        if (dx <= radius && dy <= radius) {
                            let enemyDmgMult = damageMultiplier;
                            const dmg = levelData.minigunDamage * enemyDmgMult;

                            // Passive kill check
                            const startHp = enemy.hp;
                            if (typeof applyDamage === 'function') applyDamage(enemy, dmg, 'piercing');

                            if (enemy.hp <= 0 && startHp > 0) {
                                if (enemy.isDroneBounty) {
                                    droneUnit.bountyBuffStack = 0.25;
                                    droneUnit.bountyBuffEndTime = currentTime + 20000;
                                    enemy.isDroneBounty = false; // Prevent debuff
                                }
                                if (startHp > 50000 && levelData.killBuffAmount) {
                                    droneUnit.killBuffStack = levelData.killBuffAmount;
                                    droneUnit.killBuffEndTime = currentTime + levelData.killBuffDuration;
                                }
                            }
                        }
                    });
                }

                if (typeof projectiles !== 'undefined') {
                    projectiles.push({
                        x1: droneUnit.x,
                        y1: droneUnit.y,
                        x2: mouseX,
                        y2: mouseY,
                        color: 'yellow',
                        width: 2,
                        startTime: performance.now(),
                        duration: 100
                    });
                }

                if (window.sfxShoot) window.sfxShoot(); // plays sound
            }
        }

        // Rockets (Hold 2)
        if (window.keysPressed['2'] && levelData.rocketDamage) {
            if (!droneUnit.rocketReloading && droneUnit.rocketAmmo > 0 && currentTime - droneUnit.lastRocketFireTime >= levelData.rocketFireRate) {
                droneUnit.rocketAmmo--;
                droneUnit.lastRocketFireTime = currentTime;

                if (droneUnit.rocketAmmo <= 0) {
                    droneUnit.rocketReloading = true;
                    droneUnit.rocketReloadStartTime = currentTime;
                }

                const expRange = levelData.rocketRange * GRID_SIZE;

                if (typeof enemies !== 'undefined') {
                    enemies.forEach(enemy => {
                        if (enemy.isSummon || enemy.hp <= 0) return;
                        const dist = Math.sqrt(Math.pow(enemy.x - mouseX, 2) + Math.pow(enemy.y - mouseY, 2));
                        if (dist <= expRange) {
                            let enemyDmgMult = damageMultiplier;
                            const dmg = levelData.rocketDamage * enemyDmgMult;

                            // Passive kill check
                            const startHp = enemy.hp;
                            if (typeof applyDamage === 'function') applyDamage(enemy, dmg, 'piercing');

                            if (enemy.hp <= 0 && startHp > 0) {
                                if (enemy.isDroneBounty) {
                                    droneUnit.bountyBuffStack = 0.25;
                                    droneUnit.bountyBuffEndTime = currentTime + 20000;
                                    enemy.isDroneBounty = false; // Prevent debuff
                                }
                                if (startHp > 50000 && levelData.killBuffAmount) {
                                    droneUnit.killBuffStack = levelData.killBuffAmount;
                                    droneUnit.killBuffEndTime = currentTime + levelData.killBuffDuration;
                                }
                            }
                        }
                    });
                }

                if (typeof explosions !== 'undefined') {
                    explosions.push({
                        x: mouseX,
                        y: mouseY,
                        size: 0,
                        maxSize: expRange * 2,
                        startTime: currentTime,
                        duration: 300
                    });
                }

                if (typeof projectiles !== 'undefined') {
                    projectiles.push({
                        x1: droneUnit.x,
                        y1: droneUnit.y,
                        x2: mouseX,
                        y2: mouseY,
                        color: 'orange',
                        width: 4,
                        startTime: performance.now(),
                        duration: 150
                    });
                }

                if (window.sfxShoot) window.sfxShoot('orange');
            }
        }

        // Laser (Hold 3)
        if (window.keysPressed['3'] && levelData.laserDamage) {
            if (!droneUnit.laserActive && currentTime - droneUnit.laserCooldownStartTime >= levelData.laserCooldown) {
                droneUnit.laserActive = true;
                droneUnit.laserStartTime = currentTime;
                droneUnit.laserCooldownStartTime = currentTime;
            }

            if (droneUnit.laserActive) {
                // Tracking mouse for drawing
                droneUnit.laserMouseX = mouseX;
                droneUnit.laserMouseY = mouseY;

                if (currentTime - droneUnit.lastLaserTickTime >= levelData.laserTickRate) {
                    const radius = GRID_SIZE / 2;
                    if (typeof enemies !== 'undefined') {
                        enemies.forEach(enemy => {
                            if (enemy.isSummon || enemy.hp <= 0) return;
                            const dx = Math.abs(enemy.x - mouseX);
                            const dy = Math.abs(enemy.y - mouseY);
                            if (dx <= radius && dy <= radius) {
                                let enemyDmgMult = damageMultiplier;
                                const dmg = levelData.laserDamage * enemyDmgMult;

                                const startHp = enemy.hp;
                                if (typeof applyDamage === 'function') applyDamage(enemy, dmg, 'piercing');

                                if (enemy.hp <= 0 && startHp > 0) {
                                    if (enemy.isDroneBounty) {
                                        droneUnit.bountyBuffStack = 0.25;
                                        droneUnit.bountyBuffEndTime = currentTime + 20000;
                                        enemy.isDroneBounty = false; // Prevent debuff
                                    }
                                    if (startHp > 50000 && levelData.killBuffAmount) {
                                        droneUnit.killBuffStack = levelData.killBuffAmount;
                                        droneUnit.killBuffEndTime = currentTime + levelData.killBuffDuration;
                                    }
                                }
                            }
                        });
                    }
                    droneUnit.lastLaserTickTime = currentTime;
                }
            }
        }

        // Sight (Press 4 once)
        if (window.keysPressed['4'] && levelData.sightBuffAmount) {
            if (currentTime - droneUnit.lastSightTime >= levelData.sightCooldown) {
                const radius = GRID_SIZE / 2;
                let closestDist = Infinity;
                let closestEnemy = null;
                if (typeof enemies !== 'undefined') {
                    enemies.forEach(enemy => {
                        if (enemy.isSummon || enemy.hp <= 0) return;
                        const dx = Math.abs(enemy.x - mouseX);
                        const dy = Math.abs(enemy.y - mouseY);
                        if (dx <= radius && dy <= radius) {
                            const dLocal = Math.sqrt(dx * dx + dy * dy);
                            if (dLocal < closestDist) {
                                closestDist = dLocal;
                                closestEnemy = enemy;
                            }
                        }
                    });
                }

                if (closestEnemy) {
                    closestEnemy.hasDroneSight = true;
                    droneUnit.lastSightTime = currentTime;
                }

                // Set to false to act like a single press trigger
                window.keysPressed['4'] = false;
            }
        }
    }
}

function drawDrone(ctx) {
    if (!droneUnit || !droneUnit.active) return;

    // Draw Laser if active and player is actively pressing 3
    if (droneUnit.laserActive && window.keysPressed && window.keysPressed['3']) {
        ctx.save();
        ctx.strokeStyle = 'cyan';
        ctx.lineWidth = 10;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(droneUnit.x, droneUnit.y);
        ctx.lineTo(droneUnit.laserMouseX, droneUnit.laserMouseY);
        ctx.stroke();

        ctx.strokeStyle = 'white';
        ctx.lineWidth = 4;
        ctx.stroke();
        ctx.restore();
    }

    ctx.save();
    ctx.translate(droneUnit.x, droneUnit.y);

    // Draw Drone body
    ctx.fillStyle = DRONE_TOWER_TYPE.color;
    ctx.shadowBlur = 10;
    ctx.shadowColor = DRONE_TOWER_TYPE.color;
    // Base size 30 * scale 2 -> 60 width. Grid size is usually ~40.
    const droneRadius = 15 * DRONE_TOWER_TYPE.size;
    ctx.fillRect(-droneRadius, -droneRadius, droneRadius * 2, droneRadius * 2);

    // Draw inner design
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(0, 0, droneRadius * 0.4, 0, Math.PI * 2);
    ctx.fill();

    // Draw wings/blades
    ctx.fillStyle = '#333';
    ctx.fillRect(-droneRadius * 1.2, -5, droneRadius * 2.4, 10);
    ctx.fillRect(-5, -droneRadius * 1.2, 10, droneRadius * 2.4);

    ctx.restore();
}

// Draw the crosshair/grid ring if the player is controlling the drone
function drawDroneCrosshair(ctx, mouseX, mouseY) {
    if (!droneUnit || !droneUnit.active) return;

    ctx.save();

    const radius = GRID_SIZE / 2;
    ctx.strokeStyle = '#00FA9A';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.strokeRect(mouseX - radius, mouseY - radius, radius * 2, radius * 2);

    // Central cross
    ctx.beginPath();
    ctx.moveTo(mouseX - 10, mouseY);
    ctx.lineTo(mouseX + 10, mouseY);
    ctx.moveTo(mouseX, mouseY - 10);
    ctx.lineTo(mouseX, mouseY + 10);
    ctx.stroke();

    ctx.restore();
}

// Dummy handler to capture single-press UI events if needed, but mechanics are in updateDroneUnits
function handleDroneAbility(key, mouseX, mouseY) {
    // Left intentionally empty. updateDroneUnits handles the key states directly for continuous firing.
}
