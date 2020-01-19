import React from 'react'
import Blog from './Blog'

const Blogs = ({ blogs }) => {
  // const filteredBlogs = blogs.filter(blog => blog.author.toUpperCase().indexOf(filterValue.toUpperCase()) >= 0)
  const blogList = blogs.map(blog =>
  <Blog
    key={ blog.id }
    id={ blog.id }
    title={ blog.title }
    author={ blog.author }
  />)
  return(
      <div><ul>{blogList}</ul></div>
  )
}

export default Blogs