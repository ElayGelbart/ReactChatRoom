const core = require('@actions/core');
const dockerDeploymentFn = require("./docker/main")
const gitDeploymentFn = require("./git/main")
try {
  (async function () {
    const HerokuApiKey = core.getInput('herokuApiKey');
    process.env.HEROKU_API_KEY = HerokuApiKey
    const AppName = core.getInput('herokuAppName');
    console.log(`Application Name: ${AppName}`);
    if (core.getInput(deploymentWithGit)) {
      gitDeploymentFn(AppName)
    } else {
      dockerDeploymentFn(AppName)
    }
  }
  )()
} catch (error) {
  core.setFailed(error);
}