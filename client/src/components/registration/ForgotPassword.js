import React, { useState } from "react";
import { TextField, Button } from '@mui/material'
import FormError from "../layout/FormError";

const ForgotPassword = () => {
    const [email, setEmail] = useState('')
    const [resetButtonDisabled, setResetButtonDisabled] = useState(false)
    const [resetButtonText, setResetButtonText] = useState('Send reset link')
    const [errors, setErrors] = useState({});

    const postResetLink = async (email) => {
        try {
            const response = await fetch(`/api/v1/users/forgot-password`, {
                method: "PATCH",
                headers: new Headers({
                  "Content-Type": "application/json",
                }),
                body: JSON.stringify(email)
              })
            if (!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw error
            }
            const body = await response.json()
            setResetButtonDisabled(true)
            setResetButtonText('Reset link sent')
            setErrors({})
            console.log(body)
        } catch (error) {
            console.error(`Error in fetch: ${error.message}`)
            setErrors({
                ...errors,
                email: 'email not found'
            })
        }
    }

    const handleInputChange = (event) => {
        setEmail({
          ...email,
          [event.currentTarget.name]: event.currentTarget.value
        })
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        await postResetLink(email)
    }

    return (
        <div className="index-container">
            <form className="recovery-form" onSubmit={handleSubmit}>
                <TextField
                    id='email'
                    name='email'
                    variant='outlined' 
                    label='Enter your email address' 
                    size='small'
                    onChange={handleInputChange}
                />
                <FormError error={errors.email} />
                <Button disabled={resetButtonDisabled} type="submit" size='small' variant="contained">{ resetButtonText }</Button>
            </form>
        </div>
    )
}

export default ForgotPassword