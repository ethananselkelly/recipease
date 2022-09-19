import { Stack } from '@mui/system'
import React from 'react'

const AboutMe = () => {


  return (
    <div className='index-container'>
      <h1>About me</h1>
      <Stack direction='row'>
        <img src='https://lh3.googleusercontent.com/pw/AL9nZEWwnTTpN6Mp2lpYF619JbDlHEgABst3zGcEVWrn_ONS6QgO2lN7oj4y5tLH8XYcRXOu_-e0eFJR45zTCU5Yt8gOh922qbAT82nddai5y3sqgHEF9rjzMPQg9sKjjzn2CsrI0a-kyTcdIAwjFWlwlaS8=w1002-h1336-no?authuser=0'></img>
        <p>
          First off, thanks for visiting my web app. 
        </p>
        <p>        
          I'm a career changer and learned full stack web development using React and Node.js at Launch Academy, a coding bootcamp in Boston.
          I'm currently seeking a junior dev or similar role at a Boston based or remote
        </p>
      </Stack>
    </div>
  )
}

export default AboutMe
