const axios = require("axios")
const chalk = require("chalk")

const environment = process.argv[2] || "staging"

async function deploy() {
  console.log(chalk.blue(`🚀 Deploying to ${environment}...`))

  const apiKey = process.env.RENDER_API_KEY
  const serviceId = environment === "production" ? process.env.PRODUCTION_SERVICE_ID : process.env.STAGING_SERVICE_ID

  if (!apiKey || !serviceId) {
    console.log(chalk.red("❌ Missing RENDER_API_KEY or SERVICE_ID"))
    process.exit(1)
  }

  try {
    // Trigger deployment
    const response = await axios.post(
      `https://api.render.com/v1/services/${serviceId}/deploys`,
      {},
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      },
    )

    const deployId = response.data.id
    console.log(chalk.green(`✅ Deployment triggered: ${deployId}`))

    // Monitor deployment status
    let status = "in_progress"
    while (status === "in_progress") {
      await new Promise((resolve) => setTimeout(resolve, 30000)) // Wait 30 seconds

      const statusResponse = await axios.get(`https://api.render.com/v1/services/${serviceId}/deploys/${deployId}`, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      })

      status = statusResponse.data.status
      console.log(chalk.yellow(`⏳ Deployment status: ${status}`))
    }

    if (status === "live") {
      console.log(chalk.green(`🎉 Deployment successful to ${environment}!`))
    } else {
      console.log(chalk.red(`❌ Deployment failed with status: ${status}`))
      process.exit(1)
    }
  } catch (error) {
    console.log(chalk.red(`❌ Deployment error: ${error.message}`))
    process.exit(1)
  }
}

deploy()
