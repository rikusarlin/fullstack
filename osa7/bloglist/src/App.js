import React from 'react';
import './App.css';
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import { showInfo, showError } from './reducers/notificationReducer'
import { emptyBlogList, createBlog } from './reducers/blogReducer'
import { login, logout } from './reducers/loginReducer'
import Togglable from './components/Togglable'
import  { useField } from './hooks'
import { connect } from 'react-redux'

export const App = (props) => {
  const userName = useField('text')
  const passWord = useField('password')
  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const blogFormRef = React.createRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const username = userName.value
      const password = passWord.value
      props.login(username, password)
      userName.reset()
      passWord.reset()
      props.showInfo('login successful', 3)
    } catch (exception) {
      console.log('exception: '+exception)
      props.showError('wrong username or password',3)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    try {
      props.logout()
      props.emptyBlogList()
      props.showInfo('logout successful', 3)
    } catch (exception) {
      console.log('exception: '+exception)
      props.showError('error in logut', 3)
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
      props.createBlog(newBlog, props.user.token)
      url.reset()
      title.reset()
      author.reset()
      props.showInfo('added new blog', 3)
    } catch (exception) {
      console.log('exception: '+exception)
      props.showError('error in adding new blog', 3)
    }
  }

  const blogList = () => (
    <div>
      <Blogs/>
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
      <Notification/>
      {props.user.username === null ?
        loginForm()
        :
        <div>
          <form onSubmit={handleLogout}>
            <p>{props.user.username} logged in <button type="submit">logout</button></p>
          </form>
          {blogForm()}
          {blogList()}
        </div>
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  showInfo, showError, emptyBlogList, createBlog, login, logout
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
