import React from 'react'

const Notification = ({ message, style }) => {
  if (message === null) {
    return null
  }
  return (
    <div className='info'>
      {message}
    </div>
  )
}

export default Notification