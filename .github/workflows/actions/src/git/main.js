const core = require('@actions/core');
const { execSync } = require("child_process")
const { checkShallow } = require("./utils")
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
    execSync("heroku stack:set heroku-20")
    execSync("heroku plugins:install heroku-repo");
    execSync(`heroku repo:reset -a ${AppName}`);
    if (appDir) {
      execSync(`git push heroku \`git subtree split --prefix ${appDir} ${head}\`:refs/heads/main --force`,)
    } else {
      execSync(`git push heroku ${head}:refs/heads/main -f`)
    }
    console.log("🔥💥😀 pushed successfully to heroku 🔥💥😀")
  } catch (error) {
    core.setFailed(error)
    console.log(`🛑❌deployment failed: ${error}❌🛑`)
    return
  }
}

module.exports = gitDeploymentFn