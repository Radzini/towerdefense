const { contextBridge, ipcRenderer } = require('electron');
const fs = require('fs');
const path = require('path');

// Expose safe file system operations to the renderer
contextBridge.exposeInMainWorld('gameEditor', {
    // File Operations
    readFile: (filePath) => {
        try {
            return fs.readFileSync(filePath, 'utf8');
        } catch (e) {
            console.error('Read Error:', e);
            throw e;
        }
    },
    writeFile: (filePath, data) => {
        try {
            fs.writeFileSync(filePath, data);
            return true;
        } catch (e) {
            console.error('Write Error:', e);
            throw e;
        }
    },
    exists: (filePath) => fs.existsSync(filePath),
    copy: (src, dest) => {
        try {
            fs.copyFileSync(src, dest);
            return true;
        } catch (e) {
            console.error('Copy Error:', e);
            throw e;
        }
    },

    // Path Operations
    resolvePath: (...paths) => path.join(...paths),
    getDir: () => __dirname
});
