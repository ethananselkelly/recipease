import React from "react";
import Divider from '@mui/material/Divider'
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';

const Footer = () => {
  return (
    <div className="fixed-bottom">
      <Divider />
      <div className="footer container">
        <a className="link" href="https://github.com/ethananselkelly/recipease" target='_blank'><GitHubIcon/></a>
        |
        <a className="link" href="https://www.linkedin.com/in/ethan-ansel-kelly/" target='_blank'><LinkedInIcon/></a>
        |
        <a className="link" href="mailto:eanselke@gmail.com"><EmailIcon/></a>
      </div>
    </div>
  )
}

export default Footer