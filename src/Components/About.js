import React from 'react'
import './About.css'

export default function About() {
  return (
    <section className="abouts">
    <article className="p-5 pop">
        <h2 className='text-center text-dark'>About</h2>
      <div className='p'>
        <p > 
          <strong>About Me:</strong>
          <br />
          
          <br/>
          <strong>Why we did this assignment:</strong>
          <br />
          The React To Do Application is a portfolio project that will allow you to showcase your ability to build single page applications using React JS.  The application will allow users to sign in and see items on their to do list.  Users will be able to add, edit, delete, or mark to do items as complete.  This application will leverage the .NET Web API as the backend of the application.
        </p>
        </div>
      </article>
    </section>
  )
}