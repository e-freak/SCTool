/**
 * sctool.js
 * 
 * @author yuki
 */

'use strict';

// importにすると動かないのはなんで？
//import MainWindow from './app/script/main-window';
const MainWindow = require('./app/script/main-window');

class Main {
    constructor(){
        this.mainWindow = new MainWindow();
    }

}

const main = new Main();

/*
const electron = require('electron');

let mainWindow;

electron.app.on('window-all-closed', () => {
    if (process.platform != 'darwin') {
        electron.app.quit();
    }
});

electron.app.on('ready', () => {
    mainWindow = new electron.BrowserWindow({ width: 1240, height: 800, resizable: false, useContentSize: true });
    mainWindow.loadURL(`file://${__dirname}/app/view/main.html`);
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
});

*/