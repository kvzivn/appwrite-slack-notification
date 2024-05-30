import axios from "axios"

export default async ({ req, res, error }) => {
  const { email, firstName, lastName } = JSON.parse(req.body)
  const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL
  const message = `Someone applied to join the network!\n- Name: ${firstName} ${lastName}\n- Email: ${email}`

  try {
    await axios.post(slackWebhookUrl, {
      text: message,
    })
  } catch (e) {
    error("Failed to send message: " + e.message)
    return res.send("Failed to send message")
  }

  return res.empty()
}
