import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Todo from './Todo'


describe('<Todo />', () => {
  let componentNotDone, componentDone

  const mockHandler1 = jest.fn()
  const mockHandler2 = jest.fn()

  beforeEach(() => {
    const notDoneTodo = { 
        "text":"Learn Jest",
        "done":false
    }
    componentNotDone = render(
      <Todo
       id='432342'
       todo={notDoneTodo}
       deleteTodo={mockHandler1}
       completeTodo={mockHandler2}
    />
    )
    const doneTodo = { 
        "text":"Learn Javascript",
        "done":true
    }
    componentDone = render(
        <Todo
         id='432342'
         todo={doneTodo}
         deleteTodo={mockHandler1}
         completeTodo={mockHandler2}
      />
      )
    })

  test('renders its contents', async () => {
    await componentDone.container.querySelector('.todoText')
    await componentNotDone.container.querySelector('.todoText')
  })

  test('uncomplete todo states that todo is not done', async () => {
    const div = await componentNotDone.container.querySelector('.todoNotDone')
    //console.log(prettyDOM(div))
    expect(div).toHaveTextContent('This todo is not done')
  })

  test('complete todo states that todo is done', async () => {
    const div = await componentDone.container.querySelector('.todoDone')
    //console.log(prettyDOM(div))
    expect(div).toHaveTextContent('This todo is done')
  })

})