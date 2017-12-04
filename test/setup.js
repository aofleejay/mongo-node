const mongoose = require('mongoose')

mongoose.Promise = global.Promise

before((done) => {
  mongoose.connect('mongodb://localhost:27017/test')
  
  mongoose.connection
    .once('open', () => {
      done()
    })
    .on('error', error => {
      done(error)
    })
})

beforeEach((done) => {
  mongoose.connection.collections.users.drop(() => {
    done()
  })
})
