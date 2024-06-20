import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './components/Login/Login'
import Register from './components/Register/Register'

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App
