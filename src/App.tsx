import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import Dashboard from './components/Dashboard/Dashboard'
import AddProduct from './components/AddProduct/AddProduct'
import AddCategory from './components/AddCategory/AddCategory'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/product" element={<AddProduct />} />
        <Route path="/category" element={<AddCategory />} />
      </Routes>
    </Router>
  )
}

export default App
