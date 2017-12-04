const { expect } = require('chai')
const User = require('../src/User')

describe('Updating records', () => {
  let user
  
  beforeEach((done) => {
    user = new User({ name: 'John Doe' })
    user.save()
      .then(() => { done() })
  })

  it('Instance type using set and save', (done) => {
    user.set({ name: 'Jane Doe' })
    user.save()
      .then(() => User.find({}))
      .then((users) => {
        expect(users.length).to.equal(1)
        expect(users[0].name).to.equal('Jane Doe')
        done()
      })
  })

  it('A modal instance can update', (done) => {
    user.update({ name: 'Jane Doe' })
      .then(() => User.find({}))
      .then((users) => {
        expect(users.length).to.equal(1)
        expect(users[0].name).to.equal('Jane Doe')
        done()
      })
  })

  it('A modal class can update', (done) => {
    User.update({ name: 'John Doe' }, { name: 'Jane Doe' })
      .then(() => User.find({}))
      .then((users) => {
        expect(users.length).to.equal(1)
        expect(users[0].name).to.equal('Jane Doe')
        done()
      })
  })

  it('A modal class can update one record', (done) => {
    User.findOneAndUpdate({ name: 'John Doe' }, { name: 'Jane Doe' })
      .then(() => User.find({}))
      .then((users) => {
        expect(users.length).to.equal(1)
        expect(users[0].name).to.equal('Jane Doe')
        done()
      })
  })

  it('A modal class can find a new record with an id update', (done) => {
    User.findByIdAndUpdate(user._id, { name: 'Jane Doe' })
      .then(() => User.find({}))
      .then((users) => {
        expect(users.length).to.equal(1)
        expect(users[0].name).to.equal('Jane Doe')
        done()
      })
  })

  it('A user can have thier postcount incremented by 1', (done) => {
    User.update({ name: 'John Doe' }, { $inc: { postCount: 1 } })
      .then(() => User.findOne({ name: 'John Doe' }))
      .then((user) => {
        expect(user.postCount).to.equal(1)
        done()
      })
  })
})
