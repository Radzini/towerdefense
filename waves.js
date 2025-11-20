// Wave Definitions Aggregator
// This file ensures all wave arrays are available globally.
// Individual wave files (Normal.js, Hard.js, etc.) should be loaded BEFORE this file.

// Ensure NORMAL_WAVES is defined
if (typeof NORMAL_WAVES === 'undefined') {
    if (typeof generateNormalWaves === 'function') {
        window.NORMAL_WAVES = generateNormalWaves();
    } else {
        console.warn("generateNormalWaves function not found. Initializing empty array.");
        window.NORMAL_WAVES = [];
    }
}

// Ensure HARDMODE_WAVES is defined
if (typeof HARDMODE_WAVES === 'undefined') {
    if (typeof generateHardWaves === 'function') {
        window.HARDMODE_WAVES = generateHardWaves();
    } else {
        console.warn("generateHardWaves function not found. Initializing empty array.");
        window.HARDMODE_WAVES = [];
    }
}

// Ensure INSANE_WAVES is defined
if (typeof INSANE_WAVES === 'undefined') {
    if (typeof generateInsaneWaves === 'function') {
        window.INSANE_WAVES = generateInsaneWaves();
    } else {
        window.INSANE_WAVES = [];
    }
}

// Ensure EXTRA_WAVES is defined
if (typeof EXTRA_WAVES === 'undefined') {
    if (typeof generateExtraWaves === 'function') {
        window.EXTRA_WAVES = generateExtraWaves();
    } else {
        window.EXTRA_WAVES = [];
    }
}

// Ensure EXTRA_WAVES is defined
if (typeof EXTRA_WAVES === 'undefined') {
    if (typeof generateExtraWaves === 'function') {
        window.EXTRA_WAVES = generateExtraWaves();
    } else {
        window.EXTRA_WAVES = [];
    }
}

console.log("Wave definitions loaded:", {
    Normal: NORMAL_WAVES.length,
    Hard: HARDMODE_WAVES.length,
    Insane: INSANE_WAVES.length,
    Extra: EXTRA_WAVES.length
});
