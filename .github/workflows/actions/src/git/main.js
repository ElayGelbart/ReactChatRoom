const core = require('@actions/core');
const { execSync } = require("child_process")
const { checkShallow } = require("./utlis")
const gitDeploymentFn = (AppName, HerokuApiKey) => {
  try {
    execSync(`cat >~/.netrc <<EOF
    machine api.heroku.com
      login _
      password ${HerokuApiKey}
    machine git.heroku.com
      login _
      password ${HerokuApiKey}
      EOF`)
    const head = core.getInput('branch') + ":"
    execSync(`heroku git:remote -a ${AppName}`)
    console.log("✅ set git remote ✅")
    checkShallow();
    execSync(`git subtree push --prefix server heroku ${head}refs/heads/main -f`)
    console.log("🔥💥😀 pushed successfully to heroku 🔥💥😀")
  } catch (error) {
    core.setFailed(error)
    console.log(`🛑❌deployment failed: ${error.messeage}❌🛑`)
    return
  }
}

module.exports = gitDeploymentFn