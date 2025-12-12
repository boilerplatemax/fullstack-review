import { useState } from "react"

export default function LoginForm({ loginUser }) {
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
