import React from 'react'
import { connect } from 'react-redux'
import {createAnecdote} from '../reducers/anecdoteReducer'
import {showInfo, hideNotification} from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const addAnecdote = (event) => {
    event.preventDefault()
    props.createAnecdote(event.target.anecdote.value)
    props.showInfo('Anecdote \''+event.target.anecdote.value+'\' created')
    setTimeout(() => {
      props.hideNotification()
    }, 3000)

    event.target.anecdote.value = ''
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
  showInfo,
  hideNotification
}

// eksportoidaan suoraan connectin palauttama komponentti
export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)