import React from 'react'

const User = (props) => {
  if ( props.user === undefined){
    return <div/>
  }

  const blogList = props.user.blogs.map(blog =>
    <li key={blog.id}>{blog.title}</li>
  )

  return (
    <div>
      <h2>{props.user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {blogList}
      </ul>
    </div>
  )
}

export default User
