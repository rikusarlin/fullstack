import React, {useState} from 'react';
import { showInfo, showError } from '../reducers/notificationReducer'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { connect } from 'react-redux'

export const Blog = (props)  => {

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
        id: props.id,
        title: props.title,
        author: props.author,
        url: props.url,
        likes: props.likes
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
      props.deleteBlog(props.id, props.user.token)
      props.showInfo('blog deleted', 3)
    } catch (exception) {
      console.log('exception: '+exception)
      props.showError('error in deleting blog', 3)
    }
  }

  const confirmDelete = () => {
    if(window.confirm("remove blog "+props.title+" by "+props.author+"?")){
      handleDelete()
    }

  }

  /*
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])
  */

  if(props.user.username != null){

    let deleteBlog = <button className="deleteButton" type="button" onClick={confirmDelete}>delete</button>
    if(props.user.username !== props.blogUser.username){
      deleteBlog = <div/>
    }

    return(
      <div className="blogItem">
        <div style={hideWhenOpened}>
          <div className="blogClosed" onClick={toggleOpened}> &gt; {props.title} {props.author}</div>
        </div>
        <div style={showWhenOpened}>
          <div className="blogOpened">
            <form onSubmit={handleLike}>
              <div>
                <div onClick={toggleOpened}> &lt; {props.title} {props.author}</div><br/>
                {props.url} <br/>
                {props.likes} likes <button type="submit">like</button><br/>
                added by {props.blogUser.name}<br/>
                {deleteBlog}<br/>
              </div>
            </form>
          </div>
        </div>
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
