import React from 'react'
import {filterData} from '../reducers/filterReducer'

const Filter = (props) => {
  const store = props.store
 
  const handleChange = (event) => {
    event.preventDefault()
    store.dispatch(
      filterData(event.target.value)
    )
  }


  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter