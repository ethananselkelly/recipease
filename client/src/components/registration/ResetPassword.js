import React, { useState } from "react"
import { withRouter } from 'react-router'
import { TextField, Button } from '@mui/material'
import config from "../../config"
import FormError from "../layout/FormError"

const ResetPassword = (props) => {

    const [newPassword, setNewPassword] = useState({
        password: '',
        passwordConfirm: '',
        resetToken: props.match.params.token,
        userId: props.match.params.id,
    })
    const [errors, setErrors] = useState({});

    const [shouldRedirect, setShouldRedirect] = useState(false);

    const validateInput = (payload) => {
        setErrors({});
        const { password, passwordConfirm } = payload;
        const passwordRegexp = config.validation.password.regexp.passwordRegex
        let newErrors = {};

        if (password.trim() == "" || !password.match(passwordRegexp)) {
          newErrors = {
            ...newErrors,
            password: "minimum eight characters, at least one uppercase letter, one lowercase letter and one number",
          };
        }
    
        if (passwordConfirm.trim() === "") {
          newErrors = {
            ...newErrors,
            passwordConfirm: "is required",
          };
        } else {
          if (passwordConfirm !== password) {
            newErrors = {
              ...newErrors,
              passwordConfirm: "does not match password",
            };
          }
        }
        setErrors(newErrors);
        if (Object.keys(newErrors).length === 0) {
          return true
        }
        return false
    }

    const postNewPassword = async (password) => {
        try {
            const response = await fetch(`/api/v1/users/reset-password`, {
                method: "PATCH",
                headers: new Headers({
                  "Content-Type": "application/json",
                }),
                body: JSON.stringify(password)
              })
            if (!response.ok) {
                const errorMessage = `${response.status} (${response.statusText})`
                const error = new Error(errorMessage)
                throw error
            }
            const body = await response.json()
            setShouldRedirect(true)
        } catch (error) {
            console.error(`Error in fetch: ${error.message}`)
        }
    }

    const handleInputChange = (event) => {
        setNewPassword({
          ...newPassword,
          [event.currentTarget.name]: event.currentTarget.value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        if (validateInput(newPassword)) {
            await postNewPassword(newPassword)
        }
    }

    if (shouldRedirect) {
        location.href = "/user-sessions/new"
    }
    
    return (
        <div className="index-container">
            <form className="recovery-form" onSubmit={handleSubmit}>
                <TextField 
                    id='password'
                    name='password'
                    type='password'
                    variant='outlined' 
                    label='Enter new password' 
                    size='small'
                    value={newPassword.password}
                    onChange={handleInputChange}
                />
                <FormError error={errors.password} />
                <TextField 
                    id='passwordConfirm'
                    name='passwordConfirm'
                    type='password'
                    variant='outlined' 
                    label='Confirm new password' 
                    size='small'
                    value={newPassword.passwordConfirm}
                    onChange={handleInputChange}
                />
                <FormError error={errors.passwordConfirm} />
                <Button type="submit" size='small' variant="contained">Reset password</Button>
            </form>
        </div>
    )
}

export default withRouter(ResetPassword)