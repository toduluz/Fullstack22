const lodash = require('lodash')

const dummy = () => 1


const totalLikes = (blogs) => blogs.map(a => a.likes).reduce((a, b) => a+b, 0)


const favouriteBlog = (blogs) => {
  let currBlog = blogs[0]
  blogs.forEach(blog => {
    if (blog.likes > currBlog.likes) {
      currBlog = blog
    }
  })
  return currBlog
}

const mostBlogs = (blogs) => {
  const blogsCountByAuthor = lodash.countBy(blogs, (blog) => blog.author)
  let authorMostBlogs = ''
  let maxCount = 0
  Object.keys(blogsCountByAuthor).forEach( author => {
    if (blogsCountByAuthor[author] > maxCount) {
      authorMostBlogs = author
      maxCount = blogsCountByAuthor[author]
    }
  })

  return ({
    author: authorMostBlogs,
    blogs: maxCount
  })
}

const mostLikes = (blogs) => {
  const groupByAuthor = lodash.groupBy(blogs, (object) => object.author)
  let authorsAndLikes = []
  Object.keys(groupByAuthor).forEach(author => {
    const authorLikes = groupByAuthor[author].map(item => item.likes).reduce((a, b) => a+b, 0)
    authorsAndLikes.push({
      author: author,
      likes: authorLikes
    })
  })
  return lodash.maxBy(authorsAndLikes, (author) => author.likes)
}

module.exports = {
  totalLikes, dummy, favouriteBlog, mostBlogs, mostLikes
}

