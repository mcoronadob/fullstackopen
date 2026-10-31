const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogRouter.post('/', async (request, response) => {
  const body = request.body
  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'token faltante o invalido' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'token faltante o invalido' })
  }

  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).json({ error: 'blog no encontrado' })
  }

  // Validación de autorización: se mantiene aquí por ser lógica de negocio
  if (blog.user.toString() !== user._id.toString()) {
    return response.status(401).json({ error: 'solo el creador del blog puede eliminarlo' })
  }

  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    ...body,
    likes: body.likes || 0,
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog)
  } catch (exception) {
    next(exception)
  }
})

module.exports = blogRouter