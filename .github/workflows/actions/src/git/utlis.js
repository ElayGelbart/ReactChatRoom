const { execSync } = require("child_process")
const checkShallow = () => {
  const isShallow = execSync("git rev-parse --is-shallow-repository").toString();

  if (isShallow.match(/true/)) {
    execSync("git fetch --prune --unshallow")
    console.log("git unshallow repository🔄")
  }
}
module.exports.checkShallow = checkShallow