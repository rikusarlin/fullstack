import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import Select from 'react-select'

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  // eslint-disable-next-line no-unused-vars
  const [timeout, setTimeout] = useState(null)
  const [selectedAuthor, setSelectedAuthor] = useState(null)

  const SET_BIRTHYEAR = gql`
    mutation setBornTo($name: String!, $born: Int!){
      editAuthor(
        name: $name, 
        born: $born
      ) {
        name
        born
        id
        bookCount
      }
    }
  `

  const handleError = (error) => {
    setErrorMessage(error.message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const [addBook] = useMutation(SET_BIRTHYEAR, {
    onError: handleError,
    refetchQueries: [{query: props.allAuthorsQuery }]
  })

  const submit = async (e) => {
    e.preventDefault()
    await addBook({
      variables: { name, born }
    })

    setName('')
    setBorn('')
  }

  const { loading, error, data } = useQuery(props.allAuthorsQuery);
  
  const handleAuthorChange = selectedOption => {
    setSelectedAuthor(selectedOption)
    setName(selectedOption.value)
  }

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;


  if (!props.show) {
    return null
  }

  return (
    <div>
      <div>
        {errorMessage &&
          <div style={{ color: 'red' }}>
            {errorMessage}
          </div>
        }
      </div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          <Select
            value={ selectedAuthor }
            onChange={ handleAuthorChange }
            options={ data.allAuthors.map(a => 
                       ({value: a.name, label:a.name}))
            }
          />
        </div>
        <div>
          born
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(parseInt(target.value))}
          />
        </div>
        <button type='submit'>update author</button>
      </form>

    </div>
  )
}

export default Authors