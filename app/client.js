export const myself = {};
export const players = [];
export const messages = [];
export const challenges = [];
export const games = [];
export const myGame = {};

export const join = async ({ ip, nickname }) => {
	myself.nickname = nickname;
	myself.id = nickname + "#" + new Date().getTime();
	myself.status = "idle";
	players.push(myself);
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

export const gameMove = async game => {
	myGame.moves = game.moves;
	myGame.turn++;
	return myGame;
};
