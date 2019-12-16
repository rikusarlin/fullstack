const morgan = require('morgan')

/*
* This token adds body contents of POST requests to morgan log
*/
morgan.token('postdata', function (req) {
  if(req.method === 'POST'){
    return JSON.stringify(req.body)
  } else {
    return null
  }
})

/*
const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}
*/

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  // eslint-disable-next-line no-unreachable
  next(error)
}

module.exports = {
  unknownEndpoint,
  errorHandler
}