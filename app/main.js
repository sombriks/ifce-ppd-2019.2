import { app, BrowserWindow, ipcMain } from "electron";
import daemon from "./daemon";
import host from "./host";
import client from "./client";

let win;

ipcMain.on("join-host", (event, args) => {
  console.log(args)
  win.loadFile("app/html/lobby-chat.html");
});

export const startMeUp = _ => {
  app.on("ready", _ => {
    win = new BrowserWindow({
      width: 800,
      height: 600,
      //   frame: false,
      webPreferences: {
        nodeIntegration: true
      }
    });
    win.setMenuBarVisibility(false);
    // initial state
    console.log("if you start me up i'll never stop, never stop");
    win.loadFile("app/html/open-screen.html");
  });
};
