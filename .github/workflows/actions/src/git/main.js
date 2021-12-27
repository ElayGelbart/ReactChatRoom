const core = require('@actions/core');
const { execSync } = require("child_process")

const gitDeploymentFn = (AppName, HerokuApiKey) => {
  try {
    execSync(`cat >~/.netrc <<EOF
    machine api.heroku.com
      login elaygelbart@gmail.com
      password ${HerokuApiKey}
    machine git.heroku.com
      login elaygelbart@gmail.com
      password ${HerokuApiKey}
      EOF`)
    const head = core.getInput('branch') + ":"
    execSync(`heroku git:remote -a ${AppName}`)
    console.log("set git remote")
    // execSync("heroku stack:set heroku-20")
    console.log("set stack to git")
    execSync(`git push heroku ${head}:refs/heads/main -f`)
    console.log("pushed successfully")
  } catch (error) {
    core.setFailed(error)
  }
}

module.exports = gitDeploymentFn