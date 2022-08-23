import React from "react";

const Footer = () => {
  return (
    <div className="fixed-bottom">
      <hr className='footer dashed'/>
      <div className="footer container">
        <a className="link" href="https://github.com/ethananselkelly" target='_blank'>GitHub</a>
        ||
        <a className="link" href="https://www.linkedin.com/in/ethan-ansel-kelly/" target='_blank'>LinkedIn</a>
      </div>
    </div>
  )
}

export default Footer