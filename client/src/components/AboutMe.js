import { Stack, Button } from '@mui/system'
import React from 'react'

const AboutMe = () => {


  return (
    <div className='about-me-container'>
      <h2 className='about-header'>About me</h2>
      <Stack 
        direction='column'
        justifyContent='center'
        alignItems='center'
        spacing={2}
        margin={2}
      >
        <img className='about-image' src='https://lh3.googleusercontent.com/pw/AL9nZEWwnTTpN6Mp2lpYF619JbDlHEgABst3zGcEVWrn_ONS6QgO2lN7oj4y5tLH8XYcRXOu_-e0eFJR45zTCU5Yt8gOh922qbAT82nddai5y3sqgHEF9rjzMPQg9sKjjzn2CsrI0a-kyTcdIAwjFWlwlaS8=w1002-h1336-no?authuser=0'></img>
 
        <Stack
          justifyContent='center'
          alignItems='center'
          textAlign='center'
          px={{lg: 25, md: 18, sm:4}}
        >
          <p>
            First, thanks for visiting my web app. Second, I'm looking for work!
          </p>
          <p>        
            I'm Ethan Ansel-Kelly. Career changer, full stack developer, and home cook (and more, but this is most relevant here), with a background in environmental science and clinical research. 
            I learned full stack web development at Launch Academy, a coding bootcamp in Boston that mainly taught Node.js, React, and Postgresql, as well as software engineering fundamentals to help me get job-ready in this new field.

          </p>
          <p>
            Changing careers is both scary and exciting - a bit like jumping off a cliff, except when you jump it takes a little longer than 1 second to land.
            Despite that, I'm happy I took the plunge and I'm eager to continuing to learn and challenge myself in my new career.
            Attending a coding bootcamp was a great, fast-paced educational experience, and I'm ready to bring those skills to a Boston-based or remote company. 
 
          </p>
          <p>
            I'm seeking a junior dev or similar role, and am open to conversations if you would like to reach me on LinkedIn or email (see below).

          </p>
        </Stack>
      </Stack>
    </div>
  )
}

export default AboutMe
