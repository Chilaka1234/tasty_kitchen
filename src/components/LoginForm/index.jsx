import {useState} from 'react'
import Cookies from 'js-cookie'
import {useNavigate, Navigate} from 'react-router-dom'
import logo from '../../assets/download.jpeg'

import './index.css'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [showError, setShowError] = useState(false)

  const navigate = useNavigate()
  const jwtToken = Cookies.get('jwt_token')

  if (jwtToken !== undefined) {
    return <Navigate to="/" />
  }

  const submitForm = async event => {
    event.preventDefault()

    const userDetails = {
      username,
      password,
    }

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()

    if (response.ok === true) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 30})
      navigate('/', {replace: true})
    } else {
      setShowError(true)
      setErrorMsg(data.error_msg)
    }
  }

  return (
    <div className="login-container">
      <img
        src={logo}
        alt="website login"
        className="login-image"
      />

      <form className="form-container" onSubmit={submitForm}>
<img
  src={logo}
  alt="website logo"
  className="website-logo"
/>

        <h1>Tasty Kitchens</h1>

        <label htmlFor="username">USERNAME</label>
        <input
          id="username"
          type="text"
          value={username}
          placeholder="Username"
          onChange={event => setUsername(event.target.value)}
        />

        <label htmlFor="password">PASSWORD</label>
        <input
          id="password"
          type="password"
          value={password}
          placeholder="Password"
          onChange={event => setPassword(event.target.value)}
        />

        <button type="submit">Login</button>

        {showError && <p className="error-message">*{errorMsg}</p>}
      </form>
    </div>
  )
}

export default LoginForm