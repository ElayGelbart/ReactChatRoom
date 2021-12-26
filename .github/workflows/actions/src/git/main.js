const core = require('@actions/core');
const { execSync } = require("child_process")

const gitDeploymentFn = (AppName) => {
  try {
    execSync(`cat >~/.netrc <<EOF
    machine api.heroku.com
        login elaygelbart@gmail.com
        password ${process.env.HEROKU_API_KEY}
    machine git.heroku.com
        login elaygelbart@gmail.com
        password ${process.env.HEROKU_API_KEY}
    EOF`)
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