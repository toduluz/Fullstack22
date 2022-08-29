const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    user: 'Salaiman'
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: 'Abel'
  }
]

const initialUsers = [
  {
    username: 'Salaiman',
    name: 'Sally',
    password: 'salaimansally'
  },
  {
    username: 'Abel',
    name: 'Abel Kb',
    password: 'abelkb'
  }
]

const nonExistingId = async () => {
  const blog = new Blog(
    { 
      title: 'willremovethissoon', 
      author: 'nil',
      url: 'nil',
      likes:0
    })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blog = await Blog.find({})
  return blog.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const initializeUser = async (user) => {
  const { username, name, password } = user

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const newUser = new User({
    username,
    name,
    passwordHash,
  })

  await newUser.save()
}

module.exports = {
  initialBlogs, initialUsers, nonExistingId, blogsInDb, usersInDb, initializeUser
}