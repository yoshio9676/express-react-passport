import { useState } from "react"

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = () => {
    console.log('Register')
  }

  return (
    <>
      <div>
        <label>
          Name
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}/>
        </label>
      </div>
      <div>
        <label>
          Email
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}/>
        </label>
      </div>
      <div>
        <label>
          Password
          <input
            type="text"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}/>
        </label>
      </div>
      <button onClick={handleRegister}>Register</button>
    </>
  )
}

export default Register