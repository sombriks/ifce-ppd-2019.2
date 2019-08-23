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

export const acceptChallenge = challenge => {
};

export const declineChallenge = challenge => {
  let cha = challenges.filter(e => e.id != challenge.id);
  challenges.length = 0;
  challenges.push(...cha);
};
