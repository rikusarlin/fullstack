import React from 'react';
import { connect } from 'react-redux'
import {voteAnecdote} from '../reducers/anecdoteReducer'
import {showInfo, hideNotification} from '../reducers/notificationReducer'


const AnecdoteList = (props) => {
  var filteredAnecdotes = props.anecdotes
  if(props.filter.filter !== null){
    filteredAnecdotes = props.anecdotes.filter(anecdote => {
      return (anecdote.content.indexOf(props.filter) !== -1)
    })
  }
  const sortedAnecdotes = filteredAnecdotes.sort((a,b) => b.votes - a.votes )

  const vote = (id, content) => {
    props.voteAnecdote(id)
    props.showInfo('You voted for \''+content+'\'')
    setTimeout(() => {
      props.hideNotification()
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

const mapStateToProps = (state) => {
  console.log('AnecdoteList, current state: ',state)
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  showInfo,
  hideNotification
}

// eksportoidaan suoraan connectin palauttama komponentti
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
