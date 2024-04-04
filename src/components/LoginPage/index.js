import {useState} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const LoginPage = props => {
  const [username, changeUsername] = useState('')
  const [password, changePassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const [showError, setErrorStatus] = useState(false)

  const onChangeUsername = event => {
    changeUsername(event.target.value)
  }

  const onChangePassword = event => {
    changePassword(event.target.value)
  }

  const onLoginSuccess = jwtToken => {
    const {history} = props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  const onLoginFailure = msg => {
    setErrorStatus(true)
    setErrorMsg(msg)
  }

  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Redirect to="/" />
  }

  const onClickLogin = async event => {
    event.preventDefault()

    const url = 'https://apis.ccbp.in/login'
    const userDetails = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      onLoginSuccess(data.jwt_token)
    } else {
      onLoginFailure(data.error_msg)
    }
  }

  return (
    <div className="login-main-bg">
      <img
        src="https://res.cloudinary.com/dxebvkapr/image/upload/v1705753633/jsr5llpyooat3lpzxru2.jpg"
        alt="website login"
        className="login-image"
      />
      <div className="right-cont-login">
        <form onSubmit={onClickLogin}>
          <div className="logo-cont">
            <img
              src="https://res.cloudinary.com/dxebvkapr/image/upload/v1705754565/Group_7730_utec8z.jpg"
              alt="login website logo"
              className="login-logo"
            />
            <p className="login-logo-text">ook Hub</p>
          </div>
          <div className="input-cont">
            <label htmlFor="username">Username*</label>
            <input
              type="text"
              id="username"
              placeholder="Enter Username"
              value={username}
              onChange={onChangeUsername}
              className="login-input"
            />
          </div>
          <div className="input-cont">
            <label htmlFor="password">Password*</label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              value={password}
              onChange={onChangePassword}
              className="login-input"
            />
            {showError && <p className="error-msg">{errorMsg}</p>}
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
