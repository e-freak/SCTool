const {app, BrowserWindow} = require('electron');

export default class MainWindow{
    constructor(){
        this.window = null;
        this.start();
    }

    start(){
        app.on('window-all-closed', () => {
            if (process.platform != 'darwin') {
                app.quit();
            }
        });

        app.on('ready', () => { this.createWindow();});
    }

    createWindow(){
        this.window = new BrowserWindow({ width: 1240, height: 800, resizable: false, useContentSize: true });
        this.window.loadURL(`file://${__dirname}/../../app/view/main.html`);
        this.window.on('closed', () => {
            this.window = null;
        });
    }
}