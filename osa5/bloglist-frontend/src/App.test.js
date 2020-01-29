import React from 'react'
import App from './App'
import { 
  render, waitForElement,fireEvent 
} from '@testing-library/react'
//import { prettyDOM } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'
jest.mock('./services/blogs')
jest.mock('./services/login')

describe('<App />', () => {
  test('if no user logged, login form is rendered', async () => {

    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement( () => component.getByText('Login')) 

    const loginForm = component.container.querySelector('.loginForm')

    //console.log(prettyDOM(loginForm))
    expect(loginForm).toHaveTextContent('Username')
    expect(loginForm).toHaveTextContent('Password')
  })

  test('if user logged in, the blogs of user are shown', async () => {
    
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    }
    
    window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))

    const component = render(
      <App />
    )
    component.rerender(<App />)

    // We have an user in local storage, but we still have to click login button
    // in order to show the blogs!
    await waitForElement( () => component.getByText('Login')) 
    const loginButton = component.container.querySelector('.loginButton')
    fireEvent.click(loginButton)

    component.rerender(<App />)
    await waitForElement( () => component.getByText('Blogs')) 

    //const blogList = component.container.querySelector('.blogList')
    //console.log(prettyDOM(blogList))

    const blogs = component.container.querySelectorAll('.blogItem')
    expect(blogs.length).toBe(3) 

    expect(component.container).toHaveTextContent(
      'Use cases considered harmful'
    )
    expect(component.container).toHaveTextContent(
      'Kela, Jumalasta seuraava'
    )
    expect(component.container).toHaveTextContent(
      'Exploratory testing'
    )
    
  })

})