import axios from "axios"

export default async (req, res) => {
  console.log("Request received:", req)
  const body = req.req.bodyRaw || req.req.body
  const { email, firstName, lastName } =
    typeof body === "string" ? JSON.parse(body) : body
  const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL
  const message = `Someone applied to join the network!\n- Name: ${firstName} ${lastName}\n- Email: ${email}`

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
