import React, {useState, useEffect} from 'react';
import blogsService from './services/blogs'
import loginService from './services/login'
import './App.css';
import Blogs from './components/Blogs'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Error from './components/Error'

const App = () => {
  const [ blogs, setBlogs] = useState([])
  const [ notificationMessage, setNotificationMessage ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)

  const blogFormRef = React.createRef()

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
        setNotificationMessage(null)
      }, 3000)
    } catch (exception) {
      console.log('exception: '+exception)
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
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
        setNotificationMessage(null)
      }, 3000)
    } catch (exception) {
      console.log('exception: '+exception)
      setErrorMessage('error in logut')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
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
      <Blogs
        blogs = {blogs}
        setBlogs = {setBlogs}
        setNotificationMessage = {setNotificationMessage}
        setErrorMessage = {setErrorMessage}
        blogsService = {blogsService}
      />
    </div>
 )

 const blogForm = () => (
  <Togglable buttonLabel="new blog" ref={blogFormRef}>
    <NewBlog 
      setBlogs={setBlogs}
      setNotificationMessage={setNotificationMessage}
      setErrorMessage={setErrorMessage}
      blogFormRef={blogFormRef}
    />
  </Togglable>
 )

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={notificationMessage}/>
      <Error message={errorMessage}/>
      {user === null ?
        loginForm() :
        <div>
          <form onSubmit={handleLogout}>
            <p>{user.name} logged in <button type="submit">logout</button></p>
          </form>
          {blogForm()}
          {blogList()}
        </div>
      }
    </div>
  )
}

export default App;
