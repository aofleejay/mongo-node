const { expect } = require('chai')
const User = require('../src/User')

describe('Subdocument', () => {
  it('can create a subdocument', (done) => {
    const user = new User({
      name: 'Joe',
      posts: [
        { title: 'Post title' },
      ],
    })

    user.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        expect(user.posts[0].title).to.equal('Post title')
        done()
      })
  })

  it('can add subdocuments to an existing record', (done) => {
    const user = new User({
      name: 'Joe',
      posts: [],
    })

    user.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        user.posts.push({ title: 'Post title' })
        return user.save()
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        expect(user.posts[0].title).to.equal('Post title')
        done()
      })
  })

  it('can remove an existing subdocuments', (done) => {
    const user = new User({
      name: 'Joe',
      posts: [
        { title: 'Post title' },
      ],
    })

    user.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        user.posts[0].remove()
        return user.save()
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        expect(user.posts.length).to.equal(0)
        done()
      })
  })
})