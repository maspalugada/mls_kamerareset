const { app, BrowserWindow, ipcMain, desktopCapturer } = require('electron');
const path = require('path');

/**
 * IPC handler to get available screen/window sources.
 * This is handled in the main process because `desktopCapturer` is only available here.
 * It returns an array of DesktopCapturerSource objects.
 */
ipcMain.handle('get-screen-sources', async () => {
  return await desktopCapturer.getSources({ types: ['window', 'screen'] });
});

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      // The preload script is a bridge between the Node.js environment of the main process
      // and the browser environment of the renderer process (our React app).
      // It allows us to securely expose specific Node/Electron APIs to the frontend.
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true, // Recommended for security
      nodeIntegration: false, // Recommended for security
    },
  });

  // In development, load from the webpack dev server for hot-reloading.
  // In production, load the built HTML file from the 'dist' directory.
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools(); // Open DevTools automatically in dev mode
  } else {
    mainWindow.loadFile(path.join(__dirname, 'dist/index.html'));
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.whenReady().then(() => {
  createWindow();

  // On macOS, re-create a window when the dock icon is clicked and there are no other windows open.
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});
