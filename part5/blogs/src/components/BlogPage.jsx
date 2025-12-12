import React from "react"
import { useState } from "react"
import Blog from "./Blog"

export default function Blogs({ blogs, handleLogOut, createBlog }) {
  const [newBlog, setNewBlog] = useState({})

  const handleBlogChange = (e) => {
    setNewBlog({
      ...newBlog,
      [e.target.name]: e.target.value,
    })
  }

  const handlePostBlog = (e) => {
    e.preventDefault()
    createBlog(newBlog)
  }

  return (
    <>
      <h2>blogs</h2>
      <form onSubmit={(e) => handlePostBlog(e)}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newBlog?.title || ""}
            onChange={handleBlogChange}
          />
        </label>
        <br />
        <label>
          Author:
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={newBlog?.author || ""}
            onChange={handleBlogChange}
          />
        </label>
        <br />
        <label>
          URL:
          <input
            type="text"
            name="url"
            placeholder="URL"
            value={newBlog?.url || ""}
            onChange={handleBlogChange}
          />
        </label>
        <br />
        <button>create</button>
      </form>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
      <button onClick={handleLogOut}>logout</button>
    </>
  )
}
