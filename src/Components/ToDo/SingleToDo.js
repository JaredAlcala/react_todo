import React, { useState } from 'react'
import axios from 'axios'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
import { useAuth } from '../../contexts/AuthContext'
import ToDoEdit from './ToDoEdit'

export default function SingleToDo(props) {
    const [showEdit, setShowEdit] = useState(false)

    const { currentUser } = useAuth()

    const flipDone = () => {
        let updatedToDo = {
            toDoId: props.todo.toDoId,
            name: props.todo.name,
            done: !props.todo.done,
            categoryId: props.todo.categoryId
        }
        axios.put(`http://todoapi.jaredalcala.com/api/todo/${props.todo.toDoId}`, updatedToDo).then(response => {
            console.log(response)
            props.getToDo()
        })
    }

    const deleteToDo = (id) => {
        if(window.confirm(`Are you sure you want to delete ${props.todo.name}?`)) {
            axios.delete(`http://todoapi.jaredalcala.com/api/todo/${id}`).then(() => {props.getToDo()})
        }
    }

  return (
    <tr>
        <td>
            <input className='checkbox' type='checkbox' checked={props.todo.done} onChange={() => flipDone()} />
        </td>
        <td>{props.todo.name}</td>
        <td>{props.todo.category.catName}</td>
        {currentUser.email === process.env.REACT_APP_ADMIN_EMAIL &&
            <td className='text-center'>
                <button className="fs-5 rounded" id='editLink' onClick={() => setShowEdit(true)}>
                    <FaEdit />
                </button>
                &emsp;
                <button className='fs-5 rounded' id='deleteLink' onClick={() => deleteToDo(props.todo.toDoId)}>
                    <FaTrashAlt />
                </button>
                {showEdit &&
                    <ToDoEdit
                        todo={props.todo}
                        getToDo={props.getToDo}
                        showEdit={showEdit}
                        setShowEdit={setShowEdit} />
                }
            </td>
        }
    </tr>
  )
}