import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
import {Blog} from './Blog'


describe('<Blog />', () => {
  let component

  const mockHandler1 = jest.fn()
  const mockHandler2 = jest.fn()
  const mockHandler3 = jest.fn()
  const mockHandler4 = jest.fn()

  beforeEach(() => {
    const user = {
      name: 'Riku Sarlin',
      username: 'rikusarlin',
      token: '438765436298'
    }
    component = render(
      <Blog
       id='432342'
       title='Blog title'
       author='John Author'
       likes='12'
       url='http://www.kela.fi/jokin/osoite.html'
       user={user}
       showInfo={mockHandler1}
       showError={mockHandler2}
       likeBlog={mockHandler3}
       deleteBlog={mockHandler4}
    />
    )
  })

  afterEach(cleanup)

  test('renders its contents', () => {
    component.container.querySelector('.blogClosed')
  })

  test('at start the only basic content is displayed', () => {
    const div = component.container.querySelector('.blogClosed')
    // console.log(prettyDOM(div))
    expect(div).not.toHaveStyle('display: none')
    expect(div).toHaveTextContent('Blog title')
    expect(div).toHaveTextContent('John Author')
    expect(div).not.toHaveTextContent('added by rikusarlin')
    expect(div).not.toHaveTextContent('12 likes')
    expect(div).not.toHaveTextContent('http://www.kela.fi/jokin/osoite.html')
    const div2 = component.container.querySelector('.blogOpened')
    expect(div2).toHaveStyle('display: block')
  })

  test('after clicking blog name, details are displayed', () => {
    const div = component.container.querySelector('.blogClosed')
    fireEvent.click(div)
    const div2 = component.container.querySelector('.blogOpened')

    // console.log(prettyDOM(div2))
    expect(div).toHaveStyle('display: block')
    expect(div2).not.toHaveStyle('display: none')
    expect(div2).toHaveTextContent('Blog title')
    expect(div2).toHaveTextContent('John Author')
    expect(div2).toHaveTextContent('added by Riku Sarlin')
    expect(div2).toHaveTextContent('12 likes')
    expect(div2).toHaveTextContent('http://www.kela.fi/jokin/osoite.html')

  })

})