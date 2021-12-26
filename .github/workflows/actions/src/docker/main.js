const core = require('@actions/core');
const { execSync } = require("child_process")

const dockerDeploymentFn = (AppName) => {
  try {
    execSync("heroku container:login")
    console.log("logged the container")
    execSync(`heroku container:push web -a ${AppName}`)
    console.log("pushed container successfully")
    execSync(`heroku container:release web -a ${AppName}`)
    console.log("App Realesed To Heroku!")
  } catch (error) {
    core.setFailed(error)
  }
}

module.exports = dockerDeploymentFn