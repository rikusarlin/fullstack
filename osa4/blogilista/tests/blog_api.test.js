const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const initialBlogs = [
  {
    title: 'Kela, Jumalasta seuraava',
    author: 'Riku Sarlin',
    url: 'https://sinetti.kela.fi/blogs/Kela_jumalasta_seuraava',
    likes: 23
  },
  {
    title: 'Exploratory testing',
    author: 'Martin Fowler',
    url: 'https://martinfowler.com/bliki/ExploratoryTesting.html',
    likes: 470
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body.length).toBe(initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)

  expect(titles).toContain(
    'Kela, Jumalasta seuraava'
  )
})

test('id field is returned without preceding underscore', async () => {
  const response = await api.get('/api/blogs')

  const blog = response.body[0]
  console.log(blog)

  expect(blog.id).toBeDefined()
})


afterAll(() => {
  mongoose.connection.close()
})