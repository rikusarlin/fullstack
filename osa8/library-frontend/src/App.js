import React, { useState  } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommend from './components/Recommend'
import LoginForm from './components/LoginForm'
import { gql } from 'apollo-boost'
import { useMutation, useSubscription ,useApolloClient } from '@apollo/react-hooks'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)

  const client = useApolloClient()

  const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    author {
      name
      id
    }
    published
    id
    genres
  }
  `

  const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
  `

  const ALL_BOOKS = gql`
  {
    allBooks { 
      ...BookDetails
    }
  }
  ${BOOK_DETAILS} 
  `

  const ALL_BOOKS_BY_GENRE = gql`
  query ($genre: String!){
    allBooks(genre:$genre) { 
      ...BookDetails
    }
  }
  ${BOOK_DETAILS} 
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
      ...BookDetails
    }
    me {
      username
      id
      favoriteGenre
    }
  }
  ${BOOK_DETAILS} 
  `
  const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
      login(username: $username, password: $password)  {
        value
      }
    }
  `

  const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!){
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS} 
  `

  const handleError = (error) => {
    console.log(`error.message: ${error.message}`)
    setErrorMessage(error.message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
  }

  const notify = (message) => {
    console.log(`notification message: ${message}`)
    setNotificationMessage(message)
    setTimeout(() => {
      setNotificationMessage(null)
    }, 3000)
  }

  const [addBook] = useMutation(CREATE_BOOK, {
    onError: handleError,
    update: (store, response) => {
      updateCacheWith(response.data.addedBook)
    },
    refetchQueries: [{query: ALL_AUTHORS }]
  })

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => {
      // Sometimes we get an undefined object here?
      if(!object) return true 
      return set.map(p => p.id).includes(object.id)
    }  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }   
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      notify(`${addedBook.title} added`)
      updateCacheWith(addedBook)
    }
  })

  const [login] = useMutation(LOGIN, {
    onError: handleError})

  const errorNotification = () => {
    if(errorMessage){
      return(
        <div style={{ color: 'red' }}>
          {errorMessage}
        </div>          
      )
    }
  }

  const infoNotification = () => {
    if(notificationMessage){
      return(
        <div style={{ color: 'green' }}>
          {notificationMessage}
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
      {infoNotification()}
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
        addBook={addBook}
        handleError={handleError}
      />

    </div>
  )
}

export default App