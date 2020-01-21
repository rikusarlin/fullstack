import React, {useState, useEffect} from 'react';
import blogsService from './services/blogs'
import loginService from './services/login'
import './App.css';
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import Error from './components/Error'

const App = () => {
  const [ blogs, setBlogs] = useState([])
  const [ notificationMessage, setNotificationMessage ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogsService.setToken(user.token)
      setBlogs(await blogsService.getAll())
      setUser(user)
      setUsername('')
      setPassword('')
      setNotificationMessage('login successful')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      console.log('exception: '+exception)
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      setUser(null)
      setUsername('')
      setPassword('')
      setNotificationMessage('logout successful')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    } catch (exception) {
      console.log('exception: '+exception)
      setErrorMessage('error in logut')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogsService.setToken(user.token)
    }
  }, [])

  const loginForm = () => (
    <div>
    <h3>Login</h3>
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
    </div>
 )

  const blogList = () => (
    <div>
      <h3>Blogs</h3>
      <Blogs blogs = {blogs} />
    </div>
 )

  return (
    <div>
      <h2>Bloglist</h2>
      <Notification message={notificationMessage}/>
      <Error message={errorMessage}/>
      {user === null ?
        loginForm() :
        <div>
          <form onSubmit={handleLogout}>
            <p>{user.name} logged in <button type="submit">logout</button></p>
          </form>
          {blogList()}
        </div>
      }
    </div>
  )
}

export default App;
