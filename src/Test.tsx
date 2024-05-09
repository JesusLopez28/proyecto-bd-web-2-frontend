import { useEffect, useState } from 'react'
import './Test.css'

function Test() {
  const [product, setProduct] = useState<any>(null)

  useEffect(() => {
    fetch('http://localhost:3010/api/v1/products/findSecondProduct')
      .then((res) => res.json())
      .then((data) => setProduct(data))
  }, [])

  return (
    <div>
      <h1 className="title">Product Details</h1>
      {product && (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default Test
