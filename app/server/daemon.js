import { ipcMain } from "electron";
import * as host from "./host";
import * as client from "./client";

let win;

export const init = _win => (win = _win);

ipcMain.on("join-host", (_, args) => {
  const { ip, mode, nickname } = args;
  if (mode == "host")
    host.start().then(_ => {
      client.join({ ip, nickname });
      win.loadFile("app/client/lobby-chat.html");
    });
});

ipcMain.on("remote-log", (e, ...args) => {
  console.log(`REMOTE: ${args}`);
});

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
    // todo mundo deve receber o challenge
    e.sender.send("list-challenges", client.challenges);
    // mas se o desafio envolver este player, botar o desafio na mesa
    if (client.gotChallenge(challenge)) win.send("new-challenge", challenge);
  });
});

ipcMain.on("accept-challenge", (e, challenge) => {
  client.acceptChallenge(challenge).then(_ => {
    win.loadFile("app/client/game-match.html");
  });
});

ipcMain.on("decline-challenge", (e, challenge) => {
  client.declineChallenge(challenge);
  e.sender.send("list-challenges", client.challenges);
});

ipcMain.on("get-my-game", e => {
  e.sender.send("my-game", client.myGame);
});

ipcMain.on("send-game-move", (e, move) => {
  client.gameMove(move).then(_ => {
    e.sender.send("game-move", client.myGame);
  });
});

ipcMain.on("send-game-over", (e, game) => {
  client.gameOver(game).then(_=>{
    win.loadFile("app/client/lobby-chat.html");
  })
})
