import { useState } from 'react'
import { FormContainer, FieldGroup, StyledInput, StyledButton } from './StyledComponents'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    createBlog({
      title,
      author,
      url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <FormContainer>
      <h2>Create a new blog</h2>
      <form onSubmit={handleSubmit}>
        <FieldGroup>
          <label>
            title:
            <input
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </label>
        </FieldGroup>
        <FieldGroup>
          <label>
            author:
            <input
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </label>
        </FieldGroup>
        <FieldGroup>
          <label>
            url:
            <input
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </label>
        </FieldGroup>
        <StyledButton type="submit">create</StyledButton>
      </form>
    </FormContainer>
  )
}

export default BlogForm