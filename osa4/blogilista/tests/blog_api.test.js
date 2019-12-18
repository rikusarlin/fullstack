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

describe('fetch all blogs', () => {
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
    let response = await api.get('/api/blogs')
    const blogsBefore = response.body.length
    const blog = {
      title:'Use cases considered harmful',
      author:'A.J.H Simons',
      url:'https://ieeexplore.ieee.org/document/779012',
      likes:30
    }
    await api.post('/api/blogs').send(blog).expect(201).expect('Content-Type', /application\/json/)
    response = await api.get('/api/blogs')
    const blogsAfter = response.body.length
    expect(blogsAfter).toBe(blogsBefore+1)
  })
  test('an inserted blog can be found after addition', async () => {
    const blog = {
      title:'Use cases considered harmful',
      author:'A.J.H Simons',
      url:'https://ieeexplore.ieee.org/document/779012',
      likes:30
    }
    await api.post('/api/blogs').send(blog).expect(201).expect('Content-Type', /application\/json/)
    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)
    expect(titles).toContain('Use cases considered harmful')
  })
  test('an inserted blog with no likes result in blog with 0 likes', async () => {
    const blog = {
      title:'Use cases considered harmful',
      author:'A.J.H Simons',
      url:'https://ieeexplore.ieee.org/document/779012'
    }
    const response = await api.post('/api/blogs').send(blog).expect(201).expect('Content-Type', /application\/json/)
    expect(response.body.likes).toBe(0)
  })
  test('title is required', async () => {
    const blog = {
      author:'A.J.H Simons',
      url:'https://ieeexplore.ieee.org/document/779012'
    }
    await api.post('/api/blogs').send(blog).expect(400)
  })
  test('url is required', async () => {
    const blog = {
      title:'Use cases considered harmful',
      author:'A.J.H Simons',
    }
    await api.post('/api/blogs').send(blog).expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})