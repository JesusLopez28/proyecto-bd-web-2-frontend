import { useState, useEffect } from 'react'
import './Login.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showData, setShowData] = useState<boolean>(false)
  const [products, setProducts] = useState<Array<Object>>([])

  useEffect(() => {
    if (localStorage.getItem('token')) {
      setShowData(true)
    }

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3010/api/v1/products', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (response.ok) {
          const data = await response.json()
          console.log(data)
          setProducts(data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    if (showData) {
      fetchData()
    }
  }, [showData])

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
        setShowData(true)
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
      </div>
      {showData && <ProductTable products={products} />}
    </div>
  )
}

const ProductTable = ({ products }: { products: Array<Object> }) => {
  return (
    <div className="product-table-container">
      <table className="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Categoría</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product: any) => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.category.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Login
