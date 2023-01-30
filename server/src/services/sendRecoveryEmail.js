import nodemailer from 'nodemailer'
import dotenv from 'dotenv'


const sendRecoveryEmail = (email, userId, resetToken) => {
    dotenv.config()
    const client = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "recipease.help@gmail.com",
          pass: process.env.APP_PASSWORD
        }
      })
      client.sendMail(
        {
          from: "sender",
          to: email,
          subject: "Recipease password reset link",
          text: "Click link to reset password",
          html: `<p>Click <a href="${process.env.APP_URL}users/${userId}/reset-password/${resetToken}">link</a> to reset password</p>`
        }
      )
}

export default sendRecoveryEmail