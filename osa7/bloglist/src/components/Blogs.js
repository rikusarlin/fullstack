import React, {useEffect} from 'react'
import { fetchBlogs } from '../reducers/blogReducer'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


export const Blogs = (props) => {
  var token=props.user.token
  var getBlogs = props.fetchBlogs
  useEffect(() => {
    getBlogs(token)
  }, [token, getBlogs])

  // const filteredBlogs = blogs.filter(blog => blog.author.toUpperCase().indexOf(filterValue.toUpperCase()) >= 0)
  //console.log("props.blogs: ",props.blogs)
  if(props.blogs !== null){
    const sortedBlogs = props.blogs.sort((a,b) => b.likes - a.likes )
    const blogList = sortedBlogs.map(blog =>
      <div className="bloglist" key={blog.id}>
        <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        <br/>
      </div>
    )
    if(props.user.user !== null){
      return(
        <div>{blogList}</div>
      )
    }
  } 
  return(<div/>)
}


const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    user: state.user
  }
}

const mapDispatchToProps = {
  fetchBlogs
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blogs)
