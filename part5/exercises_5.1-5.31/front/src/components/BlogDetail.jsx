import { useMatch } from 'react-router-dom'
import {
  BlogCard,
  BlogDetailTitle,
  BlogInfoText,
  ActionsContainer,
  LikeButton,
  DeleteButton
} from './StyledComponents'

const BlogDetail = ({ blogs, updateLikes, deleteBlog, user }) => {
  const match = useMatch('/blogs/:id')
  const blog = match ? blogs.find(b => b.id === match.params.id) : null

  if (!blog) {
    return null
  }

  // Verificamos si el usuario actual es el creador del blog
  const isCreator = user && blog.user && (
    blog.user.username === user.username ||
    blog.user === user.id ||
    blog.user._id === user.id
  )

  return (
    <BlogCard>
      <BlogDetailTitle>{blog.title}</BlogDetailTitle>
      <BlogInfoText>
        by {blog.author}
      </BlogInfoText>
      <BlogInfoText>
        <a href={blog.url} target="_blank" rel="noreferrer">
          {blog.url}
        </a>
      </BlogInfoText>
      <BlogInfoText style={{ color: '#718096', fontSize: '14px' }}>
        Added by {blog.user?.name || blog.user?.username || 'Unknown'}
      </BlogInfoText>

      <ActionsContainer>
        <span>{blog.likes} likes</span>
        {user && (
          <LikeButton onClick={() => updateLikes(blog.id)}>
            LIKE
          </LikeButton>
        )}

        {isCreator && (
          <DeleteButton onClick={() => deleteBlog(blog)}>
            REMOVE
          </DeleteButton>
        )}
      </ActionsContainer>
    </BlogCard>
  )
}

export default BlogDetail