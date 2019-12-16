const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const Person = require('./models/person')
const personsRouter = require('./controllers/persons')
const middleware = require('./utils/middleware')

// Middlewaret
app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())
app.use(morgan(':method :url :status :response-time :postdata'))

app.get('/', (req, res) => {
  res.send('<h1>Hello World!!!</h1>')
})

function paragraph(text){
  return '<p>'+text+'</p>\n'
}


app.get('/info', (req, res) => {
  const dateTimeStr = String(new Date())
  Person
    .find({}).then(persons => {
      const resString = paragraph(`Phonebook has info for ${persons.length} people`).concat(paragraph(`${dateTimeStr}`))
      res.send(resString)
    })
    .catch(() => {
      const resString = paragraph('Failed to find info for phonebook').concat(paragraph(`${dateTimeStr}`))
      res.send(resString)
    })
})

app.use('/api/persons', personsRouter)

app.use(middleware.unknownEndpoint)

app.use(middleware.errorHandler)

module.exports = app
