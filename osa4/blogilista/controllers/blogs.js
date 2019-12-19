const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
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
  try {
    const newBlog = await blog.save()
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

module.exports = blogsRouter