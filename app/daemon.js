import { ipcMain } from "electron";
import * as host from "./host";
import * as client from "./client";

export const init = async (ipcMain, win) => {
	ipcMain.on("join-host", (event, args) => {
		const { ip, mode, nickname } = args;
		if (mode == "host")
			host.start().then(_ => {
				client.join({ ip, nickname });
				win.loadFile("app/html/lobby-chat.html");
			});
	});
};
