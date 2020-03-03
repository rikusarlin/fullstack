import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  // eslint-disable-next-line no-unused-vars
  const [timeout, setTimeout] = useState(null)

  const CREATE_BOOK = gql`
    mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!){
      addBook(
        title: $title,
        author: $author,
        published: $published,
        genres: $genres
      ) {
        title
        author {
          name
          id
        }
        published
        genres
        id
      }
    }
  `

  const [addBook] = useMutation(CREATE_BOOK, {
    onError: props.handleError,
    refetchQueries: [{ query: props.allBooksQuery},{query: props.allAuthorsQuery }]
  })

  const submit = async (e) => {
    e.preventDefault()
    console.log("title, author, published genres:",title, author, published, genres)
    await addBook({
      variables: { title, author, published, genres }
    })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  if (!props.show) {
    return null
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(parseInt(target.value))}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook