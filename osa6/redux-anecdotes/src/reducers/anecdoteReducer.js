import anecdoteService from '../services/anecdotes'

export const voteAnecdote = (anecdoteToVote) => {
  return async dispatch => {
    const content = { 
      ...anecdoteToVote, 
      votes: anecdoteToVote.votes +1 
    }
    const updatedAnecdote = await anecdoteService.update(content)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

const reducer = (state = [], action) => {
  console.log('state before action in anecdoteReducer: ', state)
  console.log('action in anecdoteReducer', action)

  switch(action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'VOTE':
      const id = action.data.id
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : action.data 
      )
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export default reducer