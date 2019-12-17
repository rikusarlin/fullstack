/* eslint-disable no-undef */
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Person = require('../models/person')

const initialPersons = [
  {
    name: 'Elsa',
    number: '12312328'
  },
  {
    name: 'Riku',
    number: '342789809798'
  }
]

beforeEach(async () => {
  await Person.deleteMany({})

  let personObject = new Person(initialPersons[0])
  await personObject.save()

  personObject = new Person(initialPersons[1])
  await personObject.save()
})

test('persons are returned as json', async () => {
  await api
    .get('/api/persons')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all notes are returned', async () => {
  const response = await api.get('/api/persons')

  expect(response.body.length).toBe(initialPersons.length)
})

test('a known person is within the returned persons', async () => {
  const response = await api.get('/api/persons')

  const names = response.body.map(r => r.name)

  expect(names).toContain('Elsa')
})

afterAll(() => {
  mongoose.connection.close()
})