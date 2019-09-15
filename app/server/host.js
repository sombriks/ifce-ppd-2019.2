import { ipcMain } from "electron";
import net from "net";

const myself = {};
const players = [];
const messages = [];
const games = [];
let server;
export const start = async _ => {
  server = net.createServer({ allowHalfOpen: true }, sock => {
    console.log(sock);
  });
  server.listen(8421, "127.0.0.1");
  return "done!";
};
