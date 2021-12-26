const core = require('@actions/core');
const github = require('@actions/github');
const { exec } = require("child_process")

try {
  const AppName = core.getInput('herokuAppName');
  console.log(`AppName ${AppName}!`);
  const HerokuApiKey = core.getInput('herokuApiKey')
  exec("heroku login:container")
} catch (error) {
  core.setFailed(error.message);
}