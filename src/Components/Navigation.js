import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
//below we bring in useAuth to access the currentUser object
import { useAuth } from '../contexts/AuthContext'

export default function Navigation() {
  const { currentUser } = useAuth()

  return (
    <Navbar expand='md' variant='dark' bg='dark' className='p-3'>
        <Navbar.Brand href='/'>ResourcePlus</Navbar.Brand>
        {/* Hamburger button below */}
        <Navbar.Toggle />
        <Navbar.Collapse className='justify-content-end'>
            {/* Links for each page will go here. In this project we are using react-router-dom, which carries a
            Link component that will render the anchor tag associated with the router in App.js. */}
            <Nav>
              {currentUser &&
                <>
                  <Link to='/ToDo' className='nav-link'>ToDos</Link>
                  <Link to='/categories' className='nav-link'>Categories</Link>
                </>
              }
                <Link to='/bootstrap' className='nav-link'>Bootstrap</Link>
                <Link to='/routing' className='nav-link'>Routing</Link>
                {/* Below we conditionally render the login link if there is no currentUser */}
                {!currentUser &&
                  <Link to='/login' className='nav-link'>Login</Link>
                }
            </Nav>
        </Navbar.Collapse>
    </Navbar>
  )
}
