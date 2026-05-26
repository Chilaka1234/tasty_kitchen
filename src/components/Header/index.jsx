import Cookies from 'js-cookie'
import {Link, useNavigate} from 'react-router-dom'
import logo from '../../assets/download.jpeg'

import './index.css'

const Header = () => {
  const navigate = useNavigate()

  const logout = () => {
    Cookies.remove('jwt_token')
    navigate('/login')
  }

  return (
    <nav className="header-nav">
      <Link to="/" className="header-logo-container">
        <img
  src={logo}
  alt="website logo"
  className="header-logo"
/>
        <h1 className="header-title">Tasty Kitchens</h1>
      </Link>

      <div className="header-links">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
        <button type="button" className="logout-button" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Header