import axios from "axios"

export default async (req, res) => {
  let payload

  try {
    if (req.method === "POST") {
      payload = typeof req.body === "string" ? JSON.parse(req.body) : req.body
    } else {
      payload = req.payload ? JSON.parse(req.payload) : {}
    }

    console.log("Parsed payload:", payload)

    const document = payload.$id ? payload : payload.events?.[0]
    const email = document.email || (document.payload && document.payload.email)
    const firstName =
      document.firstName || (document.payload && document.payload.firstName)
    const lastName =
      document.lastName || (document.payload && document.payload.lastName)

    console.log("Extracted email:", email)

    const slackWebhookUrl = process.env.SLACK_WEBHOOK_URL
    const message = `Someone applied to join the network!\n- Name: ${firstName} ${lastName}\n- Email: ${email}`
    await axios.post(slackWebhookUrl, {
      text: message,
    })
  } catch (error) {
    console.error(error)
  }
}
