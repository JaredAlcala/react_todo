import React from 'react'
import './App.css'
//Below are a few react-router-dom components that provide our routing functionality.
//1. BrowserRouter - Router for the app (we must place the Navigation and Routes inside these tags)
//2. Routes - kind of like a switch - details all the Route components inside 
//3. Route - for every route in our app we will have a Route component listed below. This gives instructions
//   to the app for what component to display based on the url path
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './Components/Navigation';
import About from './Components/About';
import Categories from './Components/Categories/Categories';
import NotFound from './Components/NotFound/NotFound';
import Footer from './Components/Footer';
import ToDo from './Components/ToDo/ToDo';
import AuthProvider from './contexts/AuthContext';
import Login from './Components/Auth/Login';
import ProtectedRoute from './Components/ProtectedRoute';

export default function App() {
  return (
    <div className='App'>
      <AuthProvider>
      {/* The below component is actually calling the BrowserRouter but we made an alias of Router in the import.
      We surround the Navigation component because it contains Link components from react-router-dom and thus relies
      on our Router's state and logic.*/}
      <Router>
        <Navigation />
        {/* This is like a switch that decides what to render to the screen based on the url path. */}
        <Routes>
        <Route path='/' element={<ProtectedRoute> <ToDo /> </ProtectedRoute> } />
          <Route path='/ToDo' element={<ProtectedRoute> <ToDo /> </ProtectedRoute>} />
          <Route path='/Categories' element={<ProtectedRoute> <Categories /> </ProtectedRoute>} />
          <Route path='/About' element={<About />} />
          <Route path='/login' element={<Login/>} />

          {/* The NotFound component will be an error handler tied to any other Route than what is listed above.
          All Routes listed above this Route will have very specific paths that are listed for them. This Route
          will be a catch-all for the rest of what could be in the path. */}
          <Route path='*' element={<NotFound />} />

        </Routes>
        <Footer />
      </Router>
      </AuthProvider>
    </div>
  )
}
