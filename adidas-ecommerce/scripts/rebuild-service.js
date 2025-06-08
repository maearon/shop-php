const { execSync } = require("child_process")
const chalk = require("chalk")

const serviceName = process.env.npm_config_service

if (!serviceName) {
  console.log(chalk.red("❌ Please specify a service: npm run rebuild:service --service=auth"))
  process.exit(1)
}

try {
  console.log(chalk.blue(`🔨 Rebuilding ${serviceName}...`))
  execSync(`docker-compose stop ${serviceName}-service`, { stdio: "inherit" })
  execSync(`docker-compose build ${serviceName}-service`, { stdio: "inherit" })
  execSync(`docker-compose up -d ${serviceName}-service`, { stdio: "inherit" })
  console.log(chalk.green(`✅ ${serviceName} rebuilt and restarted successfully`))
} catch (error) {
  console.log(chalk.red(`❌ Failed to rebuild ${serviceName}`))
  process.exit(1)
}
