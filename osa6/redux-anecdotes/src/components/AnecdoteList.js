import React from 'react';
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showInfo } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const vote = async (id, content) => {
    const anecdoteToVote = props.anecdotes.find(n => n.id === id)
    props.voteAnecdote(anecdoteToVote)
    props.showInfo(`You voted for '${anecdoteToVote.content}'`, 3)
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
  return {
    anecdotes: anecdotesToShow(state)
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  showInfo
}

// eksportoidaan suoraan connectin palauttama komponentti
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
