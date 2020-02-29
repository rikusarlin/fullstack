import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { gql } from 'apollo-boost'

const App = () => {
  const [page, setPage] = useState('authors')

  const ALL_BOOKS = gql`
  {
    allBooks { 
      title
      author
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

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        show={page === 'authors'}
        allAuthorsQuery={ALL_AUTHORS}
      />

      <Books
        show={page === 'books'}
        allBooksQuery={ALL_BOOKS}
      />

      <NewBook
        show={page === 'add'}
        allBooksQuery={ALL_BOOKS}
        allAuthorsQuery={ALL_AUTHORS}
      />

    </div>
  )
}

export default App