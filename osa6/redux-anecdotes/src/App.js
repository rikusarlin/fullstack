import React from 'react';
import {voteAnecdote, createAnecdote} from './reducers/anecdoteReducer'

const App = (props) => {
  const anecdotes = props.store.getState()
  const store = props.store

  const addAnecdote = (event) => {
    event.preventDefault()
    store.dispatch(
      createAnecdote(event.target.anecdote.value)
    )
    event.target.anecdote.value = ''
  }

  const vote = (id) => {
    store.dispatch(voteAnecdote(id))
    console.log('vote', id)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form>
        <div>
        <form onSubmit={addAnecdote}>
          <input name="anecdote"/>
          <button type="submit">add</button>
        </form>
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App