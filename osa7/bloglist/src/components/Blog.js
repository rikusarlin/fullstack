import React from 'react';
import { showInfo, showError } from '../reducers/notificationReducer'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { connect } from 'react-redux'

export const Blog = (props)  => {

  if ( props.blog === undefined || props.blog === null){
    return <div/>
  }

  const handleLike = async (event) => {
    event.preventDefault()
    
    try {
      const updatedBlog = {
        id: props.blog.id,
        title: props.blog.title,
        author: props.blog.author,
        url: props.blog.url,
        likes: props.blog.likes
      }
      props.likeBlog(updatedBlog, props.user.token)
      props.showInfo('liked a blog', 3)
    } catch (exception) {
      console.log('exception: '+exception)
      props.showError('error in updating likes', 3)
    }
  }

  const handleDelete = async () => {    
    try {
      props.deleteBlog(props.blog.id, props.user.token)
      props.showInfo('blog deleted', 3)
    } catch (exception) {
      console.log('exception: '+exception)
      props.showError('error in deleting blog', 3)
    }
  }

  const confirmDelete = () => {
    if(window.confirm("remove blog "+props.blog.title+" by "+props.blog.author+"?")){
      handleDelete()
    }

  }

  const commentList = props.blog.comments.map(comment =>
    <li key={comment}>{comment}</li>
  )

  if(props.user.username != null){

    let deleteBlog = <button className="deleteButton" type="button" onClick={confirmDelete}>delete</button>
    if(props.user.username !== props.blog.user.username){
      deleteBlog = <div/>
    }
    
    let comments =
      <div> 
        <b>Comments</b><br/>
        <ul>
          {commentList}
        </ul>
      </div>
    if(props.blog.comments.length <= 0){
      comments = <div><b>No comments yet</b></div>
    }

    return(
      <div className="blog">
        <form onSubmit={handleLike}>
          <div>
            <h2>{props.blog.title} {props.blog.author}</h2><br/>
            <a href={props.blog.url}>{props.blog.url}</a> <br/>
            {props.blog.likes} likes <button type="submit">like</button><br/>
            added by {props.blog.user.name}<br/>
            {deleteBlog}<br/>
            {comments}
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  showInfo, showError, likeBlog, deleteBlog
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Blog)
