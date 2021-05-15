import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { showInfo } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = {
      content: content,
      votes: 0
    }
    props.createAnecdote(newAnecdote)
    props.showInfo(`Anecdote '${content}' created`, 3)
  }

  return (
    <div>
      <h2>create new</h2>
      <div>
        <form onSubmit={addAnecdote}>
           <input name="anecdote"/><br/>
           <button type="submit">create</button>
         </form>
      </div>
    </div>
  )
}

const mapDispatchToProps = {
  createAnecdote,
  showInfo
}

// eksportoidaan suoraan connectin palauttama komponentti
export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)