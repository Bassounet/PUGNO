const { app, BrowserWindow } = require('electron')
const electron = require('electron');
let win;
function createWindow() {
  win = new BrowserWindow({
        width: 600,
        height: 800,
	fullscreen: true,
        webPreferences: {
            nodeIntegration: true
        }
    })
    win.setMenuBarVisibility(false);
    win.loadFile('index.html');
    win.setFullScreen(true);

    const ret = electron.globalShortcut.register('Escape', function(){
      minimizeWindow();
   });
}

function minimizeWindow () {
    win.setFullScreen(false);
    win.maximize();
}

app.whenReady().then(createWindow)

app.on('will-quit', function(){
  electron.globalShortcut.unregister('Escape');
  electron.globalShortcut.unregisterAll();
});