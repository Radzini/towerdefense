// Blockpire Tower — Vampire blood crystal tower

var blockpireCrystals = [];
var blockpireTargetingActive = false;
var blockpireTargetingData = null;

var BLOCKPIRE_TOWER_TYPE = {
    name: 'Blockpire',
    color: '#DC143C',
    cost: 3000,
    aoe: false,
    summons: false,
    isBlockpire: true,
    size: 1,
    limit: 2,
    cannotBeBuffed: true,
    levels: [
        { damage: 0, fireRate: 400, range: 4, dotTick: 5, crystalStartHp: 500, crystalMaxHp: 20000, maxBaseHpBonus: 1000, upgradeCost: 0 },
        { damage: 0, fireRate: 400, range: 4, dotTick: 10, crystalStartHp: 1000, crystalMaxHp: 40000, maxBaseHpBonus: 2000, upgradeCost: 1500 },
        { damage: 0, fireRate: 400, range: 5, dotTick: 25, crystalStartHp: 2500, crystalMaxHp: 80000, maxBaseHpBonus: 3000, hasTransfer: true, upgradeCost: 3000 },
        { damage: 0, fireRate: 400, range: 5, dotTick: 50, crystalStartHp: 5000, crystalMaxHp: 140000, maxBaseHpBonus: 4000, hasTransfer: true, hasPrison: true, prisonCooldown: 45000, upgradeCost: 5000 },
        { damage: 0, fireRate: 400, range: 6, dotTick: 100, crystalStartHp: 10000, crystalMaxHp: 200000, maxBaseHpBonus: 5000, hasTransfer: true, hasPrison: true, prisonCooldown: 45000, upgradeCost: 8000 }
    ]
};

function getCrystalSize(currentHp) {
    if (currentHp >= 10000) return 50;
    if (currentHp >= 5000) return 45;
    if (currentHp >= 2000) return 40;
    return 35;
}

function getCrystalResistance(currentHp) {
    if (currentHp >= 10000) return 0.20;
    if (currentHp >= 5000) return 0.14;
    if (currentHp >= 2000) return 0.08;
    return 0.04;
}

function createBlockpireCrystal(tower, pathX, pathY) {
    var stats = tower.type.levels[tower.level - 1];
    var existing = getBlockpireCrystalByTower(tower);
    if (existing) {
        existing.x = pathX;
        existing.y = pathY;
        if (tower._pendingMoveHp) {
            existing.hp = Math.min(tower._pendingMoveHp, stats.crystalMaxHp);
            delete tower._pendingMoveHp;
        } else {
            existing.hp = stats.crystalStartHp;
        }
        existing.maxHp = stats.crystalMaxHp;
        existing.size = getCrystalSize(existing.hp);
        existing.resistance = getCrystalResistance(existing.hp);
        existing.alive = true;
        existing.lastCollisionTime = 0;
        return existing;
    }
    var crystal = {
        tower: tower,
        x: pathX,
        y: pathY,
        hp: stats.crystalStartHp,
        maxHp: stats.crystalMaxHp,
        size: getCrystalSize(stats.crystalStartHp),
        resistance: getCrystalResistance(stats.crystalStartHp),
        alive: true,
        lastCollisionTime: 0,
        totalHpDrained: 0,
        totalBaseHpAdded: 0,
        infectedEnemy: null
    };
    blockpireCrystals.push(crystal);
    return crystal;
}

function getBlockpireCrystalByTower(tower) {
    for (var _i = 0; _i < blockpireCrystals.length; _i++) {
        if (blockpireCrystals[_i].tower === tower) return blockpireCrystals[_i];
    }
    return null;
}

function findPathTileUnderMouse(mouseX, mouseY) {
    var gridX = Math.floor(mouseX / GRID_SIZE);
    var gridY = Math.floor(mouseY / GRID_SIZE);
    if (gridX < 0 || gridX >= gridWidth || gridY < 0 || gridY >= gridHeight) return null;
    if (gameGrid[gridY][gridX].type === 'path') {
        return { x: gridX * GRID_SIZE + GRID_SIZE / 2, y: gridY * GRID_SIZE + GRID_SIZE / 2 };
    }
    return null;
}

function activateBlockpireCrystalPlacement(tower, isMove) {
    if (!tower || !tower.type.isBlockpire) return;
    if (isTowerStunned(tower)) return;
    var existing = getBlockpireCrystalByTower(tower);
    var _wasAlive = existing && existing.alive;
    if (existing && existing.alive) {
        tower._pendingMoveHp = existing.hp;
        existing.alive = false;
        tower._lastCrystalDeathTime = performance.now();
    }
    if (existing && !existing.alive && tower._lastCrystalDeathTime && !_wasAlive) {
        var now = performance.now();
        if (now - tower._lastCrystalDeathTime < 30000 && !isMove) {
            return;
        }
    }
    blockpireTargetingActive = true;
    blockpireTargetingData = { tower: tower };
    if (typeof refreshCanvasCursor === 'function') refreshCanvasCursor();
    var tp = document.getElementById('towerInfoPanel');
    var ta = document.getElementById('towerActions');
    if (tp) tp.style.display = 'none';
    if (ta) ta.style.display = 'none';
}

function executeBlockpireCrystalPlacement(mouseX, mouseY) {
    if (!blockpireTargetingData) return;
    var tower = blockpireTargetingData.tower;
    if (isTowerStunned(tower)) {
        blockpireTargetingActive = false;
        blockpireTargetingData = null;
        if (typeof refreshCanvasCursor === 'function') refreshCanvasCursor();
        return;
    }
    var tile = findPathTileUnderMouse(mouseX, mouseY);
    if (tile) {
        createBlockpireCrystal(tower, tile.x, tile.y);
        blockpireTargetingActive = false;
        blockpireTargetingData = null;
        if (typeof refreshCanvasCursor === 'function') refreshCanvasCursor();
        if (typeof showTowerInfo === 'function' && window.currentInfoTower) showTowerInfo(window.currentInfoTower);
    }
}

function activateBlockpirePrison(tower) {
    if (!tower || !tower.type.isBlockpire) return;
    if (isTowerStunned(tower)) return;
    var stats = tower.type.levels[tower.level - 1];
    if (!stats.hasPrison) return;
    var now = performance.now();
    if (now - (tower._lastPrisonTime || 0) < stats.prisonCooldown) return;
    blockpireTargetingActive = true;
    blockpireTargetingData = { tower: tower, ability: 'prison' };
    if (typeof refreshCanvasCursor === 'function') refreshCanvasCursor();
    var tp = document.getElementById('towerInfoPanel');
    var ta = document.getElementById('towerActions');
    if (tp) tp.style.display = 'none';
    if (ta) ta.style.display = 'none';
}

function executeBlockpirePrison(enemy) {
    if (!blockpireTargetingData || !enemy) return;
    var tower = blockpireTargetingData.tower;
    if (isTowerStunned(tower)) {
        blockpireTargetingActive = false;
        blockpireTargetingData = null;
        return;
    }
    var now = performance.now();
    tower._lastPrisonTime = now;
    enemy._blockpirePrisoned = true;
    enemy._blockpirePrisonEndTime = now + 4000;
    enemy._blockpirePrisonOriginalSpeed = enemy.speed;
    enemy.speed = 0;
    var crystal = getBlockpireCrystalByTower(tower);
    if (crystal) {
        crystal.hp = Math.min(crystal.maxHp, crystal.hp + Math.floor(enemy.maxHp * 0.10));
        crystal.size = getCrystalSize(crystal.hp);
        crystal.resistance = getCrystalResistance(crystal.hp);
    }
    var div = document.createElement('div');
    div.className = 'cash-effect';
    div.style.left = enemy.x + 'px';
    div.style.top = (enemy.y - 20) + 'px';
    div.style.color = '#DC143C';
    div.style.fontSize = '14px';
    div.style.fontWeight = 'bold';
    div.textContent = 'PRISON';
    document.body.appendChild(div);
    setTimeout(function() { div.remove(); }, 1500);
    blockpireTargetingActive = false;
    blockpireTargetingData = null;
    if (typeof refreshCanvasCursor === 'function') refreshCanvasCursor();
    if (typeof showTowerInfo === 'function' && window.currentInfoTower) showTowerInfo(window.currentInfoTower);
}

function updateBlockpireTowers(timestamp) {
    for (var _i = 0; _i < towers.length; _i++) {
        var tower = towers[_i];
        if (!tower.type || !tower.type.isBlockpire) continue;
        if (tower.level < 1 || tower.level > tower.type.levels.length) continue;
        if (isTowerStunned(tower, timestamp)) continue;
        var stats = tower.type.levels[tower.level - 1];
        var crystal = getBlockpireCrystalByTower(tower);
        var infected;
        if (crystal && crystal.alive) {
            infected = crystal.infectedEnemy;
        } else {
            infected = tower._bpInfected;
        }
        if (!infected || infected.hp <= 0 || !enemies.includes(infected)) {
            var newTarget = null;
            for (var _j = 0; _j < enemies.length; _j++) {
                var e = enemies[_j];
                if (e.hp <= 0 || e.isSummon) continue;
                var dist = Math.sqrt((tower.x - e.x) * (tower.x - e.x) + (tower.y - e.y) * (tower.y - e.y));
                if (dist <= stats.range * GRID_SIZE) { newTarget = e; break; }
            }
            if (newTarget === null && stats.hasTransfer && infected && infected.hp > 0 && enemies.includes(infected)) {
                if (enemies.includes(infected)) {
                    var nearest = null;
                    var nearDist = Infinity;
                    for (var _k = 0; _k < enemies.length; _k++) {
                        var en = enemies[_k];
                        if (en === infected || en.hp <= 0 || en.isSummon) continue;
                        var d = Math.sqrt((infected.x - en.x) * (infected.x - en.x) + (infected.y - en.y) * (infected.y - en.y));
                        if (d < nearDist) { nearDist = d; nearest = en; }
                    }
                    if (nearest) newTarget = nearest;
                }
            }
            if (newTarget) {
                infected = newTarget;
                tower._bpInfected = newTarget;
                if (crystal && crystal.alive) crystal.infectedEnemy = newTarget;
            } else {
                tower._bpInfected = null;
                if (crystal) crystal.infectedEnemy = null;
                continue;
            }
        }
        if (timestamp - tower.lastFired >= stats.fireRate) {
            if (!infected.isSummon && infected.hp > 0) {
                var dotDmg = stats.dotTick;
                applyDamage(infected, dotDmg, 'piercing');

                var healAmount = Math.floor(dotDmg * 1.0);
                if (crystal && crystal.alive) {
                    crystal.hp = Math.min(crystal.maxHp, crystal.hp + healAmount);
                    crystal.size = getCrystalSize(crystal.hp);
                    crystal.resistance = getCrystalResistance(crystal.hp);
                }

                if (crystal && crystal.alive && crystal.totalBaseHpAdded < stats.maxBaseHpBonus) {
                    var baseHpAdd = Math.floor(dotDmg * 0.1);
                    if (baseHpAdd + crystal.totalBaseHpAdded > stats.maxBaseHpBonus) {
                        baseHpAdd = stats.maxBaseHpBonus - crystal.totalBaseHpAdded;
                    }
                    if (baseHpAdd > 0) {
                        baseHp += baseHpAdd;
                        crystal.totalBaseHpAdded += baseHpAdd;
                        baseHpDisplay.textContent = baseHp;
                    }
                }

                var slowAmount = 0.02 + Math.random() * 0.05;
                infected.speed = Math.max(0.1, infected.speed * (1 - slowAmount * 0.1));

                infected._cubeprismResistDrop = (infected._cubeprismResistDrop || 0) - 0.1;



                tower.lastFired = timestamp;
                tower.isFiring = true;

                if (infected.hp <= 0) {
                    checkBlockpireInfectionDeath(infected, crystal);
                }
            }
        }
    }

    updateBlockpireCrystals(timestamp);
    updateBlockpirePrisonEffects(timestamp);
}

function checkBlockpireInfectionDeath(enemy, crystal) {
    if (enemy.hp > 0) return;
    if (crystal && crystal.alive && crystal.infectedEnemy === enemy) {
        var nearest = null;
        var nearDist = Infinity;
        for (var _i = 0; _i < enemies.length; _i++) {
            var e = enemies[_i];
            if (e === enemy || e.hp <= 0 || e.isSummon) continue;
            var d = Math.sqrt((enemy.x - e.x) * (enemy.x - e.x) + (enemy.y - e.y) * (enemy.y - e.y));
            if (d < nearDist) { nearDist = d; nearest = e; }
        }
        if (nearest) {
            crystal.infectedEnemy = nearest;
        } else {
            crystal.infectedEnemy = null;
        }
    }
    var tower = crystal ? crystal.tower : null;
    if (!tower) {
        for (var _ti = 0; _ti < towers.length; _ti++) {
            if (towers[_ti]._bpInfected === enemy) { tower = towers[_ti]; break; }
        }
    }
    if (tower && tower._bpInfected === enemy) {
        var nearest = null;
        var nearDist = Infinity;
        for (var _i = 0; _i < enemies.length; _i++) {
            var e = enemies[_i];
            if (e === enemy || e.hp <= 0 || e.isSummon) continue;
            var d = Math.sqrt((enemy.x - e.x) * (enemy.x - e.x) + (enemy.y - e.y) * (enemy.y - e.y));
            if (d < nearDist) { nearDist = d; nearest = e; }
        }
        if (nearest) {
            tower._bpInfected = nearest;
            if (crystal && crystal.alive) crystal.infectedEnemy = nearest;
        } else {
            tower._bpInfected = null;
            if (crystal) crystal.infectedEnemy = null;
        }
    }
}

function updateBlockpireCrystals(timestamp) {
    for (var _i = 0; _i < blockpireCrystals.length; _i++) {
        var crystal = blockpireCrystals[_i];
        if (!crystal.alive) continue;
        if (crystal.hp <= 0) {
            crystal.alive = false;
            if (crystal.tower) crystal.tower._lastCrystalDeathTime = timestamp;
            continue;
        }
        if (crystal.tower && crystal.tower.hp) {
        }
    }
}

function updateBlockpirePrisonEffects(timestamp) {
    for (var _i = 0; _i < enemies.length; _i++) {
        var enemy = enemies[_i];
        if (enemy._blockpirePrisoned) {
            if (timestamp > enemy._blockpirePrisonEndTime) {
                enemy.speed = enemy._blockpirePrisonOriginalSpeed || enemy.speed;
                enemy._blockpirePrisoned = false;
                explosions.push({ x: enemy.x, y: enemy.y, size: 0, maxSize: GRID_SIZE * 2, startTime: timestamp, duration: 300 });
            }
        }
    }
}

function drawBlockpireCrystals(ctx, timestamp) {
    for (var _i = 0; _i < blockpireCrystals.length; _i++) {
        var crystal = blockpireCrystals[_i];
        if (!crystal.alive) continue;
        ctx.save();
        var size = crystal.size;
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#DC143C';
        var hpPercent = crystal.hp / crystal.maxHp;
        var r = 180 + Math.floor(75 * hpPercent);
        var g = 20 + Math.floor(40 * hpPercent);
        var b = 60 + Math.floor(80 * hpPercent);
        ctx.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
        ctx.translate(crystal.x, crystal.y);
        ctx.beginPath();
        ctx.moveTo(0, -size);
        ctx.lineTo(size, 0);
        ctx.lineTo(0, size);
        ctx.lineTo(-size, 0);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.shadowBlur = 0;

        var barWidth = size * 1.6;
        var barHeight = 5;
        var barX = -barWidth / 2;
        var barY = size + 4;
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.fillRect(barX, barY, barWidth, barHeight);
        ctx.fillStyle = hpPercent > 0.5 ? '#44CC44' : hpPercent > 0.25 ? '#CCCC44' : '#CC4444';
        ctx.fillRect(barX, barY, barWidth * hpPercent, barHeight);

        ctx.fillStyle = 'white';
        ctx.font = '9px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(Math.floor(crystal.hp).toLocaleString() + ' / ' + crystal.maxHp.toLocaleString(), 0, size + 15);
        ctx.restore();

        if (crystal.infectedEnemy && crystal.infectedEnemy.hp > 0) {
            ctx.save();
            ctx.strokeStyle = 'rgba(220, 20, 60, 0.3)';
            ctx.lineWidth = 1;
            ctx.setLineDash([4, 6]);
            ctx.beginPath();
            ctx.moveTo(crystal.x, crystal.y);
            ctx.lineTo(crystal.infectedEnemy.x, crystal.infectedEnemy.y);
            ctx.stroke();
            ctx.setLineDash([]);
            ctx.restore();
        }
    }
    // Draw infection lines from towers without alive crystals
    for (var _ti = 0; _ti < towers.length; _ti++) {
        var t = towers[_ti];
        if (!t.type || !t.type.isBlockpire) continue;
        if (t._bpInfected && t._bpInfected.hp > 0) {
            var c2 = getBlockpireCrystalByTower(t);
            if (!c2 || !c2.alive) {
                ctx.save();
                ctx.strokeStyle = 'rgba(220, 20, 60, 0.2)';
                ctx.lineWidth = 1;
                ctx.setLineDash([4, 6]);
                ctx.beginPath();
                ctx.moveTo(t.x, t.y);
                ctx.lineTo(t._bpInfected.x, t._bpInfected.y);
                ctx.stroke();
                ctx.setLineDash([]);
                ctx.restore();
            }
        }
    }
}

function drawBlockpirePlacementPreview(ctx, mouseX, mouseY) {
    if (!blockpireTargetingActive) return;
    var tile = findPathTileUnderMouse(mouseX, mouseY);
    if (tile) {
        ctx.save();
        ctx.strokeStyle = 'rgba(220, 20, 60, 0.7)';
        ctx.lineWidth = 3;
        ctx.setLineDash([8, 4]);
        var half = GRID_SIZE / 2;
        ctx.strokeRect(tile.x - half, tile.y - half, GRID_SIZE, GRID_SIZE);
        ctx.setLineDash([]);
        ctx.fillStyle = 'rgba(220, 20, 60, 0.15)';
        ctx.fillRect(tile.x - half, tile.y - half, GRID_SIZE, GRID_SIZE);
        ctx.restore();
    }
}

var _blockpireCrystalMenuDiv = null;
var _blockpireLastMoveTime = 0;

function showBlockpireCrystalMenu(crystal) {
    if (_blockpireCrystalMenuDiv) { _blockpireCrystalMenuDiv.remove(); _blockpireCrystalMenuDiv = null; return; }
    var div = document.createElement('div');
    div.id = 'blockpireCrystalMenu';
    div.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.85);border:2px solid #DC143C;border-radius:8px;padding:12px 20px;z-index:9999;min-width:200px;text-align:center;color:white;font-family:Arial;';
    div.innerHTML = '<div style="font-weight:bold;color:#DC143C;margin-bottom:6px;">Cubeprism Crystal</div>' +
        '<div style="font-size:12px;margin-bottom:4px;">HP: ' + Math.floor(crystal.hp).toLocaleString() + ' / ' + crystal.maxHp.toLocaleString() + '</div>' +
        '<div style="font-size:11px;margin-bottom:8px;color:#aaa;">Collision resist: ' + (crystal.resistance * 100).toFixed(0) + '%</div>' +
        '<button id="blockpireCrystalMoveBtn" style="background:#DC143C;color:white;border:none;padding:6px 20px;border-radius:4px;cursor:pointer;font-size:13px;">Move</button>' +
        '<button id="blockpireCrystalCloseBtn" style="background:#444;color:white;border:none;padding:6px 12px;border-radius:4px;cursor:pointer;font-size:12px;margin-left:8px;">Close</button>';
    document.body.appendChild(div);
    _blockpireCrystalMenuDiv = div;

    document.getElementById('blockpireCrystalCloseBtn').onclick = function() { div.remove(); _blockpireCrystalMenuDiv = null; };

    document.getElementById('blockpireCrystalMoveBtn').onclick = function() {
        var now = performance.now();
        var cd = 10000 - (now - _blockpireLastMoveTime);
        if (cd > 0) { alert('Move on cooldown: ' + (cd / 1000).toFixed(1) + 's'); return; }
        div.remove();
        _blockpireCrystalMenuDiv = null;
        _blockpireLastMoveTime = now;
        var tower = crystal.tower;
        if (tower && tower.type && tower.type.isBlockpire) {
            tower._pendingMoveHp = crystal.hp;
            crystal.alive = false;
            tower._lastCrystalDeathTime = performance.now();
            activateBlockpireCrystalPlacement(tower, true);
        }
    };

    var _moveBtn = document.getElementById('blockpireCrystalMoveBtn');
    function _updateMoveBtn() {
        var now = performance.now();
        var cd = 10000 - (now - _blockpireLastMoveTime);
        if (cd > 0) {
            _moveBtn.textContent = 'Move [' + (cd / 1000).toFixed(1) + 's]';
            _moveBtn.style.background = '#666';
            _moveBtn.style.cursor = 'default';
        } else {
            _moveBtn.textContent = 'Move';
            _moveBtn.style.background = '#DC143C';
            _moveBtn.style.cursor = 'pointer';
        }
    }
    _updateMoveBtn();
    _moveBtn._interval = setInterval(_updateMoveBtn, 100);
    div._interval = _moveBtn._interval;
    var _origRemove = div.remove.bind(div);
    div.remove = function() { clearInterval(div._interval); _origRemove(); };

    hideActiveInfoPanels();
}

function getBlockpireInfoHTML(tower) {
    var stats = tower.type.levels[tower.level - 1];
    var crystal = getBlockpireCrystalByTower(tower);
    var now = performance.now();

    var html = '';
    var dotDps = Math.floor(stats.dotTick / (stats.fireRate / 1000));
    html += '<div class="info-row"><div class="info-label">DoT Damage</div><div class="info-value">' + stats.dotTick + ' every ' + (stats.fireRate / 1000).toFixed(1) + 's</div></div>';
    html += '<div class="info-row"><div class="info-label" style="color:#FF1744;">DoT DPS</div><div class="info-value" style="color:#FF1744;">' + dotDps + '/s</div></div>';
    html += '<div class="info-row"><div class="info-label">Range</div><div class="info-value">' + stats.range + ' tiles</div></div>';

    if (crystal && crystal.alive) {
        var hpPct = (crystal.hp / crystal.maxHp * 100).toFixed(1);
        html += '<div class="info-row"><div class="info-label" style="color:#DC143C;">Crystal HP</div><div class="info-value">' + Math.floor(crystal.hp).toLocaleString() + ' / ' + crystal.maxHp.toLocaleString() + ' (' + hpPct + '%)</div></div>';
        html += '<div class="info-row"><div class="info-label">Crystal Size</div><div class="info-value">' + crystal.size + '</div></div>';
        html += '<div class="info-row"><div class="info-label">Collision Res</div><div class="info-value">' + (crystal.resistance * 100).toFixed(0) + '%</div></div>';
        html += '<div class="info-row"><div class="info-label">Base HP Added</div><div class="info-value">+' + crystal.totalBaseHpAdded + ' / ' + stats.maxBaseHpBonus + '</div></div>';
        if (crystal.infectedEnemy && crystal.infectedEnemy.hp > 0) {
            html += '<div class="info-row"><div class="info-label">Infected</div><div class="info-value" style="color:#FF4444;">' + crystal.infectedEnemy.type.name + '</div></div>';
        }
    } else {
        var cd = 0;
        if (crystal && !crystal.alive) {
            cd = Math.max(0, 30000 - (now - tower._lastCrystalDeathTime));
        }
        html += '<div class="info-row"><div class="info-label" style="color:#888;">Crystal</div><div class="info-value">' + (cd > 0 ? 'Respawning in ' + (cd / 1000).toFixed(1) + 's' : 'Not placed') + '</div></div>';
    }

    html += '<div style="height:1px;background:rgba(255,255,255,0.1);margin:6px 0;"></div>';
    html += '<div class="info-row"><div class="info-label" style="color:#FF4444;">Infection Debuffs</div><div class="info-value"></div></div>';
    html += '<div class="info-row" style="margin-left:8px;font-size:11px;color:#aaa;">- Random slow 2-7% every 0.2s</div></div>';
    html += '<div class="info-row" style="margin-left:8px;font-size:11px;color:#aaa;">- -0.1 all resistances (flat)</div></div>';
    html += '<div class="info-row" style="margin-left:8px;font-size:11px;color:#aaa;">- Heals crystal by 100% of DoT</div></div>';

    if (stats.hasTransfer) {
        html += '<div class="info-row"><div class="info-label" style="color:#FFD700;">Transfer</div><div class="info-value">On death: jumps to nearest</div></div>';
    }
    if (stats.hasPrison) {
        var prisonCd = Math.max(0, stats.prisonCooldown - (now - (tower._lastPrisonTime || 0))) / 1000;
        html += '<div class="info-row"><div class="info-label" style="color:#FF69B4;">Prison</div><div class="info-value">' + (prisonCd > 0 ? 'CD ' + prisonCd.toFixed(1) + 's' : 'Ready') + '</div></div>';
    }

    return html;
}