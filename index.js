import axios from "axios"

export default async function (req, res) {
  let payload

  try {
    // Access payload according to triggering context
    if (req.method === "POST") {
      // When triggered via HTTP, the payload may be in req.body
      payload = typeof req.body === "string" ? JSON.parse(req.body) : req.body
    } else {
      // When triggered via event, it might be in req.variables, req.data, etc.
      payload = req.payload ? JSON.parse(req.payload) : {}
    }

    console.log("Received payload:", payload)

    // Validate payload structure
    if (!payload.email) {
      throw new Error("Invalid payload structure. Missing email.")
    }

    const { email } = payload
    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL

    const message = `A new user has signed up:\n- Email: ${email}`

    // Send a message to the Slack webhook
    await axios.post(slackWebhookUrl, { text: message })

    // Send a success response
    res.json({
      success: true,
      message: "Notification sent to Slack!",
    })
  } catch (error) {
    console.error("Error occurred:", error)

    // Handle errors and send a failure response
    res.json({
      success: false,
      message: "Failed to send notification to Slack!",
      error: error.message,
    })
  }
}
