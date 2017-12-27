const { expect } = require('chai')
const User = require('../src/User')

describe('Validating records', () => {
  it('requires a user name', () => {
    const user = new User({ name: undefined })
    const validateResult = user.validateSync()
    const { message } = validateResult.errors.name
    

    expect(message).to.equal('Name is required.')
  })

  it('requires a user\'s name longer thai 2 characters', () => {
    const user = new User({ name: 'Jo' })
    const validateResult = user.validateSync()
    const { message } = validateResult.errors.name

    expect(message).to.equal('Name must be longer than 2 characters.')
  })

  it('disallows invalid records from being saved', (done) => {
    const user = new User({ name: 'Jo' })
    user.save()
      .catch(validateResult => {
        const { message } = validateResult.errors.name

        expect(message).to.equal('Name must be longer than 2 characters.')
        done()
      })
  })
})
