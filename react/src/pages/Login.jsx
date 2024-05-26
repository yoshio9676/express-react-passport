import { useState } from "react"
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    console.log('Login')
  }

  return (
    <>
      <div>
        <label htmlFor="">
          Email
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}/>
        </label>
      </div>
      <div>
        <label htmlFor="">
          Password
          <input
            type="text"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}/>
        </label>
      </div>
      <button onClick={handleLogin}>Login</button>
    </>
  )
}

export default Login