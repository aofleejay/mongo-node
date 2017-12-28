const { expect } = require('chai')
const User = require('../src/User')

describe('Reading users out of database', () => {
  let john
  let jane
  let james

  beforeEach((done) => {
    john = new User({ name: 'John Doe' })
    jane = new User({ name: 'Jane Doe' })
    james = new User({ name: 'James Doe' })

    Promise.all([ john.save(), jane.save(), james.save() ])
      .then(() => done())
  })

  it('Find all users with a name of John Doe', (done) => {
    User.find({ name: 'John Doe' })
      .then((users) => {
        expect(users[0]._id).to.deep.equal(john._id)
        done()
      })
  })

  it('Find a user with particular id', (done) => {
    User.findOne({ _id: john._id })
      .then((user) => {
        expect(user.name).to.deep.equal('John Doe')
        done()
      })
  })

  it('Can skip and limit the result set', (done) => {
    User.find({}).sort({ name: 1 }).skip(1).limit(1)
      .then((users) => {
        expect(users).to.have.length(1)
        expect(users[0].name).to.equal('Jane Doe')
        done()
      })
  })
})
