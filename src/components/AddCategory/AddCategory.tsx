import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import 'bootstrap/dist/css/bootstrap.min.css'

const AddCategory: React.FC = () => {
  const [categories, setCategories] = useState<
    { _id: string; name: string; description: string }[]
  >([])
  const [categoryName, setCategoryName] = useState('')
  const [categoryDescription, setCategoryDescription] = useState('')
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  useEffect(() => {
    loadCategories()
  }, [])

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch('http://localhost:3010/api/v1/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          name: categoryName,
          description: categoryDescription
        })
      })

      if (response.ok) {
        Swal.fire('Categoría agregada', '', 'success')
        setCategoryName('')
        setCategoryDescription('')
        loadCategories()
      } else {
        Swal.fire('Error', 'Error al agregar la categoría', 'error')
      }
    } catch (error) {
      console.error('Error al agregar la categoría:', error)
      Swal.fire('Error', 'Error al agregar la categoría', 'error')
    }
  }

  const handleEdit = async (index: number) => {
    const categoryToUpdate = categories[index]

    const confirmEdit = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Se actualizará la categoría',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, actualizar'
    })

    if (confirmEdit.isConfirmed) {
      try {
        const response = await fetch(
          `http://localhost:3010/api/v1/categories/${categoryToUpdate._id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
              name: categoryToUpdate.name,
              description: categoryToUpdate.description
            })
          }
        )

        if (response.ok) {
          Swal.fire('Categoría actualizada', '', 'success')
          loadCategories()
        } else {
          Swal.fire('Error', 'Error al actualizar la categoría', 'error')
        }
      } catch (error) {
        console.error('Error al actualizar la categoría:', error)
        Swal.fire('Error', 'Error al actualizar la categoría', 'error')
      }
    }
  }

  const handleDelete = async (categoryId: string) => {
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
          `http://localhost:3010/api/v1/categories/${categoryId}`,
          {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        )

        if (response.ok) {
          Swal.fire('Categoría eliminada', '', 'success')
          loadCategories()
        } else {
          Swal.fire('Error', 'Error al eliminar la categoría', 'error')
        }
      } catch (error) {
        console.error('Error al eliminar la categoría:', error)
        Swal.fire('Error', 'Error al eliminar la categoría', 'error')
      }
    }
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Category
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
                  onClick={() => navigate('/product')}
                >
                  Product
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
        <h1>Add Category</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="categoryName" className="form-label">
              Category Name
            </label>
            <input
              type="text"
              id="categoryName"
              className="form-control"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="categoryDescription" className="form-label">
              Category Description
            </label>
            <input
              type="text"
              id="categoryDescription"
              className="form-control"
              value={categoryDescription}
              onChange={(e) => setCategoryDescription(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add Category
          </button>
        </form>
      </div>

      <div className="container mt-5">
        <h2>Categories</h2>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={category._id}>
                <td>
                  <input
                    type="text"
                    value={category.name}
                    onChange={(e) =>
                      setCategories((prevCategories) => {
                        const updatedCategories = [...prevCategories]
                        updatedCategories[index].name = e.target.value
                        return updatedCategories
                      })
                    }
                    onBlur={() => handleEdit(index)}
                    className="form-control"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={category.description}
                    onChange={(e) =>
                      setCategories((prevCategories) => {
                        const updatedCategories = [...prevCategories]
                        updatedCategories[index].description = e.target.value
                        return updatedCategories
                      })
                    }
                    onBlur={() => handleEdit(index)}
                    className="form-control"
                  />
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(category._id)}
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

export default AddCategory
