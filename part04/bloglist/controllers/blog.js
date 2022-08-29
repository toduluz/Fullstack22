const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const logger = require('../utils/logger')
const {tokenExtractor, userExtractor} =  require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1})
  response.json(blogs)
})

blogRouter.post('/', tokenExtractor, userExtractor, async (request, response) => {
  const body = new Blog(request.body)
  const user = request.user
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id
  })
  const savedBlog = await blog.save()
  if (savedBlog) {
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  } else {
    response.status(400).end()
  }
})

blogRouter.delete('/:id', tokenExtractor, userExtractor, async(request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    const user = request.user
    if ( blog.user.toString() === user._id.toString() ) {
      const deleteBlog = await Blog.findByIdAndRemove(request.params.id)
      if (deleteBlog) {
        response.status(204).end()
      } 
    } else {
      response.status(400).json({
        error: 'you are not authorised'
      })
    }
  } else {
    response.status(400).json({
      error: 'the blog does not exist'
    })
  }
})

blogRouter.put('/:id', tokenExtractor, userExtractor, async(request, response) => {
  const body = request.body
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    const user = request.user
    if ( blog.user.toString() === user._id.toString() ) {
      const newBlog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id
      }
      const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, newBlog, {new: true})
      if (updatedBlog) {
        logger.info(updatedBlog)
        response.json(updatedBlog)
      }
    } else {
      response.status(400).json({
        error: 'you are not authorised'
      })
    }
  } else {
    response.status(400).json({
      error: 'the blog does not exist'
    })
  }
})

module.exports = blogRouter