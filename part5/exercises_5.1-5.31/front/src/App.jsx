/* eslint-disable */
import { useState, useEffect } from 'react'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import BlogDetail from './components/BlogDetail'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import ErrorMessage from './components/ErrorMessage'
import loginService from './services/login'
import blogService from './services/blogs'
import { NavContainer, NavBrand, NavLinks } from './components/StyledComponents'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    blogService.getAll().then(initialBlogs => setBlogs(initialBlogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      navigate('/')
    } catch {
      setErrorMessage('wrong credentials')
      setTimeout(() => setErrorMessage(null), 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken(null)
    navigate('/')
  }

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))

      navigate('/')

      setMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      setTimeout(() => setMessage(null), 5000)
    } catch {
      setErrorMessage('Error creating blog')
      setTimeout(() => setMessage(null), 5000)
    }
  }

  const handleLikeOf = async (id) => {
    const blogToUpdate = blogs.find(b => b.id === id)

    const updatedBlogObject = {
      ...blogToUpdate,
      likes: blogToUpdate.likes + 1,
      user: blogToUpdate.user?.id || blogToUpdate.user?._id || blogToUpdate.user
    }

    try {
      const returnedBlog = await blogService.update(id, updatedBlogObject)
      setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
    } catch {
      setErrorMessage('Error actualizando los likes')
      setTimeout(() => setMessage(null), 5000)
    }
  }

  const handleDeleteOf = async (blog) => {
    const ok = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)

    if (ok) {
      try {
        await blogService.remove(blog.id)
        setBlogs(blogs.filter(b => b.id !== blog.id))

        navigate('/')

        setMessage(`Blog '${blog.title}' removed successfully`)
        setTimeout(() => setMessage(null), 5000)
      } catch {
        setErrorMessage('Error deleting blog. You might not have permission.')
        setTimeout(() => setMessage(null), 5000)
      }
    }
  }

  const navStyle = {
    background: '#d3d3d3',
    padding: 10,
    marginBottom: 15
  }

  const padding = { paddingRight: 5 }

  return (
    <div>
      {/* BARRA DE NAVEGACIÓN */}
      <NavContainer>
        <NavBrand>Blog App</NavBrand>
        <NavLinks>
        <Link style={padding} to="/">blogs</Link>

        {user && (
          <Link style={{ paddingRight: 5 }} to="/create">create new blog</Link>
        )}
        
        {user ? (
          <>
            <span style={{ paddingRight: 10 }}>{user.name} logged in</span>
            <button onClick={handleLogout}>logout</button>
          </>
        ) : (
          <Link style={padding} to="/login">login</Link>
        )}
      </NavLinks>
      </NavContainer>

      <h2>blogs</h2>
      <Notification message={message} />
      <ErrorMessage errorMessage={errorMessage} />

      {/* ENRUTAMIENTO DE VISTAS */}
      <Routes>
        <Route path="/" element={
          <div style={{ marginTop: 20 }}>
            {[...blogs]
              .sort((a, b) => b.likes - a.likes)
              .map(blog => (
                <div key={blog.id} style={{ padding: 10, borderBottom: '1px solid #ccc' }}>
                  <Link to={`/blogs/${blog.id}`}>
                    {blog.title} {blog.author}
                  </Link>
                </div>
              ))}
          </div>
        } />

        <Route path="/create" element={
          <BlogForm createBlog={addBlog} />
        } />

        <Route path="/blogs/:id" element={
          <BlogDetail 
            blogs={blogs} 
            updateLikes={handleLikeOf}
            deleteBlog={handleDeleteOf}
            user={user} 
          />
        } />

        <Route path="/login" element={
          <Togglable buttonLabel="login">
            <LoginForm
              username={username}
              password={password}
              handleUsernameChange={({ target }) => setUsername(target.value)}
              handlePasswordChange={({ target }) => setPassword(target.value)}
              handleSubmit={handleLogin}
            />
          </Togglable>
        } />
      </Routes>
    </div>
  )
}

export default App