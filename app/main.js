import { app, BrowserWindow } from "electron";

export const startMeUp = _ => {
  app.on("ready", _ => {
    console.log("if you start me up i'll never stop, never stop");
    const win = new BrowserWindow({
      width: 800,
      height: 600,
    //   frame: false,
      webPreferences: {
        nodeIntegration: true 
      }
    });
    win.setMenuBarVisibility(false);
    win.loadFile("app/main.html"); 
  });
};
