import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Register.css'

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

    console.log(user)

    try {
      const response = await fetch('http://localhost:3010/api/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
      })

      console.log(response)

      if (response.ok) {
        alert('Registro exitoso')
        setName('')
        setEmail('')
        setAddress('')
        setPhoneNumber('')
        setPassword('')
      } else {
        alert('Error al registrar usuario')
      }
    } catch (error) {
      alert('Error al registrar usuario')
    }
  }

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="register-input"
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="register-input"
        />
        <label htmlFor="address">Address</label>
        <input
          type="text"
          id="address"
          name="address"
          placeholder="Your address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="register-input"
        />
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          placeholder="Your phone number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="register-input"
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="register-input"
        />
        <button type="submit" className="register-btn">
          Register
        </button>
      </form>
      <button onClick={() => navigate('/')} className="login-redirect-btn">
        Go to Login
      </button>
    </div>
  )
}

export default Register
