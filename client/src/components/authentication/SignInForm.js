import React, { useState } from "react";
import config from "../../config";
import FormError from "../layout/FormError";
import { Button, Stack } from "@mui/material";
import { NavLink } from "react-router-dom";

const SignInForm = () => {
  const [userPayload, setUserPayload] = useState({ email: "", password: "" });
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [errors, setErrors] = useState({});

  const validateInput = (payload) => {
    // setErrors({});
    const { email, password } = payload;
    const emailRegexp = config.validation.email.regexp;
    let newErrors = {};
    if (!email.match(emailRegexp)) {
      newErrors = {
        ...newErrors,
        email: "invalid email",
      };
    }

    if (password.trim() === "") {
      newErrors = {
        ...newErrors,
        password: "password is required",
      };
    }

    setErrors(newErrors);
  };

  const onSubmit = async (event) => {
    event.preventDefault()
    validateInput(userPayload)
    try {
      if (Object.keys(errors).length === 0) {
        const response = await fetch("/api/v1/user-sessions", {
          method: "post",
          body: JSON.stringify(userPayload),
          headers: new Headers({
            "Content-Type": "application/json",
          })
        })
        if(!response.ok) {
          const errorMessage = `${response.status} (${response.statusText})`
          const error = new Error(errorMessage)
          throw(error)
        }
        const userData = await response.json()
        setShouldRedirect(true)
      }
    } catch(err) {
      let newErrors = {
        login: "invalid email or password"
      }
      setErrors(newErrors)
      console.error(`Error in fetch: ${err.message}`)
    }
  }

  const onInputChange = (event) => {
    setUserPayload({
      ...userPayload,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  if (shouldRedirect) {
    location.href = "/recipes";
  }

  return (
    <div className="index-container">
      <form className="grid-container" onSubmit={onSubmit}>
        <h4>Sign In</h4>
        <div>
          <label>
            Email
            <input type="text" name="email" value={userPayload.email} onChange={onInputChange} />
            <FormError error={errors.email} />
          </label>
        </div>
        <div>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={userPayload.password}
              onChange={onInputChange}
            />
            <FormError error={errors.password} />
          </label>
        </div>
        <div>
          <FormError error={errors.login} />
          <Button type='submit' size='small' variant="contained">Sign In</Button>
        </div>
      </form>
      <div className="grid-container">
        <Stack direction="column" py={1} >
          Don't have an account?
          <NavLink exact to='/users/new'>
            <Button size='small' variant='contained' >Sign Up</Button>
          </NavLink>
        </Stack>
      </div>
    </div>
  );
};

export default SignInForm;