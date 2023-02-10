import {User} from '../models/index.js'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'

class PasswordResetHandler {
    static sendRecoveryEmail = (email, userId, resetToken) => {
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
              html: `<p>Click <a href="${process.env.APP_URL}users/${userId}/reset-password/${resetToken}">link</a> to reset password. Link expires in 10 minutes.</p>`
            }
        )
    }

    static passwordForget = async (req) => {
        const { email } = req.body
        const userExists = await User.query().findOne({ email: email })
        if (!userExists) {
            throw new Error('Email not found')
        } else {
            dotenv.config()
            const resetSecret = process.env.RESET_SECRET
            const resetToken = jwt.sign({ user: userExists.email }, resetSecret, { expiresIn: '10m' })
            await userExists.$query().patch({ passwordResetToken: resetToken })
            this.sendRecoveryEmail(email, userExists.id, resetToken)
        }
    }  
    
    static passwordReset = async (req) => {
        const { password, passwordConfirm, resetToken, userId } = req.body
        const validUser = await User.query().findOne({ id: userId, passwordResetToken: resetToken })
        if (validUser) {
            dotenv.config()
            const verifyToken = jwt.verify(resetToken, process.env.RESET_SECRET)
            if (verifyToken) {
                await validUser.$query().patch({ password })
            }
        } else {
            throw new Error('Incorrect user information!')
        }
    }
}

export default PasswordResetHandler