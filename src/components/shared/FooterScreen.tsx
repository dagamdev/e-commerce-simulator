import "./footerScreen.css"
import React from 'react'

export const FooterScreen = ()=> {
  return (
    <footer>
      <p className="copyright">&copy; David Garcia</p>
      <div className="social_networks">
        <a className="social_network" href="https://www.linkedin.com/in/david-garcia-607a40240/" target={"_blank"}>
          <i className='bx bxl-linkedin'></i>
        </a>
      </div>
    </footer>
  )
}