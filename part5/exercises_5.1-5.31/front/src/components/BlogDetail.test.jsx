import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
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

  const renderWithRouter = (user) => {
    return render(
      <MemoryRouter initialEntries={['/blogs/123']}>
        <Routes>
          <Route
            path="/blogs/:id"
            element={
              <BlogDetail
                blogs={[blog]}
                updateLikes={mockUpdateLikes}
                deleteBlog={mockDeleteBlog}
                user={user}
              />
            }
          />
        </Routes>
      </MemoryRouter>
    )
  }

  test('5.27: unauthenticated user sees info and likes, but no buttons', () => {
    renderWithRouter(null)

    expect(screen.getByText(/Component testing with React Testing Library/)).toBeDefined()
    expect(screen.getByText(/Matti Luukkainen/)).toBeDefined()
    expect(screen.getByText('https://fullstackopen.com/es/')).toBeDefined()
    expect(screen.getByText(/12 likes/)).toBeDefined()

    expect(screen.queryByText('like')).toBeNull()
    expect(screen.queryByText('remove')).toBeNull()
  })

  test('5.27: authenticated user who is NOT the creator sees only the like button', () => {
    const anotherUser = {
      id: 'other-user-id',
      name: 'Otro Usuario',
      username: 'otro'
    }

    renderWithRouter(anotherUser)

    expect(screen.getByText('like')).toBeDefined()
    expect(screen.queryByText('remove')).toBeNull()
  })

  test('5.27: creator user sees both like and remove buttons', () => {
    const creatorUser = {
      id: 'user-creator-id',
      name: 'Mauricio Coronado',
      username: 'mauricio'
    }

    renderWithRouter(creatorUser)

    expect(screen.getByText('like')).toBeDefined()
    expect(screen.getByText('remove')).toBeDefined()
  })
})