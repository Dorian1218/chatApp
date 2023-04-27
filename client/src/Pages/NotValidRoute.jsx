import React from 'react'
import { Link } from 'react-router-dom'

function NotValidRoute() {
  return (
    <div>
        <h2>Uh Oh</h2>
        <p>The page you are looking for either does not exist, or you do not have access to it</p>
        <p>Click the link to return to the home page <Link to="/">Home</Link></p>
    </div>
  )
}

export default NotValidRoute