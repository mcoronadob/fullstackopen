import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
import BlogForm from './BlogForm'

test('5.16: calls event handler with right details when a new blog is created', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const titleInput = screen.getByLabelText(/title/i)
  const authorInput = screen.getByLabelText(/author/i)
  const urlInput = screen.getByLabelText(/url/i)
  const sendButton = screen.getByText('create')

  await user.type(titleInput, 'Testing a form in React')
  await user.type(authorInput, 'Mauricio Coronado')
  await user.type(urlInput, 'https://fullstackopen.com/')

  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toEqual({
    title: 'Testing a form in React',
    author: 'Mauricio Coronado',
    url: 'https://fullstackopen.com/'
  })
})