const core = require('@actions/core');
const dockerDeployment = require("./docker/main")
const gitDeployment = require("./git/main")

try {
  (async function () {
    const HerokuApiKey = core.getInput('herokuApiKey');
    process.env.HEROKU_API_KEY = HerokuApiKey
    const AppName = core.getInput('herokuAppName');
    console.log(`Application Name: ${AppName}`);
    if (core.getInput('useDocker')) {
      console.log("🐋 deplotment with Docker 🐋")
      dockerDeployment(AppName)
    } else {
      console.log("🐈 deplotment with Git 🐈")
      gitDeployment(AppName, HerokuApiKey)
    }
  }
  )()
} catch (error) {
  core.setFailed(error);
}