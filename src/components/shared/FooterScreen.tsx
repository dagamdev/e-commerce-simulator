import "./footerScreen.css"
import { TfiLinkedin } from 'react-icons/tfi'

export const FooterScreen = ()=> {
  return (
    <footer>
      <p className="copyright">&copy; David Garcia</p>
      <div className="social_networks">
        <a className="social_network" href="https://www.linkedin.com/in/david-garcia-607a40240/" target={"_blank"}>
          <TfiLinkedin />
        </a>
      </div>
    </footer>
  )
}