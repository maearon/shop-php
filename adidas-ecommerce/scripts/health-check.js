const axios = require("axios")
const chalk = require("chalk")

const services = [
  { name: "Gateway", url: "http://localhost/health" },
  { name: "Frontstore", url: "http://localhost:3000/api/health" },
  { name: "Admin Dashboard", url: "http://localhost:3001/api/health" },
]

async function checkHealth() {
  console.log(chalk.blue("🔍 Checking service health...\n"))

  let allHealthy = true

  for (const service of services) {
    try {
      const response = await axios.get(service.url, {
        timeout: 10000,
        validateStatus: (status) => status === 200,
      })

      console.log(chalk.green(`✅ ${service.name}: Healthy`))
    } catch (error) {
      console.log(chalk.red(`❌ ${service.name}: Unhealthy - ${error.message}`))
      allHealthy = false
    }
  }

  if (allHealthy) {
    console.log(chalk.green("\n🎉 All services are healthy!"))
    process.exit(0)
  } else {
    console.log(chalk.red("\n💥 Some services are unhealthy!"))
    process.exit(1)
  }
}

checkHealth()
