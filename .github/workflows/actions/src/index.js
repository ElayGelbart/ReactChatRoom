const core = require('@actions/core');
const { execSync } = require("child_process")
const dockerDeploymentFn = require("./docker/main")
try {
  (async function () {
    const HerokuApiKey = core.getInput('herokuApiKey')
    process.env.HEROKU_API_KEY = HerokuApiKey
    const AppName = core.getInput('herokuAppName');
    console.log(`Application Name: ${AppName}`);
    dockerDeploymentFn(AppName)
  }
  )()
} catch (error) {
  core.setFailed(error.message);
}