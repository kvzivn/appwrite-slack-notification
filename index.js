const axios = require("axios")

module.exports = async (req, res) => {
  const { email } = JSON.parse(req.payload)
  const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL
  const message = `A new user has signed up:\n- Email: ${email}`

  try {
    await axios.post(slackWebhookUrl, {
      text: message,
    })

    res.json({
      success: true,
      message: "Notification sent to Slack!",
    })
  } catch (error) {
    res.json({
      success: false,
      message: "Failed to send notification to Slack!",
      error: error.message,
    })
  }
}
