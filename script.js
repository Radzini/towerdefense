// Game Canvas Setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// UI Elements
const cashDisplay = document.getElementById('cashDisplay');
const waveDisplay = document.getElementById('waveDisplay');
const baseHpDisplay = document.getElementById('baseHpDisplay');
const modeDisplay = document.getElementById('modeDisplay');
const nextWaveBtn = document.getElementById('nextWaveBtn');
const skipWaveBtn = document.getElementById('skipWaveBtn');
const menuBtn = document.getElementById('menuBtn');
const toggleTowerPanelBtn = document.getElementById('toggleTowerPanelBtn');
const closeTowerPanelBtn = document.getElementById('closeTowerPanelBtn');
const towerInfoPanel = document.getElementById('towerInfoPanel');
const towerInfoContent = document.getElementById('towerInfoContent');
const closeTowerInfo = document.getElementById('closeTowerInfo');
const towerActions = document.getElementById('towerActions');
const upgradeTowerBtn = document.getElementById('upgradeTowerBtn');
const sellTowerBtn = document.getElementById('sellTowerBtn');
const abilityTowerBtn = document.getElementById('abilityTowerBtn');
const ability2TowerBtn = document.getElementById('ability2TowerBtn');
const gameModeUI = document.getElementById('gameModeUI');
const modeSelect = document.getElementById('modeSelect');
const mapSelect = document.getElementById('mapSelect');
const startGameBtn = document.getElementById('startGameBtn');
const closeMenuBtn = document.getElementById('closeMenuBtn');
const topHUD = document.getElementById('topHUD');
const towerPanel = document.getElementById('towerPanel');
const cheatMenuBtn = document.getElementById('cheatMenuBtn');
const cheatModal = document.getElementById('cheatModal');
const closeCheatModal = document.getElementById('closeCheatModal');
const towerButtons = {
    gunner: document.getElementById('gunnerBtn'),
    operator: document.getElementById('operatorBtn'),
    sniper: document.getElementById('sniperBtn'),
    rocketer: document.getElementById('rocketerBtn'),
    raygunner: document.getElementById('raygunnerBtn'),
    summoner: document.getElementById('summonerBtn'),
    farm: document.getElementById('farmBtn'),
    railgunner: document.getElementById('railgunnerBtn'),
    eliteSpawner: document.getElementById('eliteSpawnerBtn'),
    commander: document.getElementById('commanderBtn'),
    executive: document.getElementById('executiveBtn'),
    cubeFactory: document.getElementById('cubeFactoryBtn'),
    charger: document.getElementById('chargerBtn'),
    carrierCube: document.getElementById('carrierCubeBtn')
};
let lastJPressTime = 0;

// Cheat buttons
const addMoneyBtn = document.getElementById('addMoneyBtn');
const addLivesBtn = document.getElementById('addLivesBtn');
const completeWaveBtn = document.getElementById('completeWaveBtn');
const killAllBtn = document.getElementById('killAllBtn');
const maxTowersBtn = document.getElementById('maxTowersBtn');
const invincibleBtn = document.getElementById('invincibleBtn');
const freeUpgradesBtn = document.getElementById('freeUpgradesBtn');
const speedUpBtn = document.getElementById('speedUpBtn');
const setWaveBtn = document.getElementById('setWaveBtn');
const setMoneyBtn = document.getElementById('setMoneyBtn');
const waveInput = document.getElementById('waveInput');
waveInput.max = 1000000; // Allow setting up to wave 1000000
const moneyInput = document.getElementById('moneyInput');

// Game state flags
let freeUpgrades = false;
let gameSpeed = 1;
let invincible = false;
let lastFrameTime = 0;
let frameDelta = 16.667; // ms since last frame, init to 60fps

// Game Constants
const GRID_SIZE = 40;
const BASE_HP = 100;
const SPAWN_DELAY = 300;

// Game Modes Configuration
const GAME_MODES = {
    NORMAL: {
        name: "Normal",
        waves: 40,
        difficultyMultiplier: 1.0,
        cashMultiplier: 1.0,
        bosses: [
            { name: "King Boss 1", hp: 3000, speed: 0.2, wave: 15, color: '#B22222', size: 40 },
            { name: "King Boss 2", hp: 16000, speed: 0.2, wave: 25, color: '#B22222', size: 40 },
            { name: "King Boss 3", hp: 54000, speed: 0.3, wave: 30, color: '#B22222', size: 40 },
            { name: "King Boss 4", hp: 120000, speed: 0.2, wave: 35, color: '#B22222', size: 40 },
            { name: "Void", hp: 300000, speed: 0.2, wave: 40, color: '#B22222', size: 45 }
        ]
    },
    HARDMODE: {
        name: "Hardmode",
        waves: 40,
        difficultyMultiplier: 1.5,
        cashMultiplier: 1.3,
        bosses: [
            { name: "Lord Boss 1", hp: 5000, speed: 0.2, wave: 15, color: '#8B0000', size: 40 },
            { name: "Lord Boss 2", hp: 24000, speed: 0.2, wave: 25, color: '#8B0000', size: 40 },
            { name: "Lord Boss 3", hp: 85000, speed: 0.4, wave: 30, color: '#8B0000', size: 40 },
            { name: "Lord Boss 4", hp: 150000, speed: 0.3, wave: 35, color: '#8B0000', size: 40, resistance: { global: 0.2, explosive: 0.5 } },
            { name: "Void2", hp: 500000, speed: 0.2, wave: 40, color: '#8B0000', size: 45 }
        ]
    },
    INSANE: {
        name: "Insane",
        waves: 50,
        difficultyMultiplier: 2.0,
        cashMultiplier: 1.6,
        bosses: [
            { name: "Overlord Boss 1", hp: 12000, speed: 0.2, wave: 10, color: '#4B0082', size: 40 },
            { name: "Overlord Boss 2", hp: 35000, speed: 0.2, wave: 20, color: '#4B0082', size: 40 },
            { name: "Lord Destructor", hp: 205000, speed: 0.3, wave: 30, color: '#4B0082', size: 40 },
            { name: "King Gargantuar", hp: 600000, speed: 0.2, wave: 40, color: '#4B0082', size: 45 },
            { name: "Overseer", hp: 1400000, speed: 0.2, wave: 50, color: '#4B0082', size: 50 }
        ]
    },
    ENDLESS: {
        name: "Endless",
        waves: Infinity,
        difficultyMultiplier: 1.8,
        cashMultiplier: 1.5,
        bosses: [],
        specialBosses: [
            { name: "Devastator", hp: 35000, speed: 0.25, interval: 30, scaling: 2.0, color: '#800000', size: 40 },
            { name: "Gargantuar-X", hp: 14000, speed: 0.3, interval: 15, scaling: 2.2, color: '#800000', size: 35 },
            { name: "Katt Destructor", hp: 600000, speed: 0.2, interval: 50, scaling: 1.5, color: '#800000', size: 45 }
        ]
    },
    BOSSRUSH: {
        name: "Boss Rush",
        waves: 5,
        difficultyMultiplier: 1.0,
        cashMultiplier: 1.0,
        bosses: []
    },
    NIGHTMARE: {
        name: "Nightmare",
        waves: 46,
        difficultyMultiplier: 2.5,
        cashMultiplier: 2.0,
        startingCash: 2000,
        bosses: []
    }
};

// Map Configurations
const MAP_TYPES = {
    STANDARD: {
        name: "Standard",
        createPath: function (gridWidth, gridHeight) {
            const logicalW = 35;
            const logicalH = 22;
            const offsetX = Math.max(0, Math.floor((gridWidth - logicalW) / 2));
            const offsetY = Math.max(0, Math.floor((gridHeight - logicalH) / 2));

            const pathPoints = [
                { x: offsetX + 0, y: offsetY + Math.floor(logicalH / 4) },
                { x: offsetX + Math.floor(logicalW / 2), y: offsetY + Math.floor(logicalH / 4) },
                { x: offsetX + Math.floor(logicalW / 2), y: offsetY + Math.floor(logicalH / 2) },
                { x: offsetX + Math.floor(logicalW / 4), y: offsetY + Math.floor(logicalH / 2) },
                { x: offsetX + Math.floor(logicalW / 4), y: offsetY + Math.floor(3 * logicalH / 4) },
                { x: offsetX + logicalW - 1, y: offsetY + Math.floor(3 * logicalH / 4) }
            ];
            return generatePathFromPoints(pathPoints);
        }
    },
    STRAIGHT: {
        name: "Straight Line",
        createPath: function (gridWidth, gridHeight) {
            const logicalW = 35;
            const logicalH = 22;
            const offsetX = Math.max(0, Math.floor((gridWidth - logicalW) / 2));
            const offsetY = Math.max(0, Math.floor((gridHeight - logicalH) / 2));

            const pathPoints = [
                { x: offsetX + 0, y: offsetY + Math.floor(logicalH / 2) },
                { x: offsetX + logicalW - 1, y: offsetY + Math.floor(logicalH / 2) }
            ];
            return generatePathFromPoints(pathPoints);
        }
    },
    INTERSECTION: {
        name: "Intersection",
        createPath: function (gridWidth, gridHeight) {
            const logicalW = 35;
            const logicalH = 22;
            const offsetX = Math.max(0, Math.floor((gridWidth - logicalW) / 2));
            const offsetY = Math.max(0, Math.floor((gridHeight - logicalH) / 2));

            const pathPoints = [
                { x: offsetX + 0, y: offsetY + Math.floor(logicalH / 4) },
                { x: offsetX + Math.floor(logicalW / 4), y: offsetY + Math.floor(logicalH / 4) },
                { x: offsetX + Math.floor(logicalW / 4), y: offsetY + Math.floor(logicalH / 2) },
                { x: offsetX + Math.floor(3 * logicalW / 4), y: offsetY + Math.floor(logicalH / 2) },
                { x: offsetX + Math.floor(3 * logicalW / 4), y: offsetY + Math.floor(3 * logicalH / 4) },
                { x: offsetX + logicalW - 1, y: offsetY + Math.floor(3 * logicalH / 4) }
            ];
            return generatePathFromPoints(pathPoints);
        }
    }
};

// Game State
let gameWidth, gameHeight;
let gridWidth, gridHeight;
let projectiles = [];
let cash = 250;
let waveNumber = 0;
let baseHp = BASE_HP;
let selectedTower = null;
let selectedTowerCost = 0;
let selectedCell = null;
let hoveredEnemy = null;
let betaProtocolTimeouts = []; // Store Beta Protocol timeout IDs
let towers = [];
let enemies = [];
let path = [];
let waveActive = false;
let waveTimer = 0;
let gameGrid = [];
let explosions = [];
let cashEffects = [];
let farmCount = 0;
let eliteSpawnerCount = 0;
let gunnerParagonCount = 0;
let sniperParagonCount = 0;
let gunnerPoints = 0;
let enemiesToSpawn = [];
let lastSpawnTime = 0;
let orbitalStrikeActive = false;
let orbitalStrikeData = null;
let railgunShots = [];
let currentInfoTower = null;
let lastAbilityTime = 0;
let lastOrbitalStrikeTime = 0; // Global cooldown for Orbital Strike
let lastGlobalFactorySpawnTime = 0; // Global cooldown for Cube Factory summons
let currentGameMode = GAME_MODES.NORMAL;
let currentMap = MAP_TYPES.STANDARD;
let hpBarCollapsed = false;
let hpBarToggleRect = null;
let lastTowerInfoUpdate = 0;
let selectedTowerForTimer = null;

// Wave Management State
let activeWaves = []; // Array of active wave objects
let isGameOver = false; // Flag to prevent multiple game over triggers
// Removed: currentWaveData, currentGroupIndex, groupWaitTimer, isWaitingAfterGroup, enemiesToSpawn, lastSpawnTime

// Tower Types and Summon Types are now loaded from towers.js
// This keeps the codebase organized and makes stats easy to modify


// Enemy Types and Waves are now loaded from separate files (enemies.js and waves.js)
// This keeps the codebase organized and manageable

// Helper function to check if a grid cell overlaps with any tower (including multi-cell towers)
function getTowerAtGrid(x, y) {
    return towers.find(t => {
        let sizeX = 1;
        let sizeY = 1;

        if (t.type === TOWER_TYPES.GUNNER_PARAGON || t.type === TOWER_TYPES.SNIPER_PARAGON || t.type === TOWER_TYPES.ELITE_SPAWNER) {
            sizeX = 2; sizeY = 2;
        } else if (t.type === TOWER_TYPES.CUBE_FACTORY) {
            sizeX = 3; sizeY = 3;
        } else if (t.type === TOWER_TYPES.CARRIER_CUBE) {
            sizeX = 4; sizeY = 4;
        }

        return x >= t.gridX && x < t.gridX + sizeX && y >= t.gridY && y < t.gridY + sizeY;
    });
}

// Initialize game
function initGame() {
    // Register Carrier Cube Type
    TOWER_TYPES.CARRIER_CUBE = CARRIER_CUBE_TYPE;

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Handle fullscreen changes
    document.addEventListener('fullscreenchange', resizeCanvas);
    document.addEventListener('webkitfullscreenchange', resizeCanvas);
    document.addEventListener('mozfullscreenchange', resizeCanvas);
    createGrid();
    createPath();
    setupEventListeners();
    updateCashDisplay();
    updateTowerButtonCosts();

    // Hide game UI initially, show mode selection
    topHUD.style.display = 'none';
    towerPanel.style.display = 'none';
    towerInfoPanel.style.display = 'none';
    gameModeUI.style.display = 'flex';

    requestAnimationFrame(gameLoop);
}

// Resize canvas
function resizeCanvas() {
    // Set canvas size to fit the screen window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Don't change game dimensions if game is active
    if (waveNumber > 0 || towers.length > 0) {
        // Keep original dimensions but update canvas size
        // This ensures rendering stays consistent
        return;
    }

    // Snap game dimensions to grid size for perfect alignment
    gameWidth = Math.floor(canvas.width / GRID_SIZE) * GRID_SIZE;
    gameHeight = Math.floor(canvas.height / GRID_SIZE) * GRID_SIZE;
    gridWidth = Math.floor(gameWidth / GRID_SIZE);
    gridHeight = Math.floor(gameHeight / GRID_SIZE);

    createGrid();
    createPath();

    // Reposition UI elements
    repositionUI();
}

// Reposition UI elements after resize
function repositionUI() {
    // UI elements are now positioned with CSS, no need to reposition
    // This function is kept for compatibility but does nothing
}

// Create game grid
function createGrid() {
    gameGrid = [];
    for (let y = 0; y < gridHeight; y++) {
        gameGrid[y] = [];
        for (let x = 0; x < gridWidth; x++) {
            gameGrid[y][x] = { type: 'empty', tower: null };
        }
    }
}

// Create path
function createPath() {
    path = [];
    gameGrid.forEach(row => row.forEach(cell => {
        if (cell.type === 'path') cell.type = 'empty';
    }));

    path = currentMap.createPath(gridWidth, gridHeight);

    // Update window.path for command terminal access
    window.path = path;
}

// Helper function to generate path from points
function generatePathFromPoints(pathPoints) {
    let pathArray = [];
    for (let i = 0; i < pathPoints.length - 1; i++) {
        const points = getLinePoints(pathPoints[i].x, pathPoints[i].y, pathPoints[i + 1].x, pathPoints[i + 1].y);
        for (const point of points) {
            if (point.y < gridHeight && point.x < gridWidth) {
                gameGrid[point.y][point.x].type = 'path';
                pathArray.push({ x: point.x * GRID_SIZE + GRID_SIZE / 2, y: point.y * GRID_SIZE + GRID_SIZE / 2 });
            }
        }
    }
    return pathArray;
}

function getLinePoints(x0, y0, x1, y1) {
    const points = [];
    const dx = Math.abs(x1 - x0);
    const dy = Math.abs(y1 - y0);
    const sx = (x0 < x1) ? 1 : -1;
    const sy = (y0 < y1) ? 1 : -1;
    let err = dx - dy;
    while (true) {
        points.push({ x: x0, y: y0 });
        if (x0 === x1 && y0 === y1) break;
        const e2 = 2 * err;
        if (e2 > -dy) { err -= dy; x0 += sx; }
        if (e2 < dx) { err += dx; y0 += sy; }
    }
    return points;
}

// Set up event listeners
function setupEventListeners() {
    // Tower selection
    towerButtons.gunner.addEventListener('click', () => selectTowerType(TOWER_TYPES.GUNNER));
    towerButtons.operator.addEventListener('click', () => selectTowerType(TOWER_TYPES.Operator));
    towerButtons.sniper.addEventListener('click', () => selectTowerType(TOWER_TYPES.SNIPER));
    towerButtons.rocketer.addEventListener('click', () => selectTowerType(TOWER_TYPES.ROCKETER));
    towerButtons.raygunner.addEventListener('click', () => selectTowerType(TOWER_TYPES.RAYGUNNER));
    towerButtons.summoner.addEventListener('click', () => selectTowerType(TOWER_TYPES.SUMMONER));
    towerButtons.farm.addEventListener('click', () => selectTowerType(TOWER_TYPES.FARM));
    towerButtons.railgunner.addEventListener('click', () => selectTowerType(TOWER_TYPES.RAILGUNNER));
    towerButtons.eliteSpawner.addEventListener('click', () => selectTowerType(TOWER_TYPES.ELITE_SPAWNER));
    towerButtons.commander.addEventListener('click', () => selectTowerType(TOWER_TYPES.COMMANDER));
    towerButtons.executive.addEventListener('click', () => selectTowerType(TOWER_TYPES.EXECUTIVE));
    towerButtons.cubeFactory.addEventListener('click', () => selectTowerType(TOWER_TYPES.CUBE_FACTORY));
    towerButtons.charger.addEventListener('click', () => selectTowerType(TOWER_TYPES.CHARGER));
    towerButtons.carrierCube.addEventListener('click', () => selectTowerType(TOWER_TYPES.CARRIER_CUBE));


    // Canvas interactions
    canvas.addEventListener('click', handleCanvasClick);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        selectedTower = null;
        updateTowerSelection();
    });

    // Game controls
    nextWaveBtn.addEventListener('click', startNextWave);
    skipWaveBtn.addEventListener('click', skipWave);
    menuBtn.addEventListener('click', showMainMenu);

    // Tower panel toggle button
    toggleTowerPanelBtn.addEventListener('click', () => {
        if (towerPanel.style.display === 'none' || towerPanel.style.display === '') {
            towerPanel.style.display = 'flex';
        } else {
            towerPanel.style.display = 'none';
            selectedTower = null;
            selectedCell = null;
            updateTowerSelection();
        }
    });

    // Tower panel close button
    closeTowerPanelBtn.addEventListener('click', () => {
        towerPanel.style.display = 'none';
        selectedTower = null;
        selectedCell = null;
        updateTowerSelection();
    });

    // Tower info panel
    closeTowerInfo.addEventListener('click', () => {
        towerInfoPanel.style.display = 'none';
        towerActions.style.display = 'none';
        document.getElementById('carrierSpawnPanel').style.display = 'none'; // Fix: Close carrier UI
        currentInfoTower = null;
        selectedCell = null; // Clear selected cell to hide range
    });

    // Tower action buttons (using same pattern as cheat buttons)
    upgradeTowerBtn.addEventListener('click', () => {
        if (window.currentSelectedTower && towers.includes(window.currentSelectedTower)) {
            upgradeTower(window.currentSelectedTower);
        }
    });

    sellTowerBtn.addEventListener('click', () => {
        if (window.currentSelectedTower && towers.includes(window.currentSelectedTower)) {
            sellTower(window.currentSelectedTower);
        }
    });

    abilityTowerBtn.addEventListener('click', () => {
        if (window.currentSelectedTower && towers.includes(window.currentSelectedTower)) {
            const tower = window.currentSelectedTower;

            if (tower.type === TOWER_TYPES.ELITE_SPAWNER) {
                triggerRainbowCube(tower);
            } else if (tower.type === TOWER_TYPES.EXECUTIVE) {
                triggerOrbitalStrike(tower);
                towerInfoPanel.style.display = 'none';
                towerActions.style.display = 'none';
            } else if (tower.type === TOWER_TYPES.GUNNER_PARAGON) {
                triggerParagonAlpha(tower);
            }
        }
    });

    ability2TowerBtn.addEventListener('click', () => {
        if (window.currentSelectedTower && towers.includes(window.currentSelectedTower)) {
            const tower = window.currentSelectedTower;

            if (tower.type === TOWER_TYPES.GUNNER_PARAGON) {
                triggerParagonBeta(tower);
            }
        }
    });

    // Cheat menu
    cheatMenuBtn.addEventListener('click', () => {
        cheatModal.classList.remove('hidden');

        // Initialize terminal if not already done
        if (window.commandTerminal && !window.commandTerminal.outputElement) {
            const terminalOutput = document.getElementById('terminalOutput');
            const terminalInput = document.getElementById('terminalInput');
            const terminalHint = document.getElementById('terminalHint');
            window.commandTerminal.initialize(terminalOutput, terminalInput, terminalHint);
        }
    });

    closeCheatModal.addEventListener('click', () => {
        cheatModal.classList.add('hidden');
    });

    cheatModal.addEventListener('click', (e) => {
        if (e.target === cheatModal) {
            cheatModal.classList.add('hidden');
        }
    });

    // Cheat buttons
    addMoneyBtn.addEventListener('click', () => { cash += 10000; updateCashDisplay(); });
    addLivesBtn.addEventListener('click', () => { baseHp += 50; baseHpDisplay.textContent = baseHp; });
    completeWaveBtn.addEventListener('click', () => {
        enemiesToSpawn = [];
        enemies = enemies.filter(e => e.isSummon);
        waveActive = false;
    });
    killAllBtn.addEventListener('click', () => {
        enemies.forEach(e => { if (!e.isSummon) e.hp = 0; });
    });
    maxTowersBtn.addEventListener('click', () => {
        towers.forEach(t => {
            t.level = t.type.levels.length;
            // Add gunner points for maxed gunners
            if (t.type === TOWER_TYPES.GUNNER) {
                gunnerPoints += 11; // 1+2+3+5 = 11 points per gunner
            }
        });
    });
    invincibleBtn.addEventListener('click', () => {
        invincible = !invincible;
        invincibleBtn.textContent = invincible ? '🛡️ Invincible: ON' : '🛡️ Toggle Invincible';
    });
    freeUpgradesBtn.addEventListener('click', () => {
        freeUpgrades = !freeUpgrades;
        freeUpgradesBtn.textContent = freeUpgrades ? '🆓 Free: ON' : '🆓 Free Upgrades';
    });
    speedUpBtn.addEventListener('click', () => {
        gameSpeed = gameSpeed >= 4 ? 1 : gameSpeed + 1;
        speedUpBtn.textContent = `⚡ Speed x${gameSpeed}`;
    });

    const spawnDummyBtn = document.getElementById('spawnDummyBtn');
    spawnDummyBtn.addEventListener('click', () => {
        // Spawn test dummy at center of map
        const dummy = {
            type: ENEMY_TYPES.test_dummy,
            hp: ENEMY_TYPES.test_dummy.baseHp,
            maxHp: ENEMY_TYPES.test_dummy.baseHp,
            shield: 0,
            maxShield: 0,
            x: gameWidth / 2,
            y: gameHeight / 2,
            distanceTraveled: 0,
            size: ENEMY_TYPES.test_dummy.size,
            isSummon: false,
            spawnTime: performance.now(),  // Make sure this is set
            damageReceived: 0
        };
        enemies.push(dummy);
        console.log('Test Dummy spawned! 10M HP - Track your DPS!');
    });

    setWaveBtn.addEventListener('click', () => {
        const newWave = parseInt(waveInput.value);
        if (newWave >= 1 && newWave <= 1000000) {
            waveNumber = newWave - 1;
            waveDisplay.textContent = waveNumber;
        }
    });
    setMoneyBtn.addEventListener('click', () => {
        const newMoney = parseInt(moneyInput.value);
        if (newMoney >= 0) {
            cash = newMoney;
            updateCashDisplay();
        }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (gameModeUI.style.display !== 'none') return;

        // ESC key to cancel placement or close tower panel
        if (e.key === 'Escape') {
            if (selectedTower) {
                selectedTower = null;
                selectedCell = null;
                updateTowerSelection();
            } else if (towerPanel.style.display !== 'none') {
                towerPanel.style.display = 'none';
            }
            return;
        }

        // T key to toggle tower panel
        if (e.key === 't' || e.key === 'T') {
            if (towerPanel.style.display === 'none' || towerPanel.style.display === '') {
                towerPanel.style.display = 'flex';
            } else {
                towerPanel.style.display = 'none';
                selectedTower = null;
                selectedCell = null;
                updateTowerSelection();
            }
            return;
        }

        // E key to upgrade selected tower
        if (e.key === 'e' || e.key === 'E') {
            if (window.currentSelectedTower && towers.includes(window.currentSelectedTower)) {
                upgradeTower(window.currentSelectedTower);
            }
            return;
        }

        // J key double-tap to sell (500ms window)
        if (e.key === 'j' || e.key === 'J') {
            const now = performance.now();
            if (now - lastJPressTime < 500) {
                if (window.currentSelectedTower && towers.includes(window.currentSelectedTower)) {
                    sellTower(window.currentSelectedTower);
                }
                lastJPressTime = 0;
            } else {
                lastJPressTime = now;
            }
            return;
        }

        // Q key for Operator
        if (e.key === 'q' || e.key === 'Q') {
            selectTowerType(TOWER_TYPES.Operator);
            return;
        }

        // Number keys for tower selection
        if (e.key >= '1' && e.key <= '9') {
            const towerTypes = [
                TOWER_TYPES.GUNNER,
                TOWER_TYPES.SNIPER,
                TOWER_TYPES.ROCKETER,
                TOWER_TYPES.RAYGUNNER,
                TOWER_TYPES.RAILGUNNER,
                TOWER_TYPES.SUMMONER,
                TOWER_TYPES.FARM,
                TOWER_TYPES.ELITE_SPAWNER,
                TOWER_TYPES.COMMANDER
            ];
            selectTowerType(towerTypes[parseInt(e.key) - 1]);
        } else if (e.key === '0') {
            selectTowerType(TOWER_TYPES.EXECUTIVE);
        } else if (e.key === 'c' || e.key === 'C') {
            selectTowerType(TOWER_TYPES.CUBE_FACTORY);
        } else if (e.key === 'z' || e.key === 'Z') {
            selectTowerType(TOWER_TYPES.CHARGER);
        } else if (e.key === 'x' || e.key === 'X') {
            selectTowerType(TOWER_TYPES.CARRIER_CUBE);
        }
    });

    // Game mode UI listeners
    modeSelect.addEventListener('change', function () {
        currentGameMode = GAME_MODES[this.value];
    });

    mapSelect.addEventListener('change', function () {
        currentMap = MAP_TYPES[this.value];
    });

    closeMenuBtn.addEventListener('click', closeMenu);

    startGameBtn.addEventListener('click', function () {
        gameModeUI.style.display = 'none';
        topHUD.style.display = 'flex';
        towerPanel.style.display = 'flex';

        // Display current mode
        modeDisplay.textContent = `${currentGameMode.name} - ${currentMap.name}`;

        // Reset game with new settings
        if (typeof clearCarrierUnits === 'function') clearCarrierUnits();
        resetGame(true);
    });
}

// Show main menu
function showMainMenu() {
    gameModeUI.style.display = 'flex';
    topHUD.style.display = 'none';
    towerPanel.style.display = 'none';
    // Show close button if game is already started
    if (waveNumber > 0 || towers.length > 0) {
        closeMenuBtn.style.display = 'block';
    } else {
        closeMenuBtn.style.display = 'none';
    }
    towerInfoPanel.style.display = 'none';
    cheatModal.classList.add('hidden');

    // Reset game state
    if (typeof clearCarrierUnits === 'function') clearCarrierUnits();
    resetGame(false);
}

// Close menu and return to game
function closeMenu() {
    gameModeUI.style.display = 'none';
    topHUD.style.display = 'flex';
    towerPanel.style.display = 'block';
}

// Update cash display
function updateCashDisplay() {
    if (cashDisplay) {
        cashDisplay.textContent = cash;
    }
}

// Update tower button costs
function updateTowerButtonCosts() {
    document.querySelector('#gunnerBtn .tower-cost').textContent = '$' + TOWER_TYPES.GUNNER.cost;
    document.querySelector('#sniperBtn .tower-cost').textContent = '$' + TOWER_TYPES.SNIPER.cost;
    document.querySelector('#rocketerBtn .tower-cost').textContent = '$' + TOWER_TYPES.ROCKETER.cost;
    document.querySelector('#raygunnerBtn .tower-cost').textContent = '$' + TOWER_TYPES.RAYGUNNER.cost;
    document.querySelector('#summonerBtn .tower-cost').textContent = '$' + TOWER_TYPES.SUMMONER.cost;
    document.querySelector('#farmBtn .tower-cost').textContent = '$' + TOWER_TYPES.FARM.cost;
    document.querySelector('#railgunnerBtn .tower-cost').textContent = '$' + TOWER_TYPES.RAILGUNNER.cost;
    document.querySelector('#eliteSpawnerBtn .tower-cost').textContent = '$' + TOWER_TYPES.ELITE_SPAWNER.cost;
    document.querySelector('#commanderBtn .tower-cost').textContent = '$' + TOWER_TYPES.COMMANDER.cost;
    document.querySelector('#executiveBtn .tower-cost').textContent = '$' + TOWER_TYPES.EXECUTIVE.cost;
    document.querySelector('#cubeFactoryBtn .tower-cost').textContent = '$' + TOWER_TYPES.CUBE_FACTORY.cost;
    document.querySelector('#chargerBtn .tower-cost').textContent = '$' + TOWER_TYPES.CHARGER.cost;
    document.querySelector('#carrierCubeBtn .tower-cost').textContent = '$' + TOWER_TYPES.CARRIER_CUBE.cost;
}

// Update tower selection UI
function updateTowerSelection() {
    Object.values(towerButtons).forEach(btn => btn.classList.remove('selected'));
    if (selectedTower) {
        const btnMap = {
            [TOWER_TYPES.GUNNER]: towerButtons.gunner,
            [TOWER_TYPES.SNIPER]: towerButtons.sniper,
            [TOWER_TYPES.ROCKETER]: towerButtons.rocketer,
            [TOWER_TYPES.RAYGUNNER]: towerButtons.raygunner,
            [TOWER_TYPES.RAILGUNNER]: towerButtons.railgunner,
            [TOWER_TYPES.SUMMONER]: towerButtons.summoner,
            [TOWER_TYPES.FARM]: towerButtons.farm,
            [TOWER_TYPES.ELITE_SPAWNER]: towerButtons.eliteSpawner,
            [TOWER_TYPES.COMMANDER]: towerButtons.commander,
            [TOWER_TYPES.EXECUTIVE]: towerButtons.executive,
            [TOWER_TYPES.CUBE_FACTORY]: towerButtons.cubeFactory,
            [TOWER_TYPES.CHARGER]: towerButtons.charger,
            [TOWER_TYPES.CARRIER_CUBE]: towerButtons.carrierCube
        };
        const btn = btnMap[selectedTower];
        if (btn) btn.classList.add('selected');
    }
}

// Select tower type
function selectTowerType(towerType) {
    if (towerType === TOWER_TYPES.FARM && farmCount >= 5) {
        return;
    }
    if (towerType === TOWER_TYPES.ELITE_SPAWNER && eliteSpawnerCount >= 1) {
        return;
    }
    // Gunner Paragon cannot be placed directly - it's an upgrade
    if (towerType === TOWER_TYPES.GUNNER_PARAGON) {
        return;
    }

    // Check tower limit if it has one
    if (towerType.limit) {
        const currentCount = towers.filter(t => t.type === towerType).length;
        if (currentCount >= towerType.limit) {
            return;
        }
    }

    // Calculate actual cost (Gunner cost increases 5% per existing Gunner)
    let actualCost = towerType.cost;
    if (towerType === TOWER_TYPES.GUNNER) {
        const gunnerCount = towers.filter(t => t.type === TOWER_TYPES.GUNNER).length;
        actualCost = Math.floor(towerType.cost * Math.pow(1.05, gunnerCount));
    }

    if (cash >= actualCost) {
        selectedTower = towerType;
        selectedTowerCost = actualCost; // Store actual cost
        updateTowerSelection();
    }
}

// Handle canvas click
function handleCanvasClick(event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const gridX = Math.floor(mouseX / GRID_SIZE);
    const gridY = Math.floor(mouseY / GRID_SIZE);

    // Check if clicking HP bar toggle button
    if (hpBarToggleRect && mouseX >= hpBarToggleRect.x && mouseX <= hpBarToggleRect.x + hpBarToggleRect.width &&
        mouseY >= hpBarToggleRect.y && mouseY <= hpBarToggleRect.y + hpBarToggleRect.height) {
        hpBarCollapsed = !hpBarCollapsed;
        return;
    }

    // Handle orbital strike targeting
    if (orbitalStrikeActive) {
        executeOrbitalStrike(mouseX, mouseY);
        orbitalStrikeActive = false;
        canvas.style.cursor = 'default';
        return;
    }

    const clickedTower = getTowerAtGrid(gridX, gridY);

    if (clickedTower) {
        selectedCell = { x: gridX, y: gridY };
        selectedTower = null;
        updateTowerSelection();
        showTowerInfo(clickedTower);
        currentInfoTower = clickedTower;
    } else if (selectedTower) {
        placeTower(gridX, gridY);
    }
}

// Handle mouse move
function handleMouseMove(event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    const gridX = Math.floor(mouseX / GRID_SIZE);
    const gridY = Math.floor(mouseY / GRID_SIZE);

    // If in orbital strike mode, update targeting position
    if (orbitalStrikeActive) {
        // Snap to grid center
        const snappedX = Math.floor(mouseX / GRID_SIZE) * GRID_SIZE + GRID_SIZE / 2;
        const snappedY = Math.floor(mouseY / GRID_SIZE) * GRID_SIZE + GRID_SIZE / 2;

        orbitalStrikeData = {
            x: snappedX,
            y: snappedY,
            range: GRID_SIZE * 3,
            isTargeting: true
        };
        return;
    }

    // If in bomber targeting mode, update preview
    if (carrierTargetingMode && carrierTargetingUnit === CARRIER_UNITS.BOMBER) {
        // Snap to grid center
        const snappedX = Math.floor(mouseX / GRID_SIZE) * GRID_SIZE + GRID_SIZE / 2;
        const snappedY = Math.floor(mouseY / GRID_SIZE) * GRID_SIZE + GRID_SIZE / 2;

        const level = carrierTargetingTower.level;
        const area = level === 1 ? CARRIER_UNITS.BOMBER.area : CARRIER_UNITS.BOMBER.areaL2;
        const range = (area * GRID_SIZE) / 2;

        // Store preview data
        window.bomberTargetPreview = {
            x: snappedX,
            y: snappedY,
            range: range
        };
        return;
    } else {
        window.bomberTargetPreview = null;
        hoveredEnemy = null;
    }

    // If in tower placement mode, update selectedCell for placement preview
    if (selectedTower) {
        selectedCell = { x: gridX, y: gridY };
        hoveredEnemy = null;
    } else {
        // Check if hovering over an enemy
        hoveredEnemy = enemies.find(e => {
            const dx = mouseX - e.x;
            const dy = mouseY - e.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            return distance <= e.type.size / 2;
        });

        // Check if hovering over a tower
        const hoveredTower = getTowerAtGrid(gridX, gridY);
        if (hoveredTower || hoveredEnemy) {
            canvas.style.cursor = 'pointer';
        } else {
            canvas.style.cursor = 'default';
        }
    }
}

// Show tower info
function showTowerInfo(tower) {
    // Store the tower reference globally
    window.currentSelectedTower = tower;
    currentInfoTower = tower;
    lastTowerInfoUpdate = performance.now();

    const level = tower.level;
    const type = tower.type;
    const currentStats = type.levels[level - 1];

    // Build info HTML
    let infoHTML = `
        <div class="info-row">
            <div class="info-label">Tower Type</div>
            <div class="info-value">${type.name} (Level ${level}/${type.levels.length})</div>
        </div>
    `;

    // Add stats based on tower type
    if (type.support) {
        // Commander tower - show buff stats
        infoHTML += `
            <div class="info-row">
                <div class="info-label">Range Boost</div>
                <div class="info-value">+${currentStats.rangeBoost} tiles</div>
            </div>
            <div class="info-row">
                <div class="info-label">Fire Rate Boost</div>
                <div class="info-value">+${(currentStats.fireRateBoost * 100).toFixed(0)}%</div>
            </div>
            <div class="info-row">
                <div class="info-label">Damage Boost</div>
                <div class="info-value">+${(currentStats.damageBoost * 100).toFixed(0)}%</div>
            </div>
            <div class="info-row">
                <div class="info-label">Buff Range</div>
                <div class="info-value">${currentStats.range} tiles</div>
            </div>
        `;
    } else if (type.summons && currentStats.summons) {
        // --- Hybrid Tower Stat Block ---
        if (type.isHybrid) {
            const buffs = getCommanderBuffs(tower);
            const buffedDamage = Math.floor(currentStats.damage * (1 + buffs.damageBoost));
            const buffedRange = currentStats.range + buffs.rangeBoost;
            const buffedFireRate = currentStats.fireRate * (1 - buffs.fireRateBoost);
            const dpsValue = ((buffedDamage / buffedFireRate) * 1000).toFixed(1);

            infoHTML += `
                <div class="info-row">
                    <div class="info-label">Damage</div>
                    <div class="info-value">${buffedDamage}${buffs.damageBoost > 0 ? ` (+${Math.floor(currentStats.damage * buffs.damageBoost)})` : ''}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">Range</div>
                    <div class="info-value">${buffedRange}${buffs.rangeBoost > 0 ? ` (+${buffs.rangeBoost})` : ''} tiles</div>
                </div>
                <div class="info-row">
                    <div class="info-label">Fire Rate</div>
                    <div class="info-value">${(buffedFireRate / 1000).toFixed(2)}s${buffs.fireRateBoost > 0 ? ` (-${(buffs.fireRateBoost * 100).toFixed(0)}%)` : ''}</div>
                </div>
                <div class="info-row">
                    <div class="info-label" style="color: #FF1744;">DPS</div>
                    <div class="info-value" style="color: #FF1744;">${dpsValue}/s</div>
                </div>
                <div style="height: 1px; background: rgba(255,255,255,0.1); margin: 6px 0;"></div>
            `;
        }

        infoHTML += `<div class="info-row" style="margin-bottom: 8px;"><div class="info-label" style="color: #00ff88; font-weight: bold;">📦 Summons:</div></div>`;
        currentStats.summons.forEach(summon => {
            const summonType = SUMMON_TYPES[summon.type];
            let summonDPS = 0;
            let summonInfo = '';

            // Calculate DPS based on summon's attack type
            if (summonType.damage && summonType.fireRate) {
                summonDPS = Math.floor(summonType.damage / (summonType.fireRate / 1000));
                summonInfo = `⚔️ ${summonDPS} DPS`;
            } else if (summonType.burstDamage && summonType.burstCount && summonType.burstCooldown) {
                // Burst damage type (Pink Square L5)
                const totalBurstDamage = summonType.burstDamage * summonType.burstCount;
                summonDPS = Math.floor(totalBurstDamage / (summonType.burstCooldown / 1000));
                summonInfo = `⚔️ ${summonDPS} DPS (burst)`;
            } else if (summonType.minigunDamage && summonType.minigunFireRate) {
                // Multi-weapon (Cyan, Factory cubes)
                const minigunDPS = Math.floor(summonType.minigunDamage / (summonType.minigunFireRate / 1000));
                summonDPS = minigunDPS;
                if (summonType.railgunDamage && summonType.railgunFireRate) {
                    summonDPS += Math.floor(summonType.railgunDamage / (summonType.railgunFireRate / 1000));
                }
                summonInfo = `⚔️ ${summonDPS}+ DPS`;
            } else if (summonType.selfDestructDamage) {
                summonInfo = `💥 ${summonType.selfDestructDamage.toLocaleString()} on death`;
            } else if (summonType.isKamikaze) {
                summonInfo = `💀 Kamikaze ${summonType.deathDamage.toLocaleString()} dmg`;
            } else {
                summonInfo = `🛡️ Tank`;
            }

            infoHTML += `
                <div class="info-row" style="margin-left: 8px; padding: 4px 0; border-left: 2px solid ${summonType.color}; padding-left: 8px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
                        <span style="color: ${summonType.color}; font-weight: bold;">${summonType.name}</span>
                        <span style="color: #aaa; font-size: 11px;">${summon.spawnRate / 1000}s</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; font-size: 10px; color: #888; margin-top: 2px;">
                        <span>❤️ ${summonType.hp.toLocaleString()} HP</span>
                        <span>${summonInfo}</span>
                    </div>
                </div>
            `;
        });
    } else if (type.farm) {
        // Calculate total farm income
        let totalFarmIncome = 0;
        towers.forEach(t => {
            if (t.type.farm) {
                const farmStats = t.type.levels[t.level - 1];
                totalFarmIncome += farmStats.cashPerWave;
            }
        });

        infoHTML += `
            <div class="info-row" style="border-left-color: #FFD700;">
                <div class="info-label">💰 Income/Wave</div>
                <div class="info-value" style="color: #FFD700; text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);">$${currentStats.cashPerWave.toLocaleString()}</div>
            </div>
            <div class="info-row" style="border-left-color: #32CD32;">
                <div class="info-label">📊 Total Farm Income</div>
                <div class="info-value" style="color: #32CD32;">$${totalFarmIncome.toLocaleString()}/wave</div>
            </div>
        `;
    } else if (type === TOWER_TYPES.GUNNER_PARAGON) {
        // Paragon tower - show combat stats and base HP buff
        const buffs = type.cannotBeBuffed ? { rangeBoost: 0, fireRateBoost: 0, damageBoost: 0 } : getCommanderBuffs(tower);
        const rangeBonus = type.rangeBonus || 0;
        const buffedDamage = Math.floor(currentStats.damage * (1 + buffs.damageBoost));
        const buffedRange = currentStats.range + buffs.rangeBoost + rangeBonus;
        const buffedFireRate = currentStats.fireRate * (1 - buffs.fireRateBoost);

        // Check if Alpha is active
        const alphaActive = tower.alphaActive && (performance.now() - tower.alphaStartTime < 15000);
        const currentBaseHp = alphaActive ? currentStats.baseHp * tower.alphaMultiplier : currentStats.baseHp;

        infoHTML += `
            <div class="info-row">
                <div class="info-label">Damage</div>
                <div class="info-value">${buffedDamage}${buffs.damageBoost > 0 ? ` (+${Math.floor(currentStats.damage * buffs.damageBoost)})` : ''}</div>
            </div>
            <div class="info-row">
                <div class="info-label">Range</div>
                <div class="info-value">${buffedRange}${buffs.rangeBoost > 0 ? ` (+${buffs.rangeBoost})` : ''}${rangeBonus ? ` (+${rangeBonus})` : ''} tiles</div>
            </div>
            <div class="info-row">
                <div class="info-label">Fire Rate</div>
                <div class="info-value">${(buffedFireRate / 1000).toFixed(2)}s${buffs.fireRateBoost > 0 ? ` (-${(buffs.fireRateBoost * 100).toFixed(0)}%)` : ''}</div>
            </div>
            <div class="info-row">
                <div class="info-label">Base HP Buff</div>
                <div class="info-value">${currentBaseHp} HP${alphaActive ? ' (ALPHA ACTIVE!)' : ''}</div>
            </div>
        `;
    } else if (type === TOWER_TYPES.SNIPER_PARAGON) {
        // Sniper Paragon - cannot be buffed by Commander
        const rangeBonus = type.rangeBonus || 0;
        infoHTML += `
            <div class="info-row">
                <div class="info-label">Damage</div>
                <div class="info-value">${currentStats.damage}${currentStats.explosionDamage ? ` (+${currentStats.explosionDamage} explosion)` : ''}</div>
            </div>
            <div class="info-row">
                <div class="info-label">Range</div>
                <div class="info-value">${currentStats.range + rangeBonus}${rangeBonus ? ` (+${rangeBonus})` : ''} tiles</div>
            </div>
            <div class="info-row">
                <div class="info-label">Fire Rate</div>
                <div class="info-value">${currentStats.fireRate}ms</div>
            </div>
            ${currentStats.sniperBuff ? `<div class="info-row">
                <div class="info-label">Passive Buff</div>
                <div class="info-value">Snipers +${currentStats.sniperBuff} dmg${currentStats.railgunnerBuff ? ` | Railgunners +${currentStats.railgunnerBuff} dmg` : ''}</div>
            </div>` : ''}
        `;
    } else if (type.isCharger) {
        // Charger tower - show damage range and charge mechanics
        const buffs = (currentStats.cannotBeBuffed || type.cannotBeBuffed) ?
            { rangeBoost: 0, fireRateBoost: 0, damageBoost: 0 } : getCommanderBuffs(tower);
        const buffedRange = currentStats.range + buffs.rangeBoost;
        const buffedFireRate = currentStats.fireRate * (1 - buffs.fireRateBoost);

        // Calculate current charge bonus
        let chargeBonus = 0;
        let isAtMaxCharge = false;
        if (currentStats.chargeMaxMin && currentStats.chargeMaxMax && tower.isCharging && tower.lockedTarget) {
            const chargeTime = performance.now() - tower.chargeStartTime;
            const chargeTicks = Math.floor(chargeTime / currentStats.chargeInterval);
            chargeBonus = chargeTicks * currentStats.chargeRate;

            // Check if we've reached max charge
            const maxPossibleBonus = currentStats.chargeMaxMax - currentStats.damageMin;
            if (chargeBonus >= maxPossibleBonus) {
                isAtMaxCharge = true;
                chargeBonus = maxPossibleBonus;
            }
        }

        // Show damage with current charge bonus
        let damageDisplay = `${currentStats.damageMin}-${currentStats.damageMax}`;
        if (currentStats.chargeMaxMin && currentStats.chargeMaxMax) {
            if (isAtMaxCharge) {
                // At max charge, show as pure random between max range
                damageDisplay = `${currentStats.chargeMaxMin}-${currentStats.chargeMaxMax}`;
            } else if (chargeBonus > 0) {
                // Show current charged damage range
                const currentMin = currentStats.damageMin + chargeBonus;
                const currentMax = currentStats.damageMax + chargeBonus;
                damageDisplay = `${currentStats.damageMin}-${currentStats.damageMax} → ${currentMin}-${currentMax} (Max: ${currentStats.chargeMaxMin}-${currentStats.chargeMaxMax})`;
            } else {
                damageDisplay += ` (Max: ${currentStats.chargeMaxMin}-${currentStats.chargeMaxMax})`;
            }
        }

        infoHTML += `
            <div class="info-row">
                <div class="info-label">Damage</div>
                <div class="info-value">${damageDisplay}</div>
            </div>
            <div class="info-row">
                <div class="info-label">Range</div>
                <div class="info-value">${buffedRange}${buffs.rangeBoost > 0 ? ` (+${buffs.rangeBoost})` : ''} tiles</div>
            </div>
            <div class="info-row">
                <div class="info-label">Fire Rate</div>
                <div class="info-value">${(buffedFireRate / 1000).toFixed(2)}s${buffs.fireRateBoost > 0 ? ` (-${(buffs.fireRateBoost * 100).toFixed(0)}%)` : ''}</div>
            </div>
        `;

        // Show charge rate for levels 4-5
        if (currentStats.chargeMaxMin && currentStats.chargeMaxMax) {
            infoHTML += `
                <div class="info-row">
                    <div class="info-label">Charge Rate</div>
                    <div class="info-value">+${currentStats.chargeRate}/0.1s</div>
                </div>
            `;
        }

        // Calculate current DPS using actual last damage dealt (updates every 50ms)
        let currentDPS = 0;
        if (tower.lastDamageDealt > 0 && tower.lastDamageTime) {
            const timeSinceLastDamage = performance.now() - tower.lastDamageTime;
            // Only show current DPS if damage was dealt recently (within 50ms)
            if (timeSinceLastDamage < 50) {
                currentDPS = ((tower.lastDamageDealt / buffedFireRate) * 1000).toFixed(1);
            }
        }

        const minDPS = ((currentStats.damageMin / buffedFireRate) * 1000).toFixed(1);
        let maxDPS;
        if (currentStats.chargeMaxMin && currentStats.chargeMaxMax) {
            // For charging levels, max DPS uses max charged damage
            maxDPS = ((currentStats.chargeMaxMax / buffedFireRate) * 1000).toFixed(1);
        } else {
            // For non-charging levels, max DPS uses base max damage
            maxDPS = ((currentStats.damageMax / buffedFireRate) * 1000).toFixed(1);
        }

        infoHTML += `
            <div class="info-row">
                <div class="info-label">DPS</div>
                <div class="info-value">Min: ${minDPS}/s | Max: ${maxDPS}/s${currentDPS > 0 ? ` (Current: ${currentDPS}/s)` : ''}</div>
            </div>
        `;

        // Show cooldown status (when target was lost)
        if (tower.lastTargetLostTime) {
            const timeSinceLost = performance.now() - tower.lastTargetLostTime;
            const cooldownRemaining = Math.max(0, type.targetCooldown - timeSinceLost);
            if (cooldownRemaining > 0) {
                infoHTML += `
                    <div class="info-row">
                        <div class="info-label">Cooldown</div>
                        <div class="info-value">${(cooldownRemaining / 1000).toFixed(1)}s</div>
                    </div>
                `;
            }
        }

        // Show cannot be buffed for levels 4-5
        if (currentStats.cannotBeBuffed) {
            infoHTML += `
                <div class="info-row">
                    <div class="info-value" style="text-align:center; color:#FF6B6B;">❌ Cannot Be Buffed</div>
                </div>
            `;
        }
    } else {
        // Get Commander buffs
        const buffs = getCommanderBuffs(tower);
        const buffedDamage = Math.floor(currentStats.damage * (1 + buffs.damageBoost));
        const buffedRange = currentStats.range + buffs.rangeBoost;
        const buffedFireRate = currentStats.fireRate * (1 - buffs.fireRateBoost);

        let fireRateLabel = "Fire Rate";
        let dpsValue = ((buffedDamage / buffedFireRate) * 1000).toFixed(1);

        if (currentStats.burstcount) {
            fireRateLabel = "Burst Cooldown";
            const cycleTime = (currentStats.burstcount - 1) * currentStats.burstfirerate + buffedFireRate;
            const totalBurstDamage = buffedDamage * currentStats.burstcount;
            dpsValue = ((totalBurstDamage / cycleTime) * 1000).toFixed(1);
        }

        infoHTML += `
            <div class="info-row">
                <div class="info-label">Damage</div>
                <div class="info-value">${buffedDamage}${buffs.damageBoost > 0 ? ` (+${Math.floor(currentStats.damage * buffs.damageBoost)})` : ''}${type.aoe ? ` (${Math.floor(currentStats.directDamage * (1 + buffs.damageBoost))} direct)` : ''}</div>
            </div>
            <div class="info-row">
                <div class="info-label">Range</div>
                <div class="info-value">${buffedRange}${buffs.rangeBoost > 0 ? ` (+${buffs.rangeBoost})` : ''} tiles</div>
            </div>
            <div class="info-row">
                <div class="info-label">${fireRateLabel}</div>
                <div class="info-value">${(buffedFireRate / 1000).toFixed(2)}s${buffs.fireRateBoost > 0 ? ` (-${(buffs.fireRateBoost * 100).toFixed(0)}%)` : ''}</div>
            </div>
            <div class="info-row">
                <div class="info-label">DPS</div>
                <div class="info-value">${dpsValue}/s</div>
            </div>
        `;

        // Show Gunner Paragon info
        if (type === TOWER_TYPES.GUNNER_PARAGON) {
            infoHTML += `
                <div class="info-row">
                    <div class="info-label">Radian</div>
                    <div class="info-value">${currentStats.radian}</div>
                </div>
                <div class="info-row">
                    <div class="info-label">Base HP Bonus</div>
                    <div class="info-value">+${currentStats.baseHp} HP</div>
                </div>
            `;
        }
    }

    // Show next level info if not max
    if (level < type.levels.length) {
        const nextStats = type.levels[level];
        if (type.summons) {
            infoHTML += `<div class="info-row"><div class="info-label">Next Level:</div></div>`;
            if (nextStats.summons) {
                nextStats.summons.forEach(summon => {
                    infoHTML += `<div class="info-row"><div class="info-value">${SUMMON_TYPES[summon.type].name}</div></div>`;
                });
            } else {
                infoHTML += `<div class="info-row" style="margin-left: 8px;"><span>Improved stats (No new summons)</span></div>`;
            }
        } else if (type.farm) {
            infoHTML += `
                <div class="info-row">
                    <div class="info-label">Next Income</div>
                    <div class="info-value">$${nextStats.cashPerWave}/wave</div>
                </div>
            `;
        } else if (type.isCharger) {
            const damageDisplay = nextStats.chargeMaxMin && nextStats.chargeMaxMax ?
                `${nextStats.damageMin}-${nextStats.damageMax} (Max: ${nextStats.chargeMaxMin}-${nextStats.chargeMaxMax})` :
                `${nextStats.damageMin}-${nextStats.damageMax}`;
            infoHTML += `
                <div class="info-row">
                    <div class="info-label">Next Level</div>
                    <div class="info-value">DMG: ${damageDisplay}, Range: ${nextStats.range}</div>
                </div>
            `;
        } else {
            infoHTML += `
                <div class="info-row">
                    <div class="info-label">Next Level</div>
                    <div class="info-value">DMG: ${nextStats.damage}, Range: ${nextStats.range}</div>
                </div>
            `;
        }
    } else {
        infoHTML += `<div class="info-row"><div class="info-value" style="text-align:center; color:#4CAF50;">✓ MAX LEVEL</div></div>`;
    }

    towerInfoContent.innerHTML = infoHTML;

    // Update button states
    const upgradeCost = level < type.levels.length ? (freeUpgrades ? 0 : type.levels[level].upgradeCost) : 0;
    const canUpgrade = level < type.levels.length && (freeUpgrades || cash >= upgradeCost);

    // Special text for Gunner level 4 upgrade to Paragon
    if (type === TOWER_TYPES.GUNNER && level === 4) {
        let radianText = 'R1';
        if (gunnerPoints >= 250) radianText = 'R3';
        else if (gunnerPoints >= 100) radianText = 'R2';
        upgradeTowerBtn.textContent = `🔮 Upgrade to Paragon ${radianText} ($${TOWER_TYPES.GUNNER_PARAGON.cost}) [${gunnerPoints}p]`;
        upgradeTowerBtn.disabled = cash < TOWER_TYPES.GUNNER_PARAGON.cost || gunnerParagonCount >= 1;
        upgradeTowerBtn.style.display = 'block';
    } else if (type === TOWER_TYPES.SNIPER && level === type.levels.length) {
        // Sniper level 5 can upgrade to Sniper Paragon
        const sniperCount = towers.filter(t => t.type === TOWER_TYPES.SNIPER).length;
        let radianText = 'R1';
        if (sniperCount >= 15) radianText = 'R3';
        else if (sniperCount >= 8) radianText = 'R2';
        upgradeTowerBtn.textContent = `🎯 Upgrade to Sniper Paragon ${radianText} ($${TOWER_TYPES.SNIPER_PARAGON.cost}) [${sniperCount} snipers]`;
        upgradeTowerBtn.disabled = cash < TOWER_TYPES.SNIPER_PARAGON.cost || sniperParagonCount >= 1;
        upgradeTowerBtn.style.display = 'block';
    } else if (type === TOWER_TYPES.GUNNER_PARAGON) {
        // Paragon doesn't have traditional upgrades - show radian info instead
        upgradeTowerBtn.textContent = `📊 Radian ${level} (Upgrade via Gunner Points)`;
        upgradeTowerBtn.disabled = true;
        upgradeTowerBtn.style.display = 'block';
    } else if (type === TOWER_TYPES.SNIPER_PARAGON) {
        // Sniper Paragon doesn't have traditional upgrades
        upgradeTowerBtn.textContent = `📊 Radian ${level} (Max Level)`;
        upgradeTowerBtn.disabled = true;
        upgradeTowerBtn.style.display = 'block';
    } else {
        upgradeTowerBtn.textContent = `⬆️ Upgrade ${freeUpgrades ? '(FREE)' : '($' + upgradeCost + ')'}`;
        upgradeTowerBtn.disabled = !canUpgrade;
        upgradeTowerBtn.style.display = level < type.levels.length ? 'block' : 'none';
    }

    sellTowerBtn.textContent = `💰 Sell ($${Math.floor(type.cost * 0.6 * (level / 2))})`;

    // Show ability button for Elite Spawner level 5
    if (type === TOWER_TYPES.ELITE_SPAWNER && level === 5) {
        // Elite Spawner Rainbow Cube ability
        const cooldownRemaining = Math.max(0, (TOWER_TYPES.ELITE_SPAWNER.abilityCooldown - (performance.now() - lastAbilityTime)) / 1000);

        if (cooldownRemaining > 0) {
            abilityTowerBtn.textContent = `🌈 Spawn Rainbow Cube (${cooldownRemaining.toFixed(1)}s)`;
            abilityTowerBtn.disabled = true;
            abilityTowerBtn.style.display = 'block';
        } else {
            abilityTowerBtn.textContent = '🌈 Spawn Rainbow Cube';
            abilityTowerBtn.disabled = false;
            abilityTowerBtn.style.display = 'block';
        }
        ability2TowerBtn.style.display = 'none'; // Hide second ability button
    } else if (type === TOWER_TYPES.EXECUTIVE && level === 5) {
        // Executive Orbital Strike ability
        const abilityCost = TOWER_TYPES.EXECUTIVE.abilityCost;
        const cooldownRemaining = Math.max(0, (TOWER_TYPES.EXECUTIVE.abilityCooldown - (performance.now() - (tower.lastAbilityTime || 0))) / 1000);
        const globalCooldownRemaining = Math.max(0, (40000 - (performance.now() - lastOrbitalStrikeTime)) / 1000);
        const canAfford = cash >= abilityCost;

        if (cooldownRemaining > 0) {
            abilityTowerBtn.textContent = `🛰️ Orbital Strike (${cooldownRemaining.toFixed(1)}s)`;
            abilityTowerBtn.disabled = true;
            abilityTowerBtn.style.display = 'block';
        } else if (globalCooldownRemaining > 0) {
            abilityTowerBtn.textContent = `🛰️ Orbital Strike (Global: ${globalCooldownRemaining.toFixed(1)}s)`;
            abilityTowerBtn.disabled = true;
            abilityTowerBtn.style.display = 'block';
        } else if (!canAfford) {
            abilityTowerBtn.textContent = `🛰️ Orbital Strike ($${abilityCost})`;
            abilityTowerBtn.disabled = true;
            abilityTowerBtn.style.display = 'block';
        } else {
            abilityTowerBtn.textContent = `🛰️ Orbital Strike ($${abilityCost})`;
            abilityTowerBtn.disabled = false;
            abilityTowerBtn.style.display = 'block';
        }
        ability2TowerBtn.style.display = 'none'; // Hide second ability button
    } else if (type === TOWER_TYPES.GUNNER_PARAGON && level >= 2) {
        // Paragon Alpha Protocol ability (Radian 2+)
        const alphaCost = type.alphaCost;
        const alphaCooldown = type.alphaCooldown;
        const cooldownRemaining = Math.max(0, (alphaCooldown - (performance.now() - (tower.lastAlphaTime || 0))) / 1000);
        const canAfford = cash >= alphaCost;

        if (cooldownRemaining > 0) {
            abilityTowerBtn.textContent = `⚡ Alpha Protocol (${cooldownRemaining.toFixed(1)}s)`;
            abilityTowerBtn.disabled = true;
            abilityTowerBtn.style.display = 'block';
        } else if (!canAfford) {
            abilityTowerBtn.textContent = `⚡ Alpha Protocol ($${alphaCost})`;
            abilityTowerBtn.disabled = true;
            abilityTowerBtn.style.display = 'block';
        } else {
            abilityTowerBtn.textContent = `⚡ Alpha Protocol ($${alphaCost})`;
            abilityTowerBtn.disabled = false;
            abilityTowerBtn.style.display = 'block';
        }

        // Beta Protocol (Radian 3 only)
        if (level === 3) {
            const betaCost = type.betaCost;
            const betaCooldown = type.betaCooldown;
            const betaCooldownRemaining = Math.max(0, (betaCooldown - (performance.now() - (tower.lastBetaTime || 0))) / 1000);
            const canAffordBeta = cash >= betaCost;

            if (betaCooldownRemaining > 0) {
                ability2TowerBtn.textContent = `🔷 Beta Protocol (${betaCooldownRemaining.toFixed(1)}s)`;
                ability2TowerBtn.disabled = true;
                ability2TowerBtn.style.display = 'block';
            } else if (!canAffordBeta) {
                ability2TowerBtn.textContent = `🔷 Beta Protocol ($${betaCost})`;
                ability2TowerBtn.disabled = true;
                ability2TowerBtn.style.display = 'block';
            } else {
                ability2TowerBtn.textContent = `🔷 Beta Protocol ($${betaCost})`;
                ability2TowerBtn.disabled = false;
                ability2TowerBtn.style.display = 'block';
            }
        } else {
            ability2TowerBtn.style.display = 'none';
        }
        ability2TowerBtn.style.display = 'none';
    } else if (type.isCarrier) {
        // Carrier Cube UI - Show efficiency modules and per-unit states
        const em = tower.em || 0;

        const levelStats = type.levels[level - 1];
        const emCap = levelStats.emCap || type.efficiencyCap || 20;
        const emGainRate = levelStats.emGainPerSec || 1;

        infoHTML += `
            <div class="info-row">
                <div class="info-label">Efficiency Modules</div>
                <div class="info-value" style="width: 120px; position: relative; height: 16px; background: rgba(0,0,0,0.5); border: 1px solid #00FFFF; border-radius: 4px; overflow: hidden;">
                    <div style="width: ${(em / emCap) * 100}%; height: 100%; background: linear-gradient(90deg, #008888, #00FFFF); transition: width 0.2s;"></div>
                    <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 10px; text-shadow: 1px 1px 2px black; color: #fff;">
                        ${em} / ${emCap}
                    </div>
                </div>
            </div>
            <div class="info-row">
                <div class="info-label">EM Generation</div>
                <div class="info-value" style="color: #88FFFF;">+${emGainRate}/sec</div>
            </div>
        `;

        // Show individual unit states
        const units = [CARRIER_UNITS.BOMBER, CARRIER_UNITS.BLISMA];
        if (tower.level >= 2) {
            units.push(CARRIER_UNITS.REFRACTOR, CARRIER_UNITS.MOAB, CARRIER_UNITS.GOLIATH);
        }

        infoHTML += `<div class="info-row"><div class="info-label" style="font-weight:bold;">Unit Status:</div></div>`;

        units.forEach(unit => {
            if (!tower.unitState) tower.unitState = {};
            const unitState = tower.unitState[unit.name] || { cooldownState: 'READY', usageCount: 0, cooldownEndTime: 0 };
            const currentTime = performance.now();
            const cooldownRemaining = Math.max(0, (unitState.cooldownEndTime - currentTime) / 1000);
            const isOnCooldown = cooldownRemaining > 0;

            let statusColor = '#00FF00'; // Green for READY
            let statusText = 'READY';

            if (isOnCooldown) {
                if (unitState.cooldownState === 'PAYBACK') {
                    statusColor = '#FF0000';
                    statusText = `LOCKED ${cooldownRemaining.toFixed(1)}s`;
                } else if (unitState.cooldownState === 'FULL_COOLDOWN') {
                    statusColor = '#FF6600';
                    statusText = `FULL ${cooldownRemaining.toFixed(1)}s [${unitState.usageCount}/${unit.hardLimit || 3}]`;
                } else if (unitState.cooldownState === 'COOLDOWN') {
                    statusColor = '#FFCC00';
                    statusText = `CD ${cooldownRemaining.toFixed(1)}s [${unitState.usageCount}/${unit.limit || 2}]`;
                }
            }

            infoHTML += `
                <div class="info-row">
                    <div class="info-label">${unit.name}</div>
                    <div class="info-value" style="color: ${statusColor};">
                        ${statusText} <span style="color: #88FFFF;">(${unit.emCost} EM)</span>
                    </div>
                </div>
            `;
        });

        abilityTowerBtn.style.display = 'none';
        ability2TowerBtn.style.display = 'none';

        // Show separate spawn UI
        showCarrierSpawnUI(tower);
    } else {
        abilityTowerBtn.style.display = 'none';
        ability2TowerBtn.style.display = 'none';
        // Hide separate spawn UI if not carrier
        document.getElementById('carrierSpawnPanel').style.display = 'none';
    }

    // Show the panel and buttons
    towerInfoPanel.style.display = 'flex';
    towerActions.style.display = 'block';

    // Store selected tower for timer display
    selectedTowerForTimer = tower;
}

// Show Carrier Spawn UI
function showCarrierSpawnUI(tower) {
    const panel = document.getElementById('carrierSpawnPanel');
    const container = document.getElementById('carrierUnitsGrid');
    if (!panel || !container) return;

    // Clean up any existing tooltips before creating new ones
    document.querySelectorAll('.carrier-tooltip').forEach(t => t.remove());

    panel.style.display = 'block';
    container.innerHTML = ''; // Clear previous buttons
    container.style.display = 'grid';
    container.style.gridTemplateColumns = 'repeat(2, 1fr)';
    container.style.gap = '8px';
    container.style.marginTop = '10px';

    // Add or update EMC progress bar
    let emcBar = document.getElementById('emcProgressBar');
    if (!emcBar) {
        emcBar = document.createElement('div');
        emcBar.id = 'emcProgressBar';
        panel.insertBefore(emcBar, container);
    }

    const currentEM = tower.em || 0;
    const levelStats = tower.type.levels[tower.level - 1];
    const maxEM = levelStats.emCap || tower.type.efficiencyCap || 20;
    const emPercent = Math.min(100, (currentEM / maxEM) * 100);

    emcBar.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
            <span style="font-size: 12px; color: #88FFFF; font-weight: bold;">⚡ Efficiency Modules</span>
            <span style="font-size: 14px; color: #FFFFFF; font-weight: bold;">${currentEM}/${maxEM}</span>
        </div>
        <div style="width: 100%; height: 10px; background: rgba(0,0,0,0.5); border-radius: 5px; overflow: hidden; border: 1px solid rgba(0,255,255,0.3);">
            <div style="
                width: ${emPercent}%;
                height: 100%;
                background: linear-gradient(90deg, #00FFFF, #00BFFF, #00FFFF);
                border-radius: 5px;
                box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
                transition: width 0.3s ease;
            "></div>
        </div>
    `;

    const units = [CARRIER_UNITS.BOMBER, CARRIER_UNITS.BLISMA];
    if (tower.level >= 2) {
        units.push(CARRIER_UNITS.REFRACTOR, CARRIER_UNITS.MOAB, CARRIER_UNITS.GOLIATH);
    }

    units.forEach(unit => {
        const btn = document.createElement('button');
        btn.className = 'carrier-unit-btn';
        btn.style.cssText = `
            font-size: 11px;
            padding: 8px 5px;
            background: linear-gradient(135deg, ${unit.color}cc 0%, ${unit.color}88 100%);
            border: 2px solid ${unit.color};
            border-radius: 8px;
            color: #fff;
            position: relative;
            overflow: hidden;
            min-height: 70px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 2px;
            cursor: pointer;
            transition: all 0.2s;
        `;

        const canAfford = (tower.em || 0) >= unit.emCost;

        // Get per-unit state
        if (!tower.unitState) tower.unitState = {};
        const unitState = tower.unitState[unit.name] || { cooldownState: 'READY', usageCount: 0, cooldownEndTime: 0 };
        const currentTime = performance.now();

        // Calculate cooldown remaining
        const cooldownRemaining = Math.max(0, (unitState.cooldownEndTime - currentTime) / 1000);
        const isOnCooldown = cooldownRemaining > 0;
        const isPayback = unitState.cooldownState === 'PAYBACK' && isOnCooldown;
        const isFullCooldown = unitState.cooldownState === 'FULL_COOLDOWN' && isOnCooldown;
        const isCooldown = unitState.cooldownState === 'COOLDOWN' && isOnCooldown;

        // Get limits
        const limit = unit.limit || 2;
        const hardLimit = unit.hardLimit || 3;

        btn.disabled = !canAfford || isPayback;
        if (isPayback) {
            btn.style.opacity = '0.4';
            btn.style.border = '2px solid #ff0000';
        } else if (isFullCooldown) {
            btn.style.opacity = '0.7';
            btn.style.border = '2px solid #ff6600';
        } else if (isCooldown) {
            btn.style.opacity = '0.85';
        }

        // Get stat info based on unit type
        let statsInfo = '';
        let tooltipContent = '';

        if (unit === CARRIER_UNITS.BOMBER) {
            const dmg = tower.level >= 2 ? unit.damageL2 : unit.damage;
            const area = tower.level >= 2 ? unit.areaL2 : unit.area;
            statsInfo = `💣 Airstrike`;
            tooltipContent = `
                <div style="font-weight: bold; color: ${unit.color}; margin-bottom: 8px; font-size: 14px;">🛩️ Bomber Airstrike</div>
                <div style="display: grid; gap: 4px;">
                    <div>📐 Area: <span style="color: #fff;">${area}×${area} tiles</span></div>
                    <div>💥 Damage: <span style="color: #ff6666;">${dmg} × ${unit.count} hits</span></div>
                    <div>⏱️ Delay: <span style="color: #ffcc00;">3s targeting</span></div>
                    <div>🔄 Cooldown: <span style="color: #aaa;">${unit.cooldown / 1000}s</span></div>
                </div>
            `;
        } else if (unit === CARRIER_UNITS.BLISMA) {
            statsInfo = `🎯 Hunter`;
            tooltipContent = `
                <div style="font-weight: bold; color: ${unit.color}; margin-bottom: 8px; font-size: 14px;">🎯 Blisma Hunter</div>
                <div style="display: grid; gap: 4px;">
                    <div>⏳ Duration: <span style="color: #fff;">${unit.duration / 1000}s on field</span></div>
                    <div>💥 Damage: <span style="color: #ff6666;">${unit.damage} × ${unit.burstCount} burst</span></div>
                    <div>⚡ Burst Rate: <span style="color: #ffcc00;">${unit.burstRate}ms intervals</span></div>
                    <div>🔫 Fire Rate: <span style="color: #aaa;">${unit.fireRate / 1000}s between bursts</span></div>
                    <div>🔄 Cooldown: <span style="color: #aaa;">${unit.cooldown / 1000}s</span></div>
                </div>
            `;
        } else if (unit === CARRIER_UNITS.REFRACTOR) {
            statsInfo = `⚡ Beam`;
            tooltipContent = `
                <div style="font-weight: bold; color: ${unit.color}; margin-bottom: 8px; font-size: 14px;">⚡ Refractor Beam</div>
                <div style="display: grid; gap: 4px;">
                    <div>⏳ Duration: <span style="color: #fff;">${unit.duration / 1000}s on field</span></div>
                    <div>💥 Base Damage: <span style="color: #ff6666;">${unit.damage}/hit</span></div>
                    <div>📈 Stacking: <span style="color: #00ffff;">+${unit.damageInc} per hit</span></div>
                    <div>⚡ Fire Rate: <span style="color: #ffcc00;">${unit.fireRate}ms</span></div>
                    <div>🎯 Target: <span style="color: #aaa;">Single (closest)</span></div>
                    <div>🔄 Cooldown: <span style="color: #aaa;">${unit.cooldown / 1000}s</span></div>
                </div>
            `;
        } else if (unit === CARRIER_UNITS.MOAB) {
            statsInfo = `☢️ Nuke`;
            tooltipContent = `
                <div style="font-weight: bold; color: ${unit.color}; margin-bottom: 8px; font-size: 14px;">☢️ MOAB Strike</div>
                <div style="display: grid; gap: 4px;">
                    <div>💥 Damage: <span style="color: #ff4444; font-weight: bold;">${unit.damage.toLocaleString()}</span></div>
                    <div>🌍 Range: <span style="color: #ffcc00;">GLOBAL (all enemies)</span></div>
                    <div>💰 Cost: <span style="color: #ffd700;">$${unit.cost.toLocaleString()}</span></div>
                    <div>⚠️ Limit: <span style="color: #ff6666;">1 per cooldown</span></div>
                    <div>🔄 Cooldown: <span style="color: #aaa;">${unit.cooldown / 1000}s</span></div>
                </div>
            `;
        } else if (unit === CARRIER_UNITS.GOLIATH) {
            const minigunDPS = Math.floor(unit.minigunDamage / (unit.minigunRate / 1000));
            const railgunDPS = Math.floor(unit.railgunDamage / (unit.railgunRate / 1000));
            const missileDPS = Math.floor((unit.missileDamage * unit.missileCount) / (unit.missileRate / 1000));
            statsInfo = `🤖 Mech`;
            tooltipContent = `
                <div style="font-weight: bold; color: ${unit.color}; margin-bottom: 8px; font-size: 14px;">🤖 Goliath Mech</div>
                <div style="display: grid; gap: 4px;">
                    <div>⏳ Duration: <span style="color: #fff;">${unit.duration / 1000}s on field</span></div>
                    <div style="color: #ffcc00; margin-top: 6px;">── Weapons ──</div>
                    <div>🔫 Minigun: <span style="color: #ff6666;">${minigunDPS} DPS</span></div>
                    <div>⚡ Railgun: <span style="color: #00bfff;">${railgunDPS} DPS</span> (first)</div>
                    <div>🚀 Missiles: <span style="color: #ff8800;">${missileDPS} DPS</span> (${unit.missileRange} tile AOE)</div>
                    <div style="margin-top: 4px;">💰 Cost: <span style="color: #ffd700;">$${unit.cost.toLocaleString()}</span></div>
                    <div>🔄 Cooldown: <span style="color: #aaa;">${unit.cooldown / 1000}s</span></div>
                </div>
            `;
        }

        // Create cooldown bar
        let cooldownHTML = '';
        if (isOnCooldown) {
            let totalCooldown = unit.cooldown;
            if (isFullCooldown) totalCooldown = unit.fullCooldown || 15000;
            if (isPayback) totalCooldown = unit.paybackCooldown || 20000;

            const cooldownPercent = ((totalCooldown / 1000 - cooldownRemaining) / (totalCooldown / 1000)) * 100;
            const stateColor = isPayback ? '#ff0000' : (isFullCooldown ? '#ff6600' : '#ffcc00');
            const stateLabel = isPayback ? '🔒 LOCKED' : (isFullCooldown ? '⚠️ FULL' : '⏱️');

            cooldownHTML = `
                <div style="position: absolute; bottom: 0; left: 0; width: 100%; height: 4px; background: rgba(0,0,0,0.5);">
                    <div style="width: ${cooldownPercent}%; height: 100%; background: ${stateColor}; transition: width 0.1s;"></div>
                </div>
                <div style="font-size: 9px; color: ${stateColor};">${stateLabel} ${cooldownRemaining.toFixed(1)}s</div>
            `;
        }

        // Show usage count if any
        let usageHTML = '';
        if (unitState.usageCount > 0 && isOnCooldown) {
            usageHTML = `<div style="font-size: 8px; color: #aaa;">${unitState.usageCount}/${isFullCooldown ? hardLimit : limit}</div>`;
        }

        btn.innerHTML = `
            <div style="font-weight: bold; font-size: 12px;">${unit.name.replace(' Cube', '')}</div>
            <div style="font-size: 9px; opacity: 0.9;">${statsInfo}</div>
            <div style="font-size: 10px; color: ${canAfford ? '#00ff00' : '#ff6666'};">${unit.emCost} EM</div>
            ${usageHTML}
            ${cooldownHTML}
        `;

        // Create tooltip element
        const tooltip = document.createElement('div');
        tooltip.className = 'carrier-tooltip';
        tooltip.innerHTML = tooltipContent;
        tooltip.style.cssText = `
            position: fixed;
            background: linear-gradient(135deg, #1a1a2e, #16213e);
            border: 2px solid ${unit.color};
            border-radius: 12px;
            padding: 12px 16px;
            color: #ccc;
            font-size: 11px;
            pointer-events: none;
            z-index: 10001;
            opacity: 0;
            transition: opacity 0.2s ease;
            box-shadow: 0 8px 32px rgba(0,0,0,0.6), 0 0 20px ${unit.color}44;
            min-width: 200px;
            max-width: 280px;
        `;
        document.body.appendChild(tooltip);

        btn.onmouseenter = (e) => {
            if (!btn.disabled) {
                btn.style.transform = 'translateY(-2px)';
                btn.style.boxShadow = `0 4px 15px ${unit.color}88`;
            }
            // Position and show tooltip
            const rect = btn.getBoundingClientRect();
            tooltip.style.left = `${rect.right + 10}px`;
            tooltip.style.top = `${rect.top}px`;
            tooltip.style.opacity = '1';
        };
        btn.onmouseleave = () => {
            btn.style.transform = 'none';
            btn.style.boxShadow = 'none';
            tooltip.style.opacity = '0';
        };

        btn.onclick = () => triggerCarrierAbility(tower, unit);

        container.appendChild(btn);
    });

    // Clean up old tooltips when panel is hidden
    const existingTooltips = document.querySelectorAll('.carrier-tooltip');
    // Keep only the newly created tooltips (already handled in forEach)
}


// Sell tower
function sellTower(tower) {
    let towerSizeX = 1;
    let towerSizeY = 1;
    if (tower.type === TOWER_TYPES.GUNNER_PARAGON || tower.type === TOWER_TYPES.SNIPER_PARAGON || tower.type === TOWER_TYPES.ELITE_SPAWNER) {
        towerSizeX = 2; towerSizeY = 2;
    } else if (tower.type === TOWER_TYPES.CUBE_FACTORY) {
        towerSizeX = 3; towerSizeY = 3;
    } else if (tower.type === TOWER_TYPES.CARRIER_CUBE) {
        towerSizeX = 4; towerSizeY = 4;
    }

    // Clear grid cells occupied by the tower
    for (let y = tower.gridY; y < tower.gridY + towerSizeY; y++) {
        for (let x = tower.gridX; x < tower.gridX + towerSizeX; x++) {
            if (y < gridHeight && x < gridWidth) {
                gameGrid[y][x].tower = null;
            }
        }
    }

    // Decrement counters for specific tower types
    if (tower.type === TOWER_TYPES.GUNNER_PARAGON) {
        gunnerParagonCount--;
        // Remove the HP buff when Paragon is sold
        const stats = tower.type.levels[tower.level - 1];
        baseHp -= stats.baseHp;
        baseHpDisplay.textContent = baseHp;
    } else if (tower.type === TOWER_TYPES.SNIPER_PARAGON) {
        sniperParagonCount--;
    } else if (tower.type === TOWER_TYPES.ELITE_SPAWNER) {
        eliteSpawnerCount--;
    } else if (tower.type === TOWER_TYPES.FARM) {
        farmCount--;
    }

    // Remove the tower from the global towers array
    towers = towers.filter(t => t !== tower);

    // If selling Executive, add 20s to global Orbital Strike cooldown
    if (tower.type === TOWER_TYPES.EXECUTIVE) {
        lastOrbitalStrikeTime = Math.max(lastOrbitalStrikeTime, performance.now() - 20000); // Add 20s penalty
    }

    // Cash refund
    cash += Math.floor(tower.type.cost * 0.6 * (tower.level / 2));
    updateCashDisplay();

    // --- CUBE FACTORY SPECIFIC: Remove its active units and reset global cooldown ---
    if (tower.type === TOWER_TYPES.CUBE_FACTORY) {
        enemies = enemies.filter(enemy => !enemy.type.name.includes('Factory Cube')); // Remove all Factory Cubes
        lastGlobalFactorySpawnTime = performance.now(); // Reset global cooldown to NOW
        console.log("[DEBUG CF] Cube Factory sold. All Factory Cubes removed. Global spawn cooldown reset to now.");
    }
    // --- END CUBE FACTORY SPECIFIC ---

    // Hide tower info panel
    towerInfoPanel.style.display = 'none';
    document.getElementById('carrierSpawnPanel').style.display = 'none';
    currentInfoTower = null;
    selectedCell = null; // Clear selected cell to hide range
}


// Upgrade tower
function upgradeTower(tower) {
    // Check if this is a Gunner at level 4 trying to upgrade to Paragon
    if (tower.type === TOWER_TYPES.GUNNER && tower.level === 4) {
        // Check if player can afford paragon
        const paragonCost = TOWER_TYPES.GUNNER_PARAGON.cost;
        if (gunnerParagonCount >= 1) {
            alert('You can only have 1 Gunner Paragon!');
            return;
        }
        if (cash < paragonCost) {
            alert(`Not enough cash! Need $${paragonCost}`);
            return;
        }

        // Store position before selling
        const gridX = tower.gridX;
        const gridY = tower.gridY;

        // Check if there's space for 2x2 tower at this position
        for (let y = gridY; y < gridY + 2; y++) {
            for (let x = gridX; x < gridX + 2; x++) {
                if (x >= gridWidth || y >= gridHeight ||
                    gameGrid[y][x].type === 'path' ||
                    (gameGrid[y][x].tower && gameGrid[y][x].tower !== tower)) {
                    alert('Not enough space to upgrade to Paragon! Need 2x2 clear area.');
                    return;
                }
            }
        }

        // Determine radian based on points
        let radian = 1;
        if (gunnerPoints >= 250) radian = 3;
        else if (gunnerPoints >= 100) radian = 2;

        // Sell all gunners (including this one)
        const gunnerTowers = towers.filter(t => t.type === TOWER_TYPES.GUNNER);
        gunnerTowers.forEach(t => {
            // Remove from grid
            const gridCell = gameGrid[t.gridY][t.gridX];
            if (gridCell) gridCell.tower = null;
        });
        // Remove from towers array
        towers = towers.filter(t => t.type !== TOWER_TYPES.GUNNER);

        // Create new Paragon tower (like placing a new tower)
        const paragonTower = {
            gridX: gridX,
            gridY: gridY,
            x: gridX * GRID_SIZE + GRID_SIZE, // Center for 2x2 tower
            y: gridY * GRID_SIZE + GRID_SIZE, // Center for 2x2 tower
            type: TOWER_TYPES.GUNNER_PARAGON,
            level: radian,
            lastFired: 0,
            target: null,
            lastSummonTimes: {},
            isFiring: false
        };

        // Add to towers array
        towers.push(paragonTower);

        // Apply HP buff
        const stats = TOWER_TYPES.GUNNER_PARAGON.levels[radian - 1];
        baseHp += stats.baseHp;
        baseHpDisplay.textContent = baseHp;

        // Occupy 2x2 grid space
        for (let y = gridY; y < gridY + 2; y++) {
            for (let x = gridX; x < gridX + 2; x++) {
                gameGrid[y][x].tower = paragonTower;
            }
        }

        // Deduct cost and update counters
        cash -= paragonCost;
        gunnerParagonCount++;
        gunnerPoints = 0;

        updateCashDisplay();
        towerInfoPanel.style.display = 'none';
        console.log(`Gunner Paragon created at Radian ${radian}! Base HP +${stats.baseHp}`);
        return;

    }

    // Check if this is a Sniper at level 5 trying to upgrade to Paragon
    if (tower.type === TOWER_TYPES.SNIPER && tower.level === tower.type.levels.length) {
        const paragonCost = TOWER_TYPES.SNIPER_PARAGON.cost;
        if (sniperParagonCount >= 1) {
            alert('You can only have 1 Sniper Paragon!');
            return;
        }
        if (cash < paragonCost) {
            alert(`Not enough cash! Need $${paragonCost}`);
            return;
        }

        // Store position before selling
        const gridX = tower.gridX;
        const gridY = tower.gridY;

        // Check if there's space for 2x2 tower at this position
        for (let y = gridY; y < gridY + 2; y++) {
            for (let x = gridX; x < gridX + 2; x++) {
                if (x >= gridWidth || y >= gridHeight ||
                    gameGrid[y][x].type === 'path' ||
                    (gameGrid[y][x].tower && gameGrid[y][x].tower !== tower)) {
                    alert('Not enough space to upgrade to Paragon! Need 2x2 clear area.');
                    return;
                }
            }
        }

        // Count snipers to determine radian
        const sniperCount = towers.filter(t => t.type === TOWER_TYPES.SNIPER).length;
        let radian = 1;
        if (sniperCount >= 15) radian = 3;
        else if (sniperCount >= 8) radian = 2;

        // Sell all snipers (including this one)
        const sniperTowers = towers.filter(t => t.type === TOWER_TYPES.SNIPER);
        sniperTowers.forEach(t => {
            const gridCell = gameGrid[t.gridY][t.gridX];
            if (gridCell) gridCell.tower = null;
        });
        towers = towers.filter(t => t.type !== TOWER_TYPES.SNIPER);

        // Create new Sniper Paragon tower
        const paragonTower = {
            gridX: gridX,
            gridY: gridY,
            x: gridX * GRID_SIZE + GRID_SIZE, // Center for 2x2 tower
            y: gridY * GRID_SIZE + GRID_SIZE, // Center for 2x2 tower
            type: TOWER_TYPES.SNIPER_PARAGON,
            level: radian,
            lastFired: 0,
            target: null,
            isFiring: false
        };

        towers.push(paragonTower);

        // Occupy 2x2 grid space
        for (let y = gridY; y < gridY + 2; y++) {
            for (let x = gridX; x < gridX + 2; x++) {
                gameGrid[y][x].tower = paragonTower;
            }
        }

        cash -= paragonCost;
        sniperParagonCount++;

        updateCashDisplay();
        towerInfoPanel.style.display = 'none';
        console.log(`Sniper Paragon created at Radian ${radian}!`);
        return;
    }

    const nextLevel = tower.level;
    const upgradeCost = freeUpgrades ? 0 : tower.type.levels[nextLevel].upgradeCost;
    if (nextLevel < tower.type.levels.length && (freeUpgrades || cash >= upgradeCost)) {
        if (!freeUpgrades) {
            cash -= upgradeCost;
        }
        tower.level++;
        tower.lastSummonTimes = {}; // Reset individual summon timers on upgrade

        // Instant spawn for Cube Factory on upgrade
        if (tower.type === TOWER_TYPES.CUBE_FACTORY) {
            const newLevelStats = tower.type.levels[tower.level - 1]; // Get stats for the new level
            const spawnUnitType = newLevelStats.summons[0].type;

            const activeFactoryCubes = enemies.filter(e =>
                e.type.name.includes('Factory Cube') && e.hp > 0
            ).length;

            // Instant spawn if there are less than max active summons
            if (activeFactoryCubes < TOWER_TYPES.CUBE_FACTORY.maxActiveSummons) {
                console.log("[DEBUG CF] Cube Factory upgraded. Spawning initial unit instantly.");
                spawnEntity(SUMMON_TYPES[spawnUnitType], tower.x, tower.y, true);
                tower.lastSummonTimes[spawnUnitType] = performance.now(); // Set individual tower's cooldown start
                lastGlobalFactorySpawnTime = performance.now(); // Reset global cooldown
            } else {
                // If no instant spawn, just ensure its individual timer is current
                console.log("[DEBUG CF] Cube Factory upgraded, but no instant spawn (max active reached). Setting individual timer to now.");
                tower.lastSummonTimes[spawnUnitType] = performance.now();
            }

            // Reduce global cooldown on upgrade (this is separate from instant spawn)
            lastGlobalFactorySpawnTime += TOWER_TYPES.CUBE_FACTORY.cooldownReductionOnUpgrade;
            lastGlobalFactorySpawnTime = Math.min(performance.now(), lastGlobalFactorySpawnTime); // Ensure it doesn't go into the future
        }

        // Track gunner points
        if (tower.type === TOWER_TYPES.GUNNER) {
            const points = [1, 2, 3, 5];
            gunnerPoints += points[tower.level - 1] || 0;
        }

        updateCashDisplay();
        showTowerInfo(tower);
    }
}

function placeTower(gridX, gridY) {
    console.log(`--- Attempting Placement for ${selectedTower ? selectedTower.name : 'Unknown Tower'} ---`);
    console.log(`Target Grid: (${gridX}, ${gridY})`);
    console.log(`Current Cash: ${cash}, Tower Cost: ${selectedTowerCost}`);

    if (!selectedTower) {
        console.error("[PLACEMENT FAILED] No tower type selected. Aborting.");
        return;
    }
    if (cash < selectedTowerCost) {
        console.error(`[PLACEMENT FAILED] Not enough cash! Have: ${cash}, Need: ${selectedTowerCost}. Aborting.`);
        return;
    }

    let towerSizeX = 1;
    let towerSizeY = 1;

    // Determine the size of the selected tower
    if (selectedTower === TOWER_TYPES.ELITE_SPAWNER || selectedTower === TOWER_TYPES.GUNNER_PARAGON || selectedTower === TOWER_TYPES.SNIPER_PARAGON) {
        towerSizeX = 2; towerSizeY = 2;
    } else if (selectedTower === TOWER_TYPES.CUBE_FACTORY) {
        towerSizeX = 3; towerSizeY = 3;
    } else if (selectedTower === TOWER_TYPES.CARRIER_CUBE) {
        towerSizeX = 4; towerSizeY = 4;
    }

    // --- STEP 1: Global Tower Limit Check ---
    if (selectedTower.limit) {
        const currentCount = towers.filter(t => t.type === selectedTower).length;
        if (currentCount >= selectedTower.limit) {
            console.error(`[PLACEMENT FAILED] Global limit reached for ${selectedTower.name} (${selectedTower.limit}). Current: ${currentCount}. Aborting.`);
            return;
        }
    }

    // --- STEP 2: Bounds and Obstacle Check for the ENTIRE tower's footprint ---
    for (let y = gridY; y < gridY + towerSizeY; y++) {
        for (let x = gridX; x < gridX + towerSizeX; x++) {
            // Check if any part of the tower is out of canvas bounds
            if (x < 0 || x >= gridWidth || y < 0 || y >= gridHeight) {
                console.error(`[PLACEMENT FAILED] Out of bounds for ${selectedTower.name} at (${x},${y}). Grid dimensions: ${gridWidth}x${gridHeight}. Aborting.`);
                return;
            }
            // Check if any part of the tower is on a path
            if (gameGrid[y][x].type === 'path') {
                console.error(`[PLACEMENT FAILED] Cannot place ${selectedTower.name} on path at (${x},${y}). Aborting.`);
                return;
            }
            // Check if any part of the tower is already occupied by another tower
            if (gameGrid[y][x].tower) {
                console.error(`[PLACEMENT FAILED] Space occupied by ${gameGrid[y][x].tower.type.name} at (${x},${y}) for ${selectedTower.name}. Aborting.`);
                return;
            }
        }
    }
    // --- End Bounds and Obstacle Check ---

    // --- STEP 3: All checks passed, proceed with placement ---
    console.log(`[PLACEMENT SUCCESS] Placing ${selectedTower.name} at (${gridX}, ${gridY}).`);

    const tower = {
        gridX: gridX,
        gridY: gridY,
        x: gridX * GRID_SIZE + (towerSizeX * GRID_SIZE) / 2, // Center X based on tower size
        y: gridY * GRID_SIZE + (towerSizeY * GRID_SIZE) / 2, // Center Y based on tower size
        type: selectedTower,
        level: 1,
        lastFired: 0,
        target: null,
        lastSummonTimes: {}, // Initialize lastSummonTimes
        isFiring: false,
        // Charger-specific properties
        lockedTarget: null,
        lastTargetLostTime: 0,
        chargeStartTime: 0,
        isCharging: false,
        lastDamageDealt: 0,
        lastDamageTime: 0
    };
    towers.push(tower);

    // Occupy grid cells for multi-grid towers
    for (let y = gridY; y < gridY + towerSizeY; y++) {
        for (let x = gridX; x < gridX + towerSizeX; x++) {
            gameGrid[y][x].tower = tower;
        }
    }

    // Handle specific tower type placement effects/counters
    if (selectedTower === TOWER_TYPES.ELITE_SPAWNER) {
        eliteSpawnerCount++;
    } else if (selectedTower === TOWER_TYPES.FARM) {
        farmCount++;
    } else if (selectedTower === TOWER_TYPES.CUBE_FACTORY) {
        // --- Cube Factory Instant Spawn Logic on Placement ---
        const activeFactoryCubes = enemies.filter(e =>
            e.type.name.includes('Factory Cube') && e.hp > 0
        ).length;

        // Instant spawn if there are less than max active summons
        // This initial spawn bypasses the global cooldown, but resets it.
        if (activeFactoryCubes < TOWER_TYPES.CUBE_FACTORY.maxActiveSummons) {
            console.log("[DEBUG CF] Cube Factory placed. Spawning initial unit instantly (bypassing global cooldown for first unit).");
            const spawnUnitType = TOWER_TYPES.CUBE_FACTORY.levels[0].summons[0].type;
            spawnEntity(SUMMON_TYPES[spawnUnitType], tower.x, tower.y, true);
            tower.lastSummonTimes[spawnUnitType] = performance.now(); // Set individual tower's cooldown start
            lastGlobalFactorySpawnTime = performance.now(); // Reset global cooldown
        } else {
            // If no instant spawn (e.g., max active already), just ensure its individual timer is current
            // This prevents it from trying to spawn immediately again if another factory unit already exists.
            console.log("[DEBUG CF] Cube Factory placed, but no instant spawn (max active reached). Setting individual timer to now.");
            tower.lastSummonTimes[TOWER_TYPES.CUBE_FACTORY.levels[0].summons[0].type] = performance.now();
        }
        // --- End Cube Factory Instant Spawn Logic ---
    }
    // No specific counters needed for Gunner/Sniper Paragons here, as their counts are managed on upgrade.

    cash -= selectedTowerCost; // Use selectedTowerCost as it includes dynamic pricing
    updateCashDisplay();
    selectedTower = null;
    selectedTowerCost = 0;
    updateTowerSelection(); // Update selection visual to remove 'selected' class
}


// Get Commander buffs for a tower
function getCommanderBuffs(tower) {
    let rangeBoost = 0;
    let fireRateBoost = 0;
    let damageBoost = 0;

    // Find all Commander towers
    const commanders = towers.filter(t => t.type === TOWER_TYPES.COMMANDER);

    for (const commander of commanders) {
        const commanderStats = commander.type.levels[commander.level - 1];
        const distance = Math.sqrt(Math.pow(tower.x - commander.x, 2) + Math.pow(tower.y - commander.y, 2)) / GRID_SIZE;

        if (distance <= commanderStats.range) {
            rangeBoost = Math.max(rangeBoost, commanderStats.rangeBoost);
            fireRateBoost = Math.max(fireRateBoost, commanderStats.fireRateBoost);
            damageBoost = Math.max(damageBoost, commanderStats.damageBoost);
        }
    }

    return { rangeBoost, fireRateBoost, damageBoost };
}

// Get Sniper Paragon buffs
function getSniperParagonBuffs(tower) {
    let damageBoost = 0;

    // Find Sniper Paragon at Radian 3
    const sniperParagon = towers.find(t => t.type === TOWER_TYPES.SNIPER_PARAGON && t.level === 3);

    if (sniperParagon) {
        const stats = sniperParagon.type.levels[2];

        // Apply buff to Snipers
        if (tower.type === TOWER_TYPES.SNIPER) {
            damageBoost = stats.sniperBuff || 0;
        }
        // Apply buff to Railgunners
        else if (tower.type === TOWER_TYPES.RAILGUNNER) {
            damageBoost = stats.railgunnerBuff || 0;
        }
    }

    return damageBoost;
}

// Execute orbital strike at target location
function executeOrbitalStrike(x, y) {
    const strikeRange = GRID_SIZE * 3; // 3 grids on each side = 120 pixels

    // Snap to grid - find nearest grid center
    const gridX = Math.floor(x / GRID_SIZE);
    const gridY = Math.floor(y / GRID_SIZE);
    const snappedX = gridX * GRID_SIZE + GRID_SIZE / 2;
    const snappedY = gridY * GRID_SIZE + GRID_SIZE / 2;

    // Create targeting indicator that appears immediately
    orbitalStrikeData = {
        x: snappedX,
        y: snappedY,
        range: strikeRange,
        startTime: performance.now(),
        impactTime: performance.now() + 2000, // 2 second delay before impact
        hasImpacted: false
    };

    console.log('Orbital Strike targeting...');
}

// ===== ORBITAL STRIKE STAT CONFIGURATION =====
// These values control the Orbital Strike ability damage
const ORBITAL_STRIKE_STATS = {
    INITIAL_BURST_DAMAGE: 7500,      // First hit damage
    DELAYED_BURST_DAMAGE: 2500,      // Damage after 1 second
    CLUSTER_TICK_DAMAGE: 300,        // Damage per cluster explosion
    FINAL_EXPLOSION_DAMAGE: 10000,   // Final massive explosion damage

    MAX_HP_BONUS_PERCENT: 0.01,      // 1% of enemy max HP as bonus damage
    MAX_HP_BONUS_CAP: 10000,         // Cap for non-endless modes

    CLUSTER_TICKS: 125,              // Number of cluster explosions
    CLUSTER_INTERVAL: 25,            // Milliseconds between clusters
    DELAYED_BURST_TIME: 1000         // Delay before second burst (ms)
};

// Helper function to check if a point is within orbital strike square bounds
function isInSquareBounds(centerX, centerY, pointX, pointY, range) {
    const dx = Math.abs(pointX - centerX);
    const dy = Math.abs(pointY - centerY);
    return dx <= range && dy <= range;
}

// Update Orbital Strike
function updateOrbitalStrike(timestamp) {
    if (!orbitalStrikeData) return;

    // If just targeting (no impact time set), show targeting reticle
    if (orbitalStrikeData.isTargeting) {
        // Draw targeting square preview
        ctx.strokeStyle = '#FF0000';
        ctx.lineWidth = 3;
        ctx.setLineDash([10, 5]);
        ctx.beginPath();
        // Draw square with range as the half-width
        ctx.rect(
            orbitalStrikeData.x - orbitalStrikeData.range,
            orbitalStrikeData.y - orbitalStrikeData.range,
            orbitalStrikeData.range * 2,
            orbitalStrikeData.range * 2
        );
        ctx.stroke();
        ctx.setLineDash([]);

        // Draw range squares
        ctx.fillStyle = 'rgba(255, 0, 0, 0.2)';
        const gridRange = Math.ceil(orbitalStrikeData.range / GRID_SIZE);
        const centerGridX = Math.floor(orbitalStrikeData.x / GRID_SIZE);
        const centerGridY = Math.floor(orbitalStrikeData.y / GRID_SIZE);

        for (let dy = -gridRange; dy <= gridRange; dy++) {
            for (let dx = -gridRange; dx <= gridRange; dx++) {
                const gx = centerGridX + dx;
                const gy = centerGridY + dy;
                if (gx >= 0 && gx < gridWidth && gy >= 0 && gy < gridHeight) {
                    const cellCenterX = gx * GRID_SIZE + GRID_SIZE / 2;
                    const cellCenterY = gy * GRID_SIZE + GRID_SIZE / 2;
                    // Use square bounds check
                    const dx_dist = Math.abs(cellCenterX - orbitalStrikeData.x);
                    const dy_dist = Math.abs(cellCenterY - orbitalStrikeData.y);
                    if (dx_dist <= orbitalStrikeData.range && dy_dist <= orbitalStrikeData.range) {
                        ctx.fillRect(gx * GRID_SIZE, gy * GRID_SIZE, GRID_SIZE, GRID_SIZE);
                    }
                }
            }
        }

        // Draw crosshair
        ctx.strokeStyle = '#FF0000';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(orbitalStrikeData.x - 20, orbitalStrikeData.y);
        ctx.lineTo(orbitalStrikeData.x + 20, orbitalStrikeData.y);
        ctx.moveTo(orbitalStrikeData.x, orbitalStrikeData.y - 20);
        ctx.lineTo(orbitalStrikeData.x, orbitalStrikeData.y + 20);
        ctx.stroke();

        return;
    }

    // Strike has been fired, show countdown
    const timeToImpact = orbitalStrikeData.impactTime - timestamp;

    // Draw targeting square instead of circle
    ctx.strokeStyle = '#FF0000';
    ctx.lineWidth = 3;
    ctx.setLineDash([10, 5]);
    ctx.beginPath();
    // Draw square with range as the half-width
    ctx.rect(
        orbitalStrikeData.x - orbitalStrikeData.range,
        orbitalStrikeData.y - orbitalStrikeData.range,
        orbitalStrikeData.range * 2,
        orbitalStrikeData.range * 2
    );
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw range squares
    ctx.fillStyle = 'rgba(255, 0, 0, 0.3)';
    const gridRange = Math.ceil(orbitalStrikeData.range / GRID_SIZE);
    const centerGridX = Math.floor(orbitalStrikeData.x / GRID_SIZE);
    const centerGridY = Math.floor(orbitalStrikeData.y / GRID_SIZE);

    for (let dy = -gridRange; dy <= gridRange; dy++) {
        for (let dx = -gridRange; dx <= gridRange; dx++) {
            const gx = centerGridX + dx;
            const gy = centerGridY + dy;
            if (gx >= 0 && gx < gridWidth && gy >= 0 && gy < gridHeight) {
                const cellCenterX = gx * GRID_SIZE + GRID_SIZE / 2;
                const cellCenterY = gy * GRID_SIZE + GRID_SIZE / 2;
                // Use square distance check instead of circular
                const dx_dist = Math.abs(cellCenterX - orbitalStrikeData.x);
                const dy_dist = Math.abs(cellCenterY - orbitalStrikeData.y);
                if (dx_dist <= orbitalStrikeData.range && dy_dist <= orbitalStrikeData.range) {
                    ctx.fillRect(gx * GRID_SIZE, gy * GRID_SIZE, GRID_SIZE, GRID_SIZE);
                }
            }
        }
    }

    // Draw countdown text
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`${Math.max(0, (timeToImpact / 1000).toFixed(1))}s`, orbitalStrikeData.x, orbitalStrikeData.y - 20);

    // Impact after delay
    if (timestamp >= orbitalStrikeData.impactTime && !orbitalStrikeData.hasImpacted) {
        orbitalStrikeData.hasImpacted = true;
        orbitalStrikeData.clusterTicks = 0;
        orbitalStrikeData.lastClusterTime = timestamp;

        // Create massive explosion effect
        explosions.push({
            x: orbitalStrikeData.x,
            y: orbitalStrikeData.y,
            size: 0,
            maxSize: orbitalStrikeData.range * 2, // Match preview square size
            startTime: timestamp,
            duration: 1000
        });

        // Initial burst damage (7500 + 1% max HP bonus)
        for (const enemy of enemies) {
            if (isInSquareBounds(orbitalStrikeData.x, orbitalStrikeData.y, enemy.x, enemy.y, orbitalStrikeData.range) && !enemy.isSummon) {
                // Calculate bonus damage (1% of max HP, capped in non-endless modes)
                const maxHpBonus = currentGameMode === GAME_MODES.ENDLESS ?
                    Math.floor(enemy.maxHp * ORBITAL_STRIKE_STATS.MAX_HP_BONUS_PERCENT) :
                    Math.min(Math.floor(enemy.maxHp * ORBITAL_STRIKE_STATS.MAX_HP_BONUS_PERCENT), ORBITAL_STRIKE_STATS.MAX_HP_BONUS_CAP);
                const totalDamage = ORBITAL_STRIKE_STATS.INITIAL_BURST_DAMAGE + maxHpBonus;
                applyDamage(enemy, totalDamage, 'explosive');
            }
        }

        // Delayed burst damage (2500 + 1% max HP bonus after 1 second)
        setTimeout(() => {
            for (const enemy of enemies) {
                if (isInSquareBounds(orbitalStrikeData.x, orbitalStrikeData.y, enemy.x, enemy.y, orbitalStrikeData.range) && !enemy.isSummon) {
                    const maxHpBonus = currentGameMode === GAME_MODES.ENDLESS ?
                        Math.floor(enemy.maxHp * ORBITAL_STRIKE_STATS.MAX_HP_BONUS_PERCENT) :
                        Math.min(Math.floor(enemy.maxHp * ORBITAL_STRIKE_STATS.MAX_HP_BONUS_PERCENT), ORBITAL_STRIKE_STATS.MAX_HP_BONUS_CAP);
                    const totalDamage = ORBITAL_STRIKE_STATS.DELAYED_BURST_DAMAGE + maxHpBonus;
                    applyDamage(enemy, totalDamage, 'explosive');
                }
            }
        }, ORBITAL_STRIKE_STATS.DELAYED_BURST_TIME);

        console.log('Orbital Strike impacted!');
    }

    // Handle cluster explosions (125 ticks at 25ms intervals = 3.125 seconds total)
    if (orbitalStrikeData.hasImpacted && orbitalStrikeData.clusterTicks < ORBITAL_STRIKE_STATS.CLUSTER_TICKS) {
        if (timestamp - orbitalStrikeData.lastClusterTime >= ORBITAL_STRIKE_STATS.CLUSTER_INTERVAL) {
            orbitalStrikeData.clusterTicks++;
            orbitalStrikeData.lastClusterTime = timestamp;

            // Random cluster explosion position within strike square
            const randX = (Math.random() * 2 - 1) * orbitalStrikeData.range;
            const randY = (Math.random() * 2 - 1) * orbitalStrikeData.range;
            const clusterX = orbitalStrikeData.x + randX;
            const clusterY = orbitalStrikeData.y + randY;

            // Small explosion effect
            explosions.push({
                x: clusterX,
                y: clusterY,
                size: 0,
                maxSize: GRID_SIZE * 2,
                startTime: timestamp,
                duration: 200
            });

            // Deal cluster damage to ALL enemies in main strike square
            for (const enemy of enemies) {
                if (isInSquareBounds(orbitalStrikeData.x, orbitalStrikeData.y, enemy.x, enemy.y, orbitalStrikeData.range) && !enemy.isSummon) {
                    applyDamage(enemy, ORBITAL_STRIKE_STATS.CLUSTER_TICK_DAMAGE, 'piercing');
                }
            }
        }
    }

    // Final massive explosion after all clusters
    if (orbitalStrikeData.hasImpacted && orbitalStrikeData.clusterTicks >= ORBITAL_STRIKE_STATS.CLUSTER_TICKS && !orbitalStrikeData.finalExplosionDone) {
        orbitalStrikeData.finalExplosionDone = true;

        // Massive explosion effect
        explosions.push({
            x: orbitalStrikeData.x,
            y: orbitalStrikeData.y,
            size: 0,
            maxSize: orbitalStrikeData.range * 1.5,
            startTime: timestamp,
            duration: 1500
        });

        // Deal final massive damage to all in square range
        for (const enemy of enemies) {
            if (isInSquareBounds(orbitalStrikeData.x, orbitalStrikeData.y, enemy.x, enemy.y, orbitalStrikeData.range) && !enemy.isSummon) {
                applyDamage(enemy, ORBITAL_STRIKE_STATS.FINAL_EXPLOSION_DAMAGE, 'piercing');
            }
        }

        console.log('Orbital Strike final explosion!');

        // Clear after final explosion animation
        setTimeout(() => {
            orbitalStrikeData = null;
        }, 1500);
    }
}

// Trigger tower ability
function triggerRainbowCube(tower) {
    // Elite Spawner Rainbow Cube
    if (tower.type === TOWER_TYPES.ELITE_SPAWNER && tower.level === 5 && performance.now() - lastAbilityTime >= TOWER_TYPES.ELITE_SPAWNER.abilityCooldown) {
        spawnEntity(SUMMON_TYPES.RAINBOW_CUBE, tower.x, tower.y, true);
        lastAbilityTime = performance.now();
        showTowerInfo(tower);
    }
}

// Trigger Executive Orbital Strike
function triggerOrbitalStrike(tower) {
    if (tower.type === TOWER_TYPES.EXECUTIVE && tower.level === 5) {
        const abilityCost = TOWER_TYPES.EXECUTIVE.abilityCost;
        const cooldownTime = TOWER_TYPES.EXECUTIVE.abilityCooldown;
        const timeSinceLastUse = performance.now() - (tower.lastAbilityTime || 0);
        const globalCooldown = 40000; // 40 second global cooldown
        const timeSinceLastGlobal = performance.now() - lastOrbitalStrikeTime;

        if (cash >= abilityCost && timeSinceLastUse >= cooldownTime && timeSinceLastGlobal >= globalCooldown) {
            cash -= abilityCost;
            tower.lastAbilityTime = performance.now();
            lastOrbitalStrikeTime = performance.now(); // Set global cooldown
            orbitalStrikeActive = true;
            orbitalStrikeData = { tower: tower, startTime: performance.now(), duration: 3000 };
            updateCashDisplay();
            canvas.style.cursor = 'crosshair';
            console.log('Orbital Strike activated! Click to target...');
        } else if (timeSinceLastGlobal < globalCooldown) {
            console.log(`Global Orbital Strike cooldown: ${((globalCooldown - timeSinceLastGlobal) / 1000).toFixed(1)}s remaining`);
        }
    }
}

// Trigger Paragon Alpha ability
function triggerParagonAlpha(tower) {
    if (tower.type === TOWER_TYPES.GUNNER_PARAGON && tower.level >= 2) {
        const stats = tower.type.levels[tower.level - 1];
        const alphaCost = tower.type.alphaCost;
        const alphaCooldown = tower.type.alphaCooldown;
        const timeSinceLastUse = performance.now() - (tower.lastAlphaTime || 0);

        if (cash >= alphaCost && timeSinceLastUse >= alphaCooldown) {
            const baseHpBonus = stats.baseHp;  // Get the passive bonus (400 or 900)
            const originalHp = BASE_HP + baseHpBonus;  // 100 + 400/900

            baseHp = 10000;  // Set to exactly 10,000
            baseHpDisplay.textContent = baseHp;

            // Restore original HP after 15 seconds
            setTimeout(() => {
                baseHp = originalHp;
                baseHpDisplay.textContent = baseHp;
            }, 15000);

            cash -= alphaCost;
            tower.lastAlphaTime = performance.now();
            updateCashDisplay();
            showTowerInfo(tower);
            console.log(`Alpha Protocol activated! Base HP set to 10,000 for 15 seconds!`);
        }
    }
}



// ===== BETA PROTOCOL STAT CONFIGURATION =====
// Controls the Gunner Paragon L3 Beta Protocol ability spawning
const BETA_PROTOCOL_STATS = {
    GRAY_CUBE_COUNT: 20,          // Number of Gray cubes to spawn
    GRAY_CUBE_INTERVAL: 2000,     // Spawn interval (ms)

    BLACK_CUBE_COUNT: 10,         // Number of Black cubes to spawn  
    BLACK_CUBE_INTERVAL: 3000,    // Spawn interval (ms)

    YELLOW_CUBE_COUNT: 5,         // Number of Yellow cubes to spawn
    YELLOW_CUBE_INTERVAL: 5000    // Spawn interval (ms)
};

// Trigger Paragon Beta ability
function triggerParagonBeta(tower) {
    if (tower.type === TOWER_TYPES.GUNNER_PARAGON && tower.level === 3) {
        const stats = tower.type.levels[tower.level - 1];
        const betaCost = tower.type.betaCost;
        const betaCooldown = tower.type.betaCooldown;
        const timeSinceLastUse = performance.now() - (tower.lastBetaTime || 0);

        if (cash >= betaCost && timeSinceLastUse >= betaCooldown) {
            // Spawn Beta Protocol cubes based on configuration
            // Gray cubes (20 total, every 2 seconds)
            for (let i = 0; i < BETA_PROTOCOL_STATS.GRAY_CUBE_COUNT; i++) {
                const timeoutId = setTimeout(() => {
                    if (waveActive) { // Only spawn if game is still active
                        const grayHp = SUMMON_TYPES.BETA_GRAY.hp + stats.baseHp;
                        const grayCube = { ...SUMMON_TYPES.BETA_GRAY, hp: grayHp };
                        spawnEntity(grayCube, tower.x, tower.y, true);
                    }
                }, i * BETA_PROTOCOL_STATS.GRAY_CUBE_INTERVAL);
                betaProtocolTimeouts.push(timeoutId);
            }

            // Black cubes (10 total, every 3 seconds)
            for (let i = 0; i < BETA_PROTOCOL_STATS.BLACK_CUBE_COUNT; i++) {
                const timeoutId = setTimeout(() => {
                    if (waveActive) { // Only spawn if game is still active
                        const blackHp = SUMMON_TYPES.BETA_BLACK.hp + stats.baseHp;
                        const blackCube = { ...SUMMON_TYPES.BETA_BLACK, hp: blackHp };
                        spawnEntity(blackCube, tower.x, tower.y, true);
                    }
                }, i * BETA_PROTOCOL_STATS.BLACK_CUBE_INTERVAL);
                betaProtocolTimeouts.push(timeoutId);
            }

            // Yellow cubes (5 total, every 5 seconds)
            for (let i = 0; i < BETA_PROTOCOL_STATS.YELLOW_CUBE_COUNT; i++) {
                const timeoutId = setTimeout(() => {
                    if (waveActive) { // Only spawn if game is still active
                        const yellowHp = SUMMON_TYPES.BETA_YELLOW.hp + stats.baseHp;
                        const yellowCube = { ...SUMMON_TYPES.BETA_YELLOW, hp: yellowHp };
                        spawnEntity(yellowCube, tower.x, tower.y, true);
                    }
                }, i * BETA_PROTOCOL_STATS.YELLOW_CUBE_INTERVAL);
                betaProtocolTimeouts.push(timeoutId);
            }

            cash -= betaCost;
            tower.lastBetaTime = performance.now();
            updateCashDisplay();
            showTowerInfo(tower);
            console.log(`Beta Protocol activated! Spawning Gray (x20), Black (x10), and Yellow (x5) cubes`);
        }
    }
}

// Start next wave
function startNextWave() {
    if (!waveActive) {
        waveNumber++;
        waveDisplay.textContent = waveNumber;
        spawnWave();
        waveActive = true;
        waveTimer = 0;
        nextWaveBtn.textContent = "Wave in Progress...";
        nextWaveBtn.disabled = true;
        skipWaveBtn.disabled = false;
        generateFarmCash();
        updateCashDisplay();
    }
}

// Skip wave
function skipWave() {
    if (waveActive) {
        // Don't clear enemiesToSpawn - let current wave enemies finish spawning
        waveActive = false;
        waveTimer = 0;
        nextWaveBtn.textContent = "Start Wave";
        nextWaveBtn.disabled = false;  // Keep start button enabled
        skipWaveBtn.disabled = true;

        // Apply cash multiplier from game mode
        const waveCashReward = Math.floor(60 * Math.pow(1.1, waveNumber - 1) * currentGameMode.cashMultiplier);
        cash += waveCashReward;
        updateCashDisplay();

        // Auto-start next wave after 3 seconds (same as wave complete)
        setTimeout(() => {
            if (!waveActive) {
                startNextWave();
            }
        }, 3000);
    }
}





// Generate cash from Farm towers
function generateFarmCash() {
    towers.forEach(tower => {
        if (tower.type.farm) {
            const cashAmount = tower.type.levels[tower.level - 1].cashPerWave;
            cash += cashAmount;
            const effect = { x: tower.x, y: tower.y - 10, text: `+$${cashAmount}`, alpha: 1, time: 0 };
            cashEffects.push(effect);
            const div = document.createElement('div');
            div.className = 'cash-effect';
            div.style.left = `${tower.x}px`;
            div.style.top = `${tower.y - 10}px`;
            div.textContent = effect.text;
            document.body.appendChild(div);
            setTimeout(() => div.remove(), 1000);
        }
    });
    updateCashDisplay();
}

// Spawn wave
// Helper to process the current group of enemies for a specific wave
function processWaveGroup(wave) {
    if (!wave.data || wave.groupIndex >= wave.data.groups.length) return;

    const group = wave.data.groups[wave.groupIndex];
    wave.enemiesQueue = [];

    // Calculate HP multiplier - only for endless mode after wave 30
    const hpMultiplier = (currentGameMode === GAME_MODES.ENDLESS && waveNumber > 30) ?
        Math.pow(1.08, waveNumber - 30) : 1;

    for (const [type, count] of Object.entries(group.enemies)) {
        if (ENEMY_TYPES[type]) {
            for (let i = 0; i < count; i++) {
                const baseHp = ENEMY_TYPES[type].isKing ?
                    ENEMY_TYPES[type].baseHp :
                    Math.floor(ENEMY_TYPES[type].baseHp * hpMultiplier);
                let enemyType = { ...ENEMY_TYPES[type], baseHp: baseHp };

                // Apply stat overrides if present in the group
                if (group.statOverrides && group.statOverrides[type]) {
                    const overrides = group.statOverrides[type];
                    if (overrides.hp) enemyType.baseHp = overrides.hp;
                    if (overrides.shield) {
                        enemyType.hasShield = true;
                        enemyType.shieldHp = overrides.shield;
                    }
                    if (overrides.speed) enemyType.speed = overrides.speed;
                }

                wave.enemiesQueue.push(enemyType);
            }
        }
    }
    shuffleArray(wave.enemiesQueue);
}

// Spawn wave
function spawnWave() {
    // Get the correct wave array based on game mode
    let currentWaves;
    if (currentGameMode === GAME_MODES.NORMAL) {
        currentWaves = NORMAL_WAVES;
    } else if (currentGameMode === GAME_MODES.HARDMODE) {
        currentWaves = HARDMODE_WAVES;
    } else if (currentGameMode === GAME_MODES.INSANE) {
        currentWaves = INSANE_WAVES;
    } else if (currentGameMode === GAME_MODES.ENDLESS) {
        currentWaves = EXTRA_WAVES;
    } else if (currentGameMode === GAME_MODES.BOSSRUSH) {
        // Safeguard: Ensure waves are loaded
        if ((!window.BOSSRUSH_WAVES || window.BOSSRUSH_WAVES.length === 0) && typeof generateBossRushWaves === 'function') {
            console.log("Re-initializing Boss Rush waves...");
            window.BOSSRUSH_WAVES = generateBossRushWaves();
        }
        currentWaves = window.BOSSRUSH_WAVES;
        console.log("Boss Rush Waves loaded:", currentWaves ? currentWaves.length : 0);
    } else if (currentGameMode === GAME_MODES.NIGHTMARE) {
        // Safeguard: Ensure waves are loaded
        if ((!window.NIGHTMARE_WAVES || window.NIGHTMARE_WAVES.length === 0) && typeof generateNightmareWaves === 'function') {
            console.log("Re-initializing Nightmare waves...");
            window.NIGHTMARE_WAVES = generateNightmareWaves();
        }
        currentWaves = window.NIGHTMARE_WAVES;
        console.log("Nightmare Waves loaded:", currentWaves ? currentWaves.length : 0);
    } else {
        currentWaves = NORMAL_WAVES; // Fallback
    }

    let waveData;

    // Generate regular wave enemies
    if (waveNumber <= currentWaves.length) {
        waveData = currentWaves[waveNumber - 1];
    } else {
        // For endless mode or waves beyond defined ones, generate procedural waves
        if (currentGameMode === GAME_MODES.ENDLESS && typeof getProceduralEndlessWave === 'function') {
            waveData = getProceduralEndlessWave(waveNumber);
        } else {
            const baseEnemies = currentGameMode === GAME_MODES.INSANE ?
                ['red_cube_insane', 'blue_cube_insane', 'gray_cube_insane', 'boss_cube_insane'] :
                currentGameMode === GAME_MODES.HARDMODE ?
                    ['red_cube_hard', 'blue_cube_hard', 'gray_cube_hard', 'boss_cube_hard'] :
                    ['red_cube', 'blue_cube', 'gray_cube', 'boss_cube'];

            const waveConfig = {};
            baseEnemies.forEach(enemy => {
                waveConfig[enemy] = Math.floor(Math.random() * 15) + 5;
            });

            // Create a procedural wave object in the new format
            waveData = {
                groups: [{
                    enemies: waveConfig,
                    spawnInterval: SPAWN_DELAY,
                    waitAfter: 0
                }],
                endWaitTime: 3000
            };
        }
    }

    // Create new active wave object
    const newWave = {
        data: waveData,
        groupIndex: 0,
        waitTimer: 0,
        isWaiting: false,
        enemiesQueue: [],
        lastSpawnTime: performance.now()
    };

    try {
        processWaveGroup(newWave);
        activeWaves.push(newWave);
        console.log(`Wave ${waveNumber} spawned. Mode: ${currentGameMode.name}`);
    } catch (error) {
        console.error("Error spawning wave:", error);
    }
}
// Shuffle array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Spawn single entity
function spawnEntity(entityType, x, y, isSummon = false, isAlly = false) {
    // Apply Insane mode buffs
    let hp = entityType.hp || entityType.baseHp;
    let shield = entityType.hasShield ? (entityType.shieldHp || 0) : 0;
    let speed = entityType.speed;

    // Apply special Straight Line map stats (if they exist)
    if (currentMap === MAP_TYPES.STRAIGHT && !isSummon && !isAlly) {
        if (entityType.insaneHp) {
            hp = entityType.insaneHp;
        }
        if (entityType.hasOwnProperty('insaneShield')) {
            shield = entityType.insaneShield;
        }
        if (entityType.insaneSpeed) {
            speed = entityType.insaneSpeed;
        }
    }

    const entity = {
        type: entityType,
        x: isSummon ? path[path.length - 1].x : path[0].x,
        y: isSummon ? path[path.length - 1].y : path[0].y,
        hp: hp,
        maxHp: hp,
        shield: shield,
        maxShield: shield,
        hasShield: entityType.hasShield || false,
        speed: speed,
        size: entityType.size,
        distanceTraveled: isSummon ? getPathLength() : 0,
        isSummon: isSummon,
        isAlly: isAlly,
        lastFired: 0,
        lastMissile: 0,
        missileCount: 0,
        lastRailgun: 0,
        lastBurstShot: 0,
        burstCountRemaining: null,
        railgunCountRemaining: null,
        missileCountRemaining: null,
        laserCountRemaining: null,
        lastLaser: 0,
        lastLaserShot: 0,
        lastMainRailgun: 0,
        mainRailgunCountRemaining: null,
        lastMainRailgunShot: 0,
        mainRailgunUses: entityType.mainRailgunUses || 0,
        resistance: entityType.resistance || null
    };
    enemies.push(entity);

    // ═══════════════════════════════════════════════════════════════
    // OMEGA BOSS INITIAL SUMMONS
    // When Omega is first spawned, immediately spawn 2 Omega Summons
    // ═══════════════════════════════════════════════════════════════
    if (entityType.name === 'THE OMEGA CUBE' && entityType.isSummoner && !isSummon) {
        const omegaSummonType = ENEMY_TYPES.omegasummon_nm;
        if (omegaSummonType) {
            for (let j = 0; j < 2; j++) {
                const summon = {
                    type: omegaSummonType,
                    x: entity.x + (j * 30),
                    y: entity.y,
                    hp: omegaSummonType.baseHp,
                    maxHp: omegaSummonType.baseHp,
                    shield: omegaSummonType.hasShield ? omegaSummonType.shieldHp : 0,
                    maxShield: omegaSummonType.hasShield ? omegaSummonType.shieldHp : 0,
                    speed: omegaSummonType.speed,
                    distanceTraveled: 0,
                    size: omegaSummonType.size,
                    isSummoned: true
                };
                enemies.push(summon);
            }
            console.log(`Omega Boss spawned! Initial 2 Omega Summons deployed!`);
        }
    }
}

// Expose to command terminal
window.spawnEntity = spawnEntity;
window.path = path;

function updateTowerInfoPeriodically(timestamp) {
    if (currentInfoTower && towers.includes(currentInfoTower) && timestamp - lastTowerInfoUpdate > 1000) {
        showTowerInfo(currentInfoTower);
        if (currentInfoTower.type.isCarrier) {
            showCarrierSpawnUI(currentInfoTower);
        }
    }
}

// Add debug cash
function addDebugCash() {
    cash += 500;
    updateCashDisplay();
}

// Game loop
function gameLoop(timestamp) {
    // Compute frame delta for frame-rate independent movement
    if (!lastFrameTime) lastFrameTime = timestamp;
    frameDelta = timestamp - lastFrameTime;
    if (frameDelta > 100) frameDelta = 100; // Cap to prevent huge jumps
    if (frameDelta < 1) frameDelta = 1;
    lastFrameTime = timestamp;

    // Apply game speed multiplier
    for (let i = 0; i < gameSpeed; i++) {
        ctx.clearRect(0, 0, gameWidth, gameHeight);
        drawGrid();
        drawPath();
        drawSelectedTowerRange();
        updateTowers(timestamp);
        drawTowers();
        drawSpawnTimer();
        updateWave(timestamp);
        updateEnemies(timestamp);
        drawEntities();
        drawCarrierUnits(ctx); // Draw Air Units
        updateExplosions(timestamp);
        drawExplosions();
        drawRailgunShots();
        drawChargerBeams();
        updateRailgunShots(timestamp);
        updateProjectiles(timestamp);
        updateCarrierCubes(timestamp); // Update Carrier Cube towers
        updateCarrierUnits(); // Update Air Units
        updateOrbitalStrike(timestamp);
        updateTowerInfoPeriodically(timestamp);
        checkWaveComplete();
    }
    requestAnimationFrame(gameLoop);
}

// Draw grid
function drawGrid() {
    ctx.strokeStyle = '#555';
    ctx.lineWidth = 0.5;
    for (let x = 0; x <= gridWidth; x++) {
        ctx.beginPath();
        ctx.moveTo(x * GRID_SIZE, 0);
        ctx.lineTo(x * GRID_SIZE, gameHeight);
        ctx.stroke();
    }
    for (let y = 0; y <= gridHeight; y++) {
        ctx.beginPath();
        ctx.moveTo(0, y * GRID_SIZE);
        ctx.lineTo(gameWidth, y * GRID_SIZE);
        ctx.stroke();
    }
}

// Draw selected tower range
function drawSelectedTowerRange() {
    if (selectedTower && selectedCell) {
        let previewSizeX = 1;
        let previewSizeY = 1;

        if (selectedTower === TOWER_TYPES.GUNNER_PARAGON || selectedTower === TOWER_TYPES.SNIPER_PARAGON || selectedTower === TOWER_TYPES.ELITE_SPAWNER) {
            previewSizeX = 2; previewSizeY = 2;
        } else if (selectedTower === TOWER_TYPES.CUBE_FACTORY) {
            previewSizeX = 3; previewSizeY = 3;
        } else if (selectedTower === TOWER_TYPES.CARRIER_CUBE) {
            previewSizeX = 4; previewSizeY = 4;
        }

        const stats = selectedTower.levels[0];
        const rangeRadius = (stats.range || 0) * GRID_SIZE;

        // Draw range circle centered realistically based on tower footprint bounds
        const centerX = selectedCell.x * GRID_SIZE + (previewSizeX * GRID_SIZE) / 2;
        const centerY = selectedCell.y * GRID_SIZE + (previewSizeY * GRID_SIZE) / 2;

        ctx.beginPath();
        ctx.arc(centerX, centerY, rangeRadius, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.fill();

        // Draw tower placement preview square(s)
        ctx.fillStyle = selectedTower.color;
        ctx.globalAlpha = 0.6;
        ctx.fillRect(selectedCell.x * GRID_SIZE, selectedCell.y * GRID_SIZE, previewSizeX * GRID_SIZE, previewSizeY * GRID_SIZE);
        ctx.globalAlpha = 1.0;

    } else if (selectedCell) { // Showing range of an already placed tower
        const hoveredTower = getTowerAtGrid(selectedCell.x, selectedCell.y);

        if (hoveredTower && !hoveredTower.type.farm && (!hoveredTower.type.summons || hoveredTower.type.isHybrid) && !hoveredTower.type.support) {
            const stats = hoveredTower.type.levels[hoveredTower.level - 1];
            const buffs = (stats.cannotBeBuffed || hoveredTower.type.cannotBeBuffed) ? { rangeBoost: 0 } : getCommanderBuffs(hoveredTower);
            const rangeBonus = hoveredTower.type.rangeBonus || 0;
            const buffedRange = (stats.range + buffs.rangeBoost + rangeBonus) * GRID_SIZE;

            ctx.beginPath();
            ctx.arc(hoveredTower.x, hoveredTower.y, buffedRange, 0, 2 * Math.PI);
            ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.fill();
        } else if (hoveredTower && hoveredTower.type.support) {
            // Show Commander buff range
            const stats = hoveredTower.type.levels[hoveredTower.level - 1];
            const buffRange = stats.range * GRID_SIZE;
            ctx.beginPath();
            ctx.arc(hoveredTower.x, hoveredTower.y, buffRange, 0, 2 * Math.PI);
            ctx.strokeStyle = 'rgba(65, 105, 225, 0.5)';
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.fillStyle = 'rgba(65, 105, 225, 0.1)';
            ctx.fill();
        }
    }
}


// Draw railgun shots
function drawRailgunShots() {
    for (const shot of railgunShots) {
        ctx.strokeStyle = `rgba(255, 255, 255, ${shot.alpha})`;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(shot.x1, shot.y1);
        ctx.lineTo(shot.x2, shot.y2);
        ctx.stroke();
    }
}

// Draw path
function drawPath() {
    // Draw path with gradient
    for (let i = 0; i < path.length; i++) {
        const point = path[i];
        const progress = i / path.length;

        // Create gradient from start (green) to end (red)
        const r = Math.floor(100 + progress * 100);
        const g = Math.floor(150 - progress * 100);
        const b = 50;

        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.fillRect(point.x - GRID_SIZE / 2, point.y - GRID_SIZE / 2, GRID_SIZE, GRID_SIZE);

        // Add border
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.lineWidth = 1;
        ctx.strokeRect(point.x - GRID_SIZE / 2, point.y - GRID_SIZE / 2, GRID_SIZE, GRID_SIZE);
    }

    // Draw start marker
    if (path.length > 0) {
        ctx.fillStyle = '#4CAF50';
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('START', path[0].x, path[0].y);
    }

    // Draw end marker
    if (path.length > 0) {
        ctx.fillStyle = '#f44336';
        ctx.font = 'bold 20px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('BASE', path[path.length - 1].x, path[path.length - 1].y);
    }
}

// Update railgun shots
function updateRailgunShots(timestamp) {
    railgunShots = railgunShots.filter(shot => {
        const elapsed = timestamp - shot.startTime;
        shot.alpha = 1 - (elapsed / shot.duration);
        return elapsed < shot.duration;
    });
}

// Draw Charger laser beams
function drawChargerBeams() {
    for (const tower of towers) {
        if (tower.type.isCharger && tower.isFiring && tower.lockedTarget && tower.lockedTarget.hp > 0) {
            // Draw inner beam (bright aqua)
            ctx.strokeStyle = '#00FFFF';
            ctx.lineWidth = 6;
            ctx.shadowBlur = 15;
            ctx.shadowColor = '#00FFFF';
            ctx.beginPath();
            ctx.moveTo(tower.x, tower.y);
            ctx.lineTo(tower.lockedTarget.x, tower.lockedTarget.y);
            ctx.stroke();

            // Draw outer glow (white)
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
            ctx.lineWidth = 3;
            ctx.shadowBlur = 8;
            ctx.shadowColor = '#FFFFFF';
            ctx.beginPath();
            ctx.moveTo(tower.x, tower.y);
            ctx.lineTo(tower.lockedTarget.x, tower.lockedTarget.y);
            ctx.stroke();

            // Reset shadow
            ctx.shadowBlur = 0;
        }
    }
}

// Update towers
function updateTowers(timestamp) {
    for (const tower of towers) {
        if (!tower.type || !tower.type.levels || tower.level < 1 || tower.level > tower.type.levels.length) continue;
        const stats = tower.type.levels[tower.level - 1];

        // --- Summoner Logic (runs for all towers with summons, including hybrids) ---
        if (tower.type.summons && stats.summons) {
            stats.summons.forEach(summon => {
                const lastSummonTime = tower.lastSummonTimes[summon.type] || 0;

                // --- Cube Factory Specific Summon Logic ---
                if (tower.type === TOWER_TYPES.CUBE_FACTORY) {
                    const activeFactoryCubes = enemies.filter(e =>
                        e.type.name.includes('Factory Cube') && e.hp > 0
                    ).length;

                    // If active summons limit is reached, don't spawn
                    if (activeFactoryCubes >= tower.type.maxActiveSummons) {
                        return;
                    }

                    // Enforce global cooldown for Cube Factory
                    const timeSinceGlobalCooldown = timestamp - lastGlobalFactorySpawnTime;
                    if (lastSummonTime !== 0 && timeSinceGlobalCooldown < tower.type.globalSpawnCooldown) {
                        // If global cooldown is active, update individual tower timer to reflect it
                        tower.lastSummonTimes[summon.type] = timestamp - (tower.type.globalSpawnCooldown - timeSinceGlobalCooldown);
                        return; // Don't spawn if global cooldown is active
                    }

                    // If general spawn conditions are met, spawn the entity
                    if (timestamp - lastSummonTime >= summon.spawnRate) {
                        console.log(`[DEBUG CF] Spawning ${summon.type} from ${tower.type.name} (regular interval spawn).`);
                        console.log(`[DEBUG CF] Current time: ${timestamp}, Last spawn: ${lastSummonTime}, Difference: ${timestamp - lastSummonTime}`);
                        spawnEntity(SUMMON_TYPES[summon.type], tower.x, tower.y, true);
                        tower.lastSummonTimes[summon.type] = timestamp;
                        lastGlobalFactorySpawnTime = timestamp;
                        console.log(`[DEBUG CF] Global cooldown reset. Next spawn in ${tower.type.globalSpawnCooldown}ms`);
                    }
                } else {
                    // --- Normal Summoner Towers (Elite Spawner, Summoner, Executive hybrid) ---
                    if (timestamp - lastSummonTime >= summon.spawnRate) {
                        const spawnCount = summon.count || 1;
                        for (let sc = 0; sc < spawnCount; sc++) {
                            // Add 200ms delay between multiple spawns so they don't stack perfectly
                            setTimeout(() => {
                                spawnEntity(SUMMON_TYPES[summon.type], tower.x, tower.y, true);
                            }, sc * 200);
                        }
                        tower.lastSummonTimes[summon.type] = timestamp;
                    }
                }
            });
        }
        // --- End Summoner Logic ---

        // --- Charger Tower Logic ---
        if (tower.type.isCharger && stats.damageMin && stats.damageMax) {
            // Charger cannot be buffed at levels 4-5
            const buffs = (stats.cannotBeBuffed || tower.type.cannotBeBuffed) ?
                { rangeBoost: 0, fireRateBoost: 0, damageBoost: 0 } : getCommanderBuffs(tower);
            const buffedFireRate = stats.fireRate * (1 - buffs.fireRateBoost);

            // Check if current target is invalid
            const targetInvalid = !tower.lockedTarget ||
                tower.lockedTarget.hp <= 0 ||
                !enemies.includes(tower.lockedTarget);

            // Check if target went out of range
            if (tower.lockedTarget && !isInRange(tower, tower.lockedTarget)) {
                // Target escaped, trigger 3-second cooldown
                tower.lastTargetLostTime = timestamp;
                tower.lockedTarget = null;
                tower.isCharging = false;
            }

            // Clear target when it dies and trigger cooldown
            if (tower.lockedTarget && tower.lockedTarget.hp <= 0) {
                tower.lastTargetLostTime = timestamp;
                tower.lockedTarget = null;
                tower.isCharging = false;
            }

            // Try to find new target if we don't have one
            if (targetInvalid && !tower.lockedTarget) {
                // ALWAYS check cooldown - must wait 3 seconds after losing any target
                const cooldownPassed = !tower.lastTargetLostTime ||
                    timestamp - tower.lastTargetLostTime >= tower.type.targetCooldown;

                if (cooldownPassed) {
                    // Find new target
                    const newTarget = findTarget(tower);
                    if (newTarget) {
                        tower.lockedTarget = newTarget;
                        tower.chargeStartTime = timestamp;
                        tower.isCharging = true;
                    }
                }
            }

            // Attack locked target
            if (tower.lockedTarget && isInRange(tower, tower.lockedTarget) && timestamp - tower.lastFired >= buffedFireRate) {
                if (!tower.lockedTarget.isSummon) {
                    let damage;

                    // Calculate damage based on level
                    if (stats.chargeMaxMin && stats.chargeMaxMax) {
                        // Levels 4-5: Charge mechanic
                        const chargeTime = timestamp - tower.chargeStartTime;
                        const chargeTicks = Math.floor(chargeTime / stats.chargeInterval);
                        const chargeBonus = chargeTicks * stats.chargeRate;

                        // Base random damage
                        const baseDamage = Math.floor(Math.random() * (stats.damageMax - stats.damageMin + 1)) + stats.damageMin;
                        const chargedDamage = baseDamage + chargeBonus;

                        // Cap at max charge damage (also random)
                        const maxChargeDamage = Math.floor(Math.random() * (stats.chargeMaxMax - stats.chargeMaxMin + 1)) + stats.chargeMaxMin;
                        damage = Math.min(chargedDamage, maxChargeDamage);
                    } else {
                        // Levels 1-3: Simple random damage
                        damage = Math.floor(Math.random() * (stats.damageMax - stats.damageMin + 1)) + stats.damageMin;
                    }

                    applyDamage(tower.lockedTarget, damage, tower.type.damageType || 'laser');
                    tower.isFiring = true;

                    // Track last damage dealt for DPS calculation
                    tower.lastDamageDealt = damage;
                    tower.lastDamageTime = timestamp;
                }
                tower.lastFired = timestamp;
            } else if (!tower.lockedTarget) {
                tower.isFiring = false;
            }
        }
        // --- End Charger Tower Logic ---

        // --- Attacker Tower Logic (also runs for hybrid towers like Executive) ---
        else if ((!tower.type.summons || tower.type.isHybrid) && !tower.type.farm && !tower.type.support && stats.damage && stats.fireRate) {
            // Get Commander buffs (unless tower cannot be buffed)
            const buffs = tower.type.cannotBeBuffed ? { rangeBoost: 0, fireRateBoost: 0, damageBoost: 0 } : getCommanderBuffs(tower);
            const rangeBonus = tower.type.rangeBonus || 0;

            // Get Sniper Paragon buffs
            const sniperParagonBoost = getSniperParagonBuffs(tower);

            const buffedDamage = Math.floor(stats.damage * (1 + buffs.damageBoost) + sniperParagonBoost);
            const buffedDirectDamage = stats.directDamage ? Math.floor(stats.directDamage * (1 + buffs.damageBoost)) : 0;
            const buffedFireRate = stats.fireRate * (1 - buffs.fireRateBoost);

            if (!tower.target || tower.target.hp <= 0 || !enemies.includes(tower.target) || !isInRange(tower, tower.target)) {
                tower.target = findTarget(tower);
            }

            // --- Burst-fire logic (Operator tower) ---
            if (stats.burstcount && tower.target && isInRange(tower, tower.target)) {
                // Initialize burst state
                if (!tower.burstRemaining) tower.burstRemaining = 0;
                if (!tower.lastBurstShot) tower.lastBurstShot = 0;

                // Start new burst cycle when cooldown is done and no burst active
                if (tower.burstRemaining <= 0 && timestamp - tower.lastFired >= buffedFireRate) {
                    tower.burstRemaining = stats.burstcount;
                }

                // Fire burst shots
                if (tower.burstRemaining > 0 && timestamp - tower.lastBurstShot >= stats.burstfirerate) {
                    if (!tower.target.isSummon && tower.target.hp > 0) {
                        applyDamage(tower.target, buffedDamage, tower.type.damageType || 'bullet');
                        projectiles.push({
                            x1: tower.x, y1: tower.y,
                            x2: tower.target.x, y2: tower.target.y,
                            color: tower.type.color, width: 2,
                            startTime: timestamp, duration: 80
                        });
                    }
                    tower.lastBurstShot = timestamp;
                    tower.burstRemaining--;
                    if (tower.burstRemaining <= 0) {
                        tower.lastFired = timestamp;
                    }
                }
            }
            // --- Normal fire logic ---
            else if (tower.target && isInRange(tower, tower.target) && timestamp - tower.lastFired >= buffedFireRate) {
                if (tower.type.aoe) {
                    const directHit = tower.target;
                    enemies.forEach(enemy => {
                        if (!enemy.isSummon && isInRange(tower, enemy)) {
                            const damage = enemy === directHit ? buffedDirectDamage : buffedDamage;
                            applyDamage(enemy, damage, tower.type.damageType || 'explosive');
                        }
                    });
                    projectiles.push({
                        x1: tower.x,
                        y1: tower.y,
                        x2: directHit.x,
                        y2: directHit.y,
                        color: tower.type.color,
                        width: 3,
                        startTime: timestamp,
                        duration: 180
                    });
                    explosions.push({
                        x: tower.target.x,
                        y: tower.target.y,
                        size: 0,
                        maxSize: tower.type.name === 'Rocketer' ? 4 * GRID_SIZE : 2 * GRID_SIZE,
                        startTime: timestamp,
                        duration: 500
                    });
                } else if (tower.type.name === 'Raygunner') {
                    if (!tower.target.isSummon) {
                        applyDamage(tower.target, buffedDamage, tower.type.damageType || 'laser');
                        tower.isFiring = true;
                    }
                } else if (tower.type.name === 'Railgunner') {
                    if (!tower.target.isSummon) {
                        applyDamage(tower.target, buffedDamage, tower.type.damageType || 'piercing');
                        railgunShots.push({
                            x1: tower.x,
                            y1: tower.y,
                            x2: tower.target.x,
                            y2: tower.target.y,
                            alpha: 1,
                            startTime: timestamp,
                            duration: 500
                        });
                    }
                } else if (tower.type === TOWER_TYPES.SNIPER_PARAGON) {
                    // Sniper Paragon shoots like sniper with explosion delay at Radian 3
                    if (!tower.target.isSummon) {
                        applyDamage(tower.target, buffedDamage, tower.type.damageType || 'piercing');
                        railgunShots.push({
                            x1: tower.x,
                            y1: tower.y,
                            x2: tower.target.x,
                            y2: tower.target.y,
                            alpha: 1,
                            startTime: timestamp,
                            duration: 500,
                            color: '#00FFFF'
                        });

                        // Radian 3: Add explosion after delay
                        if (tower.level === 3 && stats.explosionDamage) {
                            const targetX = tower.target.x;
                            const targetY = tower.target.y;
                            setTimeout(() => {
                                explosions.push({
                                    x: targetX,
                                    y: targetY,
                                    size: 0,
                                    maxSize: GRID_SIZE * 3,
                                    startTime: performance.now(),
                                    duration: 500
                                });
                                // Deal explosion damage to nearby enemies
                                enemies.forEach(enemy => {
                                    if (!enemy.isSummon) {
                                        const dist = calculateDistance(targetX, targetY, enemy.x, enemy.y);
                                        if (dist <= GRID_SIZE * 3) {
                                            applyDamage(enemy, stats.explosionDamage, 'explosive');
                                        }
                                    }
                                });
                            }, stats.explosionDelay);
                        }
                    }
                } else {
                    if (!tower.target.isSummon) {
                        applyDamage(tower.target, buffedDamage, tower.type.damageType || 'bullet');
                        projectiles.push({
                            x1: tower.x,
                            y1: tower.y,
                            x2: tower.target.x,
                            y2: tower.target.y,
                            color: tower.type.color,
                            width: 3,
                            startTime: timestamp,
                            duration: 180
                        });
                    }
                }
                tower.lastFired = timestamp;
            } else if (tower.type.name === 'Raygunner') {
                tower.isFiring = false;
            }
        }
        // --- End Attacker Tower Logic ---
    }
}


// Apply damage with resistance calculation
// Damage types: 'bullet', 'laser', 'piercing', 'explosive', 'normal'
// Piercing damage bypasses global resistance
function applyDamage(enemy, damage, damageType = 'bullet') {
    let finalDamage = damage;

    // Check for resistances (support both enemy.type.resistances and legacy enemy.resistance)
    const resistances = enemy.type?.resistances || enemy.resistance;

    if (resistances) {
        // Apply global resistance first (UNLESS piercing damage, which bypasses global)
        if (resistances.global && damageType !== 'piercing') {
            finalDamage *= (1 - resistances.global);
        }

        // Apply specific damage type resistance (supports negative = amplification)
        if (resistances[damageType] !== undefined) {
            finalDamage *= (1 - resistances[damageType]);
        }
    }

    // Apply damage to shield first, then HP
    let remainingDamage = Math.round(finalDamage);
    if (enemy.type.hasShield && enemy.shield > 0) {
        if (enemy.shield >= remainingDamage) {
            enemy.shield -= remainingDamage;
            remainingDamage = 0;
        } else {
            remainingDamage -= enemy.shield;
            enemy.shield = 0;
        }
    }

    // Apply remaining damage to HP
    enemy.hp -= remainingDamage;

    // Award tiered percentage of damage dealt as cash (only for non-summon enemies)
    if (!enemy.isSummon && finalDamage > 0) {
        let cashPercentage = 0.10;
        if (finalDamage > 50000) {
            cashPercentage = 0.01;
        } else if (finalDamage > 10000) {
            cashPercentage = 0.03;
        } else if (finalDamage > 2000) {
            cashPercentage = 0.05;
        }
        const cashOnHit = Math.floor(finalDamage * cashPercentage);
        if (cashOnHit > 0) {
            cash += cashOnHit;
        }
    }

    return finalDamage;
}

// Find target
function findTarget(tower) {
    const stats = tower.type.levels[tower.level - 1];
    const buffs = tower.type.cannotBeBuffed ? { rangeBoost: 0 } : getCommanderBuffs(tower);
    const rangeBonus = tower.type.rangeBonus || 0;
    const buffedRange = stats.range + buffs.rangeBoost + rangeBonus;
    const sqRange = (buffedRange * GRID_SIZE) * (buffedRange * GRID_SIZE);

    let furthestEnemy = null;
    let maxDistanceTraveled = -Infinity;
    for (const enemy of enemies) {
        if (enemy.hp > 0 && !enemy.isSummon) {
            const sqDist = calculateDistanceSq(tower.x, tower.y, enemy.x, enemy.y);
            if (sqDist <= sqRange && enemy.distanceTraveled > maxDistanceTraveled) {
                furthestEnemy = enemy;
                maxDistanceTraveled = enemy.distanceTraveled;
            }
        }
    }
    return furthestEnemy;
}

// Check if in range
function isInRange(tower, target) {
    const stats = tower.type.levels[tower.level - 1];
    const buffs = tower.type.cannotBeBuffed ? { rangeBoost: 0 } : getCommanderBuffs(tower);
    const rangeBonus = tower.type.rangeBonus || 0;
    const buffedRange = stats.range + buffs.rangeBoost + rangeBonus;
    const sqRange = (buffedRange * GRID_SIZE) * (buffedRange * GRID_SIZE);

    return calculateDistanceSq(tower.x, tower.y, target.x, target.y) <= sqRange;
}

// Calculate distance
function calculateDistance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
}

// Calculate squared distance (fast)
function calculateDistanceSq(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return dx * dx + dy * dy;
}

// Convert hex color to rgba with alpha
function hexToRgba(hex, alpha) {
    // Handle hex with or without # and with optional alpha (8 char hex)
    hex = hex.replace('#', '');

    // Take only RGB portion (first 6 chars) if hex is longer (like #ffffffff)
    if (hex.length > 6) hex = hex.substring(0, 6);

    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Draw towers
function drawTowers() {
    for (const tower of towers) {
        ctx.fillStyle = tower.type.color;
        let towerSizeX = 1;
        let towerSizeY = 1;

        if (tower.type === TOWER_TYPES.GUNNER_PARAGON || tower.type === TOWER_TYPES.SNIPER_PARAGON || tower.type === TOWER_TYPES.ELITE_SPAWNER) {
            towerSizeX = 2; towerSizeY = 2; // 2x2 towers
        } else if (tower.type === TOWER_TYPES.CUBE_FACTORY) {
            towerSizeX = 3; towerSizeY = 3; // 3x3 tower
        } else if (tower.type === TOWER_TYPES.CARRIER_CUBE) {
            towerSizeX = 4; towerSizeY = 4; // 4x4 tower
        }

        // Draw the tower's main body
        ctx.fillRect(tower.gridX * GRID_SIZE, tower.gridY * GRID_SIZE, towerSizeX * GRID_SIZE, towerSizeY * GRID_SIZE);

        // Draw level or radian indicator
        ctx.fillStyle = 'white';
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        if (tower.type.isParagon) {
            ctx.font = 'bold 16px Arial';
            ctx.fillText(`R${tower.level}`, tower.gridX * GRID_SIZE + (towerSizeX * GRID_SIZE) / 2, tower.gridY * GRID_SIZE + (towerSizeY * GRID_SIZE) / 2 + 4);
        } else {
            ctx.fillText(tower.level, tower.gridX * GRID_SIZE + (towerSizeX * GRID_SIZE) / 2, tower.gridY * GRID_SIZE + (towerSizeY * GRID_SIZE) / 2 + 4);
        }
    }
}


// Update wave
// Update wave
// Update wave
function updateWave(timestamp) {
    // Iterate backwards to allow removal of finished waves
    for (let i = activeWaves.length - 1; i >= 0; i--) {
        const wave = activeWaves[i];

        // Check if this wave is finished
        if (wave.groupIndex >= wave.data.groups.length && wave.enemiesQueue.length === 0) {
            activeWaves.splice(i, 1);
            continue;
        }

        // Handle group waiting logic
        if (wave.isWaiting) {
            wave.waitTimer += frameDelta; // Frame-rate independent
            const currentGroup = wave.data.groups[wave.groupIndex];

            if (wave.waitTimer >= currentGroup.waitAfter) {
                console.log(`Group ${wave.groupIndex} wait finished. Moving to next group.`);
                wave.isWaiting = false;
                wave.groupIndex++;

                if (wave.groupIndex < wave.data.groups.length) {
                    processWaveGroup(wave);
                    wave.lastSpawnTime = timestamp;
                }
            }
        } else {
            // Spawn enemies
            if (wave.enemiesQueue.length > 0) {
                const currentGroup = wave.data.groups[wave.groupIndex];
                if (timestamp - wave.lastSpawnTime >= currentGroup.spawnInterval) {
                    const startPoint = path[0];
                    spawnEntity(wave.enemiesQueue.shift(), startPoint.x, startPoint.y);
                    wave.lastSpawnTime = timestamp;
                }
            } else {
                // Group finished
                if (wave.groupIndex < wave.data.groups.length) {
                    console.log(`Group ${wave.groupIndex} finished. Waiting ${wave.data.groups[wave.groupIndex].waitAfter}ms`);
                    wave.isWaiting = true;
                    wave.waitTimer = 0;
                }
            }
        }
    }

    // Enable skip button after 10 seconds into wave
    if (waveActive && waveTimer >= 10000) {
        skipWaveBtn.disabled = false;
    } else {
        skipWaveBtn.disabled = true;
    }

    if (waveActive) {
        waveTimer += frameDelta; // Frame-rate independent
    }
}


// Update projectiles
function updateProjectiles(timestamp) {
    projectiles = projectiles.filter(projectile => {
        const elapsed = timestamp - projectile.startTime;
        return elapsed < projectile.duration;
    });
}

// update enemies stamp
function updateEnemies(timestamp) {
    for (let i = enemies.length - 1; i >= 0; i--) {
        const entity = enemies[i];
        if (entity.hp <= 0) {
            if (entity.type.cashReward) {
                cash += Math.floor(entity.type.cashReward * 0.75);
            } else {
                cash += Math.floor(entity.maxHp * (entity.type.isKing ? 0.03 : 0.06) * 0.75);
            }
            if (entity.type.selfDestructDamage) {
                enemies.forEach(enemy => {
                    if (!enemy.isSummon && calculateDistance(entity.x, entity.y, enemy.x, enemy.y) <= 2 * GRID_SIZE) {
                        const damage = entity.type.selfDestructDamage;
                        applyDamage(enemy, damage);
                    }
                });
                explosions.push({ x: entity.x, y: entity.y, size: 0, maxSize: 2 * GRID_SIZE * 2, startTime: timestamp, duration: 500 });
            }
            enemies.splice(i, 1);
            updateCashDisplay();
            continue;
        }

        // START OF REPLACED BLOCK
        if (entity.isSummon) {
            // Step 1: Find target and process attacks
            const target = findSummonTarget(entity);
            if (target) {
                handleSummonAttacks(entity, target, timestamp);
                // Stop-to-shoot: Elite Operator halts while firing
                if (entity.type.stopsToShoot) entity.speed = 0;
            } else {
                // Resume base speed when no target
                entity.speed = entity.type.speed;
            }

            // Step 2: Move the entity
            moveEntity(entity, true);

            // Step 3: Handle kamikaze cubes (Beta Yellow) - Check for proximity AFTER movement
            if (entity.type.isKamikaze) {
                const targetForKamikaze = findSummonTarget(entity); // Re-find target after movement
                if (targetForKamikaze && calculateDistance(entity.x, entity.y, targetForKamikaze.x, targetForKamikaze.y) <= entity.size + targetForKamikaze.size) {
                    // Collision damage
                    applyDamage(targetForKamikaze, entity.type.collisionDamage);
                    entity.hp = 0; // Kill the kamikaze cube
                }
                // Death explosion
                if (entity.hp <= 0) {
                    enemies.forEach(enemy => {
                        if (!enemy.isSummon && calculateDistance(entity.x, entity.y, enemy.x, enemy.y) <= entity.type.deathRange * GRID_SIZE) {
                            applyDamage(enemy, entity.type.deathDamage, 'explosive');
                        }
                    });
                    explosions.push({ x: entity.x, y: entity.y, size: 0, maxSize: entity.type.deathRange * GRID_SIZE, startTime: timestamp, duration: 500 });
                }
            }

            // Step 4: Handle ram and removal if at start/end of path
            handleRam(entity, i);
            if (entity.distanceTraveled <= 0) enemies.splice(i, 1);
        }
        // END OF REPLACED BLOCK
        else {
            // ═══════════════════════════════════════════════════════════════
            // NIGHTMARE MODE MECHANICS
            // ═══════════════════════════════════════════════════════════════

            // --- SUMMONER ENEMIES ---
            // Enemies with isSummoner flag spawn minions on a cooldown
            if (entity.type.isSummoner && !entity.isSummon) {
                if (!entity.lastSummonTime) entity.lastSummonTime = timestamp;

                if (timestamp - entity.lastSummonTime >= (entity.type.summoncooldown || 10000)) {
                    const summonTypeName = entity.type.summonType;
                    const summonType = ENEMY_TYPES[summonTypeName];
                    if (summonType) {
                        const summonCount = entity.type.summoncount || 1;
                        for (let j = 0; j < summonCount; j++) {
                            // Spawn summons at the summoner's current position along the path
                            const newEnemy = {
                                type: summonType,
                                x: entity.x,
                                y: entity.y,
                                hp: summonType.baseHp,
                                maxHp: summonType.baseHp,
                                shield: summonType.hasShield ? summonType.shieldHp : 0,
                                maxShield: summonType.hasShield ? summonType.shieldHp : 0,
                                speed: summonType.speed,
                                distanceTraveled: entity.distanceTraveled, // Same progress as summoner
                                size: summonType.size,
                                isSummoned: true
                            };
                            enemies.push(newEnemy);
                        }
                        console.log(`${entity.type.name} summoned ${summonCount} ${summonTypeName}!`);
                    }
                    entity.lastSummonTime = timestamp;
                }
            }

            // --- QUANTUM PHASE (Silver Cube) ---
            // At phaseTwoHp, heals fully + bonus HP and doubles speed (once only)
            if (entity.type.isQuantum && !entity.quantumTriggered) {
                if (entity.hp <= entity.type.phaseTwoHp) {
                    entity.quantumTriggered = true;
                    const newMaxHp = entity.maxHp + (entity.type.phaseTwoBonusHp || 0);
                    entity.hp = newMaxHp;
                    entity.maxHp = newMaxHp;
                    entity.speed = entity.type.speed * (entity.type.phaseTwoSpeedMultiplier || 2);
                    // Visual flash effect
                    explosions.push({
                        x: entity.x,
                        y: entity.y,
                        size: 0,
                        maxSize: entity.type.size * 3,
                        startTime: timestamp,
                        duration: 300
                    });
                    console.log(`${entity.type.name} entered Quantum Phase! HP: ${entity.hp}, Speed: ${entity.speed}`);
                }
            }

            // --- OMEGA BOSS SHIELD REGENERATION ---
            // Omega Cube regens 1M shield every 60 seconds
            if (entity.type.name === 'THE OMEGA CUBE' && entity.type.hasShield) {
                if (!entity.lastShieldRegen) entity.lastShieldRegen = timestamp;

                if (timestamp - entity.lastShieldRegen >= 60000) {
                    const regenAmount = 1000000;
                    entity.shield = Math.min(entity.maxShield, entity.shield + regenAmount);
                    entity.lastShieldRegen = timestamp;
                    console.log(`Omega Cube regenerated ${regenAmount} shield! Current: ${entity.shield}`);
                }
            }

            // --- SHIELDER SUPPORT (Shielder Cube) ---
            // Grants shield to nearby enemies every 10 seconds
            if (entity.type.isSupport && !entity.isSummon) {
                // Initialize to (timestamp - 10000) so first shield happens immediately
                if (entity.lastShieldTime === undefined) {
                    entity.lastShieldTime = timestamp - 10000;
                    console.log(`Shielder initialized, lastShieldTime set to trigger immediately`);
                }

                if (timestamp - entity.lastShieldTime >= 10000) { // Every 10 seconds
                    const shieldRange = 3 * GRID_SIZE; // 3 grid range
                    let shieldedCount = 0;

                    enemies.forEach(target => {
                        // Skip self and other shielders
                        if (target === entity) return;
                        if (target.type.isSupport) return;
                        if (target.isSummon) return; // Don't shield our own summons

                        const distance = calculateDistance(entity.x, entity.y, target.x, target.y);
                        console.log(`Checking ${target.type.name} - distance: ${distance}, range: ${shieldRange}`);

                        if (distance <= shieldRange) {
                            // Grant 10% of target's base HP as shield
                            const shieldAmount = Math.floor(target.type.baseHp * 0.10);

                            // Initialize shield if enemy doesn't have one
                            if (!target.shield) target.shield = 0;
                            if (!target.maxShield) target.maxShield = 0;

                            // Add shield (stacks with existing shield)
                            target.shield += shieldAmount;
                            target.maxShield = Math.max(target.maxShield, target.shield);

                            // Mark as having shield for visual effect
                            target.hasShield = true;
                            shieldedCount++;
                            console.log(`Granted ${shieldAmount} shield to ${target.type.name}! Total shield: ${target.shield}`);
                        }
                    });

                    entity.lastShieldTime = timestamp;
                    console.log(`Shielder Cube granted shields to ${shieldedCount} nearby enemies!`);
                }
            }

            // ═══════════════════════════════════════════════════════════════
            // END NIGHTMARE MODE MECHANICS
            // ═══════════════════════════════════════════════════════════════


            moveEntity(entity, false);
            if (entity.distanceTraveled >= getPathLength()) {
                // damageBase returns true if the enemy should be removed, false if it looped
                const shouldRemove = damageBase(entity);
                if (shouldRemove !== false) {
                    enemies.splice(i, 1);
                }
            }
        }
    }
    updateCashDisplay();
}


// Handle summon attacks based on type
function handleSummonAttacks(entity, target, timestamp) {
    if (entity.type.name === 'Cyan Cube') {
        // Minigun attack
        if (timestamp - entity.lastFired >= entity.type.minigunFireRate) {
            const damage = entity.type.minigunDamage;
            applyDamage(target, damage);
            projectiles.push({ x1: entity.x, y1: entity.y, x2: target.x, y2: target.y, color: 'cyan', width: 1, startTime: timestamp, duration: 100 });
            entity.lastFired = timestamp;
        }
        // Missile attack
        if (timestamp - entity.lastMissile >= entity.type.missileCooldown) {
            if (entity.missileCount < entity.type.missileCount) {
                if (timestamp - (entity.lastMissileBurst || entity.lastMissile) >= entity.type.missileBurstRate) {
                    fireSummonMissile(entity, target, timestamp);
                    projectiles.push({ x1: entity.x, y1: entity.y, x2: target.x, y2: target.y, color: 'orange', width: 3, startTime: timestamp, duration: 200 });
                    entity.lastMissileBurst = timestamp;
                    entity.missileCount++;
                    if (entity.missileCount === entity.type.missileCount) {
                        entity.missileCount = 0;
                        entity.lastMissile = timestamp;
                    }
                }
            }
        }
        // Railgun attack
        if (timestamp - entity.lastRailgun >= entity.type.railgunFireRate) {
            const damage = entity.type.railgunDamage;
            applyDamage(target, damage);
            railgunShots.push({ x1: entity.x, y1: entity.y, x2: target.x, y2: target.y, alpha: 1, startTime: timestamp, duration: 500 });
            entity.lastRailgun = timestamp;
        }
    } else if (entity.type.damage && timestamp - entity.lastFired >= entity.type.fireRate) {
        if (entity.type.aoe) { // Orange Square, Beta Black, Exec Artillery
            const aoeRange = entity.type.aoeRange || 2;
            enemies.forEach(enemy => {
                if (!enemy.isSummon && calculateDistance(target.x, target.y, enemy.x, enemy.y) <= aoeRange * GRID_SIZE) {
                    const damage = enemy === target ? (entity.type.directDamage || entity.type.damage) : entity.type.damage;
                    applyDamage(enemy, damage, 'explosive');
                }
            });
            explosions.push({ x: target.x, y: target.y, size: 0, maxSize: aoeRange * GRID_SIZE, startTime: timestamp, duration: 500 });
            const projectileColor = entity.type.name.includes('Beta Black') ? '#1A1A1A' : (entity.type.color || 'orange');
            projectiles.push({ x1: entity.x, y1: entity.y, x2: target.x, y2: target.y, color: projectileColor, width: 2, startTime: timestamp, duration: 200 });
        } else { // Blue Square, Pink Square, Green Square, Beta Gray, Elite Operator, Exec Tank
            const damage = entity.type.damage;
            applyDamage(target, damage);
            if (entity.type.name === 'Green Square') {
                railgunShots.push({ x1: entity.x, y1: entity.y, x2: target.x, y2: target.y, alpha: 1, startTime: timestamp, duration: 500 });
            } else if (entity.type.name.includes('Blue Square')) {
                projectiles.push({ x1: entity.x, y1: entity.y, x2: target.x, y2: target.y, color: 'blue', width: 1, startTime: timestamp, duration: 100 });
            } else if (entity.type.name.includes('Pink Square')) {
                projectiles.push({ x1: entity.x, y1: entity.y, x2: target.x, y2: target.y, color: 'pink', width: 1, startTime: timestamp, duration: 50 });
            } else if (entity.type.name.includes('Beta Gray')) {
                projectiles.push({ x1: entity.x, y1: entity.y, x2: target.x, y2: target.y, color: '#808080', width: 1, startTime: timestamp, duration: 100 });
            } else {
                // Generic summon projectile (Elite Operator, Exec Tank, etc.)
                projectiles.push({ x1: entity.x, y1: entity.y, x2: target.x, y2: target.y, color: entity.type.color, width: 2, startTime: timestamp, duration: 100 });
            }
        }
        entity.lastFired = timestamp;
    } else if (entity.type.burstDamage && timestamp - entity.lastFired >= entity.type.burstCooldown) { // Pink Square L5
        entity.burstCountRemaining = entity.burstCountRemaining || entity.type.burstCount;
        if (entity.burstCountRemaining > 0 && timestamp - (entity.lastBurstShot || 0) >= entity.type.burstFireRate) {
            const damage = entity.type.burstDamage;
            applyDamage(target, damage);
            projectiles.push({ x1: entity.x, y1: entity.y, x2: target.x, y2: target.y, color: 'pink', width: 2, startTime: timestamp, duration: 50 });
            entity.burstCountRemaining--;
            entity.lastBurstShot = timestamp;
        }
        if (entity.burstCountRemaining === 0) {
            entity.lastFired = timestamp;
            entity.burstCountRemaining = null;
        }
    } else if (entity.type.name === 'Rainbow Cube') {
        handleRainbowCubeAttacks(entity, target, timestamp);
    }
    else if (entity.type.name.includes('Factory Cube')) { // Handles L1, L2, L3
        handleFactoryCubeAttacks(entity, target, timestamp);
    }
}
// Handle Rainbow Cube's special attacks
function handleRainbowCubeAttacks(entity, target, timestamp) {
    // Minigun attack
    if (timestamp - entity.lastFired >= entity.type.minigunFireRate) {
        const damage = entity.type.minigunDamage;
        applyDamage(target, damage);
        projectiles.push({ x1: entity.x, y1: entity.y, x2: target.x, y2: target.y, color: 'yellow', width: 1, startTime: timestamp, duration: 50 });
        entity.lastFired = timestamp;
    }

    // Railgun burst
    if (timestamp - entity.lastRailgun >= entity.type.railgunCooldown) {
        entity.railgunCountRemaining = entity.railgunCountRemaining || entity.type.railgunCount;
        if (entity.railgunCountRemaining > 0 && timestamp - (entity.lastRailgunShot || 0) >= entity.type.railgunFireRate) {
            const damage = entity.type.railgunDamage;
            applyDamage(target, damage);
            railgunShots.push({ x1: entity.x, y1: entity.y, x2: target.x, y2: target.y, alpha: 1, startTime: timestamp, duration: 500 });
            entity.railgunCountRemaining--;
            entity.lastRailgunShot = timestamp;
        }
        if (entity.railgunCountRemaining === 0) {
            entity.lastRailgun = timestamp;
            entity.railgunCountRemaining = null;
        }
    }

    // Missile burst
    if (timestamp - entity.lastMissile >= entity.type.missileCooldown) {
        entity.missileCountRemaining = entity.missileCountRemaining || entity.type.missileCount;
        if (entity.missileCountRemaining > 0 && timestamp - (entity.lastMissileShot || 0) >= entity.type.missileFireRate) {
            enemies.forEach(enemy => {
                if (!enemy.isSummon && calculateDistance(entity.x, entity.y, enemy.x, enemy.y) <= entity.type.range * GRID_SIZE) {
                    const damage = enemy === target ? entity.type.missileDirectDamage : entity.type.missileDamage;
                    applyDamage(enemy, damage, 'explosive');
                }
            });
            explosions.push({ x: target.x, y: target.y, size: 0, maxSize: GRID_SIZE * 2, startTime: timestamp, duration: 500 });
            projectiles.push({ x1: entity.x, y1: entity.y, x2: target.x, y2: target.y, color: 'orange', width: 3, startTime: timestamp, duration: 200 });
            entity.missileCountRemaining--;
            entity.lastMissileShot = timestamp;
        }
        if (entity.missileCountRemaining === 0) {
            entity.lastMissile = timestamp;
            entity.missileCountRemaining = null;
        }
    }

    // Laser burst
    if (timestamp - entity.lastLaser >= entity.type.laserCooldown) {
        entity.laserCountRemaining = entity.laserCountRemaining || entity.type.laserBurstCount;
        if (entity.laserCountRemaining > 0 && timestamp - (entity.lastLaserShot || 0) >= entity.type.laserFireRate) {
            const damage = entity.type.laserDamage;
            applyDamage(target, damage);
            projectiles.push({ x1: entity.x, y1: entity.y, x2: target.x, y2: target.y, color: 'red', width: 2, startTime: timestamp, duration: 40 });
            entity.laserCountRemaining--;
            entity.lastLaserShot = timestamp;
        }
        if (entity.laserCountRemaining === 0) {
            entity.lastLaser = timestamp;
            entity.laserCountRemaining = null;
        }
    }

    // Main railgun (super attack)
    if (entity.mainRailgunUses > 0 && timestamp - entity.lastMainRailgun >= entity.type.mainRailgunCooldown) {
        entity.mainRailgunCountRemaining = entity.mainRailgunCountRemaining || entity.type.mainRailgunCount;
        if (entity.mainRailgunCountRemaining > 0 && timestamp - (entity.lastMainRailgunShot || 0) >= entity.type.mainRailgunFireRate) {
            const damage = entity.type.mainRailgunDamage;
            applyDamage(target, damage);
            railgunShots.push({ x1: entity.x, y1: entity.y, x2: target.x, y2: target.y, alpha: 1, startTime: timestamp, duration: 500 });
            entity.mainRailgunCountRemaining--;
            entity.lastMainRailgunShot = timestamp;
        }
        if (entity.mainRailgunCountRemaining === 0) {
            entity.lastMainRailgun = timestamp;
            entity.mainRailgunUses--;
            entity.mainRailgunCountRemaining = null;
        }
    }
}

function handleFactoryCubeAttacks(entity, target, timestamp) {
    // Ensure entity has necessary cooldowns/counters
    entity.lastMinigunFire = entity.lastMinigunFire || 0;
    entity.lastRocketFire = entity.lastRocketFire || 0;
    entity.rocketBurstCount = entity.rocketBurstCount || 0;
    entity.lastRailgunFire = entity.lastRailgunFire || 0;
    entity.lastKnockback = entity.lastKnockback || 0;

    // ----- Movement Logic: Stop if any enemy in general range -----
    const anyEnemyInRange = enemies.some(enemy =>
        !enemy.isSummon && calculateDistance(entity.x, entity.y, enemy.x, enemy.y) <= entity.type.range * GRID_SIZE
    );

    if (anyEnemyInRange) {
        entity.speed = 0; // Stop moving
    } else {
        entity.speed = entity.type.speed; // Resume moving
    }

    // Only attack if stopped and there's a target
    if (entity.speed === 0 && target) {

        // ----- Knockback Logic (Bosses only, single target, L2/L3 only) -----
        // Factory Cube L1 (L1) is not supposed to punch (knockback)
        if (entity.type.isBossKnockbacker && entity.type.name !== 'Factory Cube L1' && timestamp - entity.lastKnockback >= entity.type.knockbackCooldown) {
            // Find the closest BOSS within knockback explosion range
            let closestBoss = null;
            let closestBossDistance = Infinity;

            for (const enemy of enemies) {
                // Only target bosses (isBoss flag) and ensure it's not a summon
                if (enemy.type.isBoss && !enemy.isSummon) {
                    const dist = calculateDistance(entity.x, entity.y, enemy.x, enemy.y);
                    if (dist <= entity.type.knockbackExplosionRange * GRID_SIZE && dist < closestBossDistance) {
                        closestBoss = enemy;
                        closestBossDistance = dist;
                    }
                }
            }

            if (closestBoss) {
                // Deal knockback damage to the *single* closest boss
                applyDamage(closestBoss, entity.type.knockbackDirectDamage, 'explosive');

                // KNOCKBACK MOVEMENT: Reduce distanceTraveled for the single boss
                const knockbackDistance = entity.type.knockbackPower * GRID_SIZE; // Use knockbackPower from entity type
                closestBoss.distanceTraveled = Math.max(0, closestBoss.distanceTraveled - knockbackDistance);

                // Instantly update boss position after knockback
                let distanceAlongPath = closestBoss.distanceTraveled;
                let currentLength = 0;
                for (let i = 0; i < path.length - 1; i++) {
                    const segmentLength = calculateDistance(path[i].x, path[i].y, path[i + 1].x, path[i + 1].y);
                    if (distanceAlongPath <= currentLength + segmentLength) {
                        const t = (distanceAlongPath - currentLength) / segmentLength;
                        closestBoss.x = path[i].x + t * (path[i + 1].x - path[i].x);
                        closestBoss.y = path[i].y + t * (path[i + 1].y - path[i].y);
                        break;
                    }
                    currentLength += segmentLength;
                }
                if (distanceAlongPath <= 0) { // If knocked back to start, set to start point
                    closestBoss.x = path[0].x;
                    closestBoss.y = path[0].y;
                }

                // Create explosion effect (visual for the knockback)
                explosions.push({
                    x: entity.x, // Explosion source is the factory cube
                    y: entity.y,
                    size: 0,
                    maxSize: entity.type.knockbackExplosionRange * GRID_SIZE,
                    startTime: timestamp,
                    duration: 500
                });

                // Deal AOE damage to nearby non-boss enemies around the factory cube
                enemies.forEach(enemy => {
                    if (!enemy.isSummon && !enemy.type.isBoss && calculateDistance(entity.x, entity.y, enemy.x, enemy.y) <= entity.type.knockbackExplosionRange * GRID_SIZE) {
                        applyDamage(enemy, entity.type.knockbackExplosionDamage, 'explosive');
                    }
                });

                entity.lastKnockback = timestamp;
                console.log('Factory Cube: BOSS KNOCKBACK!');
            }
        }

        // ----- Minigun Attack -----
        if (entity.type.minigunDamage && timestamp - entity.lastMinigunFire >= entity.type.minigunFireRate) {
            applyDamage(target, entity.type.minigunDamage);
            projectiles.push({ x1: entity.x, y1: entity.y, x2: target.x, y2: target.y, color: 'yellow', width: 1, startTime: timestamp, duration: 50 });
            entity.lastMinigunFire = timestamp;
        }

        // ----- Rocket Attack (Burst) -----
        if (entity.type.rocketDamage && timestamp - entity.lastRocketFire >= entity.type.rocketCooldown) {
            entity.rocketBurstCount = entity.rocketBurstCount || entity.type.rocketCount;
            if (entity.rocketBurstCount > 0 && timestamp - (entity.lastRocketShot || 0) >= entity.type.rocketFireRate) {
                enemies.forEach(enemy => {
                    if (!enemy.isSummon && calculateDistance(entity.x, entity.y, enemy.x, enemy.y) <= entity.type.rocketAOERange * GRID_SIZE) {
                        const damage = enemy === target ? entity.type.rocketDirectDamage : entity.type.rocketDamage;
                        applyDamage(enemy, damage, 'explosive');
                    }
                });
                explosions.push({ x: target.x, y: target.y, size: 0, maxSize: entity.type.rocketAOERange * GRID_SIZE, startTime: timestamp, duration: 200 });
                projectiles.push({ x1: entity.x, y1: entity.y, x2: target.x, y2: target.y, color: 'orange', width: 3, startTime: timestamp, duration: 150 });
                entity.rocketBurstCount--;
                entity.lastRocketShot = timestamp;
            }
            if (entity.rocketBurstCount === 0) {
                entity.lastRocketFire = timestamp;
                entity.rocketBurstCount = null;
            }
        }

        // ----- Railgun Attack (Strongest Enemy, L2/L3 only) -----
        if (entity.type.railgunDamage && entity.type.name !== 'Factory Cube L1' && timestamp - entity.lastRailgunFire >= entity.type.railgunCooldown) {
            // Find strongest enemy overall (not just in range)
            let strongestEnemy = null;
            let maxHp = -Infinity;
            for (const enemy of enemies) {
                if (!enemy.isSummon && enemy.hp > 0 && enemy.maxHp > maxHp) {
                    strongestEnemy = enemy;
                    maxHp = enemy.maxHp;
                }
            }
            if (strongestEnemy) {
                applyDamage(strongestEnemy, entity.type.railgunDamage);
                railgunShots.push({ x1: entity.x, y1: entity.y, x2: strongestEnemy.x, y2: strongestEnemy.y, alpha: 1, startTime: timestamp, duration: 500 });
                entity.lastRailgunFire = timestamp;
            }
        }
    }
}




// Get total path length
function getPathLength() {
    let totalLength = 0;
    for (let i = 0; i < path.length - 1; i++) {
        totalLength += calculateDistance(path[i].x, path[i].y, path[i + 1].x, path[i + 1].y);
    }
    return totalLength;
}

// Move entity
function moveEntity(entity, isSummon) {
    const pathLength = getPathLength();
    const direction = isSummon ? -1 : 1;
    entity.distanceTraveled += entity.speed * direction * (frameDelta / 16.667);
    entity.distanceTraveled = Math.max(0, Math.min(entity.distanceTraveled, pathLength));

    let distanceAlongPath = isSummon ? pathLength - entity.distanceTraveled : entity.distanceTraveled;
    let currentLength = 0;

    if (isSummon) {
        for (let i = path.length - 1; i > 0; i--) {
            const segmentLength = calculateDistance(path[i].x, path[i].y, path[i - 1].x, path[i - 1].y);
            if (distanceAlongPath <= currentLength + segmentLength) {
                const t = (distanceAlongPath - currentLength) / segmentLength;
                entity.x = path[i].x + t * (path[i - 1].x - path[i].x);
                entity.y = path[i].y + t * (path[i - 1].y - path[i].y);
                break;
            }
            currentLength += segmentLength;
        }
        if (distanceAlongPath <= 0) {
            entity.x = path[0].x;
            entity.y = path[0].y;
        }
    } else {
        for (let i = 0; i < path.length - 1; i++) {
            const segmentLength = calculateDistance(path[i].x, path[i].y, path[i + 1].x, path[i + 1].y);
            if (distanceAlongPath <= currentLength + segmentLength) {
                const t = (distanceAlongPath - currentLength) / segmentLength;
                entity.x = path[i].x + t * (path[i + 1].x - path[i].x);
                entity.y = path[i].y + t * (path[i + 1].y - path[i].y);
                break;
            }
            currentLength += segmentLength;
        }
        if (distanceAlongPath >= pathLength) {
            entity.x = path[path.length - 1].x;
            entity.y = path[path.length - 1].y;
        }
    }
}

// Find summon target
function findSummonTarget(summon) {
    let closestEnemy = null;
    let closestDistance = Infinity;
    for (const enemy of enemies) {
        if (enemy.hp > 0 && !enemy.isSummon) {
            const distance = calculateDistance(summon.x, summon.y, enemy.x, enemy.y);
            if (distance <= summon.type.range * GRID_SIZE && distance < closestDistance) {
                closestEnemy = enemy;
                closestDistance = distance;
            }
        }
    }
    return closestEnemy;
}

// Fire summon missile
// Fire summon missile
function fireSummonMissile(summon, target, timestamp) {
    enemies.forEach(enemy => {
        if (!enemy.isSummon && calculateDistance(summon.x, summon.y, enemy.x, enemy.y) <= summon.type.missileRange * GRID_SIZE) {
            const damage = enemy === target ? summon.type.missileDirectDamage : summon.type.missileAOEDamage;
            applyDamage(enemy, damage, 'explosive');
        }
    });
    explosions.push({
        x: target.x,
        y: target.y,
        size: 0,
        maxSize: GRID_SIZE * 2,
        startTime: timestamp,
        duration: 500
    });
}

// Handle ram
function handleRam(summon, summonIndex) {
    let ramOccurred = false;
    for (let i = enemies.length - 1; i >= 0 && !ramOccurred; i--) {
        const enemy = enemies[i];
        if (!enemy.isSummon && calculateDistance(summon.x, summon.y, enemy.x, enemy.y) < (summon.size + enemy.size) / 2) {
            const damage = Math.min(summon.hp, enemy.hp);
            summon.hp -= damage;
            applyDamage(enemy, damage);
            if (summon.hp <= 0) enemies.splice(summonIndex, 1);
            if (enemy.hp <= 0) enemies.splice(i, 1);
            ramOccurred = true;
        }
    }
}

// Update explosions
function updateExplosions(timestamp) {
    for (let i = explosions.length - 1; i >= 0; i--) {
        const explosion = explosions[i];
        const elapsed = timestamp - explosion.startTime;
        if (elapsed >= explosion.duration) {
            explosions.splice(i, 1);
        } else {
            explosion.size = (elapsed / explosion.duration) * explosion.maxSize;
        }
    }
}

// Draw explosions
function drawExplosions() {
    for (const explosion of explosions) {
        ctx.fillStyle = 'rgba(255, 165, 0, 0.5)';
        const halfSize = explosion.size / 2;
        ctx.fillRect(explosion.x - halfSize, explosion.y - halfSize, explosion.size, explosion.size);
    }
}

// Draw spawn timer for selected tower
function drawSpawnTimer() {
    if (!selectedTowerForTimer || !towers.includes(selectedTowerForTimer)) {
        selectedTowerForTimer = null;
        return;
    }

    const tower = selectedTowerForTimer;

    // Only show timer for summoner towers
    if (!tower.type.summons) return;

    const stats = tower.type.levels[tower.level - 1];
    if (!stats.summons) return;

    // Draw timer for each summon type
    stats.summons.forEach((summon, index) => {
        let timeUntilNextSpawn = 0;

        // Special handling for Cube Factory with global cooldown
        if (tower.type === TOWER_TYPES.CUBE_FACTORY) {
            const timeSinceGlobalCooldown = performance.now() - lastGlobalFactorySpawnTime;
            const globalCooldownRemaining = Math.max(0, tower.type.globalSpawnCooldown - timeSinceGlobalCooldown);

            if (globalCooldownRemaining > 0) {
                // Show global cooldown timer
                timeUntilNextSpawn = globalCooldownRemaining;
            } else {
                // Show individual spawn rate timer
                const lastSummonTime = tower.lastSummonTimes[summon.type] || 0;
                const timeSinceLastSpawn = performance.now() - lastSummonTime;
                timeUntilNextSpawn = Math.max(0, summon.spawnRate - timeSinceLastSpawn);
            }
        } else {
            // Normal summoner towers
            const lastSummonTime = tower.lastSummonTimes[summon.type] || 0;
            const timeSinceLastSpawn = performance.now() - lastSummonTime;
            timeUntilNextSpawn = Math.max(0, summon.spawnRate - timeSinceLastSpawn);
        }

        const secondsUntilSpawn = (timeUntilNextSpawn / 1000).toFixed(1);

        // Draw timer box above tower
        const boxX = tower.x - 40;
        const boxY = tower.y - 80 - (index * 25);

        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(boxX - 5, boxY - 5, 90, 20);

        ctx.strokeStyle = '#FFD700';
        ctx.lineWidth = 2;
        ctx.strokeRect(boxX - 5, boxY - 5, 90, 20);

        ctx.fillStyle = '#FFD700';
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'left';

        // Show if it's global cooldown or individual timer
        const timerLabel = tower.type === TOWER_TYPES.CUBE_FACTORY ? 'Global:' : `${SUMMON_TYPES[summon.type].name}:`;
        ctx.fillText(timerLabel, boxX, boxY + 8);
        ctx.fillText(`${secondsUntilSpawn}s`, boxX + 65, boxY + 8);
    });
}


// Draw entities
function drawEntities() {
    for (const entity of enemies) {
        if (entity.type.name === 'Rainbow Cube') {
            const gradient = ctx.createLinearGradient(entity.x - entity.size / 2, entity.y - entity.size / 2, entity.x + entity.size / 2, entity.y + entity.size / 2);
            gradient.addColorStop(0, 'red');
            gradient.addColorStop(0.2, 'orange');
            gradient.addColorStop(0.4, 'yellow');
            gradient.addColorStop(0.6, 'green');
            gradient.addColorStop(0.8, 'blue');
            gradient.addColorStop(1, 'purple');
            ctx.fillStyle = gradient;
        } else {
            ctx.fillStyle = entity.type.color;
        }
        const size = entity.type.size;
        ctx.fillRect(entity.x - size / 2, entity.y - size / 2, size, size);

        // ═══════════════════════════════════════════════════════════════
        // SHIELD BUBBLE VISUAL
        // If enemy has shield, draw a transparent glass-like bubble around them
        // ═══════════════════════════════════════════════════════════════
        if ((entity.hasShield || entity.type.hasShield) && entity.shield > 0) {
            // Parse the entity's color to create a lighter, transparent version
            const baseColor = entity.type.color;
            const bubbleSize = size * 1.4; // Slightly larger than the entity

            // Create gradient for glass-like effect
            const gradient = ctx.createRadialGradient(
                entity.x, entity.y, size * 0.3,
                entity.x, entity.y, bubbleSize * 0.6
            );

            // Use the entity's color with varying transparency for glass effect
            gradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)'); // Light center
            gradient.addColorStop(0.4, hexToRgba(baseColor, 0.15)); // Color fade
            gradient.addColorStop(0.7, hexToRgba(baseColor, 0.25)); // More color
            gradient.addColorStop(1, hexToRgba(baseColor, 0.4)); // Edge color

            // Draw the bubble (circle around the cube)
            ctx.beginPath();
            ctx.arc(entity.x, entity.y, bubbleSize * 0.55, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();

            // Add a subtle outline
            ctx.strokeStyle = hexToRgba(baseColor, 0.5);
            ctx.lineWidth = 2;
            ctx.stroke();
        }
        // ═══════════════════════════════════════════════════════════════
        // END SHIELD BUBBLE VISUAL
        // ═══════════════════════════════════════════════════════════════

        // Show HP bar on hover for normal enemies (not bosses with showHpBar)
        if (hoveredEnemy === entity && !entity.type.showHpBar) {
            const barWidth = size * 2.5; // Bigger bar
            const barHeight = 12; // Taller bar
            const healthRatio = entity.hp / entity.maxHp;
            const shieldRatio = entity.shield / entity.maxShield;

            // Background with padding
            ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
            ctx.fillRect(entity.x - barWidth / 2 - 5, entity.y - size / 2 - barHeight - 40, barWidth + 10, barHeight + 45);

            // HP bar background
            ctx.fillStyle = '#3A0000';
            ctx.fillRect(entity.x - barWidth / 2, entity.y - size / 2 - barHeight - 8, barWidth, barHeight);

            // HP bar
            ctx.fillStyle = '#FF0000';
            ctx.fillRect(entity.x - barWidth / 2, entity.y - size / 2 - barHeight - 8, barWidth * healthRatio, barHeight);

            // Shield bar (if has shield)
            if (entity.type.hasShield && entity.shield > 0) {
                ctx.fillStyle = 'rgba(0, 191, 255, 0.7)';
                ctx.fillRect(entity.x - barWidth / 2, entity.y - size / 2 - barHeight - 8, barWidth * shieldRatio, barHeight);
            }

            // Border
            ctx.strokeStyle = '#FFD700';
            ctx.lineWidth = 2;
            ctx.strokeRect(entity.x - barWidth / 2, entity.y - size / 2 - barHeight - 8, barWidth, barHeight);

            // Name
            ctx.fillStyle = 'white';
            ctx.font = 'bold 12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(entity.type.name, entity.x, entity.y - size / 2 - barHeight - 24);

            // HP text
            ctx.font = 'bold 11px Arial';
            const hpText = entity.type.hasShield ?
                `HP: ${Math.floor(entity.hp).toLocaleString()} | Shield: ${Math.floor(entity.shield).toLocaleString()}` :
                `HP: ${Math.floor(entity.hp).toLocaleString()} / ${entity.maxHp.toLocaleString()}`;
            ctx.fillText(hpText, entity.x, entity.y - size / 2 - barHeight - 12);
        }

        // Only show HP bars for bosses with showHpBar flag
        if (entity.type.showHpBar) {
            const mainBarWidth = gameWidth * 0.6;
            const mainBarHeight = hpBarCollapsed ? 30 : 40;
            const mainBarX = (gameWidth - mainBarWidth) / 2;
            const mainBarY = hpBarCollapsed ? 60 : (gameHeight / 2 - mainBarHeight / 2);
            const mainHealthRatio = entity.hp / entity.maxHp;
            const shieldRatio = entity.shield / entity.maxShield;

            // Background
            ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            ctx.fillRect(mainBarX - 10, mainBarY - 10, mainBarWidth + 20, mainBarHeight + 40);

            // HP bar background
            ctx.fillStyle = '#3A0000';
            ctx.fillRect(mainBarX, mainBarY, mainBarWidth, mainBarHeight);

            // HP bar
            ctx.fillStyle = '#FF0000';
            ctx.fillRect(mainBarX, mainBarY, mainBarWidth * mainHealthRatio, mainBarHeight);

            // Shield bar (if has shield)
            if (entity.type.hasShield && entity.shield > 0) {
                ctx.fillStyle = 'rgba(0, 191, 255, 0.7)';
                ctx.fillRect(mainBarX, mainBarY, mainBarWidth * shieldRatio, mainBarHeight);
            }

            // Border
            ctx.strokeStyle = '#FFD700';
            ctx.lineWidth = 3;
            ctx.strokeRect(mainBarX, mainBarY, mainBarWidth, mainBarHeight);

            // Text
            ctx.fillStyle = 'white';
            ctx.textAlign = 'center';

            // Show name only when expanded
            if (!hpBarCollapsed) {
                ctx.font = 'bold 20px Arial';
                ctx.fillText(`${entity.type.name}`, gameWidth / 2, mainBarY - 20);
            }

            ctx.font = hpBarCollapsed ? '12px Arial' : '16px Arial';
            let hpText = entity.type.hasShield ?
                `HP: ${Math.floor(entity.hp).toLocaleString()} | Shield: ${Math.floor(entity.shield).toLocaleString()}` :
                `HP: ${Math.floor(entity.hp).toLocaleString()} / ${entity.maxHp.toLocaleString()}`;

            // Show DPS for test dummy
            if (entity.type.isTestDummy) {
                const timeAlive = (performance.now() - entity.spawnTime) / 1000;
                const damageDealt = entity.maxHp - entity.hp;
                const dps = timeAlive > 0 ? Math.floor(damageDealt / timeAlive) : 0;
                hpText += ` | DPS: ${dps.toLocaleString()}`;
            }

            ctx.fillText(hpText, gameWidth / 2, mainBarY + mainBarHeight / 2 + 5);

            // Collapse/Expand toggle button
            const toggleSize = 30;
            const toggleX = gameWidth / 2 + mainBarWidth / 2 + 15;
            const toggleY = mainBarY - 5;

            // Draw button background
            ctx.fillStyle = 'rgba(255, 215, 0, 0.3)';
            ctx.fillRect(toggleX, toggleY, toggleSize, toggleSize);
            ctx.strokeStyle = '#FFD700';
            ctx.lineWidth = 2;
            ctx.strokeRect(toggleX, toggleY, toggleSize, toggleSize);

            // Draw arrow
            ctx.fillStyle = '#FFD700';
            ctx.font = 'bold 20px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(hpBarCollapsed ? '▼' : '▲', toggleX + toggleSize / 2, toggleY + toggleSize / 2);

            // Store toggle button rect for click detection
            hpBarToggleRect = { x: toggleX, y: toggleY, width: toggleSize, height: toggleSize };
        }

        // Draw Rainbow Cube main railgun effect directly (since it's unique)
        if (entity.isSummon && entity.type.name === 'Rainbow Cube' && entity.mainRailgunCountRemaining > 0) {
            const target = findSummonTarget(entity);
            if (target && target.hp > 0) {
                ctx.strokeStyle = 'purple';
                ctx.lineWidth = 6;
                ctx.beginPath();
                ctx.moveTo(entity.x, entity.y);
                ctx.lineTo(target.x, target.y);
                ctx.stroke();
                ctx.strokeStyle = 'white';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(entity.x, entity.y);
                ctx.lineTo(target.x, target.y);
                ctx.stroke();
            }
        }
    }

    // Raygunner line projectile (exclusive to Raygunner tower)
    for (const tower of towers) {
        if (tower.type.name === 'Raygunner' && tower.isFiring && tower.target && tower.target.hp > 0) {
            ctx.strokeStyle = tower.type.color;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(tower.x, tower.y);
            ctx.lineTo(tower.target.x, tower.target.y);
            ctx.stroke();
        }
    }

    // Draw projectiles
    for (const projectile of projectiles) {
        ctx.strokeStyle = projectile.color;
        ctx.lineWidth = projectile.width;
        ctx.beginPath();
        ctx.moveTo(projectile.x1, projectile.y1);
        ctx.lineTo(projectile.x2, projectile.y2);
        ctx.stroke();
    }
}

// Damage base
function damageBase(enemy) {
    if (invincible || isGameOver) return; // Invincibility cheat or already game over

    // ═══════════════════════════════════════════════════════════════
    // OMEGA BOSS LOOP SYSTEM
    // Instead of damaging base, Omega loops back to start
    // ═══════════════════════════════════════════════════════════════
    if (enemy.type.loopcount) {
        // Initialize loop tracking if not set
        if (typeof enemy.loopsRemaining === 'undefined') {
            // Use insaneLoopcount for Straight Line map, otherwise normal loopcount
            const isStraightLine = currentMap === MAP_TYPES.STRAIGHT;
            enemy.loopsRemaining = isStraightLine ?
                (enemy.type.insaneLoopcount || 3) :
                (enemy.type.loopcount || 2);
            console.log(`Omega Boss initialized with ${enemy.loopsRemaining} loops (${isStraightLine ? 'Straight Line' : 'Standard'} map)`);
        }

        if (enemy.loopsRemaining > 0) {
            enemy.loopsRemaining--;
            console.log(`Omega Boss looped! Loops remaining: ${enemy.loopsRemaining}`);

            // Reset to start of path
            enemy.distanceTraveled = 0;
            enemy.x = path[0].x;
            enemy.y = path[0].y;

            // Spawn 2 Omega Summons on each loop
            const omegaSummonType = ENEMY_TYPES.omegasummon_nm;
            if (omegaSummonType) {
                for (let j = 0; j < 2; j++) {
                    const newEnemy = {
                        type: omegaSummonType,
                        x: enemy.x + (j * 30), // Slight offset
                        y: enemy.y,
                        hp: omegaSummonType.baseHp,
                        maxHp: omegaSummonType.baseHp,
                        shield: omegaSummonType.hasShield ? omegaSummonType.shieldHp : 0,
                        maxShield: omegaSummonType.hasShield ? omegaSummonType.shieldHp : 0,
                        speed: omegaSummonType.speed,
                        distanceTraveled: 0,
                        size: omegaSummonType.size,
                        isSummoned: true
                    };
                    enemies.push(newEnemy);
                }
                console.log(`Omega Boss spawned 2 Omega Summons!`);
            }

            // Don't damage base - return false so enemy is NOT removed from array
            return false;
        }
        // If no loops remaining, proceed to damage base normally
    }
    // ═══════════════════════════════════════════════════════════════
    // END OMEGA BOSS LOOP SYSTEM
    // ═══════════════════════════════════════════════════════════════

    // Scale leak damage by remaining HP so weakened enemies leak for less.
    const maxHp = Number.isFinite(enemy.maxHp) && enemy.maxHp > 0 ? enemy.maxHp : enemy.type.baseHp;
    const currentHp = Number.isFinite(enemy.hp) ? Math.max(0, enemy.hp) : maxHp;
    const hpRatio = Math.max(0, Math.min(1, currentHp / maxHp));
    const damage = Math.max(1, Math.floor(currentHp));
    baseHp -= damage;
    if (baseHp <= 0 && !isGameOver) gameOver();
    baseHpDisplay.textContent = Math.max(0, baseHp);
}

// Game over
function gameOver() {
    if (isGameOver) return; // Prevent multiple triggers
    isGameOver = true;

    // Clear all Beta Protocol timeouts
    betaProtocolTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
    betaProtocolTimeouts = [];

    // Clear carrier units
    if (typeof clearCarrierUnits === 'function') clearCarrierUnits();

    // Show styled game over modal
    showGameEndModal('💀 GAME OVER', 'Your base was destroyed!', '#FF4444', '#880000');
}

// Game won
function gameWon() {
    // Clear all Beta Protocol timeouts
    betaProtocolTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
    betaProtocolTimeouts = [];

    // Clear carrier units
    if (typeof clearCarrierUnits === 'function') clearCarrierUnits();

    // Show styled victory modal
    showGameEndModal('🏆 VICTORY!', `You've completed ${currentGameMode.name} mode!`, '#00FF88', '#006633');
}

// Show game end modal
function showGameEndModal(title, message, primaryColor, backgroundColor) {
    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.id = 'gameEndOverlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.85);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        animation: fadeIn 0.3s ease;
    `;

    // Create modal content
    const modal = document.createElement('div');
    modal.style.cssText = `
        background: linear-gradient(135deg, ${backgroundColor}, #1a1a2e);
        border: 3px solid ${primaryColor};
        border-radius: 20px;
        padding: 40px 60px;
        text-align: center;
        box-shadow: 0 0 50px ${primaryColor}66, 0 0 100px ${primaryColor}33;
        animation: scaleIn 0.4s ease;
    `;

    modal.innerHTML = `
        <h1 style="color: ${primaryColor}; font-size: 48px; margin: 0 0 20px 0; text-shadow: 0 0 20px ${primaryColor}88;">${title}</h1>
        <p style="color: #fff; font-size: 20px; margin: 0 0 30px 0; opacity: 0.9;">${message}</p>
        <p style="color: #aaa; font-size: 14px; margin: 0 0 30px 0;">Wave Reached: ${waveNumber}</p>
        <button id="gameEndBtn" style="
            background: linear-gradient(135deg, ${primaryColor}, ${backgroundColor});
            border: 2px solid ${primaryColor};
            color: #fff;
            font-size: 18px;
            font-weight: bold;
            padding: 15px 50px;
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 5px 20px ${primaryColor}44;
        ">Return to Menu</button>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes scaleIn { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        #gameEndBtn:hover { transform: translateY(-3px); box-shadow: 0 8px 30px ${primaryColor}66; }
    `;
    document.head.appendChild(style);

    // Button click handler
    document.getElementById('gameEndBtn').addEventListener('click', () => {
        overlay.remove();
        style.remove();
        showMainMenu();
    });
}

// Reset game
function resetGame(newGame = false) {
    // Clear all towers from the grid first
    for (let y = 0; y < gridHeight; y++) {
        for (let x = 0; x < gridWidth; x++) {
            if (gameGrid[y] && gameGrid[y][x]) {
                gameGrid[y][x].tower = null;
            }
        }
    }

    // Clear all Beta Protocol timeouts
    betaProtocolTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
    betaProtocolTimeouts = [];

    // Reset all game state variables
    if (currentGameMode.name === "Boss Rush" && newGame) {
        console.log("Initializing Boss Rush mode with 1,000,000 cash");
        cash = 1000000;
    } else if (currentGameMode.startingCash && newGame) {
        console.log(`Initializing ${currentGameMode.name} mode with ${currentGameMode.startingCash} cash`);
        cash = currentGameMode.startingCash;
    } else {
        cash = 250 * (newGame ? currentGameMode.cashMultiplier : 1);
    }
    waveNumber = 0;
    baseHp = BASE_HP;
    towers = [];
    enemies = [];
    activeWaves = []; // Clear active waves
    explosions = [];
    cashEffects = [];
    farmCount = 0;
    eliteSpawnerCount = 0;
    gunnerParagonCount = 0;
    sniperParagonCount = 0;
    gunnerPoints = 0;
    railgunShots = [];
    projectiles = [];
    lastAbilityTime = 0;
    lastOrbitalStrikeTime = 0;
    lastGlobalFactorySpawnTime = 0; // Reset global factory cooldown
    waveActive = false;
    waveTimer = 0;
    selectedCell = null;
    hoveredEnemy = null;
    selectedTower = null;
    window.currentSelectedTower = null;
    currentInfoTower = null;
    orbitalStrikeActive = false;
    orbitalStrikeData = null;
    isGameOver = false; // Reset game over flag

    // Clear all Carrier Cube units
    if (typeof clearCarrierUnits === 'function') clearCarrierUnits();

    // Update UI
    updateCashDisplay();
    waveDisplay.textContent = waveNumber;
    baseHpDisplay.textContent = baseHp;
    nextWaveBtn.textContent = "Start Wave";
    nextWaveBtn.disabled = false;
    skipWaveBtn.disabled = true;

    // Hide any tower info panel
    towerInfoPanel.style.display = 'none';
    document.getElementById('carrierSpawnPanel').style.display = 'none';
    currentInfoTower = null;

    // Recreate the grid and path
    createGrid();
    createPath();

    console.log(`Game reset successfully! Mode: ${currentGameMode.name}, Map: ${currentMap.name}`);
}


// Update cash effects
function updateCashEffects(timestamp) {
    cashEffects = cashEffects.filter(effect => {
        effect.time += 16;
        effect.alpha = 1 - (effect.time / 1000);
        return effect.time < 1000;
    });
}

// Check wave complete
function checkWaveComplete() {
    // Don't check for wave completion if game is already over
    if (isGameOver) return;

    const allWavesDone = activeWaves.length === 0;
    const noEnemiesLeft = enemies.filter(e => !e.isSummon).length === 0;

    if (waveActive && allWavesDone && noEnemiesLeft) {
        waveActive = false;
        waveTimer = 0;

        if (waveNumber >= currentGameMode.waves && currentGameMode.name !== 'Endless') {
            gameWon();
            return;
        }

        nextWaveBtn.textContent = "Start Wave";
        nextWaveBtn.disabled = false;
        skipWaveBtn.disabled = true;

        // Apply cash multiplier
        const waveCashReward = Math.floor(60 * Math.pow(1.1, waveNumber - 1) * currentGameMode.cashMultiplier);
        cash += waveCashReward;
        generateFarmCash();
        updateCashDisplay();

        // Auto-start next wave after 3 seconds
        setTimeout(() => {
            if (!waveActive) {
                startNextWave();
            }
        }, 3000);
    }
}




// Update Carrier Cube Towers (Efficiency Module & Per-Unit Cooldowns)
function updateCarrierCubes(timestamp) {
    towers.forEach(tower => {
        if (tower.type !== TOWER_TYPES.CARRIER_CUBE) return;

        // Initialize state if needed
        if (typeof tower.em === 'undefined') tower.em = 0;
        if (!tower.lastEmUpdate) tower.lastEmUpdate = timestamp;
        if (!tower.unitState) tower.unitState = {};

        // Efficiency Module Generation (level-based: L1 = 1/s, L2 = 2/s)
        const levelStats = tower.type.levels[tower.level - 1];
        const emGain = levelStats.emGainPerSec || 1;
        const emCap = levelStats.emCap || tower.type.efficiencyCap || 20;

        if (timestamp - tower.lastEmUpdate >= 1000) {
            if (tower.em < emCap) {
                tower.em = Math.min(tower.em + emGain, emCap);
                // Update UI if this tower is selected
                if (currentInfoTower === tower) {
                    showTowerInfo(tower);
                    showCarrierSpawnUI(tower);
                }
            }
            tower.lastEmUpdate = timestamp;
        }

        // Per-Unit Cooldown Management
        const allUnits = [CARRIER_UNITS.BOMBER, CARRIER_UNITS.BLISMA, CARRIER_UNITS.REFRACTOR, CARRIER_UNITS.MOAB, CARRIER_UNITS.GOLIATH];
        let stateChanged = false;

        allUnits.forEach(unitType => {
            if (!tower.unitState[unitType.name]) return;

            const unitState = tower.unitState[unitType.name];
            const currentTime = performance.now();

            // Check if cooldown has expired
            if (unitState.cooldownEndTime > 0 && currentTime >= unitState.cooldownEndTime) {
                // State transitions on cooldown expiry
                if (unitState.cooldownState === 'COOLDOWN') {
                    unitState.cooldownState = 'READY';
                    unitState.usageCount = 0;
                    stateChanged = true;
                } else if (unitState.cooldownState === 'FULL_COOLDOWN') {
                    unitState.cooldownState = 'READY';
                    unitState.usageCount = 0;
                    stateChanged = true;
                } else if (unitState.cooldownState === 'PAYBACK') {
                    unitState.cooldownState = 'READY';
                    unitState.usageCount = 0;
                    stateChanged = true;
                }
                unitState.cooldownEndTime = 0;
            }
        });

        // Update UI if state changed and this tower is selected
        if (stateChanged && currentInfoTower === tower) {
            showTowerInfo(tower);
            showCarrierSpawnUI(tower);
        }
    });
}

// Trigger Carrier Ability
function triggerCarrierAbility(tower, unitType) {
    // Initialize per-unit state tracking
    if (!tower.unitState) tower.unitState = {};
    if (!tower.unitState[unitType.name]) {
        tower.unitState[unitType.name] = {
            cooldownState: 'READY',
            usageCount: 0,
            cooldownEndTime: 0
        };
    }

    const unitState = tower.unitState[unitType.name];
    const currentTime = performance.now();

    // Check if unit is in payback (locked)
    if (unitState.cooldownState === 'PAYBACK' && currentTime < unitState.cooldownEndTime) {
        return; // Locked
    }

    // Check if on individual cooldown
    if (unitState.cooldownState === 'COOLDOWN' && currentTime < unitState.cooldownEndTime) {
        // Can still use during cooldown, but increments usage
    }

    // Check if not enough EM
    if ((tower.em || 0) < unitType.emCost) return;

    // Check hard limit - if exceeded during full cooldown, trigger payback
    if (unitState.cooldownState === 'FULL_COOLDOWN' && currentTime < unitState.cooldownEndTime) {
        if (unitState.usageCount >= (unitType.hardLimit || 3)) {
            unitState.cooldownState = 'PAYBACK';
            unitState.cooldownEndTime = currentTime + (unitType.paybackCooldown || 20000);
            console.log(`${unitType.name} Payback Cooldown Triggered!`);
            showTowerInfo(tower);
            showCarrierSpawnUI(tower);
            return;
        }
    }

    // Deduct EM
    tower.em -= unitType.emCost;

    // Initialize per-unit cooldowns if not exists
    if (!tower.unitCooldowns) tower.unitCooldowns = {};

    // Set cooldown for THIS unit (for UI display)
    tower.unitCooldowns[unitType.name] = currentTime + unitType.cooldown;

    // Spawn Unit
    if (unitType === CARRIER_UNITS.BOMBER) {
        // Enter targeting mode
        enterCarrierTargetingMode(tower, unitType);
        return;
    }

    // Other units spawn immediately
    spawnCarrierUnit(unitType, tower);

    // Update Cooldowns
    handleCarrierCooldown(tower, unitType);

    showTowerInfo(tower);
    showCarrierSpawnUI(tower);
}

// Handle Carrier Cooldown Logic (per unit type)
function handleCarrierCooldown(tower, unitType) {
    if (!tower.unitState) tower.unitState = {};
    if (!tower.unitState[unitType.name]) {
        tower.unitState[unitType.name] = {
            cooldownState: 'READY',
            usageCount: 0,
            cooldownEndTime: 0
        };
    }

    const unitState = tower.unitState[unitType.name];
    const currentTime = performance.now();
    const limit = unitType.limit || 2;
    const hardLimit = unitType.hardLimit || 3;

    unitState.usageCount++;

    if (unitState.cooldownState === 'READY' ||
        (unitState.cooldownState === 'COOLDOWN' && currentTime >= unitState.cooldownEndTime)) {
        unitState.cooldownState = 'COOLDOWN';
        unitState.cooldownEndTime = currentTime + (unitType.cooldown || 5000);
    }

    // Check if we hit the limit -> trigger full cooldown
    if (unitState.usageCount >= limit && unitState.cooldownState === 'COOLDOWN') {
        unitState.cooldownState = 'FULL_COOLDOWN';
        unitState.cooldownEndTime = currentTime + (unitType.fullCooldown || 15000);
    }

    // Check if we hit the hard limit during full cooldown -> trigger payback
    if (unitState.usageCount >= hardLimit && unitState.cooldownState === 'FULL_COOLDOWN') {
        unitState.cooldownState = 'PAYBACK';
        unitState.cooldownEndTime = currentTime + (unitType.paybackCooldown || 20000);
    }
}

// Carrier Targeting Mode
let carrierTargetingMode = false;
let carrierTargetingUnit = null;
let carrierTargetingTower = null;

function enterCarrierTargetingMode(tower, unitType) {
    carrierTargetingMode = true;
    carrierTargetingUnit = unitType;
    carrierTargetingTower = tower;
    canvas.style.cursor = 'crosshair';

    // Add temporary click listener for targeting
    const targetingHandler = (e) => {
        if (!carrierTargetingMode) {
            canvas.removeEventListener('click', targetingHandler);
            return;
        }

        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Spawn unit at target
        spawnCarrierUnit(carrierTargetingUnit, carrierTargetingTower, mouseX, mouseY);

        // Update Cooldowns
        handleCarrierCooldown(carrierTargetingTower, carrierTargetingUnit);

        // Exit targeting mode
        carrierTargetingMode = false;
        carrierTargetingUnit = null;
        carrierTargetingTower = null;
        canvas.style.cursor = 'default';
        canvas.removeEventListener('click', targetingHandler);

        showTowerInfo(tower);
        showCarrierSpawnUI(tower);
        e.stopPropagation(); // Prevent selecting other things
    };

    // Use capture to handle it before the main canvas click handler
    canvas.addEventListener('click', targetingHandler, { capture: true, once: true });
}

// Start the game when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    initGame();
});
