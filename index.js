// https://www.npmjs.com/package/esm
require = require("esm")(module/*, options*/)
const main = require("./app/main")
module.exports = main
main.startMeUp()