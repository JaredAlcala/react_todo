import React, {useState, useEffect} from 'react'
import './ToDo.css'
import axios from 'axios'
import SingleToDo from './SingleToDo'
import { Container } from 'react-bootstrap'
import FilterCat from './FilterCat'
import { useAuth } from '../../contexts/AuthContext'
import ToDoCreate from './ToDoCreate'

export default function ToDo() {
  const [toDo, setToDo] = useState([])

  const [filter, setFilter] = useState(0);
  const [showDone, setShowDone] = useState(false)

  const { currentUser } = useAuth()
  const [showCreate, setShowCreate] = useState();

  const getToDo = () => {
  axios.get(`http://todoapi.jaredalcala.com/api/todo`).then(response => {
    console.log(response.data)
    setToDo(response.data)
  })
}

useEffect(() => {
  getToDo()
}, []);

  return (
    <section className="toDo">
        <article className=" p-5 pop">
            <h2 className="text-center text-dark">ToDo Dashboard</h2>
            {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
        <div className="p-2 mb-3 text-center">
          {!showCreate ?
            <button className="btn btn-success p-3 mb-3" onClick={() => setShowCreate(true)}>
              Create New Task
            </button> :
            <button className="btn btn-danger p-1 mb-1 btn-md" onClick={() => setShowCreate(false)}>
              Close Form
          </button>
          }
          {showCreate &&
            <div className="createContainer w-75 m-auto">
                <ToDoCreate getToDo={getToDo} setshowCreate={setShowCreate} />
            </div>
          } 
        </div>
      }
        <FilterCat setFilter={setFilter} showDone={showDone} setShowDone={setShowDone} />
            <Container className='p-2'>
                <table className="table bg-dark table-dark  my-3">
                    <thead className="table-secondary text-uppercase">
                        <tr>
                            <th>Done?</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {!showDone ?
              <>
               {filter === 0 ? toDo.filter(x => x.done === false).map(x =>
                <SingleToDo key={x.toDoId} todo={x} getToDo={getToDo}/>
                ) :
                toDo.filter(x => x.done === false && x.categoryId === filter).map(x =>
                  <SingleToDo key={x.toDoId} todo={x} getToDo={getToDo} />
              )}
            </> :
            <>
              {filter === 0 ? toDo.map(x =>
                  <SingleToDo key={x.toDoId} todo={x} getToDo={getToDo}/>
                ) :
                toDo.filter(x => x.categoryId === filter).map(x =>
                  <SingleToDo key={x.toDoId} todo={x} getToDo={getToDo} />
              )}
            </>
            }
                    </tbody>
                </table>
                {!showDone ?
            <>
            {filter !== 0 && toDo.filter(x => x.done === false && x.categoryId === filter).length === 0 &&
              <h2 className="alert alert-warning text-dark">
                There are no incomplete items in this category.
              </h2>
            }
            </> :
            <>
              {filter !== 0 && toDo.filter(x => x.categoryId === filter).length === 0 &&
              <h2 className="alert alert-warning text-dark">
                There are no items in this category.
              </h2>
            }
            </>

            }
            </Container>
        </article>
    </section>
  )
}