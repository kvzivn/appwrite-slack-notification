import axios from "axios"

export default async (req, res) => {
  const { email, firstName, lastName } = req.body
  const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL
  const message = `Someone applied to join the network!\n- Name: ${firstName} ${lastName}\n- Email: ${email}`

  try {
    await axios.post(slackWebhookUrl, {
      text: message,
    })
  } catch (error) {
    console.error(error)
  }
}
