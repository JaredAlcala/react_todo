import React, { useState, useEffect } from 'react'
import { Container, Table } from 'react-bootstrap'
import axios from 'axios'
import SingleCategory from './SingleCategory'
import './Category.css'
import { useAuth } from '../../contexts/AuthContext'
import CatCreate from './CatCreate'

export default function Categories() {
  const [categories, setCategories] = useState([])

  const getCategories = () => {
    axios.get(`http://todoapi.jaredalcala.com/api/categories`).then(response => {
      console.log(response)
      setCategories(response.data)
    })
  }

  const { currentUser } = useAuth()

  const [showCreate, setShowCreate] = useState(false)

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <section className="categories">
      <article className="p-5 pop">
        <h2 className='text-center text-dark'>Categories Dashboard</h2>
     

      {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
        <div className="p-2 mb-3 text-center">
          {showCreate ? 
            <>
              <button onClick={() => setShowCreate(false)} className="btn btn-danger p-3 mb-3">Cancel</button>
              <CatCreate getCategories={getCategories} setShowCreate={setShowCreate} />
            </>
            : <button onClick={() => setShowCreate(true)} className="btn btn-success p-3">Create Category</button>            
          }
        </div>
      }

      <Container className='pt-4'>
        <Table className='table bg-dark table-dark  my-3'>
          <thead>
            <tr>
              <th>Category Name</th>
              <th>Description</th>
              {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
                <th>Actions</th>
              }
            </tr>
          </thead>
          <tbody>
            {categories.map(x =>
              <SingleCategory key={x.categoryId} category={x} getCategories={getCategories}/>
            )}
          </tbody>
        </Table>
      </Container>
      </article>

    </section>
  )
}