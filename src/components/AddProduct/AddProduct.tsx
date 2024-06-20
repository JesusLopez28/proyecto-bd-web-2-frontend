import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import 'bootstrap/dist/css/bootstrap.min.css'

const AddProduct: React.FC = () => {
  const [productName, setProductName] = useState('')
  const [productDescription, setProductDescription] = useState('')
  const [productPrice, setProductPrice] = useState('')
  const [productCategory, setProductCategory] = useState<string>('')
  const [productStock, setProductStock] = useState<number>(0)
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>(
    []
  )
  const [products, setProducts] = useState<any[]>([])
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  // Función para cargar las categorías desde el servidor
  const loadCategories = async () => {
    try {
      const response = await fetch('http://localhost:3010/api/v1/categories', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setCategories(data)
      } else {
        Swal.fire('Error', 'Error al cargar las categorías', 'error')
      }
    } catch (error) {
      console.error('Error al cargar las categorías:', error)
      Swal.fire('Error', 'Error al cargar las categorías', 'error')
    }
  }

  // Función para cargar los productos desde el servidor
  const loadProducts = async () => {
    try {
      const response = await fetch('http://localhost:3010/api/v1/products', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setProducts(data)
      } else {
        Swal.fire('Error', 'Error al cargar los productos', 'error')
      }
    } catch (error) {
      console.error('Error al cargar los productos:', error)
      Swal.fire('Error', 'Error al cargar los productos', 'error')
    }
  }

  useEffect(() => {
    loadCategories()
    loadProducts()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch('http://localhost:3010/api/v1/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          name: productName,
          description: productDescription,
          price: parseFloat(productPrice),
          categoryId: productCategory,
          stock: productStock
        })
      })

      if (response.ok) {
        Swal.fire('Producto agregado', '', 'success')
        setProductName('')
        setProductDescription('')
        setProductPrice('')
        setProductCategory('')
        setProductStock(0)
        loadProducts()
      } else {
        Swal.fire('Error', 'Error al agregar el producto', 'error')
      }
    } catch (error) {
      console.error('Error al agregar el producto:', error)
      Swal.fire('Error', 'Error al agregar el producto', 'error')
    }
  }

  const handleEdit = async (index: number) => {
    const productToUpdate = products[index]

    const confirmEdit = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción actualizará el producto',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, actualizar'
    })

    if (confirmEdit.isConfirmed) {
      try {
        const response = await fetch(
          `http://localhost:3010/api/v1/products/${productToUpdate._id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
              name: productToUpdate.name,
              description: productToUpdate.description,
              price: parseFloat(productToUpdate.price),
              categoryId: productToUpdate.category._id,
              stock: parseInt(productToUpdate.stock)
            })
          }
        )

        if (response.ok) {
          Swal.fire('Producto actualizado', '', 'success')
          loadProducts()
        } else {
          Swal.fire('Error', 'Error al actualizar el producto', 'error')
        }
      } catch (error) {
        console.error('Error al actualizar el producto:', error)
        Swal.fire('Error', 'Error al actualizar el producto', 'error')
      }
    }
  }

  const handleDelete = async (productId: string) => {
    const confirmDelete = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    })

    if (confirmDelete.isConfirmed) {
      try {
        const response = await fetch(
          `http://localhost:3010/api/v1/products/${productId}`,
          {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        )

        if (response.ok) {
          Swal.fire('Producto eliminado', '', 'success')
          loadProducts()
        } else {
          Swal.fire('Error', 'Error al eliminar el producto', 'error')
        }
      } catch (error) {
        console.error('Error al eliminar el producto:', error)
        Swal.fire('Error', 'Error al eliminar el producto', 'error')
      }
    }
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Product
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
                <button
                  className="nav-link btn"
                  onClick={() => navigate('/dashboard')}
                >
                  Dashboard
                </button>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link btn"
                  onClick={() => navigate('/category')}
                >
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
        <h1>Add Product</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="productName" className="form-label">
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              className="form-control"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="productDescription" className="form-label">
              Product Description
            </label>
            <input
              type="text"
              id="productDescription"
              className="form-control"
              value={productDescription}
              onChange={(e) => setProductDescription(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="productPrice" className="form-label">
              Product Price
            </label>
            <input
              type="number"
              id="productPrice"
              className="form-control"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="productStock" className="form-label">
              Product Stock
            </label>
            <input
              type="number"
              id="productStock"
              className="form-control"
              value={productStock}
              onChange={(e) => setProductStock(parseInt(e.target.value))}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="productCategory" className="form-label">
              Product Category
            </label>
            <select
              id="productCategory"
              className="form-control"
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
            >
              <option value="">Select category...</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Add Product
          </button>
        </form>
      </div>

      <div className="container mt-5">
        <h2>Products</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th className="col">Name</th>
              <th className="col">Description</th>
              <th className="col">Price</th>
              <th className="col">Stock</th>
              <th className="col">Category</th>
              <th className="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product._id}>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={product.name}
                    onChange={(e) =>
                      setProducts((prevProducts) => {
                        const updatedProducts = [...prevProducts]
                        updatedProducts[index].name = e.target.value
                        return updatedProducts
                      })
                    }
                    onBlur={() => handleEdit(index)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={product.description}
                    onChange={(e) =>
                      setProducts((prevProducts) => {
                        const updatedProducts = [...prevProducts]
                        updatedProducts[index].description = e.target.value
                        return updatedProducts
                      })
                    }
                    onBlur={() => handleEdit(index)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    value={product.price}
                    onChange={(e) =>
                      setProducts((prevProducts) => {
                        const updatedProducts = [...prevProducts]
                        updatedProducts[index].price = e.target.value
                        return updatedProducts
                      })
                    }
                    onBlur={() => handleEdit(index)}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    value={product.stock}
                    onChange={(e) =>
                      setProducts((prevProducts) => {
                        const updatedProducts = [...prevProducts]
                        updatedProducts[index].stock = e.target.value
                        return updatedProducts
                      })
                    }
                    onBlur={() => handleEdit(index)}
                  />
                </td>
                <td>
                  <select
                    className="select form-control"
                    value={product.category ? product.category._id : ''}
                    onChange={(e) =>
                      setProducts((prevProducts) => {
                        const updatedProducts = [...prevProducts]
                        updatedProducts[index].category._id = e.target.value
                        return updatedProducts
                      })
                    }
                    onBlur={() => handleEdit(index)}
                  >
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AddProduct
