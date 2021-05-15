import React from 'react'
import { useQuery} from '@apollo/react-hooks'


const Recommended = (props) => {
  const { loading, error, data } = useQuery(props.allBooksAndMeQuery);
  let filteredBooks = []

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  if (!props.show) {
    return null
  }

  const bookList = () => {
    
    filteredBooks = data.allBooks
    if(data.me && data.me.favoriteGenre !== "all genres"){
      filteredBooks = data.allBooks.filter(b => b.genres.indexOf(data.me.favoriteGenre) >= 0)
    }

    return filteredBooks.map(a =>
      <tr key={a.title}>
        <td>{a.title}</td>
        <td>{a.author.name}</td>
        <td>{a.published}</td>
      </tr>
    )
  }

  const favoriteIndicator = () => {
    if(data.me){
      return (
        <div>books in your favourite genre <b>{data.me.favoriteGenre}</b></div>
      )
    } else {
      return (
        <div>favorite genre has not been set yet, showing all books</div>
      )
    }
  }

  return (
    <div>
      <h2>recommendations</h2>
      {
        favoriteIndicator()
      }
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
          {
            bookList()
          }
        </tbody>
      </table>
    </div>
  )
}

export default Recommended