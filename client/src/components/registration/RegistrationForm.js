import React, { useState } from "react";
import FormError from "../layout/FormError";
import config from "../../config";
import { Button } from "@mui/material";

const RegistrationForm = () => {
  const [userPayload, setUserPayload] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });

  const [errors, setErrors] = useState({});

  const [shouldRedirect, setShouldRedirect] = useState(false);

  const validateInput = (payload) => {
    setErrors({});
    const { username, email, password, passwordConfirmation } = payload;
    const emailRegexp = config.validation.email.regexp.emailRegex;
    const passwordRegexp = config.validation.password.regexp.passwordRegex
    let newErrors = {};
    if (username.trim() == "") {
      newErrors = {
        ...newErrors,
        username: "is required"
      }
    }
    if (username.trim().length < 5) {
      newErrors = {
        ...newErrors,
        username: "must be at least 5 characters"
      }
    }
    if (!email.match(emailRegexp)) {
      newErrors = {
        ...newErrors,
        email: "is invalid",
      };
    }

    if (password.trim() == "" || !password.match(passwordRegexp)) {
      newErrors = {
        ...newErrors,
        password: "minimum eight characters, at least one uppercase letter, one lowercase letter and one number",
      };
    }

    if (passwordConfirmation.trim() === "") {
      newErrors = {
        ...newErrors,
        passwordConfirmation: "is required",
      };
    } else {
      if (passwordConfirmation !== password) {
        newErrors = {
          ...newErrors,
          passwordConfirmation: "does not match password",
        };
      }
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      return true
    }
    return false
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if(validateInput(userPayload)){
      try {
        if (Object.keys(errors).length === 0) {
          const response = await fetch("/api/v1/users", {
            method: "post",
            body: JSON.stringify(userPayload),
            headers: new Headers({
              "Content-Type": "application/json",
            }),
          });
          if (!response.ok) {
            const errorMessage = `${response.status} (${response.statusText})`;
            const error = new Error(errorMessage);
            throw error;
          }
          const userData = await response.json();
          setShouldRedirect(true);
        }
      } catch (err) {
        console.error(`Error in fetch: ${err.message}`);
      }
    };
  };

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
        <h4>Register</h4>
        <div>
          <label>
            Username
            <input 
              type="text" 
              name="username" 
              value={userPayload.username} 
              onChange={onInputChange} 
            />
            <FormError error={errors.username} />
          </label>
        </div>
        <div>
          <label>
            Email
            <input 
              type="text" 
              name="email" 
              value={userPayload.email} 
              onChange={onInputChange} 
            />
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
          <label>
            Password Confirmation
            <input
              type="password"
              name="passwordConfirmation"
              value={userPayload.passwordConfirmation}
              onChange={onInputChange}
            />
            <FormError error={errors.passwordConfirmation} />
          </label>
        </div>
        <div>
          <Button type='submit' size='small' variant='contained'>Register</Button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
