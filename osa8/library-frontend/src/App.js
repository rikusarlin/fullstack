import React, { useState  } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommend from './components/Recommend'
import LoginForm from './components/LoginForm'
import { gql } from 'apollo-boost'
import { useMutation, useApolloClient } from '@apollo/react-hooks'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const client = useApolloClient()

  const ALL_BOOKS = gql`
  {
    allBooks { 
      title
      author {
        name
        id
      }
      published
      id
      genres
    }
  }
  `

  const ALL_BOOKS_BY_GENRE = gql`
  query ($genre: String!){
    allBooks(genre:$genre) { 
      title
      author {
        name
        born
        id
        bookCount
      }
      published
      id
      genres
    }
  }
  `

  const ALL_AUTHORS = gql`
  {
    allAuthors { 
      name
      id
      born
      bookCount
    }
  }
  `

  const ALL_BOOKS_AND_ME = gql`
  {
    allBooks { 
      title
      author {
        name
        id
      }
      published
      id
      genres
    }
    me {
      username
      id
      favoriteGenre
    }
  }
  `
  const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
      login(username: $username, password: $password)  {
        value
      }
    }  `

  const handleError = (error) => {
    console.log(`error.message: ${error.message}`)
    setErrorMessage(error.message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }

  const [login] = useMutation(LOGIN, {
    onError: handleError
  })

  const errorNotification = () => {
    if(errorMessage){
      return(
        <div style={{ color: 'red' }}>
          {errorMessage}
        </div>          
      )
    }
  }

  const logout = () => {
    setPage('authors')
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const conditionalButtons = () => {
    if(token === null){
      return(
        <button onClick={() => setPage('login')}>login</button>
      )
    } else {
      return(
        <span>
          <button onClick={() => setPage('add')}>add book</button>
          <button onClick={() => setPage('recommend')}>recommend</button>
          <button onClick={() => logout()}>logout</button>
        </span>
      )      
    }
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {conditionalButtons()}
      </div>

      {errorNotification()}
      <LoginForm
        show={page === 'login'}
        login={login}
        setToken={(token) => setToken(token)}
        setPage={(page) => setPage(page)}
      />

      <Authors
        show={page === 'authors'}
        allAuthorsQuery={ALL_AUTHORS}
        token={token}
      />

      <Books
        show={page === 'books'}
        allBooksQuery={ALL_BOOKS}
        allBooksByGenreQuery={ALL_BOOKS_BY_GENRE}
      />

      <Recommend
        show={page === 'recommend'}
        allBooksAndMeQuery={ALL_BOOKS_AND_ME}
      />

      <NewBook
        show={page === 'add'}
        allBooksQuery={ALL_BOOKS}
        allAuthorsQuery={ALL_AUTHORS}
        handleError={handleError}
      />

    </div>
  )
}

export default App