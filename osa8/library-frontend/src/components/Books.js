import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'


const Books = (props) => {
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

  const { loading, error, data } = useQuery(ALL_BOOKS);
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {data.allBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Books