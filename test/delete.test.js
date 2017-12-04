const { expect } = require('chai')
const User = require('../src/User')

describe('Deleting a user', () => {
  let user

  beforeEach((done) => {
    user = new User({ name: 'John Doe' })
    user.save()
      .then(() => { done() })
  })

  it('Model instance remove', (done) => {
    user.remove()
      .then(() => User.findOne({ name: 'John Doe' }))
      .then((user) => {
        expect(user).to.be.null
        done()
      })
  })

  it('Class method remove', (done) => {
    User.remove({ name: 'John Doe' })
      .then(() => User.findOne({ name: 'John Doe' }))
      .then((user) => {
        expect(user).to.be.null
        done()
      })
  })

  it('Class method findOneAndRemove', (done) => {
    User.findOneAndRemove({ name: 'John Doe' })
      .then(() => User.findOne({ name: 'John Doe' }))
      .then((user) => {
        expect(user).to.be.null
        done()
      })
  })

  it('Class method findByIdAndRemove', (done) => {
    User.findByIdAndRemove(user._id)
      .then(() => User.findOne({ name: 'John Doe' }))
      .then((user) => {
        expect(user).to.be.null
        done()
      })
  })
})
