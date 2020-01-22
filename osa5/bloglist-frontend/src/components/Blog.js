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

  return(
    <div>
    <div style={hideWhenOpened}>
      <div className="blog" onClick={toggleOpened}> &gt; {title} {author}</div>
    </div>
    <div style={showWhenOpened}>
       <div className="blog">
          <form onSubmit={handleLike}>
            <div>
              <div onClick={toggleOpened}> &lt; {title} {author}</div><br/>
              {url} <br/>
              {likes} likes <button type="submit">like</button><br/>
              added by {user.name}
            </div>
          </form>
        </div>
    </div>
  </div>
)}

export default Blog