const { app, BrowserWindow, ipcMain } = require("electron");

const { rpcStart } = require("./rpc");

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 500,
    height: 350,
    webPreferences: {
      nodeIntegration: true,
    },
    // frame: false,
  });

  // and load the index.html of the app.
  win.loadFile("index.html");

  // Open the DevTools.
  // win.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on("asynchronous-message", async (event, arg) => {
  event.sender.send("asynchronous-reply", await rpcStart(arg));
});
