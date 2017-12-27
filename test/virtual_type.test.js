const { expect } = require('chai')
const User = require('../src/User')

describe('Virtual types', () => {
  it('postCount returns number of posts', (done) => {
    const user = new User({
      name: 'Joe',
      posts: [
        { title: 'Post title' },
      ],
    })

    user.save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        expect(user.postCount).to.equal(1)
        done()
      })
  })
})