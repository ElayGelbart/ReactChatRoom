const core = require('@actions/core');
const { execSync } = require("child_process")

const dockerDeploymentFn = (AppName) => {
  try {
    execSync("heroku container:login")
    console.log("✅ logged the container ✅")
    const appDir = core.getInput("dir");
    execSync(`heroku container:push web -a ${AppName}`, appDir ? { cwd: appDir } : null)
    console.log("✅✅✅ pushed container successfully ✅✅✅")
    execSync(`heroku container:release web -a ${AppName}`, appDir ? { cwd: appDir } : null)
    console.log("💥🐋🐋🐋💥 App Released To Heroku! 💥🐋🐋🐋💥 ")
  } catch (error) {
    core.setFailed(error)
    console.log(`🛑❌deployment failed: ${error.messeage}❌🛑`)
    return
  }
}

module.exports = dockerDeploymentFn