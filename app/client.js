export const myself = {};
export const players = [];
export const messages = [];
export const challenges = [];
export const games = [];

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
