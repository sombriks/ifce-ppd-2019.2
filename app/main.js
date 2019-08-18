import { app, BrowserWindow, ipcMain } from "electron";

export const startMeUp = _ => {
  app.on("ready", _ => {

    const win = new BrowserWindow({
      width: 800,
      height: 600,
      //   frame: false,
      webPreferences: {
        nodeIntegration: true
      }
    });
    win.setMenuBarVisibility(false);

    ipcMain.on("foo", (event, args) => {
      console.log(args);
      event.sender.send("bar", "pong!");
    });

    ipcMain.on("join-host", (event, args) => {
      win.loadFile("app/html/lobby-chat.html");
    });
    // initial state
    console.log("if you start me up i'll never stop, never stop");
    win.loadFile("app/html/open-screen.html");
  });
};
