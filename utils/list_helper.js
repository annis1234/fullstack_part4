const dummy = (blogs) => {
    return(1)
}

const totalLikes = (blogs) => {
    return (blogs.reduce((sum, blog) => sum + blog.likes, 0))
}

const favoriteBlog = (blogs) => {
    const likes = blogs.map(b => b.likes)
    max = Math.max.apply(Math, likes)
    const favorite = blogs.find((blog) => blog.likes === max)
    return (
        {"title": favorite.title,
        "author": favorite.author,
        "likes": favorite.likes
    }

    )
}

module.exports = {dummy, totalLikes, favoriteBlog}