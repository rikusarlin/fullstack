import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const notification = props.notification
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

const mapStateToProps = (state) => {
  console.log('Notification, current state: ',state)
  return {
    notification: state.anecdotes
  }
}


// eksportoidaan suoraan connectin palauttama komponentti
export default connect(
  mapStateToProps,
  null
)(Notification)
