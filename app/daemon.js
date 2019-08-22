import { ipcMain } from "electron";
import * as host from "./host";
import * as client from "./client";

let win;

export const init = async (ipcMain, _win) => {
	win = _win;
	ipcMain.on("join-host", (_, args) => {
		const { ip, mode, nickname } = args;
		if (mode == "host")
			host.start().then(_ => {
				client.join({ ip, nickname });
				win.loadFile("app/html/lobby-chat.html");
			});
	});
};

ipcMain.on("get-myself", e => {
	e.sender.send("myself", client.myself);
});

ipcMain.on("get-list-players", e => {
	e.sender.send("list-players", client.players);
});

ipcMain.on("get-list-challenges", e => {
	e.sender.send("list-challenges", client.challenges);
});

ipcMain.on("get-list-chat-messages", e => {
	e.sender.send("list-chat-messages", client.messages);
});

ipcMain.on("new-message", (e, msg) => {
	msg.id = msg.player.id + "#" + new Date().getTime();
	msg.stamp = new Date().toJSON();
	client
		.newMessage(msg)
		.then(_ => e.sender.send("list-chat-messages", client.messages));
});

ipcMain.on("send-challenge", (e, challenge) => {
	client.newChallenge(challenge).then(_ => {
		e.sender.send("list-challenges", client.challenges);
		// win.loadFile("app/html/lobby-chat.html"); // TODO accept challenge
	});
});
