export const voteAnecdote = (content) => {
  return {
    type: 'VOTE',
    data: content
  }
}

export const createAnecdote = (content) => {
  console.log('anecdoteReducer, createAnecdote, content: ',content)
  return {
    type: 'NEW_ANECDOTE',
    data: content
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  }
}
const reducer = (state = [], action) => {
  console.log('state before action in anecdoteReducer: ', state)
  console.log('action in anecdoteReducer', action)

  switch(action.type) {
    case 'NEW_ANECDOTE':
      return state.concat(action.data)
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