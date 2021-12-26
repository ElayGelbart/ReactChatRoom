const core = require('@actions/core');
const { execSync } = require("child_process")

const gitDeploymentFn = (AppName) => {
  try {
    const head = core.getInput('branch') + ":"
    execSync(`heroku git:remote -a ${AppName}`)
    console.log("set git remote")
    execSync(`git push heroku ${head}main`)
    console.log("pushed successfully")
  } catch (error) {
    core.setFailed(error)
  }
}

module.exports = gitDeploymentFn