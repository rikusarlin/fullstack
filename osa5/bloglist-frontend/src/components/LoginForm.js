import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  handleLogin,
  setUsername,
  setPassword,
  username,
  password
  }) => {
  
  return (
    <div className="loginForm">
    <h3>Login</h3>
    <form onSubmit={handleLogin}>
      <div>
          <label htmlFor="Username">Username</label>
          <input
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <label htmlFor="Password">Password</label>
          <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" className="loginButton">login</button>
    </form>
    </div>
 )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm