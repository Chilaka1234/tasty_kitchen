import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'
import logo from '../../assets/download.jpeg'

import './index.css'

const Footer = () => (
  <footer>
    <img
      src={logo}
      alt="website-footer-logo"
      className="footer-logo"
    />

    <h1>Tasty Kitchens</h1>
    <p>The only thing we are serious about is food.</p>

    <div>
      <FaPinterestSquare testid="pintrest-social-icon" />
      <FaInstagram testid="instagram-social-icon" />
      <FaTwitter testid="twitter-social-icon" />
      <FaFacebookSquare testid="facebook-social-icon" />
    </div>
  </footer>
)

export default Footer