const { expect } = require('chai')
const User = require('../src/User')
const Comment = require('../src/Comment')
const BlogPost = require('../src/BlogPost')

describe('Associations', () => {
  let user
  let blogPost
  let comment

  beforeEach((done) => {
    user = new User({ name: 'John Doe' })
    blogPost = new BlogPost({ title: 'Hello Mongo', content: 'Association test' })
    comment = new Comment({ content: 'Awesome' })

    user.blogPosts.push(blogPost)
    blogPost.comments.push(comment)
    comment.user = user

    Promise.all([ user.save(), blogPost.save(), comment.save() ])
      .then(() => done())
  })

  it('Save a relation between a user and a blogpost', (done) => {
    User.findOne({ name: 'John Doe' })
      .populate('blogPosts')
      .then((user) => {
        expect(user.blogPosts[0].title).to.equal('Hello Mongo')
        done()
      })
  })

  it('Save a full relation graph', (done) => {
    User.findOne({ name: 'John Doe' })
      .populate({
        path: 'blogPosts',
        populate: {
          path: 'comments',
          model: 'comment',
          populate: {
            path: 'user',
            model: 'user',
          },
        },
      })
      .then((user) => {
        expect(user.name).to.equal('John Doe')
        expect(user.blogPosts[0].title).to.equal('Hello Mongo')
        expect(user.blogPosts[0].comments[0].content).to.equal('Awesome')
        expect(user.blogPosts[0].comments[0].user.name).to.equal('John Doe')
        done()
      })
  })
})
