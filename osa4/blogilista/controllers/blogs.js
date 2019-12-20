const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  let blog = new Blog(request.body)
  if(typeof blog.title === 'undefined'){
    return response.status(400).json({ error:'title is required' })
  }
  if(typeof blog.url === 'undefined'){
    return response.status(400).json({ error:'url is required' })
  }
  if(typeof blog.likes === 'undefined'){
    blog.likes = 0
  }

  const users = await User.find({})
  const user = users[0]
  blog.user = user._id

  try {
    const newBlog = await blog.save()
    user.blogs = user.blogs.concat(newBlog._id)
    await user.save()
    response.status(201).json(newBlog.toJSON())
  } catch (error) {
    next(error)
  }
})

blogsRouter.get('/:id', async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id)

    if(blog){
      res.json(blog.toJSON())
    } else {
      res.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', async (req, res, next) => {
  try {
    await Blog.findByIdAndRemove(req.params.id).setOptions({ 'useFindAndModify':false })
    res.status(204).end()
  } catch(error) {
    next(error)
  }
})

blogsRouter.put('/:id', async (req, res, next) => {
  if(typeof req.body.title === 'undefined'){
    return res.status(400).json({ error:'title is required' })
  }
  if(typeof req.body.url === 'undefined'){
    return res.status(400).json({ error:'url is required' })
  }
  let blog = {
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes
  }
  if(typeof req.body.likes === 'undefined'){
    blog.likes = 0
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog,
      { new: true, runValidators: false, context: 'query', useFindAndModify:false })
    if(updatedBlog){
      res.json(updatedBlog.toJSON())
    } else {
      res.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter