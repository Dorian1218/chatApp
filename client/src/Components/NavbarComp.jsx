import React, { useState } from 'react'
import { Navbar, Button } from "react-bootstrap"
import {Link} from "react-router-dom"
import { UserAuth } from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom'

function NavbarComp() {

  const navigate = useNavigate()
  const {user, logout} = UserAuth()
  const [buttonText, setButtonText] = useState("Logout")
  const [isDisabled, setIsDisabled] = useState(false)
  const handleLogout = async () => {
    setButtonText("Logging out...")
    setIsDisabled(true)
    setTimeout(() => {
      setButtonText("Logout")
      setIsDisabled(false)
    }, 1000)
    await logout()
    navigate("/")
  }

  return (
    <>
      <Navbar bg="dark" variant="dark" style={{display: "flex", justifyContent: "space-between", padding: "10px", width: "100vw"}}>
          <div className='NavbarLeft'>
            <Link to="/" style={{textDecoration: "none"}}><Navbar.Brand>Chat App</Navbar.Brand></Link>
          </div>
          <div>
            {!user && <Link to="/signup"><Button style={{marginRight: "10px"}}>Sign Up</Button></Link>}
            {!user && <Link to="/login"><Button variant='outline-primary'>Log In</Button></Link>}
            {user && <Button variant='danger' disabled={isDisabled} onClick={handleLogout}>{buttonText}</Button>}
          </div>
      </Navbar>
    </>
  )
}

export default NavbarComp