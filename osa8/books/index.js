const { ApolloServer, UserInputError, gql } = require('apollo-server')
const config = require('./utils/config')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const logger = require('./utils/logger')

mongoose.set('useFindAndModify', false)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, 'useCreateIndex':true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.info('error connection to MongoDB:', error.message)
  })



const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]! 
    id: ID!
  }
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }
  type Query {
    hello: String!
    authorCount: Int!
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }
  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      born: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      if(args.author && !args.genre) {
        let author = await Author.findOne({ name:args.author })
        if(!author) {
          return null
        } else {
          return await Book.find({
            'author': new mongoose.Types.ObjectId(author.id)
          }).populate('author', { name: 1, born: 1 })
        }
      } else if (args.author && args.genre) {
        let author = await Author.findOne({ name:args.author })
        if(!author) {
          return null
        } else {
          return await Book.find({
            'author': new mongoose.Types.ObjectId(author.id),
            'genres': {"$in": [args.genre] }
          }).populate('author', { name: 1, born: 1 })
        }
      } else if (!args.author && args.genre) {
        return await Book.find({
          'genres': {"$in": [args.genre] }}).populate('author', { name: 1, born: 1 })
      } else {
        return await Book.find({}).populate('author', { name: 1, born: 1 })
      }
    },
    allAuthors: () => Author.find({})
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book.find({ 'author': new mongoose.Types.ObjectId(root.id) })
      return books.length
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      try{
        let author = await Author.findOne({ name:args.author })
        if (!author) {
          author = new Author({name:args.author})
          author = await author.save()
        }
        const book = new Book({
          title: args.title,
          author: author.id,
          published: args.published,
          genres: args.genres
        })
        const savedBook = await book.save()
        return await Book.findById(savedBook.id).populate('author', { name: 1, born: 1 })
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    editAuthor: async (root, args) => {
      let author = await Author.findOne({ name:args.name })
      if(!author){
        return null
      }
      const updatedAuthor = {
        name: author.name,
        id: author.id,
        born: args.born
      }
      try {
        updatedAuthor2 =  await Author.findByIdAndUpdate(author.id, updatedAuthor,
          { new: true, runValidators: false, context: 'query', useFindAndModify:false })
        return updatedAuthor2
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
