import { mkBoard } from "./board";
import net from "net";

export const myself = {};
export const players = [];
export const messages = [];
export const challenges = [];
export const games = [];
export const myGame = {};
let client;

export const join = async ({ ip, nickname }) => {
  myself.nickname = nickname;
  myself.id = nickname + "#" + new Date().getTime();
  myself.status = "idle";
  players.push(myself);
  client = net.createConnection({ host: ip, port: 8421 }, sock => {
    console.log(sock)
  });
  return "done!";
};

export const newMessage = async msg => {
  return await messages.push(msg);
};

export const newChallenge = async challenge => {
  return await challenges.push(challenge);
};

export const gotChallenge = challenge => {
  return challenge.p1.id == myself.id || challenge.p2.id == myself.id;
};

export const acceptChallenge = async challenge => {
  myGame.challenge = challenge;
  myGame.id = `game#${new Date().getTime()}#${challenge.id}`;
  myGame.status = "open";
  myGame.moves = [];
  myGame.board = mkBoard();
  myGame.turn = 0;
  games.push(myGame);
  return games;
};

export const declineChallenge = challenge => {
  let cha = challenges.filter(e => e.id != challenge.id);
  // https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/length#Descri%C3%A7%C3%A3o
  challenges.length = 0;
  challenges.push(...cha);
};

export const gameMove = async move => {
  myGame.moves.push(move);
  myGame.board.map(p1 =>
    myGame.board.map(p2 => {
      if (p1.id == move.p1.id && p2.id == move.p2.id) {
        let state = p1.state;
        p1.state = p2.state;
        p2.state = state;
      }
    })
  );
  myGame.turn++;
  return myGame;
};

const end = (p, j, k) => {
  const board = myGame.board;
  let over = true;
  for (let i = j; i < k; i++) {
    console.log(board[i]);
    if (board[i].state != p) over = false;
  }
  return over;
};

export const p1Win = _ => end("p2", 0, 10);

export const p2Win = _ => end("p1", 111, 121);

export const gameOver = async game => {
  let g = games.filter(e => e.id !== game.id);
  games.length = 0;
  games.push(...g);
  delete myGame.challenge;
  delete myGame.id;
  delete myGame.status;
  delete myGame.moves;
  delete myGame.board;
  delete myGame.turn;
  return "game ended";
};
