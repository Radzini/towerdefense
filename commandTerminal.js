// ========================================
// COMMAND TERMINAL SYSTEM - CMDR Style
// ========================================

class CommandTerminal {
    constructor() {
        this.commands = new Map();
        this.history = [];
        this.historyIndex = -1;
        this.outputElement = null;
        this.inputElement = null;
        this.hintElement = null;
        this.suggestionsElement = null;
        this.selectedSuggestionIndex = -1;
        this.currentSuggestions = [];
        this.currentInput = '';

        // Register built-in commands
        this.registerBuiltInCommands();
    }

    // ========================================
    // COMMAND REGISTRATION
    // ========================================

    registerCommand(name, config) {
        this.commands.set(name.toLowerCase(), {
            name: name,
            description: config.description,
            parameters: config.parameters || [],
            execute: config.execute,
            examples: config.examples || []
        });
    }

    registerBuiltInCommands() {
        // SUMMON COMMAND - Custom entity spawning
        this.registerCommand('Summon', {
            description: 'Spawn a custom entity with specific stats',
            parameters: [
                { name: 'name', type: 'string', required: true, description: 'Entity name' },
                { name: 'size', type: 'number', required: true, description: 'Size in pixels' },
                { name: 'showHpBar', type: 'boolean', required: true, description: 'Show HP bar?' },
                { name: 'isBoss', type: 'boolean', required: true, description: 'Is Boss?' },
                { name: 'hp', type: 'number', required: true, description: 'Health Points' },
                { name: 'speed', type: 'number', required: true, description: 'Movement Speed' },
                { name: 'shp', type: 'number', required: true, description: 'Shield HP' },
                { name: 'isAlly', type: 'boolean', required: true, description: 'Is Ally?' }
            ],
            examples: [
                'Summon CustomEnemy 30 true true 5000 0.5 2000 true',
                'Summon Test 20 false false 100 1 0 false'
            ],
            execute: (args) => {
                const [name, size, showHpBar, isBoss, hp, speed, shp, isAlly] = args;

                if (typeof window.spawnEntity !== 'function' || !window.path || window.path.length === 0) {
                    return {
                        success: false,
                        message: '❌ Error: Game not running or path not initialized'
                    };
                }

                const customEntity = {
                    name: name,
                    size: size,
                    baseHp: hp,
                    speed: speed,
                    color: isAlly ? '#00FF00' : '#FF00FF', // Green for ally, Magenta for custom enemy
                    isBoss: isBoss,
                    showHpBar: showHpBar,
                    hasShield: shp > 0,
                    shieldHp: shp
                };

                // Determine spawn position based on isAlly
                // If isAlly is true, we treat it as a summon (spawn at end) or just pass the flag
                const startPos = isAlly ? window.path[window.path.length - 1] : window.path[0];

                window.spawnEntity(customEntity, startPos.x, startPos.y, isAlly, isAlly);

                return {
                    success: true,
                    message: `✅ Summoned ${isAlly ? 'Ally' : 'Enemy'}: ${name} (HP: ${hp}, Speed: ${speed})`
                };
            }
        });

        // SPAWN COMMAND - Spawn enemies or units
        this.registerCommand('Spawn', {
            description: 'Spawn an enemy or unit by name',
            parameters: [
                { name: 'name', type: 'entity', required: true, description: 'Enemy or Unit name (from ENEMY_TYPES or SUMMON_TYPES)' }
            ],
            examples: [
                'Spawn red_cube',
                'Spawn PARAGON_ALPHA',
                'Spawn boss_cube'
            ],
            execute: (args) => {
                const name = args[0];

                if (typeof window.spawnEntity !== 'function' || !window.path || window.path.length === 0) {
                    return {
                        success: false,
                        message: '❌ Error: Game not running or path not initialized'
                    };
                }

                // Case-insensitive lookup for Enemy Types
                let enemyKey = null;
                if (window.ENEMY_TYPES) {
                    if (window.ENEMY_TYPES[name]) enemyKey = name;
                    else {
                        enemyKey = Object.keys(window.ENEMY_TYPES).find(k => k.toLowerCase() === name.toLowerCase());
                    }
                }

                if (enemyKey) {
                    const enemyType = window.ENEMY_TYPES[enemyKey];
                    const startPos = window.path[0];
                    window.spawnEntity(enemyType, startPos.x, startPos.y, false, false);
                    return {
                        success: true,
                        message: `✅ Spawned enemy: ${enemyType.name}`
                    };
                }

                // Case-insensitive lookup for Summon Types
                let unitKey = null;
                if (window.SUMMON_TYPES) {
                    if (window.SUMMON_TYPES[name]) unitKey = name;
                    else {
                        unitKey = Object.keys(window.SUMMON_TYPES).find(k => k.toLowerCase() === name.toLowerCase());
                    }
                }

                if (unitKey) {
                    const unitType = window.SUMMON_TYPES[unitKey];
                    const startPos = window.path[window.path.length - 1];
                    window.spawnEntity(unitType, startPos.x, startPos.y, true, true); // isSummon=true, isAlly=true for units
                    return {
                        success: true,
                        message: `✅ Spawned unit: ${unitType.name}`
                    };
                }

                return {
                    success: false,
                    message: `❌ Error: Unknown enemy or unit: ${name}. Type "Help Spawn" for examples.`
                };
            }
        });

        // HELP COMMAND
        this.registerCommand('Help', {
            description: 'Display help information for commands',
            parameters: [
                { name: 'command', type: 'string', required: false, description: 'Specific command to get help for' }
            ],
            examples: ['Help', 'Help Summon'],
            execute: (args) => {
                if (args.length === 0) {
                    // Show all commands
                    let helpText = '📚 Available Commands:\n\n';
                    this.commands.forEach((cmd, name) => {
                        helpText += `• ${cmd.name} - ${cmd.description}\n`;
                    });
                    helpText += '\nType "Help <command>" for detailed information about a specific command.';
                    return { success: true, message: helpText };
                } else {
                    // Show specific command help
                    const cmdName = args[0].toLowerCase();
                    const cmd = this.commands.get(cmdName);
                    if (!cmd) {
                        return { success: false, message: `❌ Command not found: ${args[0]}` };
                    }

                    let helpText = `📖 Help: ${cmd.name}\n\n`;
                    helpText += `Description: ${cmd.description}\n\n`;

                    if (cmd.parameters.length > 0) {
                        helpText += 'Parameters:\n';
                        cmd.parameters.forEach(param => {
                            const req = param.required ? 'Required' : 'Optional';
                            helpText += `  • ${param.name} (${param.type}) - ${req}\n`;
                            helpText += `    ${param.description}\n`;
                        });
                    }

                    if (cmd.examples.length > 0) {
                        helpText += '\nExamples:\n';
                        cmd.examples.forEach(ex => {
                            helpText += `  ${ex}\n`;
                        });
                    }

                    return { success: true, message: helpText };
                }
            }
        });

        // CLEAR COMMAND
        this.registerCommand('Clear', {
            description: 'Clear terminal output',
            parameters: [],
            examples: ['Clear'],
            execute: () => {
                if (this.outputElement) {
                    this.outputElement.innerHTML = '';
                }
                return { success: true, message: '' };
            }
        });

        // SET EMC COMMAND
        this.registerCommand('SetEMC', {
            description: 'Set Efficiency Module Count for selected Carrier Cube',
            parameters: [
                { name: 'amount', type: 'number', required: true, description: 'Amount of EM to set' }
            ],
            examples: ['SetEMC 20', 'SetEMC 0'],
            execute: (args) => {
                const amount = args[0];

                if (!window.currentSelectedTower) {
                    return { success: false, message: '❌ No tower selected' };
                }

                if (window.currentSelectedTower.type.name !== 'Carrier Cube') {
                    return { success: false, message: '❌ Selected tower is not a Carrier Cube' };
                }

                // Bypass cap for command
                window.currentSelectedTower.em = amount;

                // Update UI
                if (typeof window.showTowerInfo === 'function') {
                    window.showTowerInfo(window.currentSelectedTower);
                }
                if (typeof window.showCarrierSpawnUI === 'function') {
                    window.showCarrierSpawnUI(window.currentSelectedTower);
                }

                return { success: true, message: `✅ Set EMC to ${window.currentSelectedTower.em}` };
            }
        });
    }

    // ========================================
    // COMMAND PARSER
    // ========================================

    parseCommand(input) {
        const tokens = this.tokenize(input);
        if (tokens.length === 0) {
            return { error: 'Empty command' };
        }

        const commandName = tokens[0].toLowerCase();
        const command = this.commands.get(commandName);

        if (!command) {
            return { error: `Command not found: ${tokens[0]}` };
        }

        const args = tokens.slice(1);
        const parsedArgs = [];

        // Validate and convert arguments
        for (let i = 0; i < command.parameters.length; i++) {
            const param = command.parameters[i];

            if (i >= args.length) {
                if (param.required) {
                    return { error: `Missing required parameter: ${param.name}` };
                }
                break;
            }

            const argValue = args[i];
            let convertedValue;

            try {
                convertedValue = this.convertType(argValue, param.type);
            } catch (e) {
                return { error: `Invalid type for parameter '${param.name}': expected ${param.type}, got '${argValue}'` };
            }

            parsedArgs.push(convertedValue);
        }

        return {
            command: command,
            args: parsedArgs
        };
    }

    tokenize(input) {
        // Split by spaces but respect quoted strings
        const regex = /[^\s"]+|"([^"]*)"/gi;
        const tokens = [];
        let match;

        while ((match = regex.exec(input)) !== null) {
            tokens.push(match[1] || match[0]);
        }

        return tokens;
    }

    convertType(value, type) {
        switch (type) {
            case 'string':
                return String(value);
            case 'number':
                const num = Number(value);
                if (isNaN(num)) {
                    throw new Error(`Cannot convert '${value}' to number`);
                }
                return num;
            case 'boolean':
                const lower = value.toLowerCase();
                if (lower === 'true' || lower === '1') return true;
                if (lower === 'false' || lower === '0') return false;
                throw new Error(`Cannot convert '${value}' to boolean`);
            case 'entity':
                // Entity types are just strings (keys from ENEMY_TYPES or SUMMON_TYPES)
                return String(value);
            default:
                return value;
        }
    }

    // ========================================
    // AUTO-COMPLETION
    // ========================================

    getEntitySuggestions(input) {
        const suggestions = [];

        // Get all enemy types
        if (window.ENEMY_TYPES) {
            Object.keys(window.ENEMY_TYPES).forEach(key => {
                const enemy = window.ENEMY_TYPES[key];
                suggestions.push({
                    key: key,
                    name: enemy.name,
                    type: 'enemy'
                });
            });
        }

        // Get all unit types
        if (window.SUMMON_TYPES) {
            Object.keys(window.SUMMON_TYPES).forEach(key => {
                const unit = window.SUMMON_TYPES[key];
                suggestions.push({
                    key: key,
                    name: unit.name,
                    type: 'unit'
                });
            });
        }

        // Filter by input and sort alphabetically
        if (input) {
            return suggestions
                .filter(s => s.key.toLowerCase().startsWith(input.toLowerCase()))
                .sort((a, b) => a.key.localeCompare(b.key));
        }

        return suggestions.sort((a, b) => a.key.localeCompare(b.key));
    }

    getAutocompletion(input) {
        const tokens = this.tokenize(input);

        if (tokens.length === 0) {
            return { hint: '', fullSignature: '', suggestions: [] };
        }

        const commandName = tokens[0].toLowerCase();
        const command = this.commands.get(commandName);

        if (!command) {
            // Show matching command names
            const matches = Array.from(this.commands.keys())
                .filter(name => name.startsWith(commandName));

            if (matches.length === 1) {
                const cmd = this.commands.get(matches[0]);
                return {
                    hint: this.buildCommandSignature(cmd),
                    fullSignature: this.buildCommandSignature(cmd),
                    suggestions: []
                };
            } else if (matches.length > 1) {
                return {
                    hint: `Matching commands: ${matches.join(', ')}`,
                    fullSignature: '',
                    suggestions: []
                };
            }
            return { hint: '', fullSignature: '', suggestions: [] };
        }

        // Handle entity type auto-complete for Spawn command
        if (commandName === 'spawn' && tokens.length >= 1) {
            const searchTerm = tokens.length > 1 ? tokens[1] : '';
            const suggestions = this.getEntitySuggestions(searchTerm);

            return {
                hint: `Spawn <entity> - ${suggestions.length} matches`,
                fullSignature: 'Spawn <entity>',
                suggestions: suggestions,
                currentParam: 'entity'
            };
        }

        // Build signature with current parameter highlighted
        const currentParamIndex = tokens.length - 1;
        const signature = this.buildCommandSignature(command, currentParamIndex);

        return {
            hint: signature,
            fullSignature: signature,
            suggestions: []
        };
    }

    buildCommandSignature(command, currentParamIndex = -1) {
        let sig = command.name;

        command.parameters.forEach((param, index) => {
            const paramStr = `<${param.name}>`;
            if (index === currentParamIndex) {
                sig += ` [${paramStr}]`; // Highlight current parameter with brackets
            } else {
                sig += ` ${paramStr}`;
            }
        });

        return sig;
    }

    // ========================================
    // EXECUTION
    // ========================================

    executeCommand(input) {
        if (!input.trim()) {
            return;
        }

        // Add to history
        this.history.push(input);
        this.historyIndex = this.history.length;

        // Parse and execute
        const parsed = this.parseCommand(input);

        if (parsed.error) {
            this.addOutput(`❌ Error: ${parsed.error}`, 'error');
            return;
        }

        try {
            const result = parsed.command.execute(parsed.args);
            if (result.message) {
                this.addOutput(result.message, result.success ? 'success' : 'error');
            }
        } catch (error) {
            this.addOutput(`❌ Execution error: ${error.message}`, 'error');
        }
    }

    // ========================================
    // UI MANAGEMENT
    // ========================================

    initialize(outputElement, inputElement, hintElement) {
        this.outputElement = outputElement;
        this.inputElement = inputElement;
        this.hintElement = hintElement;

        // Create suggestions dropdown
        const suggestionsDiv = document.createElement('div');
        suggestionsDiv.id = 'terminalSuggestions';
        suggestionsDiv.className = 'terminal-suggestions hidden';
        this.inputElement.parentNode.appendChild(suggestionsDiv);
        this.suggestionsElement = suggestionsDiv;

        // Setup event listeners
        this.inputElement.addEventListener('input', (e) => {
            this.currentInput = e.target.value;
            this.updateAutocompletion();
        });

        this.inputElement.addEventListener('keydown', (e) => {
            // Handle Tab key for auto-completion
            if (e.key === 'Tab') {
                e.preventDefault();
                if (this.currentSuggestions.length > 0) {
                    const index = this.selectedSuggestionIndex >= 0 ? this.selectedSuggestionIndex : 0;
                    this.applySuggestion(this.currentSuggestions[index]);
                }
                return;
            }

            // Handle Enter key
            if (e.key === 'Enter') {
                e.preventDefault();
                const input = this.inputElement.value.trim();
                if (input) {
                    this.addOutput(`> ${input}`, 'command');
                    this.executeCommand(input);
                    this.inputElement.value = '';
                    this.currentInput = '';
                    this.updateAutocompletion();
                }
                return;
            }

            // Handle Arrow Up/Down for suggestion navigation
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (this.currentSuggestions.length > 0) {
                    this.selectedSuggestionIndex = Math.max(-1, this.selectedSuggestionIndex - 1);
                    this.updateSuggestionsDisplay();
                } else {
                    this.navigateHistory(-1);
                }
                return;
            }

            if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (this.currentSuggestions.length > 0) {
                    this.selectedSuggestionIndex = Math.min(this.currentSuggestions.length - 1, this.selectedSuggestionIndex + 1);
                    this.updateSuggestionsDisplay();
                } else {
                    this.navigateHistory(1);
                }
                return;
            }
        });

        this.addOutput('💻 Command Terminal initialized. Type "Help" for available commands.', 'info');
    }

    updateAutocompletion() {
        const completion = this.getAutocompletion(this.currentInput);

        // Update hint
        if (this.hintElement) {
            this.hintElement.textContent = completion.hint;
        }

        // Update suggestions
        this.currentSuggestions = completion.suggestions || [];
        this.selectedSuggestionIndex = -1;
        this.updateSuggestionsDisplay();
    }

    updateSuggestionsDisplay() {
        if (!this.suggestionsElement) return;

        if (this.currentSuggestions.length === 0) {
            this.suggestionsElement.classList.add('hidden');
            return;
        }

        this.suggestionsElement.classList.remove('hidden');
        this.suggestionsElement.innerHTML = '';

        this.currentSuggestions.forEach((suggestion, index) => {
            const div = document.createElement('div');
            div.className = 'suggestion-item';
            if (index === this.selectedSuggestionIndex) {
                div.classList.add('selected');
            }

            const typeIcon = suggestion.type === 'enemy' ? '👾' : '⭐';
            div.innerHTML = `<span class="suggestion-icon">${typeIcon}</span><span class="suggestion-key">${suggestion.key}</span><span class="suggestion-name">${suggestion.name}</span>`;

            div.addEventListener('click', () => {
                this.applySuggestion(suggestion);
            });

            this.suggestionsElement.appendChild(div);
        });
    }

    applySuggestion(suggestion) {
        const tokens = this.tokenize(this.currentInput);
        if (tokens.length > 0) {
            tokens[tokens.length > 1 ? tokens.length - 1 : tokens.length] = suggestion.key;
            this.inputElement.value = tokens.join(' ');
            this.currentInput = this.inputElement.value;
            this.inputElement.focus();
            this.updateAutocompletion();
        }
    }

    navigateHistory(direction) {
        const newIndex = this.historyIndex + direction;
        if (newIndex >= 0 && newIndex <= this.history.length) {
            this.historyIndex = newIndex;
            this.inputElement.value = newIndex === this.history.length ? '' : this.history[newIndex];
            this.currentInput = this.inputElement.value;
            this.updateAutocompletion();
        }
    }

    addOutput(text, type = 'normal') {
        if (!this.outputElement) return;

        const line = document.createElement('div');
        line.className = `terminal-line terminal-${type}`;
        line.textContent = text;

        // Handle multiline output
        if (text.includes('\n')) {
            line.style.whiteSpace = 'pre-wrap';
        }

        this.outputElement.appendChild(line);
        this.outputElement.scrollTop = this.outputElement.scrollHeight;
    }
}

// ========================================
// GLOBAL INSTANCE
// ========================================

window.commandTerminal = new CommandTerminal();
