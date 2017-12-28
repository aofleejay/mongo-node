const { expect } = require('chai')
const User = require('../src/User')

describe('Subdocument', () => {
  it('Can create a subdocument', (done) => {
    const user = new User({
      name: 'John Doe',
      posts: [
        { title: 'Post title' },
      ],
    })

    user.save()
      .then(() => User.findOne({ name: 'John Doe' }))
      .then((user) => {
        expect(user.posts[0].title).to.equal('Post title')
        done()
      })
  })

  it('Can add subdocuments to an existing record', (done) => {
    const user = new User({
      name: 'John Doe',
      posts: [],
    })

    user.save()
      .then(() => User.findOne({ name: 'John Doe' }))
      .then((user) => {
        user.posts.push({ title: 'Post title' })
        return user.save()
      })
      .then(() => User.findOne({ name: 'John Doe' }))
      .then((user) => {
        expect(user.posts[0].title).to.equal('Post title')
        done()
      })
  })

  it('Can remove an existing subdocuments', (done) => {
    const user = new User({
      name: 'John Doe',
      posts: [
        { title: 'Post title' },
      ],
    })

    user.save()
      .then(() => User.findOne({ name: 'John Doe' }))
      .then((user) => {
        user.posts[0].remove()
        return user.save()
      })
      .then(() => User.findOne({ name: 'John Doe' }))
      .then((user) => {
        expect(user.posts.length).to.equal(0)
        done()
      })
  })
})