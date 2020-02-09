const initialState = {
  type: 'EMPTY',
  message: ''
}

export const showInfo = (message) => {
  console.log('somebody just called showInfo')
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
  console.log('state before action in notificationReducer: ', state)
  console.log('action in notificationReducer', action)

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