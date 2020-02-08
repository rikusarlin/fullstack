import React from 'react'
import { connect } from 'react-redux'
import {filterData} from '../reducers/filterReducer'

const Filter = (props) => {

  const handleChange = (event) => {
    event.preventDefault()
    props.filterData(event.target.value)
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

const mapDispatchToProps = {
  filterData
}

// eksportoidaan suoraan connectin palauttama komponentti
export default connect(
  null,
  mapDispatchToProps
)(Filter)