const { reduce } = require('lodash')
const _ = require('lodash')

const dummy = (blogs) => {
  return(1)
}

const totalLikes = (blogs) => {
  return (blogs.reduce((sum, blog) => sum + blog.likes, 0))
}

const favoriteBlog = (blogs) => {
  const likes = blogs.map(b => b.likes)
  const max = Math.max.apply(Math, likes)
  const favorite = blogs.find((blog) => blog.likes === max)
  return (
    {'title': favorite.title,
      'author': favorite.author,
      'likes': favorite.likes
    }

  )
}

const mostBlogs = (blogs) => {

  const counted = _.countBy(blogs, 'author')
  const mapped = _.map(counted, (blogs, author) => ({author: author, blogs: blogs}))
  const max = _.maxBy(mapped, 'blogs')

  return(
    max
    )
}

const mostLikes = (blogs) => {

 const grouped = _.groupBy(blogs, 'author')
 const mapped = _.map(grouped, (likes, author) => ({author: author, likes: totalLikes(likes)}))
  const max = _.maxBy(mapped, 'likes')

  return(
    max
  )

}

module.exports = {dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes}