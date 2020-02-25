import React from 'react';
import './App.css';
import Blogs from './components/Blogs'
import Blog from './components/Blog'
import Users from './components/Users'
import User from './components/User'
import Notification from './components/Notification'
import NewBlog from './components/NewBlog'
import {
  BrowserRouter as Router,
  Route, Link
} from 'react-router-dom'
import { connect } from 'react-redux'
import { login, logout } from './reducers/loginReducer'
import { showInfo, showError } from './reducers/notificationReducer'
import { emptyBlogList } from './reducers/blogReducer'
import  { useField } from './hooks'
import { removeReset } from './utils'


export const App = (props) => {
  const userName = useField('text')
  const passWord = useField('password')

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

  const logoutForm = () => (
    <button type="button" onClick={handleLogout}>logout</button>
  )

  const userById = (id) => {
    if(props.user !== null) {
      return props.users.find(a => a.id === id)
    } else {
      return null
    }
  }

  const blogById = (id) => {
    if(props.blogs !== null) {
      return props.blogs.find(a => a.id === id)
    } else {
      return null
    }
  }

  return (
    <div>
      {props.user.username !== null ?
        <div>
          <Router>
            <div>
              <div className="menuItem">
                <Link  to="/">blogs</Link>
                <Link  to="/users">users</Link>
                <div className="logout">
                  {props.user.name } logged in {logoutForm()}
                </div>
              </div>
              <Notification/>
              <div>
                <h2>Blog app</h2>
              </div>
              <Route exact path="/" render={() =>
                <div>
                  <NewBlog/>
                  <Blogs/>
                </div>
              } />
              <Route exact path="/blogs" render={() =>
                <div>
                  <NewBlog/>
                  <Blogs/>
                </div>
              } />
              <Route exact path="/users" render={() => <Users />} />
              <Route exact path="/users/:id" render={({ match }) =>
                <User 
                  user={userById(match.params.id)}
                /> 
              } /> 
              <Route exact path="/blogs/:id" render={({ match }) =>
                <Blog 
                  blog={blogById(match.params.id)}
                /> 
              } /> 
            </div>
          </Router>
        </div>
        :
        <div>
          <h2>Blog app</h2>
          <Notification/>
          {loginForm()}
        </div>
      }
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    users: state.users,
    blogs: state.blogs
  }
}

const mapDispatchToProps = {
  login,logout, showInfo, showError, emptyBlogList
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)