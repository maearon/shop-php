const axios = require("axios")
const chalk = require("chalk")

async function rollback() {
  console.log(chalk.yellow("🔄 Initiating rollback..."))

  const apiKey = process.env.RENDER_API_KEY
  const serviceId = process.env.PRODUCTION_SERVICE_ID
  const backupCommitSha = process.env.BACKUP_COMMIT_SHA

  if (!apiKey || !serviceId) {
    console.log(chalk.red("❌ Missing RENDER_API_KEY or SERVICE_ID"))
    process.exit(1)
  }

  try {
    // Get previous successful deployment
    const deploysResponse = await axios.get(`https://api.render.com/v1/services/${serviceId}/deploys`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    })

    const successfulDeploys = deploysResponse.data.filter(
      (deploy) => deploy.status === "live" && deploy.commit.id !== backupCommitSha,
    )

    if (successfulDeploys.length === 0) {
      console.log(chalk.red("❌ No previous successful deployment found"))
      process.exit(1)
    }

    const previousDeploy = successfulDeploys[0]

    // Trigger rollback deployment
    const rollbackResponse = await axios.post(
      `https://api.render.com/v1/services/${serviceId}/deploys`,
      {
        commitId: previousDeploy.commit.id,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      },
    )

    console.log(chalk.green(`✅ Rollback initiated to commit: ${previousDeploy.commit.id}`))
    console.log(chalk.green(`🔄 Rollback deployment ID: ${rollbackResponse.data.id}`))
  } catch (error) {
    console.log(chalk.red(`❌ Rollback error: ${error.message}`))
    process.exit(1)
  }
}

rollback()
