import React from 'react';
import {voteAnecdote} from '../reducers/anecdoteReducer'
import {showInfo, hideNotification} from '../reducers/notificationReducer'


const AnecdoteList = (props) => {
  const anecdotes = props.store.getState().anecdotes
  const sortedAnecdotes = anecdotes.sort((a,b) => b.votes - a.votes )
  const store = props.store

  const vote = (id, content) => {
    store.dispatch(voteAnecdote(id))
    store.dispatch(showInfo('You voted for \''+content+'\''))
    setTimeout(() => {
      store.dispatch(hideNotification())
    }, 3000)
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
            <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList