const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // assuming we will have a preload script
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // For development, you might load from a dev server
  // For production, you would load the built index.html
  // mainWindow.loadURL('http://localhost:3000'); // Example for dev
  mainWindow.loadFile('public/index.html'); // Example for production build

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
