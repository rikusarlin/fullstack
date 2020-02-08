import React from 'react'

const Notification = (props) => {
  const notification = props.store.getState().notification
  const basicStyle = {
    border: 'none',
    padding: 0,
    borderWidth: 0
  }
  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: '16px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }
  const infoStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: '16px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
  }

  if(notification.message === null){
    return (
      <div/>
    )      
  } else {
    if(notification.type === 'INFO'){
      return(
        <div style={infoStyle}>
          {notification.message}
       </div>  
      )
    } else if(notification.type === 'ERROR'){
      return(
        <div style={errorStyle}>
          {notification.message}
       </div>  
      )
    } else {
      return (
        <div style={basicStyle}>
          {notification.message}
        </div>  
      )
    }
  }
}

export default Notification