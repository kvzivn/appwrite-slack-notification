import axios from "axios"

export default async function (req, res) {
  // Ensure this is exported correctly
  try {
    // Log the incoming payload for debugging
    console.log("Received payload:", req.payload)

    // Safely parse the payload
    let payload
    try {
      payload = req.payload ? JSON.parse(req.payload) : {}
    } catch (error) {
      throw new Error("Invalid JSON payload")
    }

    // Validate the payload structure
    if (!payload.userId || !payload.email) {
      throw new Error("Invalid payload structure. Missing userId or email.")
    }

    const { userId, email } = payload
    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL

    const message = `A new user has signed up:\n- User ID: ${userId}\n- Email: ${email}`

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
