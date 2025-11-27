const Blog = require("../models/blog")

const initialBlogs = [
  {
    title: "HTML is easy",
    author: "Elliot Smith",
    url: "google.com",
  },
  {
    title: "Browser can execute only JavaScript",
    author: "The Rizzler",
    url: "google.com",
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ title: "willremovethissoon" })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
}
