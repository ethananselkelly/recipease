import { Stack } from '@mui/system'
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
            I'm Ethan: full stack software engineer with a background in public and environmental health research. 
            I pursued my interest in technology by learning software engineering fundamentals and web development technologies at Launch Academy’s full stack coding bootcamp.
          </p>  
          <p>  
            I’m excited to continue my learning, solve challenging problems, and level up my skills to drive success for a remote or Boston-based team.       
          </p> 
          <p>
            Feel free to reach out via email or LinkedIn, and thanks for visiting my web app.
          </p>
        </Stack>
      </Stack>
    </div>
  )
}

export default AboutMe
