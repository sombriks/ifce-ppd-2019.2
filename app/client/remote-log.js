const { ipcRenderer } = require("electron");

window._log = console.log;

console.log = (...args) => {
  ipcRenderer.send("remote-log", args);
  window._log(...args);
};
