import React from 'react'
import App from './App'
import { 
  render, waitForElement 
} from '@testing-library/react'
//import { prettyDOM } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'
jest.mock('./services/blogs')

describe('<App />', () => {
  test('if no user logged, login form is rendered', async () => {

    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement( () => component.getByText('Login')) 

    const loginForm = component.container.querySelector('.loginForm')
    //console.log(prettyDOM(loginForm))
    expect(loginForm).toHaveTextContent('username')
    expect(loginForm).toHaveTextContent('password')
  })
})