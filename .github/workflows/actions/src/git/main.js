const core = require('@actions/core');
const { execSync } = require("child_process")

const gitDeploymentFn = (AppName) => {
  try {
    execSync("heroku container:login")
    const head = core.getInput('branch') + ":"
    execSync(`heroku git:remote -a ${AppName}`)
    console.log("set git remote")
    execSync(`git push heroku ${head}refs/heads/main`)
    console.log("pushed successfully")
  } catch (error) {
    core.setFailed(error)
  }
}

module.exports = gitDeploymentFn