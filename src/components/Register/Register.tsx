import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import 'bootstrap/dist/css/bootstrap.min.css';

const Register: React.FC = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const user = { name, email, address, phoneNumber, password }

    try {
      const response = await fetch('http://localhost:3010/api/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })

      if (response.ok) {
        Swal.fire('Registro exitoso', '', 'success')
        setName('')
        setEmail('')
        setAddress('')
        setPhoneNumber('')
        setPassword('')
      } else {
        Swal.fire('Error', 'Error al registrar usuario', 'error')
      }
    } catch (error) {
      Swal.fire('Error', 'Error al registrar usuario', 'error')
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: '300px' }}>
        <h2 className="text-center mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              placeholder="Your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="phoneNumber" className="form-label">
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
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
              name="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 mb-3">
            Register
          </button>
        </form>
        <button
          onClick={() => navigate('/')}
          className="btn btn-secondary w-100"
        >
          Go to Login
        </button>
      </div>
    </div>
  )
}

export default Register
