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

module.exports = blogsRouter