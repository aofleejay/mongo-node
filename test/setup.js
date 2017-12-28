const mongoose = require('mongoose')

mongoose.Promise = global.Promise

before((done) => {
  mongoose.connect('mongodb://localhost:27017/test', { useMongoClient: true })
  
  mongoose.connection
    .once('open', () => {
      done()
    })
    .on('error', error => {
      done(error)
    })
})

beforeEach((done) => {
  const { users, comments, blogposts } = mongoose.connection.collections
  users.drop(() => {
    comments.drop(() => {
      blogposts.drop(() => {
        done()
      })
    })
  })
})
