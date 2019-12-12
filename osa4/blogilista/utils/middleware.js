const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  return response.status(400).json({ error: error.message })
  // eslint-disable-next-line no-unreachable
  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}