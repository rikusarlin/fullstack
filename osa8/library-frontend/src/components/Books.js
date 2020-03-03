import React, {useState} from 'react'
import { useQuery } from '@apollo/react-hooks'


const Books = (props) => {
  const [genreFilter, setGenreFilter] = useState("all genres")
  const { loading, error, data } = useQuery(props.allBooksQuery);
  //const [ getFilteredBooks, {loading2, data2 }] = useLazyQuery(props.allBooksByGenreQuery,
  //  {variables: {genre: genreFilter}});
  let genreList = []
  let filteredBooks = []

  if (loading) return 'Loading...';
  // if (loading2) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  if (!props.show) {
    return null
  }

  const filterBooks = (genre) => {
    console.log(`Filter by genre: ${genre}`)
    setGenreFilter(genre)
  }

  const bookList = () => {
    filteredBooks = data.allBooks
    if(genreFilter !== "all genres"){
      filteredBooks = data.allBooks.filter(b => b.genres.indexOf(genreFilter) >= 0)
    }

    return filteredBooks.map(a =>
      <tr key={a.title}>
        <td>{a.title}</td>
        <td>{a.author.name}</td>
        <td>{a.published}</td>
      </tr>
    )
  }

  const genreFilterButtons = () => {
    data.allBooks.map(b => 
      b.genres.map(g => genreList.indexOf(g) === -1 ? genreList.push(g) : null)
    )
    genreList.push("all genres")
    return genreList.map(g => <button key={g} onClick={() => filterBooks(g)}>{g}</button>)
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
          {
            bookList()
          }
        </tbody>
      </table>
      <div>
        {
          genreFilterButtons()
        }
      </div>
    </div>
  )
}

export default Books