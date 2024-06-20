import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import 'bootstrap/dist/css/bootstrap.min.css';

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
        Swal.fire('Inicio de sesión exitoso', '', 'success')
        const data = await response.json()
        setEmail('')
        setPassword('')
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
      } else {
        Swal.fire('Error', 'Error al iniciar sesión', 'error')
      }
    } catch (error) {
      Swal.fire('Error', 'Error al iniciar sesión', 'error')
    }
  }

  const handleRegisterRedirect = () => {
    navigate('/register')
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: '300px' }}>
        <h1 className="text-center mb-4">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-3">
            Login
          </button>
        </form>
        <button
          onClick={handleRegisterRedirect}
          className="btn btn-secondary w-100"
        >
          Register
        </button>
      </div>
    </div>
  )
}

export default Login
