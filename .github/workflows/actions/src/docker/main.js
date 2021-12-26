const dockerDeploymentFn = (AppName) => {
  const login = execSync("heroku container:login")
  const push = execSync(`heroku container:push web -a ${AppName}`)
  const release = execSync(`heroku container:release web -a ${AppName}`)
}
exports.default = dockerDeploymentFn