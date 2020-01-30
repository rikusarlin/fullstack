import React, {useState, useEffect} from 'react';
import blogsService from './services/blogs'
import loginService from './services/login'
import './App.css';
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Error from './components/Error'
import  { useField } from './hooks'

const App = () => {
  const [ blogs, setBlogs] = useState([])
  const [ notificationMessage, setNotificationMessage ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)
  const userName = useField('text')
  const passWord = useField('password')
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')
  const [user, setUser] = useState(null)

  const blogFormRef = React.createRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const username = userName.value
      const password = passWord.value
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogsService.setToken(user.token)
      setBlogs(await blogsService.getAll())
      setUser(user)
      userName.reset()
      passWord.reset()
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

  const handlePost = async (event) => {
    event.preventDefault()
    
    try {
      blogFormRef.current.toggleVisibility()
      const newBlog = {
        title: title.value,
        author: author.value,
        url: url.value
      }
      await blogsService.create(newBlog)
      setBlogs(await blogsService.getAll())
      setNotificationMessage('added new blog')
      url.reset()
      title.reset()
      author.reset()
      setTimeout(() => {
        setNotificationMessage(null)
      }, 3000)
    } catch (exception) {
      console.log('exception: '+exception)
      setErrorMessage('error in adding new blog')
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

  const removeProperty = prop => ({ [prop]: _, ...rest }) => rest
  const removeReset = removeProperty('reset')

  const loginForm = () => (
    <div className="loginForm">
      <h3>Login</h3>
      <form onSubmit={handleLogin}>
        <div>
            <label htmlFor="Username">Username</label>
            <input {...removeReset(userName)} /> 
        </div>
        <div>
          <label htmlFor="Password">Password</label>
          <input {...removeReset(passWord)} />
        </div>
        <button type="submit" className="loginButton">login</button>
      </form>
    </div>
  )

  const blogForm = () => (
  <Togglable buttonLabel="new blog" ref={blogFormRef}>
    <div>
    <h3>New blog</h3>
    <form onSubmit={handlePost}>
      <div>
        <label htmlFor="Title">Title</label>
        <input {...removeReset(title)}/>
      </div>
      <div>
        <label htmlFor="Author">Author</label>
        <input {...removeReset(author)}/>
      </div>
      <div>
        <label htmlFor="URL">URL</label>
        <input {...removeReset(url)}/>
      </div>
      <button type="submit">create</button>
    </form>
    </div>
  </Togglable>
 )

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={notificationMessage}/>
      <Error message={errorMessage}/>
      {user === null ?
        loginForm()
        :
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
