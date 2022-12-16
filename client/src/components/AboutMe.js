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
        <img className='about-image' src='https://lh3.googleusercontent.com/pw/AL9nZEX7i8F6FHOcXYjMz_knW5aB_S4At56ADA-K2Yka14xBNhHjo13SVpCeh0FdbySwhanM1MVmX1d2dtQmj9UvnVKdxJ-y5g2FuAQYv458bOapi600OgKD2iUA3Qu0HYP6uS4X2D7WkSmvkKZHYpLwOJN6=w1280-h960-no?authuser=0'></img>
 
        <Stack
          justifyContent='center'
          alignItems='center'
          textAlign='center'
          px={{lg: 25, md: 18, sm:4}}
        >
          <p>
            Thanks for visiting my web app.
          </p>
          <p> 
            I'm Ethan: full stack software engineer after transitioning from a career in public and environmental health research. 
            I pursued my interest in technology by learning software engineering fundamentals and web development technologies at Launch Academy’s full stack coding bootcamp.
          </p>  
          <p>  
            Completing a coding bootcamp with a cohort of motivated, like-minded career-switchers was a great experience, and I left Launch Academy well positioned to continue my learning and further develop my technical skills in my new career. 
            I’m excited to solve challenging problems and build on the fundamentals of software engineering to drive success for a remote or Boston-based team.       
          </p> 
        </Stack>
      </Stack>
    </div>
  )
}

export default AboutMe
