import React from "react";
import Divider from '@mui/material/Divider'

const Footer = () => {
  return (
    <div className="fixed-bottom">
      <Divider />
      <div className="footer container">
        <a className="link" href="https://github.com/ethananselkelly/recipease" target='_blank'>GitHub</a>
        ||
        <a className="link" href="https://www.linkedin.com/in/ethan-ansel-kelly/" target='_blank'>LinkedIn</a>
        ||
        <a className="link" href="mailto:eanselke@gmail.com">Email</a>
      </div>
    </div>
  )
}

export default Footer