import React from 'react'
import { useNavigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

const Dashboard: React.FC = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const navigate = useNavigate()

  const handleAddProduct = () => {
    navigate('/product')
  }

  const handleAddCategory = () => {
    navigate('/category')
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Dashboard
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <button className="nav-link btn" onClick={handleAddProduct}>
                  Product
                </button>
              </li>
              <li className="nav-item">
                <button className="nav-link btn" onClick={handleAddCategory}>
                  Category
                </button>
              </li>
            </ul>
            <button className="btn btn-outline-danger" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </nav>
      <div className="container mt-5">
        <h1>User Information</h1>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{user.name}</h5>
            <p className="card-text">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="card-text">
              <strong>Address:</strong> {user.address}
            </p>
            <p className="card-text">
              <strong>Phone Number:</strong> {user.phoneNumber}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
