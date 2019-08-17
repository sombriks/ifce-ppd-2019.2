import { app, BrowserWindow } from "electron";

exports.startMeUp = _ => {
  app.on("ready", _ => {
    console.log("if you start me up i'll never stop, never stop");
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true 
      }
    });
    win.loadFile("app/main.html"); 
  });
};
