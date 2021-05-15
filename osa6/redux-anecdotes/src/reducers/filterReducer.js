const initialState = {
  filter: null
}

export const filterData = (filter) => {
  return {
    type: 'FILTER',
    data: filter
  }
}

const filterReducer = (state = initialState, action) => {
  console.log('state before action in filterReducer: ', state)
  console.log('action in filterReducer', action)

  switch(action.type) {
    case 'FILTER':
      state = action.data
      return state
    default:
      return state
  }
}

export default filterReducer