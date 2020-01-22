import React, {useState, useEffect} from 'react';
import blogsService from '../services/blogs'

const NewBlog = ({setBlogs, setNotificationMessage, setErrorMessage, blogFormRef}) => {
  const [title, setTitle] = useState('') 
  const [author, setAuthor] = useState('') 
  const [url, setUrl] = useState('') 
 
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogsService.setToken(user.token)
    }
  }, [])

  const handlePost = async (event) => {
    event.preventDefault()
    
    try {
      blogFormRef.current.toggleVisibility()
      const newBlog = {
        title: title,
        author: author,
        url: url
      }
      await blogsService.create(newBlog)
      setBlogs(await blogsService.getAll())
      setTitle('')
      setAuthor('')
      setUrl('')
      setNotificationMessage('added new blog')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 3000)
    } catch (exception) {
      console.log('exception: '+exception)
      setErrorMessage('error in adding new blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }


  return(
    <div>
    <h3>New blog</h3>
    <form onSubmit={handlePost}>
      <div>
        title
          <input
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author
          <input
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url
          <input
          type="text"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
    </div>
  )
}

export default NewBlog