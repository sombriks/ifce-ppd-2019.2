import { ipcMain } from "electron";
export const join = async ({ ip, nickname }) => {
	return "done!";
};

ipcMain.on("get-list-chat-messages", e => {
	e.sender.send("myself");
	console.log(e);
});

ipcMain.on("get-list-players", e => {
	e.sender.send("list-players");
	console.log(e);
});

ipcMain.on("get-myself", e => {
	e.sender.send("list-chat-messages");
	console.log(e);
});
