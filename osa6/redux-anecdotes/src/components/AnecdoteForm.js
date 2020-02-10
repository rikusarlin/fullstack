import React from 'react'
import { connect } from 'react-redux'
import {createAnecdote} from '../reducers/anecdoteReducer'
import {showInfo, hideNotification} from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = {
      content: content,
      votes: 0
    }
    const createdAnecdote = await anecdoteService.create(newAnecdote)
    props.createAnecdote(createdAnecdote)
    props.showInfo('Anecdote \''+content+'\' created')
    setTimeout(() => {
      props.hideNotification()
    }, 3000)
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

const mapStateToProps = (state) => {
  console.log('AnecdoteForm, current state: ',state)
  return {
    anecdotes: state.anecdotes
  }
}

const mapDispatchToProps = {
  createAnecdote,
  showInfo,
  hideNotification
}

// eksportoidaan suoraan connectin palauttama komponentti
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteForm)