import { useState, useEffect } from "react"
import BlogPage from "./components/BlogPage"
import LoginForm from "./components/LoginForm"
import blogService from "./services/blogs"
import loginService from "./services/login"
import Notification from "./components/Notification"

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [user, setUser] = useState(null)

  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser")
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const loginUser = async (loginCredentials) => {
    try {
      const user = await loginService.login(loginCredentials)
      blogService.setToken(user.token)
      setUser(user)
      localStorage.setItem("loggedBlogAppUser", `${JSON.stringify(user)}`)
      return true
    } catch (error) {
      handleError(error)

      console.log(error)
      return false
    }
  }

  const handleNotification = (message, type) => {
    setNotification({ message, type })
    setTimeout(
      () => {
        setNotification(null)
      },

      4000
    )
  }

  const handleLogOut = () => {
    window.localStorage.removeItem("loggedBlogAppUser")
    setUser(null)
  }

  const createBlog = async (newBlogData) => {
    try {
      const saved = await blogService.create(newBlogData)
      setBlogs(blogs.concat(saved))
      handleNotification(
        `Added a new blog titled ${saved.title} by ${saved.author}`,
        "success"
      )
    } catch (error) {
      handleError(error)
    }
  }

  const handleError = (error) => {
    if (error.response.data.error) {
      handleNotification(error.response.data.error, "error")
    } else {
      handleNotification("unknown error", "error")
    }
  }

  return (
    <div>
      <Notification notification={notification} />
      {!user ? (
        <LoginForm loginUser={loginUser} />
      ) : (
        <BlogPage
          blogs={blogs}
          handleLogOut={handleLogOut}
          createBlog={createBlog}
        />
      )}
    </div>
  )
}

export default App
