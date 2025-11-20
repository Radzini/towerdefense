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
    sniper: document.getElementById('sniperBtn'),
    rocketer: document.getElementById('rocketerBtn'),
    raygunner: document.getElementById('raygunnerBtn'),
    summoner: document.getElementById('summonerBtn'),
    farm: document.getElementById('farmBtn'),
    railgunner: document.getElementById('railgunnerBtn'),
    eliteSpawner: document.getElementById('eliteSpawnerBtn'),
    commander: document.getElementById('commanderBtn'),
    executive: document.getElementById('executiveBtn'),
    cubeFactory: document.getElementById('cubeFactoryBtn') // ADD THIS LINE
};

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
    }
};

// Map Configurations
const MAP_TYPES = {
    STANDARD: {
        name: "Standard",
        createPath: function (gridWidth, gridHeight) {
            const pathPoints = [
                { x: 0, y: Math.floor(gridHeight / 4) },
                { x: Math.floor(gridWidth / 2), y: Math.floor(gridHeight / 4) },
                { x: Math.floor(gridWidth / 2), y: Math.floor(gridHeight / 2) },
                { x: Math.floor(gridWidth / 4), y: Math.floor(gridHeight / 2) },
                { x: Math.floor(gridWidth / 4), y: Math.floor(3 * gridHeight / 4) },
                { x: gridWidth - 1, y: Math.floor(3 * gridHeight / 4) }
            ];
            return generatePathFromPoints(pathPoints);
        }
    },
    STRAIGHT: {
        name: "Straight Line",
        createPath: function (gridWidth, gridHeight) {
            const pathPoints = [
                { x: 0, y: Math.floor(gridHeight / 2) },
                { x: gridWidth - 1, y: Math.floor(gridHeight / 2) }
            ];
            return generatePathFromPoints(pathPoints);
        }
    },
    INTERSECTION: {
        name: "Intersection",
        createPath: function (gridWidth, gridHeight) {
            const pathPoints = [
                { x: 0, y: Math.floor(gridHeight / 4) },
                { x: Math.floor(gridWidth / 4), y: Math.floor(gridHeight / 4) },
                { x: Math.floor(gridWidth / 4), y: Math.floor(gridHeight / 2) },
                { x: Math.floor(3 * gridWidth / 4), y: Math.floor(gridHeight / 2) },
                { x: Math.floor(3 * gridWidth / 4), y: Math.floor(3 * gridHeight / 4) },
                { x: gridWidth - 1, y: Math.floor(3 * gridHeight / 4) }
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
// Removed: currentWaveData, currentGroupIndex, groupWaitTimer, isWaitingAfterGroup, enemiesToSpawn, lastSpawnTime

// Tower Types and Summon Types are now loaded from towers.js
// This keeps the codebase organized and makes stats easy to modify


// Enemy Types and Waves are now loaded from separate files (enemies.js and waves.js)
// This keeps the codebase organized and manageable

// Initialize game
function initGame() {
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
    // Set fixed canvas size for consistency across all devices
    canvas.width = 1400;
    canvas.height = 900;

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
    towerButtons.sniper.addEventListener('click', () => selectTowerType(TOWER_TYPES.SNIPER));
    towerButtons.rocketer.addEventListener('click', () => selectTowerType(TOWER_TYPES.ROCKETER));
    towerButtons.raygunner.addEventListener('click', () => selectTowerType(TOWER_TYPES.RAYGUNNER));
    towerButtons.summoner.addEventListener('click', () => selectTowerType(TOWER_TYPES.SUMMONER));
    towerButtons.farm.addEventListener('click', () => selectTowerType(TOWER_TYPES.FARM));
    towerButtons.railgunner.addEventListener('click', () => selectTowerType(TOWER_TYPES.RAILGUNNER));
    towerButtons.eliteSpawner.addEventListener('click', () => selectTowerType(TOWER_TYPES.ELITE_SPAWNER));
    towerButtons.commander.addEventListener('click', () => selectTowerType(TOWER_TYPES.COMMANDER));
    towerButtons.executive.addEventListener('click', () => selectTowerType(TOWER_TYPES.EXECUTIVE));
    towerButtons.cubeFactory.addEventListener('click', () => selectTowerType(TOWER_TYPES.CUBE_FACTORY)); // Added Cube Factory


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
        gameSpeed = gameSpeed === 1 ? 2 : 1;
        speedUpBtn.textContent = gameSpeed === 2 ? '⚡ Speed: x2' : '⚡ Speed x2';
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

        // Number keys for tower selection
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
        } else if (e.key === '0') { // Hotkey for Executive
            selectTowerType(TOWER_TYPES.EXECUTIVE);
        } else if (e.key === 'c' || e.key === 'C') { // Hotkey for Cube Factory
            selectTowerType(TOWER_TYPES.CUBE_FACTORY);
        }


        // Escape to cancel selection
        if (e.key === 'Escape') {
            selectedTower = null;
            updateTowerSelection();
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
    document.querySelector('#cubeFactoryBtn .tower-cost').textContent = '$' + TOWER_TYPES.CUBE_FACTORY.cost; // ADDED
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
            [TOWER_TYPES.CUBE_FACTORY]: towerButtons.cubeFactory // Added Cube Factory

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

    const clickedTower = towers.find(t => t.gridX === gridX && t.gridY === gridY);

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
        const hoveredTower = towers.find(t => t.gridX === gridX && t.gridY === gridY);
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
        infoHTML += `<div class="info-row"><div class="info-label">Summons:</div></div>`;
        currentStats.summons.forEach(summon => {
            infoHTML += `<div class="info-row"><div class="info-value">${SUMMON_TYPES[summon.type].name}: ${summon.spawnRate / 1000}s</div></div>`;
        });
    } else if (type.farm) {
        infoHTML += `
            <div class="info-row">
                <div class="info-label">Income/Wave</div>
                <div class="info-value">$${currentStats.cashPerWave}</div>
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
    } else {
        // Get Commander buffs
        const buffs = getCommanderBuffs(tower);
        const buffedDamage = Math.floor(currentStats.damage * (1 + buffs.damageBoost));
        const buffedRange = currentStats.range + buffs.rangeBoost;
        const buffedFireRate = currentStats.fireRate * (1 - buffs.fireRateBoost);

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
                <div class="info-label">Fire Rate</div>
                <div class="info-value">${(buffedFireRate / 1000).toFixed(2)}s${buffs.fireRateBoost > 0 ? ` (-${(buffs.fireRateBoost * 100).toFixed(0)}%)` : ''}</div>
            </div>
            <div class="info-row">
                <div class="info-label">DPS</div>
                <div class="info-value">${((buffedDamage / buffedFireRate) * 1000).toFixed(1)}/s</div>
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
            nextStats.summons.forEach(summon => {
                infoHTML += `<div class="info-row"><div class="info-value">${SUMMON_TYPES[summon.type].name}</div></div>`;
            });
        } else if (type.farm) {
            infoHTML += `
                <div class="info-row">
                    <div class="info-label">Next Income</div>
                    <div class="info-value">$${nextStats.cashPerWave}/wave</div>
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
    } else {
        abilityTowerBtn.style.display = 'none';
        ability2TowerBtn.style.display = 'none';
    }

    // Show the panel and buttons
    towerInfoPanel.style.display = 'flex';
    towerActions.style.display = 'block';

    // Store selected tower for timer display
    selectedTowerForTimer = tower;
}


// Sell tower
function sellTower(tower) {
    let towerSizeX = 1;
    let towerSizeY = 1;
    if (tower.type === TOWER_TYPES.GUNNER_PARAGON || tower.type === TOWER_TYPES.SNIPER_PARAGON || tower.type === TOWER_TYPES.ELITE_SPAWNER) {
        towerSizeX = 2; towerSizeY = 2;
    } else if (tower.type === TOWER_TYPES.CUBE_FACTORY) {
        towerSizeX = 3; towerSizeY = 3;
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
            x: gridX * GRID_SIZE + GRID_SIZE / 2,
            y: gridY * GRID_SIZE + GRID_SIZE / 2,
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
            x: gridX * GRID_SIZE + GRID_SIZE / 2,
            y: gridY * GRID_SIZE + GRID_SIZE / 2,
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
        isFiring: false
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
                    applyDamage(enemy, ORBITAL_STRIKE_STATS.CLUSTER_TICK_DAMAGE, 'explosive');
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
                applyDamage(enemy, ORBITAL_STRIKE_STATS.FINAL_EXPLOSION_DAMAGE, 'explosive');
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
            div.className = 'cashEffect';
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
function spawnEntity(entityType, x, y, isSummon = false) {
    // Apply Insane mode buffs
    let hp = entityType.hp || entityType.baseHp;
    let shield = entityType.hasShield ? (entityType.shieldHp || 0) : 0;
    let speed = entityType.speed;

    // Apply special Straight Line map stats (if they exist)
    if (currentMap === MAP_TYPES.STRAIGHT && !isSummon) {
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
}

function updateTowerInfoPeriodically(timestamp) {
    if (currentInfoTower && towers.includes(currentInfoTower) && timestamp - lastTowerInfoUpdate > 1000) {
        showTowerInfo(currentInfoTower);
    }
}

// Add debug cash
function addDebugCash() {
    cash += 500;
    updateCashDisplay();
}

// Game loop
function gameLoop(timestamp) {
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
        updateExplosions(timestamp);
        drawExplosions();
        drawRailgunShots();
        updateRailgunShots(timestamp);
        updateProjectiles(timestamp);
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
        const stats = selectedTower.levels[0];
        const rangeRadius = (stats.range || 0) * GRID_SIZE;

        // Draw range circle
        ctx.beginPath();
        ctx.arc(selectedCell.x * GRID_SIZE + GRID_SIZE / 2, selectedCell.y * GRID_SIZE + GRID_SIZE / 2, rangeRadius, 0, 2 * Math.PI);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.fill();

        // Draw tower placement preview square(s)
        ctx.fillStyle = selectedTower.color;
        ctx.globalAlpha = 0.6;
        let previewSizeX = 1;
        let previewSizeY = 1;

        if (selectedTower === TOWER_TYPES.GUNNER_PARAGON || selectedTower === TOWER_TYPES.SNIPER_PARAGON || selectedTower === TOWER_TYPES.ELITE_SPAWNER) {
            previewSizeX = 2; previewSizeY = 2;
        } else if (selectedTower === TOWER_TYPES.CUBE_FACTORY) {
            previewSizeX = 3; previewSizeY = 3;
        }
        ctx.fillRect(selectedCell.x * GRID_SIZE, selectedCell.y * GRID_SIZE, previewSizeX * GRID_SIZE, previewSizeY * GRID_SIZE);
        ctx.globalAlpha = 1.0;

    } else if (selectedCell) { // Showing range of an already placed tower
        const hoveredTower = towers.find(t => t.gridX === selectedCell.x && t.gridY === selectedCell.y);

        if (hoveredTower && !hoveredTower.type.farm && !hoveredTower.type.summons && !hoveredTower.type.support) {
            const stats = hoveredTower.type.levels[hoveredTower.level - 1];
            const buffs = hoveredTower.type.cannotBeBuffed ? { rangeBoost: 0 } : getCommanderBuffs(hoveredTower);
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

// Update towers
function updateTowers(timestamp) {
    for (const tower of towers) {
        if (!tower.type || !tower.type.levels || tower.level < 1 || tower.level > tower.type.levels.length) continue;
        const stats = tower.type.levels[tower.level - 1];

        // --- Summoner Logic ---
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
                    const timeSinceGlobalCooldown = performance.now() - lastGlobalFactorySpawnTime;
                    if (lastSummonTime !== 0 && timeSinceGlobalCooldown < tower.type.globalSpawnCooldown) {
                        // If global cooldown is active, update individual tower timer to reflect it
                        tower.lastSummonTimes[summon.type] = performance.now() - (tower.type.globalSpawnCooldown - timeSinceGlobalCooldown);
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
                    // --- Normal Summoner Towers (Elite Spawner, Summoner) ---
                    if (timestamp - lastSummonTime >= summon.spawnRate) {
                        spawnEntity(SUMMON_TYPES[summon.type], tower.x, tower.y, true);
                        tower.lastSummonTimes[summon.type] = timestamp;
                    }
                }
            });
        }
        // --- End Summoner Logic ---

        // --- Attacker Tower Logic ---
        else if (!tower.type.farm && !tower.type.support && stats.damage && stats.fireRate) {
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
            if (tower.target && isInRange(tower, tower.target) && timestamp - tower.lastFired >= buffedFireRate) {
                if (tower.type.aoe) {
                    const directHit = tower.target;
                    enemies.forEach(enemy => {
                        if (!enemy.isSummon && isInRange(tower, enemy)) {
                            const damage = enemy === directHit ? buffedDirectDamage : buffedDamage;
                            applyDamage(enemy, damage, 'explosive');
                        }
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
                        applyDamage(tower.target, buffedDamage);
                        tower.isFiring = true;
                    }
                } else if (tower.type.name === 'Railgunner') {
                    if (!tower.target.isSummon) {
                        applyDamage(tower.target, buffedDamage);
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
                        applyDamage(tower.target, buffedDamage);
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
                                            applyDamage(enemy, stats.explosionDamage);
                                        }
                                    }
                                });
                            }, stats.explosionDelay);
                        }
                    }
                } else {
                    if (!tower.target.isSummon) {
                        applyDamage(tower.target, buffedDamage);
                        ctx.strokeStyle = tower.type.color;
                        ctx.lineWidth = 2;
                        ctx.beginPath();
                        ctx.moveTo(tower.x, tower.y);
                        ctx.lineTo(tower.target.x, tower.target.y);
                        ctx.stroke();
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
function applyDamage(enemy, damage, damageType = 'normal') {
    let finalDamage = damage;

    // Apply resistances if enemy has them
    if (enemy.resistance) {
        // Apply global resistance first
        if (enemy.resistance.global) {
            finalDamage *= (1 - enemy.resistance.global);
        }

        // Apply specific damage type resistance
        if (damageType === 'explosive' && enemy.resistance.explosive) {
            finalDamage *= (1 - enemy.resistance.explosive);
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

    return finalDamage;
}

// Find target
function findTarget(tower) {
    const stats = tower.type.levels[tower.level - 1];
    const buffs = tower.type.cannotBeBuffed ? { rangeBoost: 0 } : getCommanderBuffs(tower);
    const rangeBonus = tower.type.rangeBonus || 0;
    const buffedRange = stats.range + buffs.rangeBoost + rangeBonus;

    let furthestEnemy = null;
    let maxDistanceTraveled = -Infinity;
    for (const enemy of enemies) {
        if (enemy.hp > 0 && !enemy.isSummon) {
            const distance = calculateDistance(tower.x, tower.y, enemy.x, enemy.y);
            if (distance <= buffedRange * GRID_SIZE && enemy.distanceTraveled > maxDistanceTraveled) {
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
    return calculateDistance(tower.x, tower.y, target.x, target.y) <= buffedRange * GRID_SIZE;
}

// Calculate distance
function calculateDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
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
            wave.waitTimer += 16; // Approx 1 frame
            const currentGroup = wave.data.groups[wave.groupIndex];

            if (wave.waitTimer >= currentGroup.waitAfter) {
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
        waveTimer += 16; // ~60fps
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
            // Step 1: Find target and process attacks (which might set entity.speed to 0 for Test Unit)
            const target = findSummonTarget(entity);
            if (target) {
                handleSummonAttacks(entity, target, timestamp);
            } else {
                // If no target, ensure it's moving at its base speed (for Test Unit to resume movement)
                entity.speed = entity.type.speed;
            }

            // Step 2: Move the entity based on its current speed (potentially 0 if it stopped for Test Unit)
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
            moveEntity(entity, false);
            if (entity.distanceTraveled >= getPathLength()) {
                damageBase(entity);
                enemies.splice(i, 1);
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
        if (entity.type.aoe) { // Orange Square or Beta Black
            const aoeRange = entity.type.aoeRange || 2; // Beta Black has 3 tile AOE
            enemies.forEach(enemy => {
                if (!enemy.isSummon && calculateDistance(entity.x, entity.y, enemy.x, enemy.y) <= entity.type.range * GRID_SIZE) {
                    const damage = enemy === target ? (entity.type.directDamage || entity.type.damage) : entity.type.damage;
                    applyDamage(enemy, damage, 'explosive');
                }
            });
            explosions.push({ x: target.x, y: target.y, size: 0, maxSize: aoeRange * GRID_SIZE, startTime: timestamp, duration: 500 });
            const projectileColor = entity.type.name.includes('Beta Black') ? '#1A1A1A' : 'orange';
            projectiles.push({ x1: entity.x, y1: entity.y, x2: target.x, y2: target.y, color: projectileColor, width: 2, startTime: timestamp, duration: 200 });
        } else { // Blue Square, Pink Square, Green Square, Beta Gray
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
    entity.distanceTraveled += entity.speed * direction;
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
                `HP: ${Math.floor(entity.hp).toLocaleString()} / ${entity.maxHp.toLocaleString()} | Shield: ${Math.floor(entity.shield).toLocaleString()}` :
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
    if (invincible) return; // Invincibility cheat
    const damage = Math.max(1, Math.floor(enemy.type.baseHp / 2));
    baseHp -= damage;
    if (baseHp <= 0) gameOver();
    baseHpDisplay.textContent = Math.max(0, baseHp);
}

// Game over
function gameOver() {
    // Clear all Beta Protocol timeouts
    betaProtocolTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
    betaProtocolTimeouts = [];

    alert('Game Over! Your base was destroyed.');
    showMainMenu();
}

// Game won
function gameWon() {
    // Clear all Beta Protocol timeouts
    betaProtocolTimeouts.forEach(timeoutId => clearTimeout(timeoutId));
    betaProtocolTimeouts = [];

    alert(`Congratulations! You've completed the ${currentGameMode.name} mode!`);
    showMainMenu();
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
    cash = 250 * (newGame ? currentGameMode.cashMultiplier : 1);
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

    // Update UI
    updateCashDisplay();
    waveDisplay.textContent = waveNumber;
    baseHpDisplay.textContent = baseHp;
    nextWaveBtn.textContent = "Start Wave";
    nextWaveBtn.disabled = false;
    skipWaveBtn.disabled = true;

    // Hide any tower info panel
    towerInfoPanel.style.display = 'none';
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




// Start the game when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    initGame();
});