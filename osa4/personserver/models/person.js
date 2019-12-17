const mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')
const config = require('../utils/config')
const logger = require('../utils/logger')

const url = config.MONGODB_URI

logger.info('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology:true, useFindAndModify:false, useCreateIndex:true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

const personSchema = mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
    unique: true
  },
  number: {
    type: String,
    minlength: 8,
    required: true
  }
})
personSchema.plugin(uniqueValidator, { type: 'unique-validator' })

// Muokataan palautuvaa skeemaa vähemmän tekniseksi...
personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)