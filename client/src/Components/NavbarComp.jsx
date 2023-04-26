import React from 'react'
import { Navbar, Button } from "react-bootstrap"
import {Link} from "react-router-dom"

function NavbarComp() {

  return (
    <>
      <Navbar bg="dark" variant="dark" style={{display: "flex", justifyContent: "space-between", padding: "10px"}}>
          <div className='NavbarLeft'>
            <Link to="/" style={{textDecoration: "none"}}><Navbar.Brand>Chat App</Navbar.Brand></Link>
          </div>
          <div>
            <Link to="/signup"><Button style={{marginRight: "10px"}}>Sign Up</Button></Link>
            <Link to="/login"><Button variant='outline-primary'>Log In</Button></Link>
          </div>
      </Navbar>
    </>
  )
}

export default NavbarComp