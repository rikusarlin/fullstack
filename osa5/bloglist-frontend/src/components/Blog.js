import React, {useState} from 'react'

const Blog = ({id, title, author, likes, url, user,
  setBlogs, setNotificationMessage, setErrorMessage, blogsService }) => {

  const [opened, setOpened] = useState(false)
  const hideWhenOpened = { display: opened ? 'none' : '' }
  const showWhenOpened = { display: opened ? '' : 'none' }

  const toggleOpened = () => {
    setOpened(!opened)
  }

  const handleLike = async (event) => {
    event.preventDefault()
    
    try {
      const updatedBlog = {
        id: id,
        title: title,
        author: author,
        url: url,
        likes: likes+1
      }
      await blogsService.update(updatedBlog)
      setBlogs(await blogsService.getAll())
      setNotificationMessage('liked a blog')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 3000)
    } catch (exception) {
      console.log('exception: '+exception)
      setErrorMessage('error in updating likes')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const handleDelete = async () => {    
    try {
      await blogsService.deleteBlog(id)
      setBlogs(await blogsService.getAll())
      setNotificationMessage('blog deleted')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 3000)
    } catch (exception) {
      console.log('exception: '+exception)
      setErrorMessage('error in deleting blog')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }

  const confirmDelete = () => {
    if(window.confirm("remove blog "+title+" by "+author+"?")){
      handleDelete()
    }

  }
 
  return(
    <div className="blogItem">
    <div style={hideWhenOpened}>
      <div className="blogClosed" onClick={toggleOpened}> &gt; {title} {author}</div>
    </div>
    <div style={showWhenOpened}>
       <div className="blogOpened">
          <form onSubmit={handleLike}>
            <div>
              <div onClick={toggleOpened}> &lt; {title} {author}</div><br/>
              {url} <br/>
              {likes} likes <button type="submit">like</button><br/>
              added by {user.name}<br/>
              <button className="deleteButton" type="button" onClick={confirmDelete}>delete</button><br/>
            </div>
          </form>
        </div>
    </div>
  </div>
)}

export default Blog