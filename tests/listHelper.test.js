const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs=[]

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('total likes', ()=> {
    const emptyList = []
    const oneBlog = [{
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
         __v: 0

    }]

    const blogs = [ {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
         __v: 0
        },
        {
            _id: "5a422b891b54a676234d17fa",
            title: "First class tests",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
            likes: 10,
            __v: 0
          },
          {
            _id: "5a422bc61b54a676234d17fc",
            title: "Type wars",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 2,
            __v: 0
        }  
    ]

    test('listWithSeveralBlogs', () => {
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(19)
    })

    test('listWithOneBlog', () => {
        const result = listHelper.totalLikes(oneBlog)
        expect(result).toBe(7)
    })

    test('emptyList', () => {
        const result = listHelper.totalLikes(emptyList)
        expect(result).toBe(0)
    })

})

test('favoriteBlog', () => {
    const blogs = [ {
        _id: "5a422a851b54a676234d17f7",
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
         __v: 0
        },
        {
            _id: "5a422b891b54a676234d17fa",
            title: "First class tests",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
            likes: 10,
            __v: 0
          },
          {
            _id: "5a422bc61b54a676234d17fc",
            title: "Type wars",
            author: "Robert C. Martin",
            url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
            likes: 2,
            __v: 0
        }  
    ]
    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual({"author": "Robert C. Martin", "likes": 10, "title": "First class tests"})
})