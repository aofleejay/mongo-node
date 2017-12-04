const { expect } = require('chai')
const User = require('../src/User')

describe('Reading users out of database', () => {
  let user

  beforeEach((done) => {
    user = new User({ name: 'John Doe' })
    user.save()
      .then(() => { done() })
  })

  it('Find all users with a name of John Doe', (done) => {
    User.find({ name: 'John Doe' })
      .then((users) => {
        expect(users[0]._id).to.deep.equal(user._id)
        done()
      })
  })

  it('Find a user with particular id', (done) => {
    User.findOne({ _id: user._id })
      .then((user) => {
        expect(user.name).to.deep.equal('John Doe')
        done()
      })
  })
})
