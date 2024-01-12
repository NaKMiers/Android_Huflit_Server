import nodeMailer from 'nodemailer'

// SENDMAIL CORE
const transporter = nodeMailer.createTransport({
  service: 'gmail',
  secure: true,
  auth: {
    user: process.env.MAIL,
    pass: process.env.MAIL_APP_PASSWORD,
  },
})

function sendMail(to, subject, html) {
  console.log(html)

  transporter.sendMail(
    {
      from: 'Huflit Android',
      to: to,
      subject: subject,
      html: html,
    },
    err => {
      if (err) {
        console.log({
          message: 'Error',
          err,
        })

        return result
      }
      const result = res.json({
        message: 'Success',
      })
      return result
    }
  )
}

export { sendMail }
