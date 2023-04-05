const nodemailer = require('nodemailer')
let testAccount = nodemailer.createTestAccount()

const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'buford58@ethereal.email',
    pass: 'EjWdphWUKd2ytVSv6x',
  },
})

const sendMail = async (req, res) => {
  const mail = await req.body
  let info = await transporter.sendMail({
    to: 'mdjd2001@gmail.com',
    subject: `${mail.Subject}`,
    text: `From: ${mail.Name}, ${mail.Message}`,
  })
}
module.exports = sendMail
