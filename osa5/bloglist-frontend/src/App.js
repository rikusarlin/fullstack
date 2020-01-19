import React, {useState} from 'react';
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

      const returnedBlogs = await blogsService.getAll(user.token)
      setBlogs(returnedBlogs)
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
          <p>{user.name} logged in</p>
          {blogList()}
        </div>
      }
    </div>
  )
}

export default App;
