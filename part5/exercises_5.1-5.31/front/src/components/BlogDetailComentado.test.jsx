import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import BlogDetail from './BlogDetail'

describe('<BlogDetail />', () => {
  const mockUpdateLikes = vi.fn()
  const mockDeleteBlog = vi.fn()

  const blog = {
    id: '123',
    title: 'Component testing with React Testing Library',
    author: 'Matti Luukkainen',
    url: 'https://fullstackopen.com/es/',
    likes: 12,
    user: {
      id: 'user-creator-id',
      name: 'Mauricio Coronado',
      username: 'mauricio'
    }
  }

  test('5.27: unauthenticated user sees info and likes, but no buttons', () => {
    render(
      <BlogDetail
        blogs={[blog]}
        updateLikes={mockUpdateLikes}
        deleteBlog={mockDeleteBlog}
        user={null}
      />
    )

    expect(screen.getByText(/Component testing with React Testing Library/)).toBeDefined()
    expect(screen.getByText(/Matti Luukkainen/)).toBeDefined()
    expect(screen.getByText('https://fullstackopen.com/es/')).toBeDefined()
    expect(screen.getByText(/12 likes/)).toBeDefined()

    const likeButton = screen.queryByText('like')
    const removeButton = screen.queryByText('remove')

    expect(likeButton).toBeNull()
    expect(removeButton).toBeNull()
  })

  test('5.27: authenticated user who is NOT the creator sees only the like button', () => {
    const anotherUser = {
      id: 'other-user-id',
      name: 'Otro Usuario',
      username: 'otro'
    }

    render(
      <BlogDetail
        blogs={[blog]}
        updateLikes={mockUpdateLikes}
        deleteBlog={mockDeleteBlog}
        user={anotherUser}
      />
    )

    const likeButton = screen.getByText('like')
    expect(likeButton).toBeDefined()

    const removeButton = screen.queryByText('remove')
    expect(removeButton).toBeNull()
  })

  test('5.27: creator user sees both like and remove buttons', () => {
    const creatorUser = {
      id: 'user-creator-id',
      name: 'Mauricio Coronado',
      username: 'mauricio'
    }

    render(
      <BlogDetail
        blogs={[blog]}
        updateLikes={mockUpdateLikes}
        deleteBlog={mockDeleteBlog}
        user={creatorUser}
      />
    )

    const likeButton = screen.getByText('like')
    const removeButton = screen.getByText('remove')

    expect(likeButton).toBeDefined()
    expect(removeButton).toBeDefined()
  })
})