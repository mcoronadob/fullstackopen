const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [

  {
    title: 'Trading with Node.js',
    author: 'John Doe',
    url: 'http://example.com/trading-with-nodejs',
    likes: 4,
    id: '69ee99730b1bf1d52b131d06'
  },
  {
    title: 'SQL vs NoSQL: Which One is Right for Your Application?',
    author: 'Luois R. Williams',
    url: 'https://www.freecodecamp.org/news/sql-vs-nosql-database-which-one-is-right-for-your-application/',
    likes: 10,
    id: '69ee9ba80b1bf1d52b131d07'
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'Prueba Titulo inexistente',
    author: "Prueba Autor inexistente",
    url: "http://example.com/blog-inexistente",
    likes: 0
   })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map((u) => u.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb
}

