import {User} from '../models/index.js'
import sendRecoveryEmail from './sendRecoveryEmail.js'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

const passwordResetHandler = async (req) => {
    const { email } = req.body
    const userExists = await User.query().findOne({ email: email })
    if (!userExists) {
        throw new Error('Email not found')
    } else {
        dotenv.config()
        const resetSecret = process.env.RESET_SECRET
        const resetToken = jwt.sign({ user: userExists.email }, resetSecret, { expiresIn: '10m' })
        await userExists.$query().patch({ passwordResetToken: resetToken })
        sendRecoveryEmail(email, userExists.id, resetToken)
    }
}  

export default passwordResetHandler