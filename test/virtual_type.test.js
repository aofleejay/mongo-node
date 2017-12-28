const { expect } = require('chai')
const User = require('../src/User')

describe('Virtual types', () => {
  it('PostCount returns number of posts', (done) => {
    const user = new User({
      name: 'John Doe',
      posts: [
        { title: 'Post title' },
      ],
    })

    user.save()
      .then(() => User.findOne({ name: 'John Doe' }))
      .then((user) => {
        expect(user.postCount).to.equal(1)
        done()
      })
  })
})