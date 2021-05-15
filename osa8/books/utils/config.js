require('dotenv').config()

let JWT_SECRET = process.env.JWT_SECRET
let MONGODB_URI = process.env.MONGODB_URI

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.MONGODB_URI_TEST
}

if (process.env.NODE_ENV === 'dev') {
  MONGODB_URI = process.env.MONGODB_URI_DEV
}

module.exports = {
  MONGODB_URI, JWT_SECRET
}