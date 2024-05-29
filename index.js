import axios from "axios"

export default async (req, res) => {
  let payload

  console.log("Received payload:", req.payload)

  try {
    payload = req.payload ? JSON.parse(req.payload) : {}
    if (!payload.userId || !payload.email) {
      throw new Error("Invalid payload structure. Missing userId or email.")
    }
  } catch (error) {
    console.error("Error parsing payload:", error)
    return res.json({
      success: false,
      message: "Failed to parse payload",
      error: error.message,
    })
  }

  const { userId, email } = payload
  const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL
  const message = `A new user has signed up:\n- User ID: ${userId}\n- Email: ${email}`

  try {
    await axios.post(slackWebhookUrl, {
      text: message,
    })

    res.json({
      success: true,
      message: "Notification sent to Slack!",
    })
  } catch (error) {
    console.error("Error sending message to Slack:", error)
    res.json({
      success: false,
      message: "Failed to send notification to Slack!",
      error: error.message,
    })
  }
}
