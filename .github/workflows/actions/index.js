const core = require('@actions/core');
const { execSync } = require("child_process")

try {
  async function blah() {
    const AppName = core.getInput('herokuAppName');
    console.log(`AppName ${AppName}!`);
    const HerokuApiKey = core.getInput('herokuApiKey')
    console.log(`AppName ${HerokuApiKey}!`);
    core.startGroup()
    const login = execSync("heroku container:login")
    console.log(login)
    core.endGroup()
    core.startGroup()
    const push = execSync(`heroku container:push web -a ${AppName}`)
    core.endGroup()
    core.startGroup()
    const release = execSync(`heroku container:release web -a ${AppName}`)
    core.endGroup()
  }
  blah()
} catch (error) {
  core.setFailed(error.message);
}