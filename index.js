const { app, BrowserWindow } = require('electron');

let window = null;

app.on('ready', () => {
  window = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    webPreferences: {
      nodeIntegration: true, // Enable node integration
    }
  });


  window.loadURL("https://scipotech.netlify.app");

  window.once('ready-to-show', () => {
    window.maximize();
    window.show();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
