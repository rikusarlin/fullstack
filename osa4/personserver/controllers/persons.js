const personsRouter = require('express').Router()
const Person = require('../models/person')

personsRouter.get('/', async (req, res) => {
  const persons = await Person.find({})
  res.json(persons.map(person => person.toJSON()))
})

personsRouter.get('/:id', async (req, res, next) => {
  try {
    const person = await Person.findById(req.params.id)

    if(person){
      res.json(person.toJSON())
    } else {
      res.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

personsRouter.delete('/:id', async (req, res, next) => {
  try {
    await Person.findByIdAndRemove(req.params.id)
    res.status(204).end()
  } catch(error) {
    next(error)
  }
})

personsRouter.post('/', async (req, res, next) => {
  const body = req.body
  const person = new Person({
    name: body.name,
    number: body.number
  })
  try {
    const savedPerson = await person.save()
    res.json(savedPerson.toJSON())
  } catch(error) {
    next(error)
  }
})

personsRouter.put('/:id', async (req, res, next) => {
  const body = req.body

  const person = {
    name: body.name,
    number: body.number,
  }

  try {
    const updatedPerson = await Person.findOneAndUpdate(req.params.id, person,
      { new: true, runValidators: false, context: 'query'  })
    res.json(updatedPerson.toJSON())
  } catch (error) {
    next(error)
  }
})

module.exports = personsRouter