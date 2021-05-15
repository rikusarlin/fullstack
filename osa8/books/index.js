const { ApolloServer, UserInputError, AuthenticationError, gql } = require('apollo-server')
const config = require('./utils/config')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const logger = require('./utils/logger')
const jwt = require('jsonwebtoken')
const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

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
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Query {
    hello: String!
    authorCount: Int!
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
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
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
  type Subscription {
    bookAdded: Book!
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
    allAuthors: () => Author.find({}),
    me: (root, args, context) => context.currentUser
  },
  Author: {
    bookCount: async (root) => {
      return root.books.length
      /*
      const books = await Book.find({ 'author': new mongoose.Types.ObjectId(root.id) })
      return books.length
      */
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser 
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

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
        author.books = author.books.concat(savedBook._id)
        await author.save()
        const populatedBook = await Book.findById(savedBook.id).populate('author', { name: 1, born: 1 })
        pubsub.publish('BOOK_ADDED', { bookAdded: populatedBook })
        return populatedBook
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser 
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

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
    },
    createUser: (root, args) => {
      const user = new User({ 
        username: args.username,
        favoriteGenre: args.favoriteGenre
      })
  
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, config.JWT_SECRET) }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), config.JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id).populate('friends')
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
