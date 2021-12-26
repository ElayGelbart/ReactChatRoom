const core = require('@actions/core');
const { execSync } = require("child_process")

try {
  async function blah() {
    const AppName = core.getInput('herokuAppName');
    console.log(`AppName ${AppName}!`);
    const HerokuApiKey = core.getInput('herokuApiKey')
    console.log(`AppName ${HerokuApiKey}!`);
    execSync("heroku container:login")
    execSync(`heroku container:push web -a ${AppName}`)
    execSync(`heroku container:release web -a ${AppName}`)
  }
  blah()
} catch (error) {
  core.setFailed(error.message);
}