const { expect } = require('chai')
const User = require('../src/User')

describe('Creating documents', () => {
  it('Save a user', (done) => {
    const user = new User({ name: 'John Doe' })

    user.save()
      .then(() => {
        expect(!user.isNew).to.be.true
        done()
      })
      .catch((error) => {
        done(error)
      })
  })
})
