import React from 'react';
import {createAnecdote} from '../reducers/anecdoteReducer'
import {showInfo, hideNotification} from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const store = props.store

  const addAnecdote = (event) => {
    event.preventDefault()
    store.dispatch(
      createAnecdote(event.target.anecdote.value)
    )
    store.dispatch(showInfo('Anecdote \''+event.target.anecdote.value+'\' created'))
    setTimeout(() => {
      store.dispatch(hideNotification())
    }, 3000)

    event.target.anecdote.value = ''
  }

  return (
    <div>
      <h2>create new</h2>
      <form>
        <div>
        <form onSubmit={addAnecdote}>
          <input name="anecdote"/>
          <button type="submit">add</button>
        </form>
        </div>
      </form>
    </div>
  )
}
export default AnecdoteForm