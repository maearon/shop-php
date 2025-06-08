const { execSync } = require("child_process")
const chalk = require("chalk")

const serviceName = process.env.npm_config_service

if (!serviceName) {
  console.log(chalk.red("❌ Please specify a service: npm run restart:service --service=auth"))
  process.exit(1)
}

try {
  console.log(chalk.blue(`🔄 Restarting ${serviceName}...`))
  execSync(`docker-compose restart ${serviceName}-service`, { stdio: "inherit" })
  console.log(chalk.green(`✅ ${serviceName} restarted successfully`))
} catch (error) {
  console.log(chalk.red(`❌ Failed to restart ${serviceName}`))
  process.exit(1)
}
