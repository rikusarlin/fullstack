import React from 'react';
import {voteAnecdote} from '../reducers/anecdoteReducer'

const AnecdoteList = (props) => {
  const anecdotes = props.store.getState()
  const sortedAnecdotes = anecdotes.sort((a,b) => b.votes - a.votes )
  const store = props.store

  const vote = (id) => {
    store.dispatch(voteAnecdote(id))
    console.log('vote', id)
  }

  return (
    <div>
      {
        sortedAnecdotes.map(anecdote =>
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
    </div>
  )
}

export default AnecdoteList