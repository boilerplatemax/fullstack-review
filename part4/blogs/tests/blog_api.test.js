const assert = require("node:assert")
const { test, after, beforeEach } = require("node:test")
const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const Blog = require("../models/blog")
const helper = require("./test_helper")
const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  await Blog.insertMany(helper.initialBlogs)
})

test("blogs are returned as json", async () => {
  console.log("entered test")
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/)
})

test("blogs have correct id property", async () => {
  const blogsAtStart = await helper.blogsInDb()
  const containsId = (blog) => {
    return blog.id ? true : false
  }

  assert(blogsAtStart.every(containsId))
})

test("all blogs are returned", async () => {
  const blogsAtStart = await helper.blogsInDb()

  assert.strictEqual(blogsAtStart.length, helper.initialBlogs.length)
})

test("a specific blog can be viewed", async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToView = blogsAtStart[0]

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect("Content-Type", /application\/json/)

  assert.deepStrictEqual(resultBlog.body, blogToView)
})

test("a specific blog is within the returned blogs", async () => {
  const response = await api.get("/api/blogs")

  const titles = response.body.map((e) => e.title)
  assert(titles.includes("HTML is easy"))
})

test("A valid blog can be added", async () => {
  const newBlog = {
    title: "Random Blog Title",
    author: "Max Shapovalov",
    url: "N/A",
  }

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/)

  const blogsInEnd = await helper.blogsInDb()
  assert.strictEqual(blogsInEnd.length, helper.initialBlogs.length + 1)

  const titles = blogsInEnd.map((b) => b.title)
  assert(titles.includes("Random Blog Title"))
})

test("defaults likes to 0 when missing", async () => {
  const noLikes = {
    title: "No Like Example",
    author: "Max Shapovalov",
    url: "N/A",
  }

  const withLikes = {
    title: "With Likes Example",
    author: "Max Shapovalov",
    url: "N/A",
    likes: 36,
  }

  const [resNo, resYes] = await Promise.all([
    api.post("/api/blogs").send(noLikes).expect(201),
    api.post("/api/blogs").send(withLikes).expect(201),
  ])

  // check API responses directly
  assert.strictEqual(resNo.body.likes, 0)
  assert.strictEqual(resYes.body.likes, withLikes.likes)
})

test.only("A blog with no title/url is rejected", async () => {
  const noTitleBlog = {
    author: "Jim Bob",
    url: "google.com",
  }
  const noUrlBlog = {
    title: "My title",
    author: "Jim Bob",
  }

  await Promise.all([
    api.post("/api/blogs").send(noTitleBlog).expect(400),
    api.post("/api/blogs").send(noUrlBlog).expect(400),
  ])

  const blogsAtEnd = await helper.blogsInDb()

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

test("a blog can be deleted", async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

  const blogsAtEnd = await helper.blogsInDb()
  const titles = blogsAtEnd.map((n) => n.title)
  assert(!titles.includes(blogToDelete.title))

  assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
})

after(async () => {
  await mongoose.connection.close()
})
