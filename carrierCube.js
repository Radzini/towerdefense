
// Carrier Cube Tower Definition
const CARRIER_CUBE_TYPE = {
    name: 'Carrier Cube',
    color: '#4B0082',
    cost: 200000,
    aoe: false,
    summons: false,
    isCarrier: true,
    size: 4,
    limit: 1,
    hardLimit: 1,
    efficiencyCap: 20,
    levels: [
        {
            name: 'Placement',
            description: 'Unlocks Bomber Cube and Blisma Cube',
            emGainPerSec: 1,
            emCap: 20,
            upgradeCost: 0
        },
        {
            name: 'Upgrade',
            description: 'Unlocks Goliath, MOAB, and Refractor Cube',
            emGainPerSec: 2,
            emCap: 25,
            upgradeCost: 150000
        }
    ]
};

const CARRIER_UNITS = {
    BOMBER: {
        name: 'Bomber Cube',
        color: '#FF4500',
        damage: 4000,
        damageL2: 6000,
        area: 3,
        areaL2: 5,
        count: 3,
        duration: 2000,
        emCost: 1,
        cooldown: 5000,
        fullCooldown: 15000,
        paybackCooldown: 20000,
        limit: 2,
        hardLimit: 4,
        delay: 1500
    },
    BLISMA: {
        name: 'Blisma Cube',
        color: '#8A2BE2',
        damage: 750,
        burstCount: 14,
        burstRate: 40,  // 0.04s
        fireRate: 2000, // 2s between bursts
        duration: 25000,
        range: 4,
        speed: 0.25,
        emCost: 8,
        cooldown: 8000,
        fullCooldown: 40000,
        paybackCooldown: 60000,
        limit: 2,
        hardLimit: 3
    },
    REFRACTOR: {
        name: 'Refractor Cube',
        color: '#00CED1',
        damage: 10,
        damageInc: 10,
        fireRate: 60,
        duration: 20000,
        emCost: 12,
        cooldown: 10000,
        fullCooldown: 45000,
        paybackCooldown: 80000,
        limit: 1,
        hardLimit: 2,
        rotationSpeed: 0.005,
        orbitRadius: 250
    },
    MOAB: {
        name: 'MOAB Cube',
        color: '#2F4F4F',
        damage: 250000,
        emCost: 20,
        cooldown: 30000,
        fullCooldown: 60000,
        paybackCooldown: 120000,
        hardLimit: 1,
        cost: 20000
    },
    GOLIATH: {
        name: 'Goliath Cube',
        color: '#B8860B',
        minigunDamage: 500,
        minigunRate: 125,   // 0.125s = 125ms
        railgunDamage: 20000,
        railgunRate: 4000,  // every 4s, targets strongest
        missileDamage: 5000,
        missileCount: 2,
        missileRange: 4,    // 4 grid range
        missileRate: 2000,  // every 2s
        duration: 20000,
        emCost: 15,
        cooldown: 20000,
        fullCooldown: 60000,
        paybackCooldown: 80000,
        hardLimit: 1,
        cost: 50000,
        orbitRadius: 250,
        rotationSpeed: 0.005
    }
};

let carrierUnits = [];

function clearCarrierUnits() {
    carrierUnits = [];
}

function spawnCarrierUnit(type, tower, targetX, targetY) {
    const unit = {
        type: type,
        x: tower.x,
        y: tower.y,
        spawnTime: performance.now(),
        lastFireTime: 0,
        lastRailgunFire: 0,
        lastMissileFire: 0,
        owner: tower,
        active: true,
        rotation: 0,
        target: null,
        damageStack: 0,
        hasStruck: false,
        isFiring: false
    };

    if (type === CARRIER_UNITS.REFRACTOR || type === CARRIER_UNITS.GOLIATH || type === CARRIER_UNITS.MOAB) {
        unit.x = (gridWidth * GRID_SIZE) / 2;
        unit.y = (gridHeight * GRID_SIZE) / 2;
    } else if (type === CARRIER_UNITS.BOMBER) {
        unit.x = targetX;
        unit.y = targetY;
        unit.impactTime = performance.now() + (unit.type.delay || 1500);
        unit.hasImpacted = false;
    }

    carrierUnits.push(unit);
    return unit;
}

function updateCarrierUnits() {
    const currentTime = performance.now();

    carrierUnits = carrierUnits.filter(unit => {
        if (unit.type.duration && (currentTime - unit.spawnTime > unit.type.duration)) {
            return false;
        }
        return unit.active;
    });

    carrierUnits.forEach(unit => {
        if (!unit.active) return;

        if (unit.type === CARRIER_UNITS.BOMBER) {
            if (!unit.hasImpacted && currentTime >= unit.impactTime) {
                unit.hasImpacted = true;

                const level = unit.owner.level;
                const damage = level === 1 ? unit.type.damage : unit.type.damageL2;
                const area = level === 1 ? unit.type.area : unit.type.areaL2;
                const radius = (area * GRID_SIZE) / 2;

                enemies.forEach(enemy => {
                    if (enemy.isSummon) return; // Don't damage allies
                    const dx = Math.abs(enemy.x - unit.x);
                    const dy = Math.abs(enemy.y - unit.y);
                    if (dx <= radius && dy <= radius) {
                        applyDamage(enemy, damage * unit.type.count);
                    }
                });

                const explosionCount = 4;
                for (let i = 0; i < explosionCount; i++) {
                    setTimeout(() => {
                        const offsetX = (Math.random() - 0.5) * radius * 0.8;
                        const offsetY = (Math.random() - 0.5) * radius * 0.8;
                        explosions.push({
                            x: unit.x + offsetX,
                            y: unit.y + offsetY,
                            size: 0,
                            maxSize: radius * 1.5,
                            startTime: performance.now(),
                            duration: 500
                        });
                    }, i * 80);
                }

                unit.spawnTime = currentTime - unit.type.duration + 500;
            }
        }

        else if (unit.type === CARRIER_UNITS.REFRACTOR) {
            unit.rotation += unit.type.rotationSpeed || 0.005;

            const orbitRadius = unit.type.orbitRadius || 250;
            unit.x = (gridWidth * GRID_SIZE) / 2 + Math.cos(unit.rotation) * orbitRadius;
            unit.y = (gridHeight * GRID_SIZE) / 2 + Math.sin(unit.rotation) * orbitRadius;

            unit.isFiring = enemies.length > 0;

            if (currentTime - unit.lastFireTime >= unit.type.fireRate) {
                unit.damageStack += unit.type.damageInc;
                const currentDamage = unit.type.damage + unit.damageStack;

                // Find first valid enemy (not summons)
                const validEnemies = enemies.filter(e => !e.isSummon && e.hp > 0);
                const firstEnemy = validEnemies.length > 0 ? validEnemies[0] : null;

                if (firstEnemy) {
                    applyDamage(firstEnemy, currentDamage);
                    unit.target = firstEnemy; // Store target for drawing
                } else {
                    unit.target = null;
                }
                unit.lastFireTime = currentTime;
            }
        }

        else if (unit.type === CARRIER_UNITS.BLISMA) {
            if (!unit.target || unit.target.hp <= 0 || unit.target.isSummon) {
                // Find first valid enemy (not summons)
                const validEnemies = enemies.filter(e => !e.isSummon && e.hp > 0);
                unit.target = validEnemies.length > 0 ? validEnemies[0] : null;
            }

            if (unit.target) {
                const dx = unit.target.x - unit.x;
                const dy = unit.target.y - unit.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist > unit.type.range * GRID_SIZE) {
                    const angle = Math.atan2(dy, dx);
                    unit.x += Math.cos(angle) * unit.type.speed * frameDelta;
                    unit.y += Math.sin(angle) * unit.type.speed * frameDelta;
                }

                if (currentTime - unit.lastFireTime >= unit.type.fireRate) {
                    for (let i = 0; i < unit.type.burstCount; i++) {
                        setTimeout(() => {
                            if (unit.target && unit.target.hp > 0) {
                                applyDamage(unit.target, unit.type.damage);
                                projectiles.push({
                                    x1: unit.x,
                                    y1: unit.y,
                                    x2: unit.target.x,
                                    y2: unit.target.y,
                                    color: '#FF1493',
                                    width: 2,
                                    startTime: performance.now(),
                                    duration: 100
                                });
                            }
                        }, i * unit.type.burstRate);
                    }
                    unit.lastFireTime = currentTime;
                }
            }
        }

        else if (unit.type === CARRIER_UNITS.MOAB) {
            if (currentTime - unit.spawnTime < 100) {
                enemies.forEach(enemy => {
                    if (enemy.isSummon) return; // Don't damage allies
                    applyDamage(enemy, unit.type.damage);
                });

                explosions.push({
                    x: unit.x,
                    y: unit.y,
                    size: 0,
                    maxSize: 2000,
                    startTime: currentTime,
                    duration: 1000
                });

                unit.active = false;
            }
        }

        else if (unit.type === CARRIER_UNITS.GOLIATH) {
            unit.rotation += unit.type.rotationSpeed || 0.005;
            const orbitRadius = unit.type.orbitRadius || 250;
            unit.x = (gridWidth * GRID_SIZE) / 2 + Math.cos(unit.rotation) * orbitRadius;
            unit.y = (gridHeight * GRID_SIZE) / 2 + Math.sin(unit.rotation) * orbitRadius;

            if (!unit.lastMinigunFire) unit.lastMinigunFire = 0;

            if (currentTime - unit.lastMinigunFire >= unit.type.minigunRate) {
                // Filter to only target non-summon enemies
                const validTargets = enemies.filter(e => !e.isSummon && e.hp > 0);
                if (validTargets.length > 0) {
                    const randomTarget = validTargets[Math.floor(Math.random() * validTargets.length)];
                    applyDamage(randomTarget, unit.type.minigunDamage);
                    projectiles.push({
                        x1: unit.x,
                        y1: unit.y,
                        x2: randomTarget.x,
                        y2: randomTarget.y,
                        color: 'yellow',
                        width: 1,
                        startTime: currentTime,
                        duration: 50
                    });
                    unit.lastMinigunFire = currentTime;
                }
            }

            if (currentTime - unit.lastRailgunFire >= unit.type.railgunRate) {
                // Filter to only target non-summon enemies - target first in array
                const validTargets = enemies.filter(e => !e.isSummon && e.hp > 0);
                if (validTargets.length > 0) {
                    const firstEnemy = validTargets[0];
                    if (firstEnemy) {
                        applyDamage(firstEnemy, unit.type.railgunDamage);
                        // Use the global railgunShots array for rendering
                        railgunShots.push({
                            x1: unit.x,
                            y1: unit.y,
                            x2: firstEnemy.x,
                            y2: firstEnemy.y,
                            alpha: 1,
                            startTime: currentTime,
                            duration: 500
                        });
                    }
                    unit.lastRailgunFire = currentTime;
                }
            }

            if (currentTime - unit.lastMissileFire >= unit.type.missileRate) {
                // Filter to only target non-summon enemies
                const validTargets = enemies.filter(e => !e.isSummon && e.hp > 0);
                for (let i = 0; i < unit.type.missileCount; i++) {
                    if (validTargets.length === 0) break;
                    const target = validTargets[Math.floor(Math.random() * validTargets.length)];
                    if (target) {
                        enemies.forEach(e => {
                            if (e.isSummon) return; // Don't damage allies in AOE
                            const dx = e.x - target.x;
                            const dy = e.y - target.y;
                            if (Math.sqrt(dx * dx + dy * dy) <= unit.type.missileRange * GRID_SIZE) {
                                applyDamage(e, unit.type.missileDamage);
                            }
                        });
                        explosions.push({
                            x: target.x,
                            y: target.y,
                            size: 0,
                            maxSize: unit.type.missileRange * GRID_SIZE * 2,
                            startTime: currentTime,
                            duration: 300
                        });
                    }
                }
                unit.lastMissileFire = currentTime;
            }
        }
    });
}

function drawCarrierUnits(ctx) {
    carrierUnits.forEach(unit => {
        if (!unit.active) return;

        ctx.save();

        if (unit.type === CARRIER_UNITS.BOMBER) {
            if (!unit.hasImpacted) {
                const level = unit.owner.level;
                const area = level === 1 ? unit.type.area : unit.type.areaL2;
                const radius = (area * GRID_SIZE) / 2;

                const pulse = (Math.sin(performance.now() / 100) + 1) / 2;
                ctx.strokeStyle = `rgba(255, 69, 0, ${0.5 + pulse * 0.5})`;
                ctx.lineWidth = 3;
                ctx.setLineDash([10, 5]);
                ctx.strokeRect(unit.x - radius, unit.y - radius, radius * 2, radius * 2);
                ctx.setLineDash([]);

                ctx.strokeStyle = 'rgba(255, 0, 0, 0.4)';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(unit.x - radius, unit.y - radius);
                ctx.lineTo(unit.x - radius - 20, unit.y - radius - 20);
                ctx.moveTo(unit.x + radius, unit.y - radius);
                ctx.lineTo(unit.x + radius + 20, unit.y - radius - 20);
                ctx.moveTo(unit.x - radius, unit.y + radius);
                ctx.lineTo(unit.x - radius - 20, unit.y + radius + 20);
                ctx.moveTo(unit.x + radius, unit.y + radius);
                ctx.lineTo(unit.x + radius + 20, unit.y + radius + 20);
                ctx.stroke();

                const timeLeft = Math.max(0, (unit.impactTime - performance.now()) / 1000);
                ctx.fillStyle = 'white';
                ctx.font = 'bold 16px Arial';
                ctx.textAlign = 'center';
                ctx.fillText(timeLeft.toFixed(1) + 's', unit.x, unit.y);
            }
        }

        else if (unit.type === CARRIER_UNITS.REFRACTOR) {
            // Always draw the Refractor unit body
            ctx.translate(unit.x, unit.y);
            ctx.rotate(unit.rotation);

            // Draw diamond shape
            ctx.fillStyle = unit.type.color;
            ctx.shadowBlur = 15;
            ctx.shadowColor = unit.type.color;
            ctx.beginPath();
            ctx.moveTo(0, -25);
            ctx.lineTo(25, 0);
            ctx.lineTo(0, 25);
            ctx.lineTo(-25, 0);
            ctx.closePath();
            ctx.fill();

            // Inner glow
            ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.beginPath();
            ctx.moveTo(0, -12);
            ctx.lineTo(12, 0);
            ctx.lineTo(0, 12);
            ctx.lineTo(-12, 0);
            ctx.closePath();
            ctx.fill();
            ctx.shadowBlur = 0;

            ctx.restore();
            ctx.save();

            // Draw beam to single target
            if (unit.target && unit.target.hp > 0) {
                // Outer glow beam
                ctx.strokeStyle = '#00FFFF';
                ctx.lineWidth = 4;
                ctx.shadowBlur = 20;
                ctx.shadowColor = '#00FFFF';
                ctx.beginPath();
                ctx.moveTo(unit.x, unit.y);
                ctx.lineTo(unit.target.x, unit.target.y);
                ctx.stroke();

                // Inner bright core
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
                ctx.lineWidth = 2;
                ctx.shadowBlur = 10;
                ctx.shadowColor = '#FFFFFF';
                ctx.beginPath();
                ctx.moveTo(unit.x, unit.y);
                ctx.lineTo(unit.target.x, unit.target.y);
                ctx.stroke();

                ctx.shadowBlur = 0;
            }
        }

        else if (unit.type === CARRIER_UNITS.GOLIATH) {
            // Draw Goliath - large armored cube with weapon systems
            ctx.translate(unit.x, unit.y);
            ctx.rotate(unit.rotation);

            // Main body - large square
            ctx.fillStyle = unit.type.color;
            ctx.shadowBlur = 15;
            ctx.shadowColor = unit.type.color;
            ctx.fillRect(-35, -35, 70, 70);

            // Armor plating effect
            ctx.strokeStyle = 'rgba(255, 215, 0, 0.5)';
            ctx.lineWidth = 3;
            ctx.strokeRect(-35, -35, 70, 70);

            // Inner core
            ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            ctx.fillRect(-25, -25, 50, 50);

            // Minigun barrels (left side)
            ctx.fillStyle = '#444';
            ctx.fillRect(-45, -8, 15, 4);
            ctx.fillRect(-45, -2, 15, 4);
            ctx.fillRect(-45, 4, 15, 4);

            // Railgun (right side)
            ctx.fillStyle = '#00BFFF';
            ctx.fillRect(30, -5, 20, 10);
            ctx.strokeStyle = '#00FFFF';
            ctx.lineWidth = 2;
            ctx.strokeRect(30, -5, 20, 10);

            // Missile pods (top)
            ctx.fillStyle = '#8B0000';
            ctx.fillRect(-15, -50, 10, 15);
            ctx.fillRect(5, -50, 10, 15);

            ctx.shadowBlur = 0;
        }

        else if (unit.type !== CARRIER_UNITS.BOMBER) {
            // Generic fallback for other units (Blisma, etc.)
            ctx.translate(unit.x, unit.y);
            ctx.rotate(unit.rotation);
            ctx.fillStyle = unit.type.color;
            ctx.shadowBlur = 10;
            ctx.shadowColor = unit.type.color;
            ctx.fillRect(-15, -15, 30, 30);
            ctx.shadowBlur = 0;
        }

        ctx.restore();
    });

    // Draw bomber targeting preview if in targeting mode
    if (window.bomberTargetPreview) {
        ctx.save();

        const preview = window.bomberTargetPreview;
        const pulse = (Math.sin(performance.now() / 100) + 1) / 2;

        // Draw square preview (like orbital strike)
        ctx.strokeStyle = `rgba(255, 69, 0, ${0.5 + pulse * 0.5})`;
        ctx.lineWidth = 3;
        ctx.setLineDash([10, 5]);
        ctx.strokeRect(
            preview.x - preview.range,
            preview.y - preview.range,
            preview.range * 2,
            preview.range * 2
        );
        ctx.setLineDash([]);

        // Draw incoming indicator lines
        ctx.strokeStyle = 'rgba(255, 0, 0, 0.4)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(preview.x - preview.range, preview.y - preview.range);
        ctx.lineTo(preview.x - preview.range - 20, preview.y - preview.range - 20);
        ctx.moveTo(preview.x + preview.range, preview.y - preview.range);
        ctx.lineTo(preview.x + preview.range + 20, preview.y - preview.range - 20);
        ctx.moveTo(preview.x - preview.range, preview.y + preview.range);
        ctx.lineTo(preview.x - preview.range - 20, preview.y + preview.range + 20);
        ctx.moveTo(preview.x + preview.range, preview.y + preview.range);
        ctx.lineTo(preview.x + preview.range + 20, preview.y + preview.range + 20);
        ctx.stroke();

        // Draw center crosshair
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(preview.x - 10, preview.y);
        ctx.lineTo(preview.x + 10, preview.y);
        ctx.moveTo(preview.x, preview.y - 10);
        ctx.lineTo(preview.x, preview.y + 10);
        ctx.stroke();

        ctx.restore();
    }
}
