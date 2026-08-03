// =============================================================
// Golden Carrier Tower — direct-fire multi-weapon tower.
// Damage1 = laser, Damage2 = laser (3-burst), Damage3 = piercing,
// Damage4 = explosive missile burst. Calamity stacks on Damage1 hits
// against high-HP enemies; at 4 stacks the next Damage1 shot is
// replaced by a boost-immune red Calamity explosion.
//
// Loaded AFTER carrierCube.js and BEFORE towers.js/script.js. It only
// references globals (TOWER_TYPES, enemies, applyDamage, ...) at
// runtime from inside functions, so load order is safe.
// =============================================================

// Visual style for projectiles drawn by this tower.
// 'orb' = red energy orb with a white core (per spec).
const GOLDEN_CARRIER_ORB_PROJECTILE = {
    renderStyle: 'orb',
    outerColor: '#FF0000',
    coreColor: '#FFFFFF',
    // Diameters are intentionally tied to the 1x1 grid tower size:
    // Damage1 is 1.4x a 1x1 tower; Calamity is 2x2.
    sizes: {
        damage1: { radiusTiles: 0.70, coreTiles: 0.27, duration: 620 },
        damage2: { radiusTiles: 0.22, coreTiles: 0.09, duration: 230 },
        damage3: { radiusTiles: 0.32, coreTiles: 0.12, duration: 300 },
        damage4: { radiusTiles: 0.36, coreTiles: 0.14, duration: 520 },
        calamity: { radiusTiles: 1.00, coreTiles: 0.38, duration: 900 }
    }
};

// Push a travelling red energy orb with a white core onto projectiles[].
// Damage1 and Calamity deliberately use longer durations so their power is
// visually readable; the renderer keeps every projectile visible until it arrives.
function spawnGoldenCarrierOrb(fromX, fromY, toX, toY, timestamp, kind = 'damage1', durationOverride = null) {
    if (typeof projectiles === 'undefined' || !Array.isArray(projectiles)) return;
    const size = GOLDEN_CARRIER_ORB_PROJECTILE.sizes[kind] || GOLDEN_CARRIER_ORB_PROJECTILE.sizes.damage1;
    const grid = typeof GRID_SIZE !== 'undefined' ? GRID_SIZE : 40;
    const radius = size.radiusTiles * grid;
    projectiles.push({
        x1: fromX, y1: fromY,
        x2: toX, y2: toY,
        color: GOLDEN_CARRIER_ORB_PROJECTILE.outerColor,
        width: radius * 2,
        startTime: timestamp,
        duration: durationOverride || size.duration,
        renderStyle: 'orb',
        orbKind: kind,
        outerColor: GOLDEN_CARRIER_ORB_PROJECTILE.outerColor,
        coreColor: GOLDEN_CARRIER_ORB_PROJECTILE.coreColor,
        radius,
        coreRadius: size.coreTiles * grid
    });
}

// Red explosion visual (used by Damage4 impacts and the Calamity proc).
function spawnGoldenCarrierExplosion(x, y, aoeTiles, timestamp, duration = 420) {
    if (typeof createColoredExplosionEffect === 'function') {
        createColoredExplosionEffect(x, y, aoeTiles, timestamp, duration, '#FF0000', '#FFFFFF');
    } else if (typeof createExplosionEffect === 'function') {
        createExplosionEffect(x, y, aoeTiles, timestamp, duration);
    }
}

// Enemy eligibility for the Calamity stack: only enemies at/above the
// per-level HP threshold (checked vs maxHp so the mark does not fall
// off as the enemy takes damage).
function goldenCarrierCalamityEligible(enemy, stats) {
    if (!enemy || enemy.hp <= 0) return false;
    const maxHp = enemy.maxHp || (enemy.type && enemy.type.hp) || 0;
    return maxHp >= (stats.calamityHpThreshold || Infinity);
}

// Trigger the Calamity proc on a target:
//  - full calamityExplosionDamage to the target (boost-immune)
//  - calamityAoePercent of that as splash to OTHER enemies in 5x5
//  - red explosion visual
//  - reset the target's stacks to 0
function goldenCarrierProcCalamity(tower, target, stats, timestamp) {
    const procDamage = stats.calamityExplosionDamage;
    const aoePercent = stats.calamityAoePercent;
    const radiusTiles = stats.calamityAoeRadius || 5;
    const splashDamage = Math.floor(procDamage * aoePercent);

    // Slow 2x2 Calamity projectile from the tower core.
    spawnGoldenCarrierOrb(tower.x, tower.y, target.x, target.y, timestamp, 'calamity');

    // Primary hit — boost-immune (noDamageBoosts).
    if (typeof applyDamage === 'function') {
        applyDamage(target, procDamage, 'explosive', null, { noDamageBoosts: true, ignoreGoldenTowerVulnerability: true });
    }

    // Splash to OTHER enemies inside the 5x5 box around the target.
    const radiusPx = radiusTiles * (typeof GRID_SIZE !== 'undefined' ? GRID_SIZE : 40);
    if (radiusPx && typeof enemies !== 'undefined' && splashDamage > 0) {
        enemies.forEach(enemy => {
            if (!enemy || enemy === target || enemy.isSummon || enemy.hp <= 0) return;
            const dx = Math.abs(enemy.x - target.x);
            const dy = Math.abs(enemy.y - target.y);
            if (dx <= radiusPx && dy <= radiusPx) {
                applyDamage(enemy, splashDamage, 'explosive', null, { noDamageBoosts: true, ignoreGoldenTowerVulnerability: true });
            }
        });
    }

    spawnGoldenCarrierExplosion(target.x, target.y, radiusTiles, timestamp, 520);
    target.calamityStacks = 0;
    tower.lastCalamityProc = timestamp;
}

// Main update for the Golden Carrier tower. Modeled on updateLunarCubeTower.
function updateGoldenCarrierTower(tower, stats, timestamp) {
    // Golden Carrier CANNOT be stunned — but isTowerStunned() already
    // short-circuits via tower.type.cannotBeStunned, so reaching here
    // means the tower is active.
    const combatDebuff = getTowerCombatDebuffState(tower, timestamp);
    const damageMultiplier = combatDebuff.damageMultiplier;
    const fireRateMultiplier = combatDebuff.fireRateMultiplier;

    // Refresh target if invalid.
    if (!tower.target || tower.target.hp <= 0 || !enemies.includes(tower.target) || !isInRange(tower, tower.target)) {
        tower.target = findTarget(tower);
    }

    // -------- Damage1 : laser (Calamity builder / proc) --------
    if (tower.target && isInRange(tower, tower.target) &&
        timestamp - (tower.lastDamage1Fired || -Infinity) >= stats.fireRate1 * fireRateMultiplier) {

        const target = tower.target;

        // Calamity PROC: replaces this Damage1 shot when stacks are full.
        if (goldenCarrierCalamityEligible(target, stats) &&
            (target.calamityStacks || 0) >= (stats.calamityProcStacks || 4)) {
            goldenCarrierProcCalamity(tower, target, stats, timestamp);
        } else {
            // Calamity makes Damage1 deal +15% per stack, capped at +60%.
            // This bonus is intentionally limited to Damage1.
            const calamityStacks = goldenCarrierCalamityEligible(target, stats) ? (target.calamityStacks || 0) : 0;
            const calamityBonus = Math.min(stats.calamityMaxBonus || 0.60, calamityStacks * (stats.calamityPerStack || 0.15));
            const dmg = Math.floor(stats.damage1 * damageMultiplier * (1 + calamityBonus));
            applyDamage(target, dmg, 'laser', null, { calamityBoost: true, isGoldenTowerAttack: true });

            // Build a Calamity stack on eligible enemies.
            if (goldenCarrierCalamityEligible(target, stats)) {
                target.calamityStacks = Math.min(
                    (stats.calamityProcStacks || 4),
                    (target.calamityStacks || 0) + 1
                );
            }

            // L4+ : Damage1 stun. L5 : also -15% slow for 1.5s.
            if (stats.damage1Stun) {
                const stunMs = stats.damage1Stun;
                target.commandoStunUntil = Math.max(target.commandoStunUntil || timestamp, timestamp + stunMs);
            }
            if (stats.damage1Slow && stats.damage1SlowDuration) {
                target.commandoSlowUntil = timestamp + stats.damage1SlowDuration;
                target.commandoSlowAmount = stats.damage1Slow;
            }

            // Red-orb projectile (laser look) for Damage1.
            spawnGoldenCarrierOrb(tower.x, tower.y, target.x, target.y, timestamp, 'damage1');
        }

        tower.lastDamage1Fired = timestamp;
    }

    // -------- Damage2 : laser 3-ball burst on cooldown --------
    if (stats.damage2) {
        // (Re)start a burst when the cooldown has elapsed.
        if ((tower.damage2BurstRemaining || 0) <= 0 &&
            timestamp - (tower.lastDamage2Cycle || -Infinity) >= (stats.damage2Cooldown || 0) * fireRateMultiplier) {
            tower.damage2BurstRemaining = stats.damage2Count || 3;
            tower.lastDamage2Shot = timestamp - (stats.damage2BurstFireRate || 0); // fire immediately
            tower.lastDamage2Cycle = timestamp;
        }

        if ((tower.damage2BurstRemaining || 0) > 0 &&
            timestamp - (tower.lastDamage2Shot || 0) >= (stats.damage2BurstFireRate || 400)) {
            const d2Target = (tower.target && tower.target.hp > 0 && enemies.includes(tower.target) && isInRange(tower, tower.target))
                ? tower.target
                : findTarget(tower);
            if (d2Target) {
                const dmg = Math.floor(stats.damage2 * damageMultiplier);
                applyDamage(d2Target, dmg, 'laser', null, { isGoldenTowerAttack: true });
                spawnGoldenCarrierOrb(tower.x, tower.y, d2Target.x, d2Target.y, timestamp, 'damage2');
            }
            tower.damage2BurstRemaining -= 1;
            tower.lastDamage2Shot = timestamp;
        }
    }

    // -------- Damage3 : piercing shot --------
    if (stats.damage3) {
        const d3Target = (tower.target && tower.target.hp > 0 && enemies.includes(tower.target) && isInRange(tower, tower.target))
            ? tower.target
            : findTarget(tower);
        if (d3Target && timestamp - (tower.lastDamage3Fired || -Infinity) >= (stats.damage3FireRate || 0) * fireRateMultiplier) {
            const dmg = Math.floor(stats.damage3 * damageMultiplier);
            applyDamage(d3Target, dmg, 'piercing', null, { isGoldenTowerAttack: true });
            // Damage3 is piercing, but still uses the Golden Carrier orb projectile style.
            spawnGoldenCarrierOrb(tower.x, tower.y, d3Target.x, d3Target.y, timestamp, 'damage3');
            tower.lastDamage3Fired = timestamp;
        }
    }

    // -------- Damage4 : explosive missile burst (top/bottom of cube) --------
    if (stats.damage4) {
        // (Re)start a missile burst when the cooldown has elapsed.
        if ((tower.damage4BurstRemaining || 0) <= 0 &&
            timestamp - (tower.lastDamage4Cycle || -Infinity) >= (stats.damage4Cooldown || 0) * fireRateMultiplier) {
            tower.damage4BurstRemaining = stats.damage4BurstSize || 0;
            tower.lastDamage4Shot = timestamp - (stats.damage4FireRate || 0); // fire immediately
            tower.lastDamage4Cycle = timestamp;
            tower.damage4ShotIndex = 0;
        }

        if ((tower.damage4BurstRemaining || 0) > 0 &&
            timestamp - (tower.lastDamage4Shot || 0) >= (stats.damage4FireRate || 350)) {
            const d4Target = (tower.target && tower.target.hp > 0 && enemies.includes(tower.target) && isInRange(tower, tower.target))
                ? tower.target
                : findTarget(tower);
            if (d4Target) {
                // Alternate origin between the top and bottom of the 6x6 cube.
                const idx = (tower.damage4ShotIndex || 0);
                const halfSizeTiles = (tower.type.size || 6) / 2;
                const offsetPx = halfSizeTiles * (typeof GRID_SIZE !== 'undefined' ? GRID_SIZE : 40);
                const originY = (idx % 2 === 0) ? tower.y - offsetPx : tower.y + offsetPx;

                const originX = (idx % 4 === 2) ? tower.x - offsetPx : (idx % 4 === 3) ? tower.x + offsetPx : tower.x;
                const missileOriginY = (idx % 4 === 0) ? tower.y - offsetPx : (idx % 4 === 1) ? tower.y + offsetPx : tower.y;
                spawnGoldenCarrierOrb(originX, missileOriginY, d4Target.x, d4Target.y, timestamp, 'damage4');

                const dmg = Math.floor(stats.damage4 * damageMultiplier);
                const aoeTiles = stats.damage4AOE || 2;
                // Apply impact via the explosion helper so it splashes in a radius.
                if (typeof applyExplosionDamageAt === 'function') {
                    applyExplosionDamageAt(d4Target.x, d4Target.y, aoeTiles, dmg, 'explosive', { isGoldenTowerAttack: true });
                } else if (typeof applyDamage === 'function') {
                    applyDamage(d4Target, dmg, 'explosive', null, { isGoldenTowerAttack: true });
                }
                spawnGoldenCarrierExplosion(d4Target.x, d4Target.y, aoeTiles, timestamp, 360);

                tower.damage4ShotIndex = idx + 1;
            }
            tower.damage4BurstRemaining -= 1;
            tower.lastDamage4Shot = timestamp;
        }
    }
}

// Dedicated projectile renderer for the orb style: a red energy orb
// with a glowing outer halo and a bright white core inside. The base
// drawProjectiles loop skips renderStyle === 'orb' entries.
function drawGoldenCarrierProjectiles(ctx) {
    if (typeof projectiles === 'undefined') return;
    const now = (typeof performance !== 'undefined' ? performance.now() : Date.now());
    for (const p of projectiles) {
        if (p.renderStyle !== 'orb') continue;
        const elapsed = now - p.startTime;
        const t = Math.max(0, Math.min(1, elapsed / (p.duration || 160)));
        const x = p.x1 + (p.x2 - p.x1) * t;
        const y = p.y1 + (p.y2 - p.y1) * t;
        const r = p.radius || 9;
        const cr = p.coreRadius || 4;
        const outer = p.outerColor || '#FF0000';
        const core = p.coreColor || '#FFFFFF';

        // Outer soft glow (large, low-alpha red halo).
        const glow = ctx.createRadialGradient(x, y, 0, x, y, r * 2.4);
        glow.addColorStop(0, 'rgba(255, 0, 0, 0.55)');
        glow.addColorStop(0.5, 'rgba(255, 0, 0, 0.20)');
        glow.addColorStop(1, 'rgba(255, 0, 0, 0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(x, y, r * 2.4, 0, Math.PI * 2);
        ctx.fill();

        // Damage4 reads as a missile: a short red trail follows its flight path.
        if (p.orbKind === 'damage4') {
            const angle = Math.atan2(p.y2 - p.y1, p.x2 - p.x1);
            ctx.save();
            ctx.strokeStyle = 'rgba(255, 40, 40, 0.85)';
            ctx.lineWidth = Math.max(3, r * 0.55);
            ctx.beginPath();
            ctx.moveTo(x - Math.cos(angle) * r * 2.4, y - Math.sin(angle) * r * 2.4);
            ctx.lineTo(x - Math.cos(angle) * r * 0.35, y - Math.sin(angle) * r * 0.35);
            ctx.stroke();
            ctx.restore();
        }

        // Red orb body (radial gradient: brighter at center, dark at edge).
        const body = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, 0, x, y, r);
        body.addColorStop(0, '#FF6A6A');
        body.addColorStop(0.55, outer);
        body.addColorStop(1, '#7A0000');
        ctx.fillStyle = body;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();

        // White-hot core inside.
        const coreGrad = ctx.createRadialGradient(x, y, 0, x, y, cr);
        coreGrad.addColorStop(0, '#FFFFFF');
        coreGrad.addColorStop(0.7, '#FFE8E8');
        coreGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = coreGrad;
        ctx.beginPath();
        ctx.arc(x, y, cr, 0, Math.PI * 2);
        ctx.fill();

        // Animated red electricity makes every Golden Carrier projectile readable.
        ctx.save();
        ctx.globalAlpha = 0.7 + Math.sin(now / 70 + x * 0.01) * 0.2;
        ctx.strokeStyle = '#FF3030';
        ctx.shadowColor = '#FF0000';
        ctx.shadowBlur = 10;
        ctx.lineWidth = Math.max(1.5, r * 0.12);
        for (let arc = 0; arc < 3; arc++) {
            const angle = now / 260 + arc * (Math.PI * 2 / 3);
            const sx = x + Math.cos(angle) * r * 0.7;
            const sy = y + Math.sin(angle) * r * 0.7;
            const ex = x + Math.cos(angle) * r * 1.35;
            const ey = y + Math.sin(angle) * r * 1.35;
            const mx = (sx + ex) / 2 + Math.sin(now / 45 + arc) * r * 0.18;
            const my = (sy + ey) / 2 + Math.cos(now / 55 + arc) * r * 0.18;
            ctx.beginPath();
            ctx.moveTo(sx, sy);
            ctx.lineTo(mx, my);
            ctx.lineTo(ex, ey);
            ctx.stroke();
        }
        ctx.restore();
    }
}

// Hook into the render pipeline: call drawGoldenCarrierProjectiles
// after the standard projectile pass. script.js's render loop draws
// projectiles around line 8063; expose this so it can be invoked there.
window.drawGoldenCarrierProjectiles = drawGoldenCarrierProjectiles;
