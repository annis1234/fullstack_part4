const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

describe('when there is initially some notes saved', () => {
    beforeEach(async() => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.initialBlogs)
    })

    test('all blogs are returned', async() => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })

    test('blogs are returned as json', async() => {
        await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
    
    test('field id is correct', async() => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
    })

})

describe('addition of a blog', () => {

    test('blog without title or url is not added', async() => {
        const newBlog = {
            author: "test2",
            likes: 2
        }
    
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    
    }) 

    test('blog is added', async() => {
        const newBlog = {
            title: "test",
            author: "test",
            url: "test",
            likes: 2
        }
        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length +1)
    
    })

    test('likes is 0', async() => {
        const newBlog = {
            title: "test",
            author: "test",
            url: "test",
        
        }
        await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
    
        const response = await api.get('/api/blogs')
        expect(response.body[helper.initialBlogs.length+1].likes).toEqual(0)
    })

})


describe('delete blog', () => {

    test('blog is deleted', async() => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]
    
        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)
    
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length -1)

})

describe('update blog', () => {

    test('blog is updated', async() => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]

        const newContent = {
            "title": "testi",
            "author": "testi",
            "url": "testi",
            "likes": 20
        }

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(newContent)
            .expect(200)
        
        const blogsAtEnd = await helper.blogsInDb()
        const updatedBlog = blogsAtEnd[0]
            
        expect(updatedBlog.likes).toEqual(20)
        })

    })

})

describe('when there is initially one user at db', () => {

    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({username: 'root', passwordHash})

        await user.save()
    })

    test('creation succeeds with a fresh username', async() => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'annis',
            name: 'anni',
            password: 'salainen'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length +1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails if username taken',async() => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username : 'root',
            name : 'Superuser',
            password :'salainen'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('expected `username` to be unique')
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })

})

afterAll(async()=> {
    await mongoose.connection.close()
})