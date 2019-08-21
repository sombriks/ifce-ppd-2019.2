import { app, BrowserWindow, ipcMain } from "electron";
import * as daemon from "./daemon";

let win;

export const startMeUp = _ => {
	app.on("ready", _ => {
		win = new BrowserWindow({
			width: 800,
			height: 600,
			//   frame: false,
			webPreferences: {
				nodeIntegration: true,
			},
		});
		daemon.init(ipcMain, win);
		win.setMenuBarVisibility(false);
		// initial state
		console.log("if you start me up i'll never stop, never stop");
		win.loadFile("app/html/open-screen.html");
	});
};
