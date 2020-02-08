const initialState = {
  type: 'EMPTY',
  message: ''
}

export const showInfo = (message) => {
  return {
    type: 'SHOW',
    data: {
      message: message,
      type: 'INFO'
    }
  }
}

export const showError = (message) => {
  return {
    type: 'SHOW',
    data: {
      message: message,
      type: 'ERROR'
    }
  }
}

export const hideNotification = () => {
  return {
    type: 'HIDE',
    data: { }
  }
}

const notificationReducer = (state = initialState, action) => {
  console.log('state before action: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'SHOW':
      state = action.data
      return state
    case 'HIDE':
       state = initialState
       return state
     default:
       return state
  }
}

export default notificationReducer