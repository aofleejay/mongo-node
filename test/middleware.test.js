const { expect } = require('chai')
const User = require('../src/User')
const BlogPost = require('../src/BlogPost')

describe('Middleware', () => {
  let user
  let blogPost

  beforeEach((done) => {
    user = new User({ name: 'John Doe' })
    blogPost = new BlogPost({ title: 'Hello Mongo', content: 'Association test' })

    user.blogPosts.push(blogPost)

    Promise.all([ user.save(), blogPost.save() ])
      .then(() => done())
  })

  it('Users clean up dangling blogposts on delete', (done) => {
    user.remove()
      .then(() => BlogPost.count())
      .then((count) => {
        expect(count).to.equal(0)
        done()
      })
  })
})
