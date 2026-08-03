// Eclipse Weaver Tower — Mimics nearest tower, fires homing void orbs

const ECLIPSE_WEAVER_TOWER_TYPE = {
    name: 'Eclipse Weaver',
    color: '#6A0DAD',
    cost: 3000,
    aoe: false,
    summons: false,
    isEclipseWeaver: true,
    size: 1,
    limit: 1,
    cannotBeBuffed: true,
    levels: [
        { damage: 15, fireRate: 1500, range: 6, bounces: 1, speedDamageMultiplier: 1.5, upgradeCost: 0 },
        { damage: 35, fireRate: 1200, range: 7, bounces: 2, speedDamageMultiplier: 2.0, speedStealAmount: 0.05, upgradeCost: 1000 },
        { damage: 70, fireRate: 1000, range: 8, bounces: 3, speedDamageMultiplier: 2.5, speedStealAmount: 0.05, voidStackAmount: 0.02, voidStackCap: 1.0, upgradeCost: 5000 },
        { damage: 150, fireRate: 800, range: 10, bounces: 5, speedDamageMultiplier: 3.0, speedStealAmount: 0.05, voidStackAmount: 0.02, voidStackCap: 1.0, nullImprintCooldown: 60000, upgradeCost: 10000 }
    ]
};

let eclipseWeaverOrbs = [];
let eclipseWeaverVoidStacks = {};

function getCopiedDamageType(tower) {
    var copied = tower._eclipseCopiedTower;
    if (copied && copied.type && copied.type.damageType) return copied.type.damageType;
    return 'piercing';
}

function getEclipseWeaverDamage(target) {
    if (!target || !target.hp) return 150;
    var hp = target.hp;
    if (hp < 2500) return 150;
    if (hp < 10000) return 250;
    if (hp < 50000) return 500;
    return 1000;
}

function getNearestDamageTower(tower) {
    var nearest = null;
    var nearestDist = Infinity;
    for (var _i = 0; _i < towers.length; _i++) {
        var t = towers[_i];
        if (t === tower) continue;
        if (t.type && t.type.damageType && !t.type.isEclipseWeaver) {
            var dx = tower.x - t.x;
            var dy = tower.y - t.y;
            var dist = dx * dx + dy * dy;
            if (dist < nearestDist) { nearestDist = dist; nearest = t; }
        }
    }
    return nearest;
}

function findEclipseWeaverTarget(tower, timestamp) {
    var stats = tower.type.levels[tower.level - 1];
    var sqRange = (stats.range * GRID_SIZE) * (stats.range * GRID_SIZE);
    var bestTarget = null;
    var bestScore = -Infinity;
    for (var _i = 0; _i < enemies.length; _i++) {
        var enemy = enemies[_i];
        if (enemy.hp <= 0 || enemy.isSummon) continue;
        var sqDist = (tower.x - enemy.x) * (tower.x - enemy.x) + (tower.y - enemy.y) * (tower.y - enemy.y);
        if (sqDist > sqRange) continue;
        var speedBonus = enemy.speed > 0 ? (stats.speedDamageMultiplier || 1.0) : 1.0;
        var score = enemy.distanceTraveled * speedBonus;
        if (score > bestScore) { bestScore = score; bestTarget = enemy; }
    }
    return bestTarget;
}

function fireEclipseWeaverOrb(tower, target, timestamp) {
    var stats = tower.type.levels[tower.level - 1];
    var damageType = getCopiedDamageType(tower);
    var baseDmg = getEclipseWeaverDamage(target);
    var voidStackKey = tower._eclipseId || (tower._eclipseId = 'ew_' + Math.random().toString(36).slice(2, 8));
    eclipseWeaverOrbs.push({
        tower: tower, target: target, bouncesLeft: stats.bounces, damage: baseDmg,
        damageType: damageType, currentX: tower.x, currentY: tower.y, speed: 8,
        startTime: timestamp, lastBounceTime: timestamp, hitEnemies: [],
        speedDamageMultiplier: stats.speedDamageMultiplier || 1.0,
        voidStackAmount: stats.voidStackAmount || 0, voidStackKey: voidStackKey, done: false
    });
}

function updateEclipseWeaverOrbs(timestamp) {
    for (var i = eclipseWeaverOrbs.length - 1; i >= 0; i--) {
        var orb = eclipseWeaverOrbs[i];
        if (orb.done) { eclipseWeaverOrbs.splice(i, 1); continue; }
        var target = orb.target;
        if (!target || target.hp <= 0 || !enemies.includes(target)) { orb.done = true; continue; }
        var dx = target.x - orb.currentX;
        var dy = target.y - orb.currentY;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 10) {
            var spd = target.speed;
            var _maxM = orb.speedDamageMultiplier;
            var speedMult = spd >= 0.6 ? _maxM : spd > 0.4 ? Math.min(2.5, _maxM) : spd > 0.3 ? Math.min(2.0, _maxM) : spd > 0.2 ? Math.min(1.5, _maxM) : 1.0;
            var finalDmg = Math.floor(orb.damage * speedMult * (target._eclipseMarked ? 1.5 : 1));
            // HP-threshold base damage: 150/250/500/1000 — speedMult + Null Mark 2x on top
            applyDamage(target, finalDmg, orb.damageType);
            projectiles.push({ x1: orb.currentX, y1: orb.currentY, x2: target.x, y2: target.y, color: '#6A0DAD', width: 3, startTime: timestamp, duration: 80 });
            orb.hitEnemies.push(target);
            if (orb.voidStackAmount && orb.voidStackKey) {
                eclipseWeaverVoidStacks[orb.voidStackKey] = (eclipseWeaverVoidStacks[orb.voidStackKey] || 0) + orb.voidStackAmount;
            }
            if (orb.bouncesLeft > 0) {
                var newTarget = null;
                var bestScore = -Infinity;
                for (var _j = 0; _j < enemies.length; _j++) {
                    var enemy = enemies[_j];
                    if (enemy.hp <= 0 || enemy.isSummon || orb.hitEnemies.includes(enemy)) continue;
                    var score = enemy.distanceTraveled * (enemy.speed > 0 ? orb.speedDamageMultiplier : 1.0);
                    if (score > bestScore) { bestScore = score; newTarget = enemy; }
                }
                if (newTarget) { orb.target = newTarget; orb.currentX = target.x; orb.currentY = target.y; orb.bouncesLeft--; orb.lastBounceTime = timestamp; }
                else { orb.done = true; }
            } else { orb.done = true; }
        } else {
            var moveSpeed = orb.speed * (frameDelta / 16.667);
            orb.currentX += (dx / dist) * moveSpeed;
            orb.currentY += (dy / dist) * moveSpeed;
        }
    }
}

function updateEclipseWeaverTowers(timestamp) {
    for (var _i = 0; _i < towers.length; _i++) {
        var tower = towers[_i];
        if (!tower.type || !tower.type.isEclipseWeaver) continue;
        if (tower.level < 1 || tower.level > tower.type.levels.length) continue;
        if (isTowerStunned(tower, timestamp)) continue;
        var stats = tower.type.levels[tower.level - 1];
        if (!tower._eclipseCopiedTower || tower._eclipseLastCheck < timestamp - 5000) {
            tower._eclipseCopiedTower = getNearestDamageTower(tower);
            tower._eclipseLastCheck = timestamp;
        }
        if (!tower.target || tower.target.hp <= 0 || !enemies.includes(tower.target) || !isInRange(tower, tower.target)) {
            tower.target = findEclipseWeaverTarget(tower, timestamp);
        }
        if (tower.target && timestamp - tower.lastFired >= stats.fireRate) {
            if (!tower.target.isSummon && tower.target.hp > 0 && isInRange(tower, tower.target)) {
                fireEclipseWeaverOrb(tower, tower.target, timestamp);
                tower.lastFired = timestamp;
                tower.isFiring = true;
            }
        }
    }
    updateEclipseWeaverOrbs(timestamp);
}

var eclipseWeaverNullImprintActive = false;
var eclipseWeaverNullImprintData = null;

function activateEclipseWeaverNullImprint(tower) {
    if (!tower || !tower.type.isEclipseWeaver) return;
    if (isTowerStunned(tower)) return;
    var stats = tower.type.levels[tower.level - 1];
    if (!stats.nullImprintCooldown) return;
    var now = performance.now();
    if (now - (tower._lastNullImprintTime || 0) < stats.nullImprintCooldown) return;
    eclipseWeaverNullImprintActive = true;
    eclipseWeaverNullImprintData = { tower: tower };
    if (typeof refreshCanvasCursor === 'function') refreshCanvasCursor();
    var tp = document.getElementById('towerInfoPanel');
    var ta = document.getElementById('towerActions');
    if (tp) tp.style.display = 'none';
    if (ta) ta.style.display = 'none';
}

function executeEclipseWeaverNullImprint(enemy) {
    if (!eclipseWeaverNullImprintData || !enemy) return;
    var tower = eclipseWeaverNullImprintData.tower;
    if (isTowerStunned(tower)) {
        eclipseWeaverNullImprintActive = false;
        eclipseWeaverNullImprintData = null;
        if (typeof refreshCanvasCursor === 'function') refreshCanvasCursor();
        return;
    }
    var now = performance.now();
    tower._lastNullImprintTime = now;
    enemy._eclipseMarked = true;
    enemy._eclipseMarkedTime = now;
    enemy._eclipseMarkDuration = 8000;
    var div = document.createElement('div');
    div.className = 'cash-effect';
    div.style.left = enemy.x + 'px';
    div.style.top = (enemy.y - 20) + 'px';
    div.style.color = '#6A0DAD';
    div.style.fontSize = '14px';
    div.style.fontWeight = 'bold';
    div.textContent = 'NULL IMPRINT';
    document.body.appendChild(div);
    setTimeout(function() { div.remove(); }, 1500);
    eclipseWeaverNullImprintActive = false;
    eclipseWeaverNullImprintData = null;
    if (typeof refreshCanvasCursor === 'function') refreshCanvasCursor();
    if (typeof showTowerInfo === 'function' && window.currentInfoTower) showTowerInfo(window.currentInfoTower);
}

function checkEclipseMarkDeathGlobal() {
    for (var _ei = 0; _ei < enemies.length; _ei++) {
        checkEclipseWeaverMarkDeath(enemies[_ei]);
    }
}

function checkEclipseWeaverMarkDeath(enemy) {
    if (enemy._eclipseMarked && enemy.hp <= 0) {
        var range = GRID_SIZE * 4;
        var now = performance.now();
        for (var _i = 0; _i < enemies.length; _i++) {
            var e = enemies[_i];
            if (e === enemy || e.hp <= 0) continue;
            var dist = Math.sqrt((enemy.x - e.x) * (enemy.x - e.x) + (enemy.y - e.y) * (enemy.y - e.y));
            if (dist <= range) {
                e._eclipseStunUntil = Math.max(e._eclipseStunUntil || 0, now + 3000);
                e._eclipseVulnUntil = Math.max(e._eclipseVulnUntil || 0, now + 5000);
                e._eclipseVulnAmount = 0.20;
            }
        }
        explosions.push({ x: enemy.x, y: enemy.y, size: 0, maxSize: range * 2, startTime: now, duration: 500 });
        if (window.triggerShake) window.triggerShake(6, 200);
    }
}

function drawEclipseWeaverOrbs(ctx) {
    for (var _i = 0; _i < eclipseWeaverOrbs.length; _i++) {
        var orb = eclipseWeaverOrbs[_i];
        if (orb.done) continue;
        ctx.save();
        var pulse = Math.sin(performance.now() / 80) * 0.3 + 0.7;
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#6A0DAD';
        ctx.fillStyle = 'rgba(106, 13, 173,' + pulse + ')';
        ctx.beginPath();
        ctx.arc(orb.currentX, orb.currentY, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
        ctx.beginPath();
        ctx.arc(orb.currentX, orb.currentY, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.restore();
        if (orb.target && orb.target.hp > 0) {
            ctx.save();
            ctx.strokeStyle = 'rgba(106, 13, 173, 0.2)';
            ctx.lineWidth = 1;
            ctx.setLineDash([3, 5]);
            ctx.beginPath();
            ctx.moveTo(orb.currentX, orb.currentY);
            ctx.lineTo(orb.target.x, orb.target.y);
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.restore();
        }
    }
}

function getEclipseWeaverInfoHTML(tower) {
    var stats = tower.type.levels[tower.level - 1];
    var voidStackKey = tower._eclipseId || '';
    var voidStack = eclipseWeaverVoidStacks[voidStackKey] || 0;
    var voidStackPct = Math.min(voidStack, stats.voidStackCap || 0) * 100;
    var copiedType = getCopiedDamageType(tower);
    var copiedName = tower._eclipseCopiedTower ? tower._eclipseCopiedTower.type.name : 'None';

    var html = '';
    html += '<div class="info-row"><div class="info-label">Damage</div><div class="info-value">HP-threshold: 150/250/500/1000</div></div>';
    html += '<div class="info-row"><div class="info-label">Fire Rate</div><div class="info-value">' + (stats.fireRate / 1000).toFixed(2) + 's</div></div>';
    html += '<div class="info-row"><div class="info-label">Range</div><div class="info-value">' + stats.range + ' tiles</div></div>';
    html += '<div class="info-row"><div class="info-label">Bounces</div><div class="info-value">' + stats.bounces + '</div></div>';
    html += '<div class="info-row"><div class="info-label">Copied Type</div><div class="info-value" style="color:#FFD700;">' + copiedType + ' (from ' + copiedName + ')</div></div>';
    html += '<div class="info-row"><div class="info-label">Speed Bonus</div><div class="info-value">x' + stats.speedDamageMultiplier + ' vs fast</div></div>';
    html += '<div style="height:1px;background:rgba(255,255,255,0.1);margin:6px 0;"></div>';
    html += '<div class="info-row"><div class="info-label" style="color:#6A0DAD;">Void Stack</div><div class="info-value">+' + voidStackPct.toFixed(0) + '%' + (stats.voidStackCap ? ' (cap ' + (stats.voidStackCap * 100) + '%)' : '') + '</div></div>';

    if (stats.nullImprintCooldown) {
        var cdRemain = Math.max(0, (stats.nullImprintCooldown - (performance.now() - (tower._lastNullImprintTime || 0))) / 1000);
        html += '<div class="info-row"><div class="info-label" style="color:#FF69B4;">Null Imprint</div><div class="info-value">' + (cdRemain > 0 ? 'CD ' + cdRemain.toFixed(1) + 's' : 'Ready') + ' — orbs 2x vs marked</div></div>';
    }
    return html;
}

// Cosmic GOD Tower - cheat-menu-only cosmic super tower

const COSMIC_GOD_TOWER_TYPE = {
    name: 'Cosmic GOD Tower',
    color: '#7A5CFF',
    cost: 0,
    aoe: false,
    summons: false,
    isCosmicGod: true,
    cannotBeBuffed: true,
    size: 6,
    footprint: { width: 6, height: 6 },
    limit: 1,
    levels: [
        {
            damage: 50000,
            fireRate: 100,
            range: Infinity,
            bigOrbDamage: 1000000,
            bigOrbFireRate: 3000,
            bigOrbSpeed: 12,
            bigOrbSizeTiles: 3,
            bounceOrbDamage: 75000,
            bounceOrbCooldown: 10000,
            bounceOrbSpeed: 10,
            bounceOrbBounces: 6,
            bounceOrbCount: 5,
            laserInitialDamage: 5000000,
            laserTickDamage: 100000,
            laserTickRate: 50,
            laserDuration: 3500,
            laserCooldown: 20000,
            laserSizeTiles: 4,
            percentMaxHpDamage: 0.05,
            upgradeCost: 0
        }
    ]
};

const cosmicGodTexture = new Image();
cosmicGodTexture.src = 'outerspace-58.gif';
window.cosmicGodTexture = cosmicGodTexture;

let cosmicGodBigOrbs = [];
let cosmicGodBounceOrbs = [];
let cosmicGodMiniOrbs = [];

function getCosmicGodTexture() {
    var domTexture = document.getElementById('cosmicGodGifSource');
    return domTexture || window.cosmicGodTexture || cosmicGodTexture;
}

function ensureCosmicGodGifSource() {
    if (document.getElementById('cosmicGodGifSource')) return;
    var img = document.createElement('img');
    img.id = 'cosmicGodGifSource';
    img.src = 'outerspace-58.gif';
    img.alt = '';
    img.style.position = 'fixed';
    img.style.left = '-9999px';
    img.style.top = '-9999px';
    img.style.width = '1px';
    img.style.height = '1px';
    img.style.opacity = '0';
    img.style.pointerEvents = 'none';
    img.style.zIndex = '-1';
    document.body.appendChild(img);
    window.cosmicGodTexture = img;
}

function cosmicGodFindTarget(tower) {
    var stats = tower.type.levels[tower.level - 1];
    return findBestEnemyInRange(tower.x, tower.y, (stats.range || 12) * GRID_SIZE, function(enemy) {
        return !enemy.isSummon && enemy.hp > 0;
    });
}

function cosmicGodDamage(enemy, baseDamage, stats) {
    var maxHp = enemy && enemy.maxHp ? enemy.maxHp : 0;
    return Math.floor(baseDamage + maxHp * (stats.percentMaxHpDamage || 0.05));
}

function cosmicGodApplyDamage(enemy, baseDamage, stats, damageType, fireRate) {
    if (!enemy || enemy.hp <= 0 || enemy.isSummon) return;
    applyDamage(enemy, cosmicGodDamage(enemy, baseDamage, stats), damageType || 'piercing', null, fireRate ? { fireRate } : {});
}

function cosmicGodUnitVector(fromX, fromY, toX, toY) {
    var dx = toX - fromX;
    var dy = toY - fromY;
    var dist = Math.sqrt(dx * dx + dy * dy) || 1;
    return { x: dx / dist, y: dy / dist };
}

function cosmicGodOffMap(x, y, margin) {
    return x < -margin || y < -margin || x > gameWidth + margin || y > gameHeight + margin;
}

function cosmicGodLineHitDistance(px, py, ax, ay, bx, by) {
    var abx = bx - ax;
    var aby = by - ay;
    var apx = px - ax;
    var apy = py - ay;
    var abLenSq = abx * abx + aby * aby || 1;
    var t = Math.max(0, Math.min(1, (apx * abx + apy * aby) / abLenSq));
    var cx = ax + abx * t;
    var cy = ay + aby * t;
    var dx = px - cx;
    var dy = py - cy;
    return Math.sqrt(dx * dx + dy * dy);
}

function cosmicGodDrawGifCircle(ctxRef, x, y, radius, rotation) {
    ctxRef.save();
    ctxRef.beginPath();
    ctxRef.arc(x, y, radius, 0, Math.PI * 2);
    ctxRef.clip();
    ctxRef.translate(x, y);
    ctxRef.rotate(rotation || 0);
    var texture = getCosmicGodTexture();
    if (texture && texture.complete && texture.naturalWidth > 0) {
        ctxRef.drawImage(texture, -radius, -radius, radius * 2, radius * 2);
    } else {
        ctxRef.fillStyle = '#7A5CFF';
        ctxRef.fillRect(-radius, -radius, radius * 2, radius * 2);
    }
    ctxRef.restore();
    ctxRef.save();
    ctxRef.strokeStyle = 'rgba(255, 255, 255, 0.75)';
    ctxRef.lineWidth = Math.max(2, radius * 0.05);
    ctxRef.shadowBlur = 18;
    ctxRef.shadowColor = '#B7F7FF';
    ctxRef.beginPath();
    ctxRef.arc(x, y, radius, 0, Math.PI * 2);
    ctxRef.stroke();
    ctxRef.restore();
}

function fireCosmicGodMiniOrb(tower, target, timestamp) {
    var stats = tower.type.levels[tower.level - 1];
    cosmicGodApplyDamage(target, stats.damage, stats, 'piercing', stats.fireRate);
    cosmicGodMiniOrbs.push({
        x: tower.x, y: tower.y, tx: target.x, ty: target.y,
        radius: GRID_SIZE * 0.5, startTime: timestamp, duration: 140
    });
}

function fireCosmicGodBigOrb(tower, target, timestamp) {
    var stats = tower.type.levels[tower.level - 1];
    var dir = cosmicGodUnitVector(tower.x, tower.y, target.x, target.y);
    cosmicGodBigOrbs.push({
        tower: tower,
        x: tower.x,
        y: tower.y,
        vx: dir.x * stats.bigOrbSpeed,
        vy: dir.y * stats.bigOrbSpeed,
        radius: (stats.bigOrbSizeTiles || 3) * GRID_SIZE / 2,
        damage: stats.bigOrbDamage,
        hitEnemies: new Set(),
        createdAt: timestamp
    });
}

function fireCosmicGodBounceOrbs(tower, target, timestamp) {
    var stats = tower.type.levels[tower.level - 1];
    var baseDir = cosmicGodUnitVector(tower.x, tower.y, target.x, target.y);
    var count = stats.bounceOrbCount || 3;
    var spread = count === 1 ? 0 : Math.PI / 7;
    for (var i = 0; i < count; i++) {
        var offset = count === 1 ? 0 : ((i / (count - 1)) - 0.5) * spread;
        var angle = Math.atan2(baseDir.y, baseDir.x) + offset;
        cosmicGodBounceOrbs.push({
            tower: tower,
            x: tower.x,
            y: tower.y,
            vx: Math.cos(angle) * stats.bounceOrbSpeed,
            vy: Math.sin(angle) * stats.bounceOrbSpeed,
            radius: GRID_SIZE * 0.65,
            damage: stats.bounceOrbDamage,
            bouncesLeft: stats.bounceOrbBounces,
            lastEnemyBounceTime: 0,
            createdAt: timestamp
        });
    }
}

function startCosmicGodLaser(tower, target, timestamp) {
    var stats = tower.type.levels[tower.level - 1];
    var dir = cosmicGodUnitVector(tower.x, tower.y, target.x, target.y);
    tower.cosmicLaser = {
        active: true,
        startTime: timestamp,
        lastTick: timestamp,
        dirX: dir.x,
        dirY: dir.y,
        endX: tower.x + dir.x * Math.max(gameWidth, gameHeight) * 2,
        endY: tower.y + dir.y * Math.max(gameWidth, gameHeight) * 2
    };
    tower.lastCosmicLaser = timestamp;
    for (var i = 0; i < enemies.length; i++) {
        var enemy = enemies[i];
        if (enemy.isSummon || enemy.hp <= 0) continue;
        if (cosmicGodLineHitDistance(enemy.x, enemy.y, tower.x, tower.y, tower.cosmicLaser.endX, tower.cosmicLaser.endY) <= (stats.laserSizeTiles * GRID_SIZE) / 2 + (enemy.size || 0)) {
            cosmicGodApplyDamage(enemy, stats.laserInitialDamage, stats, 'laser');
        }
    }
}

function updateCosmicGodLaser(tower, stats, timestamp) {
    var laser = tower.cosmicLaser;
    if (!laser || !laser.active) return false;
    if (timestamp - laser.startTime >= stats.laserDuration) {
        laser.active = false;
        tower.cosmicLaser = null;
        return false;
    }
    if (timestamp - laser.lastTick >= stats.laserTickRate) {
        for (var i = 0; i < enemies.length; i++) {
            var enemy = enemies[i];
            if (enemy.isSummon || enemy.hp <= 0) continue;
            var halfWidth = (stats.laserSizeTiles * GRID_SIZE) / 2 + (enemy.size || 0);
            if (cosmicGodLineHitDistance(enemy.x, enemy.y, tower.x, tower.y, laser.endX, laser.endY) <= halfWidth) {
                cosmicGodApplyDamage(enemy, stats.laserTickDamage, stats, 'laser', stats.laserTickRate);
            }
        }
        laser.lastTick = timestamp;
    }
    return true;
}

function updateCosmicGodTowers(timestamp) {
    ensureCosmicGodGifSource();
    for (var i = 0; i < towers.length; i++) {
        var tower = towers[i];
        if (!tower.type || !tower.type.isCosmicGod) continue;
        if (tower.level < 1 || tower.level > tower.type.levels.length) continue;
        if (isTowerStunned(tower, timestamp)) continue;

        var stats = tower.type.levels[tower.level - 1];
        if (updateCosmicGodLaser(tower, stats, timestamp)) {
            tower.isFiring = true;
            continue;
        }

        var target = cosmicGodFindTarget(tower);
        tower.target = target;
        tower.isFiring = false;
        if (!target) continue;

        if (timestamp - (tower.lastCosmicLaser || -stats.laserCooldown) >= stats.laserCooldown) {
            startCosmicGodLaser(tower, target, timestamp);
            tower.isFiring = true;
            continue;
        }

        if (timestamp - (tower.lastFired || 0) >= stats.fireRate) {
            fireCosmicGodMiniOrb(tower, target, timestamp);
            tower.lastFired = timestamp;
        }
        if (timestamp - (tower.lastCosmicBigOrb || 0) >= stats.bigOrbFireRate) {
            fireCosmicGodBigOrb(tower, target, timestamp);
            tower.lastCosmicBigOrb = timestamp;
        }
        if (timestamp - (tower.lastCosmicBounceOrb || 0) >= stats.bounceOrbCooldown) {
            fireCosmicGodBounceOrbs(tower, target, timestamp);
            tower.lastCosmicBounceOrb = timestamp;
        }
    }

    updateCosmicGodMiniOrbs(timestamp);
    updateCosmicGodBigOrbs(timestamp);
    updateCosmicGodBounceOrbs(timestamp);
}

function updateCosmicGodMiniOrbs(timestamp) {
    for (var i = cosmicGodMiniOrbs.length - 1; i >= 0; i--) {
        if (timestamp - cosmicGodMiniOrbs[i].startTime >= cosmicGodMiniOrbs[i].duration) {
            cosmicGodMiniOrbs.splice(i, 1);
        }
    }
}

function updateCosmicGodBigOrbs(timestamp) {
    for (var i = cosmicGodBigOrbs.length - 1; i >= 0; i--) {
        var orb = cosmicGodBigOrbs[i];
        var scale = frameDelta / 16.667;
        orb.x += orb.vx * scale;
        orb.y += orb.vy * scale;
        for (var e = 0; e < enemies.length; e++) {
            var enemy = enemies[e];
            if (enemy.isSummon || enemy.hp <= 0 || orb.hitEnemies.has(enemy)) continue;
            if (calculateDistance(orb.x, orb.y, enemy.x, enemy.y) <= orb.radius + (enemy.size || 0)) {
                var stats = orb.tower.type.levels[orb.tower.level - 1];
                cosmicGodApplyDamage(enemy, orb.damage, stats, 'piercing');
                orb.hitEnemies.add(enemy);
            }
        }
        if (cosmicGodOffMap(orb.x, orb.y, orb.radius + GRID_SIZE)) {
            cosmicGodBigOrbs.splice(i, 1);
        }
    }
}

function updateCosmicGodBounceOrbs(timestamp) {
    for (var i = cosmicGodBounceOrbs.length - 1; i >= 0; i--) {
        var orb = cosmicGodBounceOrbs[i];
        var scale = frameDelta / 16.667;
        orb.x += orb.vx * scale;
        orb.y += orb.vy * scale;

        var bounced = false;
        if (orb.x - orb.radius <= 0 || orb.x + orb.radius >= gameWidth) {
            orb.vx *= -1;
            orb.x = Math.max(orb.radius, Math.min(gameWidth - orb.radius, orb.x));
            bounced = true;
        }
        if (orb.y - orb.radius <= 0 || orb.y + orb.radius >= gameHeight) {
            orb.vy *= -1;
            orb.y = Math.max(orb.radius, Math.min(gameHeight - orb.radius, orb.y));
            bounced = true;
        }

        for (var e = 0; e < enemies.length; e++) {
            var enemy = enemies[e];
            if (enemy.isSummon || enemy.hp <= 0) continue;
            if (calculateDistance(orb.x, orb.y, enemy.x, enemy.y) <= orb.radius + (enemy.size || 0)) {
                var stats = orb.tower.type.levels[orb.tower.level - 1];
                cosmicGodApplyDamage(enemy, orb.damage, stats, 'piercing', 16);
                if (timestamp - (orb.lastEnemyBounceTime || 0) > 100) {
                    var away = cosmicGodUnitVector(enemy.x, enemy.y, orb.x, orb.y);
                    var speed = Math.sqrt(orb.vx * orb.vx + orb.vy * orb.vy) || stats.bounceOrbSpeed;
                    orb.vx = away.x * speed;
                    orb.vy = away.y * speed;
                    orb.lastEnemyBounceTime = timestamp;
                    bounced = true;
                }
                break;
            }
        }

        if (bounced) {
            orb.bouncesLeft--;
            if (orb.bouncesLeft < 0) {
                cosmicGodBounceOrbs.splice(i, 1);
                continue;
            }
        }
        if (timestamp - orb.createdAt > 12000) {
            cosmicGodBounceOrbs.splice(i, 1);
        }
    }
}

function drawCosmicGodEffects(ctxRef, timestamp) {
    for (var m = 0; m < cosmicGodMiniOrbs.length; m++) {
        var mini = cosmicGodMiniOrbs[m];
        var t = Math.max(0, Math.min(1, (timestamp - mini.startTime) / mini.duration));
        cosmicGodDrawGifCircle(ctxRef, mini.x + (mini.tx - mini.x) * t, mini.y + (mini.ty - mini.y) * t, mini.radius, timestamp / 65);
    }
    for (var i = 0; i < cosmicGodBigOrbs.length; i++) {
        cosmicGodDrawGifCircle(ctxRef, cosmicGodBigOrbs[i].x, cosmicGodBigOrbs[i].y, cosmicGodBigOrbs[i].radius, timestamp / 120);
    }
    for (var j = 0; j < cosmicGodBounceOrbs.length; j++) {
        cosmicGodDrawGifCircle(ctxRef, cosmicGodBounceOrbs[j].x, cosmicGodBounceOrbs[j].y, cosmicGodBounceOrbs[j].radius, -timestamp / 90);
    }
    for (var k = 0; k < towers.length; k++) {
        var tower = towers[k];
        if (!tower.type || !tower.type.isCosmicGod || !tower.cosmicLaser || !tower.cosmicLaser.active) continue;
        drawCosmicGodLaser(ctxRef, tower, tower.type.levels[tower.level - 1], timestamp);
    }
}

function drawCosmicGodLaser(ctxRef, tower, stats, timestamp) {
    var laser = tower.cosmicLaser;
    var width = stats.laserSizeTiles * GRID_SIZE;
    var angle = Math.atan2(laser.dirY, laser.dirX);
    var length = Math.max(gameWidth, gameHeight) * 2;
    var texture = getCosmicGodTexture();
    var pulse = 0.72 + Math.sin(timestamp / 55) * 0.18;
    var step = width * 0.62;
    var offset = (timestamp * 1.8) % step;

    ctxRef.save();
    ctxRef.translate(tower.x, tower.y);
    ctxRef.rotate(angle);

    ctxRef.lineCap = 'round';
    ctxRef.shadowBlur = 34;
    ctxRef.shadowColor = '#82F7FF';
    ctxRef.strokeStyle = 'rgba(76, 40, 190, 0.45)';
    ctxRef.lineWidth = width * 1.08;
    ctxRef.beginPath();
    ctxRef.moveTo(0, 0);
    ctxRef.lineTo(length, 0);
    ctxRef.stroke();

    ctxRef.save();
    ctxRef.beginPath();
    ctxRef.roundRect ? ctxRef.roundRect(0, -width / 2, length, width, width / 2) : ctxRef.rect(0, -width / 2, length, width);
    ctxRef.clip();
    ctxRef.globalAlpha = 0.9;
    for (var x = -offset; x < length + step; x += step) {
        ctxRef.save();
        ctxRef.translate(x, 0);
        ctxRef.rotate((timestamp / 75) + x * 0.01);
        if (texture && texture.complete && texture.naturalWidth > 0) {
            ctxRef.drawImage(texture, -width / 2, -width / 2, width, width);
        } else {
            ctxRef.fillStyle = '#7A5CFF';
            ctxRef.beginPath();
            ctxRef.arc(0, 0, width / 2, 0, Math.PI * 2);
            ctxRef.fill();
        }
        ctxRef.restore();
    }

    var grad = ctxRef.createLinearGradient(0, -width / 2, 0, width / 2);
    grad.addColorStop(0, 'rgba(255,255,255,0)');
    grad.addColorStop(0.45, 'rgba(255,255,255,' + (0.24 + pulse * 0.16) + ')');
    grad.addColorStop(0.55, 'rgba(183,247,255,' + (0.18 + pulse * 0.14) + ')');
    grad.addColorStop(1, 'rgba(255,255,255,0)');
    ctxRef.fillStyle = grad;
    ctxRef.fillRect(0, -width / 2, length, width);
    ctxRef.restore();

    ctxRef.strokeStyle = 'rgba(255, 255, 255, 0.85)';
    ctxRef.lineWidth = 3;
    ctxRef.shadowBlur = 12;
    ctxRef.shadowColor = '#FFFFFF';
    ctxRef.beginPath();
    ctxRef.moveTo(0, -width / 2);
    ctxRef.lineTo(length, -width / 2);
    ctxRef.moveTo(0, width / 2);
    ctxRef.lineTo(length, width / 2);
    ctxRef.stroke();
    ctxRef.restore();
}

function clearCosmicGodTowerEffects(tower) {
    cosmicGodBigOrbs = cosmicGodBigOrbs.filter(function(orb) { return orb.tower !== tower; });
    cosmicGodBounceOrbs = cosmicGodBounceOrbs.filter(function(orb) { return orb.tower !== tower; });
    cosmicGodMiniOrbs = [];
}

function getCosmicGodInfoHTML(tower) {
    var stats = tower.type.levels[tower.level - 1];
    var laserRemaining = tower.cosmicLaser && tower.cosmicLaser.active ? Math.max(0, (stats.laserDuration - (performance.now() - tower.cosmicLaser.startTime)) / 1000) : 0;
    var laserCd = Math.max(0, (stats.laserCooldown - (performance.now() - (tower.lastCosmicLaser || 0))) / 1000);
    var bounceCd = Math.max(0, (stats.bounceOrbCooldown - (performance.now() - (tower.lastCosmicBounceOrb || 0))) / 1000);
    var html = '';
    html += '<div class="info-row"><div class="info-label">Range</div><div class="info-value">' + (Number.isFinite(stats.range) ? stats.range + ' tiles' : 'Infinite') + '</div></div>';
    html += '<div class="info-row"><div class="info-label">Passive</div><div class="info-value">All attacks add 5% max HP damage</div></div>';
    html += '<div class="info-row"><div class="info-label">Mini Orbs</div><div class="info-value">' + stats.damage.toLocaleString() + ' / ' + (stats.fireRate / 1000).toFixed(2) + 's</div></div>';
    html += '<div class="info-row"><div class="info-label">Piercing Orb</div><div class="info-value">' + stats.bigOrbDamage.toLocaleString() + ' every ' + (stats.bigOrbFireRate / 1000).toFixed(1) + 's</div></div>';
    html += '<div class="info-row"><div class="info-label">Bounce Orbs</div><div class="info-value">' + stats.bounceOrbDamage.toLocaleString() + ' x' + stats.bounceOrbCount + ' | CD ' + bounceCd.toFixed(1) + 's</div></div>';
    html += '<div class="info-row"><div class="info-label">Cosmic Beam</div><div class="info-value">' + (laserRemaining > 0 ? 'Active ' + laserRemaining.toFixed(1) + 's' : 'CD ' + laserCd.toFixed(1) + 's') + '</div></div>';
    return html;
}
