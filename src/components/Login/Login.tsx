import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:3010/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })
      if (response.ok) {
        alert('Inicio de sesión exitoso')
        const data = await response.json()
        console.log(data)
        setEmail('')
        setPassword('')
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
      } else {
        alert('Error al iniciar sesión')
      }
    } catch (error) {
      alert('Error al iniciar sesión')
    }
  }

  const handleRegisterRedirect = () => {
    navigate('/register')
  }

  return (
    <div>
      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
          />
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
        <button onClick={handleRegisterRedirect} className="login-btn">
          Register
        </button>
      </div>
    </div>
  )
}

export default Login
