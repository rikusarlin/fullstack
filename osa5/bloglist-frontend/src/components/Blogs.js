import React from 'react'
import Blog from './Blog'

const Blogs = ({ blogs, setBlogs, setNotificationMessage, setErrorMessage, blogsService }) => {
  // const filteredBlogs = blogs.filter(blog => blog.author.toUpperCase().indexOf(filterValue.toUpperCase()) >= 0)
  const sortedBlogs = blogs.sort((a,b) => b.likes - a.likes )
  const blogList = sortedBlogs.map(blog =>
  <Blog
    key={ blog.id }
    id={ blog.id }
    title={ blog.title }
    author={ blog.author }
    likes={ blog.likes }
    url={ blog.url }
    user={ blog.user }
    setBlogs={setBlogs}
    setNotificationMessage={setNotificationMessage}
    setErrorMessage={setErrorMessage}
    blogsService={blogsService}
  />)
  return(
      <div className="blogList">{blogList}</div>
  )
}

export default Blogs