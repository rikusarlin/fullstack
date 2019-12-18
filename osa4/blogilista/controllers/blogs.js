const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  let blog = new Blog(request.body)
  if(blog.likes === undefined){
    blog.likes = 0
  }
  try {
    const newBlog = await blog.save()
    response.status(201).json(newBlog)
  } catch (error) {
    logger.error(error)
    next(error)
  }
})

module.exports = blogsRouter