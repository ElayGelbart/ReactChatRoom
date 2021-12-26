const core = require('@actions/core');
const github = require('@actions/github');
const { exec, spawn, execSync } = require("child_process")

try {
  async function blah() {
    const AppName = core.getInput('herokuAppName');
    console.log(`AppName ${AppName}!`);
    const HerokuApiKey = core.getInput('herokuApiKey')
    console.log(`AppName ${HerokuApiKey}!`);
    await execSync("heroku login:container")
  }
  blah()
} catch (error) {
  core.setFailed(error.message);
}