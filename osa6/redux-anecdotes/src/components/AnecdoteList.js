import React from 'react';
import { connect } from 'react-redux'
import {voteAnecdote} from '../reducers/anecdoteReducer'
import {showInfo, hideNotification} from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteList = (props) => {
  const vote = async (id, content) => {
    const anecdoteToVote = props.anecdotes.find(n => n.id === id)
    const updatedAnecdote = await anecdoteService.update({ 
      ...anecdoteToVote, 
      votes: anecdoteToVote.votes +1 
    })
    props.voteAnecdote(updatedAnecdote)
    props.showInfo('You voted for \''+content+'\'')
    setTimeout(() => {
      props.hideNotification()
    }, 3000)
  }

  return (
    <div>
      {
        props.anecdotes.map(anecdote =>
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

const anecdotesToShow = ({anecdotes, filter}) => {
  var filteredAnecdotes = anecdotes
  if(filter.filter !== null){
    filteredAnecdotes = anecdotes.filter(anecdote => {
      return (anecdote.content.indexOf(filter) !== -1)
    })
  }
  return filteredAnecdotes.sort((a,b) => b.votes - a.votes )
}

const mapStateToProps = (state) => {
  console.log('AnecdoteList, current state: ',state)
  return {
    anecdotes: anecdotesToShow(state)
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
