const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('fetch all blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(helper.initialBlogs.length)
  })
  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)
    expect(titles).toContain('Kela, Jumalasta seuraava')
  })
  test('id field is returned without preceding underscore', async () => {
    const response = await api.get('/api/blogs')
    const blog = response.body[0]
    expect(blog.id).toBeDefined()
  })
})

describe('insert new blog', () => {
  test('number of blogs increases when a new blog is added', async () => {
    await api.post('/api/blogs').send(helper.newBlog).expect(201).expect('Content-Type', /application\/json/)
    const blogsAtEnd = await helper.notesInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length+1)
  })
  test('an inserted blog can be found after addition', async () => {
    await api.post('/api/blogs').send(helper.newBlog).expect(201).expect('Content-Type', /application\/json/)
    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)
    expect(titles).toContain(helper.newBlog.title)
  })
  test('an inserted blog with no likes result in blog with 0 likes', async () => {
    delete helper.newBlog.likes
    const response = await api.post('/api/blogs').send(helper.newBlog).expect(201).expect('Content-Type', /application\/json/)
    expect(response.body.likes).toBe(0)
  })
  test('title is required', async () => {
    delete helper.newBlog.title
    await api.post('/api/blogs').send(helper.newBlog).expect(400)
  })
  test('url is required', async () => {
    delete helper.newBlog.url
    await api.post('/api/blogs').send(helper.newBlog).expect(400)
  })
})

describe('view a specific blog', () => {
  test('succeeds with a valid id', async () => {
    const blogsAtStart = await helper.notesInDb()
    const blogToView = blogsAtStart[0]
    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(resultBlog.body).toEqual(blogToView)
  })
  test('does not succeed with 404 status when called with non-existing but valid id', async () => {
    await api
      .get('/api/blogs/5dfa698896cfe676450a2916')
      .expect(404)
  })
  test('invalid id results in 400 status', async () => {
    await api
      .get('/api/blogs/3457896543')
      .expect(400)
  })
})

describe('delete blog', () => {
  test('succeeds with a valid id', async () => {
    const blogsAtStart = await helper.notesInDb()
    const blogToDelete = blogsAtStart[0]
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
  })
  test('succeeds with 204 status when called with non-existing but valid id', async () => {
    await api
      .delete('/api/blogs/5dfa698896cfe676450a2916')
      .expect(204)
  })
  test('invalid id results in 400 status', async () => {
    await api
      .delete('/api/blogs/3457896543')
      .expect(400)
  })
})

describe('update blog', () => {
  test('update number of likes in blog', async () => {
    const blogsAtStart = await helper.notesInDb()
    const blogToUpdate = blogsAtStart[0]
    const likesBeforeUpdate = blogToUpdate.likes
    blogToUpdate.likes ++
    await api.put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const resultBlog = await api
      .get(`/api/blogs/${blogToUpdate.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(resultBlog.body.likes).toBe(likesBeforeUpdate+1)
  })
  test('fails with 404 status when called with non-existing but valid id', async () => {
    const blogsAtStart = await helper.notesInDb()
    var blogToUpdate = blogsAtStart[0]
    await api
      .put('/api/blogs/5dfa698896cfe676450a2916')
      .send(blogToUpdate)
      .expect(404)
  })
  test('invalid id results in 400 status', async () => {
    const blogsAtStart = await helper.notesInDb()
    var blogToUpdate = blogsAtStart[0]
    await api
      .put('/api/blogs/3457896543')
      .send(blogToUpdate)
      .expect(400)
  })
  test('update without title results in 400', async () => {
    const blogsAtStart = await helper.notesInDb()
    var blogToUpdate = blogsAtStart[0]
    delete blogToUpdate.title
    await api.put(`/api/blogs/${blogToUpdate.id}`).send(blogToUpdate).expect(400)
  })
  test('update without url results in 400', async () => {
    const blogsAtStart = await helper.notesInDb()
    var blogToUpdate = blogsAtStart[0]
    delete blogToUpdate.url
    await api.put(`/api/blogs/${blogToUpdate.id}`).send(blogToUpdate).expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})