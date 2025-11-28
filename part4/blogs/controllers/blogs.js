const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const { userExtractor } = require("../utils/middleware")

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
    id: 1,
  })
  response.json(blogs)
})

blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.post("/", userExtractor, async (request, response) => {
  const { user } = request

  if (!user) {
    return response.status(401).json({ error: "token invalid" })
  }

  const { title, author, url, likes } = request.body

  if (!title || !url) {
    return response.status(400).json({ error: "title or url is missing" })
  }

  const blog = new Blog({
    title,
    author,
    url,
    likes: likes ?? 0,
    user: user,
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save({ validateModifiedOnly: true })

  response.status(201).json(savedBlog)
})

blogsRouter.delete("/:id", userExtractor, async (request, response) => {
  const { user } = request

  if (!user) {
    return response.status(401).json({ error: "token invalid" })
  }

  const blog = await Blog.findById(request.params.id)

  if (blog?.user.toString() === user._id.toString()) {
    await Blog.findByIdAndDelete(request.params.id)

    response.status(204).end()
  } else {
    response.status(401).json({ error: "unauthorized access" })
  }
})

blogsRouter.put("/:id", async (request, response, next) => {
  try {
    const { title, author, url, likes } = request.body

    const blog = await Blog.findById(request.params.id)

    if (!blog) {
      return response.status(404).end()
    }

    blog.title = title
    blog.author = author
    blog.url = url
    blog.likes = likes

    const updatedBlog = await blog.save()
    return response.json(updatedBlog)
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter
