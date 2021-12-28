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
    const head = core.getInput('branch')
    execSync(`heroku git:remote -a ${AppName}`)
    console.log("✅ set git remote ✅")
    checkShallow();
    execSync(`heroku repo:reset -a ${AppName}`);
    execSync(`git push heroku \`git subtree split --prefix server ${head}\`:refs/heads/main --force`,)
    console.log("🔥💥😀 pushed successfully to heroku 🔥💥😀")
  } catch (error) {
    core.setFailed(error)
    console.log(`🛑❌deployment failed: ${error}❌🛑`)
    return
  }
}

module.exports = gitDeploymentFn