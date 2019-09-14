// https://www.npmjs.com/package/esm
require = require("esm")(module/*, options*/)
const main = require("./app/server/main")
module.exports = main
main.startMeUp()