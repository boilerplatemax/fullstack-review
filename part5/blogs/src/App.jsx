import { useState, useEffect } from "react"
import Blog from "./components/Blog"
import blogService from "./services/blogs"
import loginService from "./services/login"
import Notification from "./components/Notification"

const Blogs = ({ blogs }) => {
  return (
    <>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </>
  )
}

const LoginForm = ({ loginUser }) => {
  const [loginCredentials, setLoginCredentials] = useState({
    username: "",
    password: "",
  })

  const handleCredentialsChange = (e) => {
    e.preventDefault()
    //const name =event.target.name & const value = event.target.value
    const { name, value } = e.target
    setLoginCredentials((loginCredentials) => ({
      ...loginCredentials,
      [name]: value,
    }))
    console.log(`${name}: ${value}`)
  }

  //hint this will become async
  const handleLogin = async (e) => {
    e.preventDefault()
    console.log(loginCredentials)

    const success = await loginUser(loginCredentials)
    if (success) {
      setLoginCredentials({ username: "", password: "" })
    }
  }
  return (
    <form onSubmit={(e) => handleLogin(e)}>
      username
      <input
        type="text"
        name="username"
        value={loginCredentials.username}
        onChange={handleCredentialsChange}
      />
      password
      <input
        type="text"
        name="password"
        value={loginCredentials.password}
        onChange={handleCredentialsChange}
      />
      <button type="submit">Login</button>
    </form>
  )
}

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
      //handleError(error)
      handleNotification(error.response.data.error, "error")
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

  if (user === null) {
    return <LoginForm loginUser={loginUser} />
  }
  return (
    <div>
      <div
        style={{
          justifyContent: "space-between",
          display: "flex",
          minWidth: "300px",
        }}
      >
        <h2>blogs</h2>
        <button onClick={handleLogOut}>logout</button>
      </div>

      <Notification notification={notification} />

      <Blogs blogs={blogs} />
    </div>
  )
}

export default App
