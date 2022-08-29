const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

const api = supertest(app)
let loggedInToken = ''

beforeEach(async () => {
  await User.deleteMany({})
  for (let user of helper.initialUsers) {
    await helper.initializeUser(user)
  }

  await Blog.deleteMany({})
  const users = await User.find({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    blogObject.user = users[0]._id.toString()
    await blogObject.save()
  }

  await api.post('/api/login').send({
    username: 'Salaiman',
    password: 'salaimansally'
  }).then((response)=>{
    loggedInToken = response._body.token
  })
})

describe('test blog get', () => {
  test('blogs are returned as json and all blogs are returned', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const response = await helper.blogsInDb()
    expect(response).toHaveLength(helper.initialBlogs.length)
  }, 100000)
    
  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')
    
    const contents = response.body.map(r => r.title)
    expect(contents).toContain(
      'React patterns'
    )
  })  
})

describe('test add', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Type wars',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 2
    }
  
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${loggedInToken}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length+1)
  
    const contents = blogsAtEnd.map(r => r.title)
    expect(contents).toContain(
      'Type wars'
    )
  })
})

describe('test others', () => {
  test('verify id format', async () => {
    const blogsRetrieved = await helper.blogsInDb()
    expect(blogsRetrieved[0].id).toBeDefined()
  })
  
  test('if likes is empty, it defaults to 0', async () => {
    const newBlog = {
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    }
      
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${loggedInToken}`)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length+1)
  
    const content = blogsAtEnd.filter((blog) => blog.title === 'TDD harms architecture')
    expect(content[0].likes).toBe(0)
  })
  
  test('blog without title and url is not added', async () => {
    const newBlog = {
      author: 'Robert C. Martin', 
      likes: 10
    }
    
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${loggedInToken}`)
      .expect(400)
    
    const blogsAtEnd = await helper.blogsInDb()
    
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})


describe('test delete', () => {
  test('delete a blog post that exist', async () => {
    const blogsRetrieved = await helper.blogsInDb()
    const blogToBeDeletedId = blogsRetrieved[0].id
  
    await api
      .delete(`/api/blogs/${blogToBeDeletedId}`)
      .set('Authorization', `bearer ${loggedInToken}`)
      .expect(204)
  })
  
  test('delete a blog post that do not exist', async () => {
    const blogToBeDeletedId = '1'
  
    await api
      .delete(`/api/blogs/${blogToBeDeletedId}`)
      .set('Authorization', `bearer ${loggedInToken}`)
      .expect(400)
  })
  
})

describe('test update blog post', () => {

  const newBlog = {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2
  }

  test('update a blog post that exist', async () => {
    const blogsRetrieved = await helper.blogsInDb()
    const blogToBeUpdatedId = blogsRetrieved[0].id
  
    await api
      .put(`/api/blogs/${blogToBeUpdatedId}`)
      .send(newBlog)
      .set('Authorization', `bearer ${loggedInToken}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
  test('update a blog post that do not exist', async () => {
    const blogToBeUpdatedId = '1'
  
    await api
      .put(`/api/blogs/${blogToBeUpdatedId}`)
      .set('Authorization', `bearer ${loggedInToken}`)
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})