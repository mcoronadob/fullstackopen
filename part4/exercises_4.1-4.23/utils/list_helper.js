const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
    const likes = blogs.map(blog => blog.likes);
    return likes.reduce((sum, item) => sum + item, 0);
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;

  const favorito = blogs.reduce((prev, current) => 
    prev.likes > current.likes ? prev : current
  );

  return {
    title: favorito.title,
    author: favorito.author,
    likes: favorito.likes
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}