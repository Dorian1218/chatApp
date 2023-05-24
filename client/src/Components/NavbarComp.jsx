import React, { useState } from 'react'
import { Navbar, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { UserAuth } from '../Context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { GiHamburgerMenu } from "react-icons/gi"
import NavbarDrop from './NavbarDrop'
import { useEffect } from 'react'

function NavbarComp() {

  const navigate = useNavigate()
  const { user, logout } = UserAuth()
  const [buttonText, setButtonText] = useState("Logout")
  const [isDisabled, setIsDisabled] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const [photoUrl, setPhotoUrl] = useState("defaultprofilepic.jpeg")
  const handleLogout = async () => {
    setButtonText("Logging out...")
    setIsDisabled(true)
    setTimeout(() => {
      setButtonText("Logout")
      setIsDisabled(false)
      setShowDropdown(false)
    }, 1000)
    await logout()
    navigate("/")
  }

  const dropdown = () => {
    setShowDropdown(!showDropdown)
  }

  const navSignin = () => {
    navigate("/signup")
    setShowDropdown(false)
  }

  const navLogin = () => {
    navigate("/login")
    setShowDropdown(false)
  }

  useEffect(() => {
    setPhotoUrl(user.photoURL)
  }, [])


  return (
    <>
      <Navbar bg="dark" variant="dark" style={{ display: "flex", justifyContent: "space-between", padding: "10px", width: "100vw" }}>
        <div className='NavbarLeft'>
          <Link to="/" style={{ textDecoration: "none" }}><Navbar.Brand>Chat App</Navbar.Brand></Link>
        </div>
        <div className='NavbarRight'>
          {!user && <Link to="/signup"><Button style={{ marginRight: "10px" }}>Sign Up</Button></Link>}
          {!user && <Link to="/login"><Button variant='outline-primary'>Log In</Button></Link>}
          {user && <Link to="/account"><img className='avatar-small' src={user.photoURL} /></Link>}
        </div>
        <div className='NavbarRightAlt'>
          <GiHamburgerMenu fill='#fff' onClick={dropdown} />
        </div>
      </Navbar>
      <NavbarDrop showDropdown={showDropdown} navSignin={navSignin} navLogin={navLogin} handleLogout={handleLogout} isDisabled={isDisabled} buttonText={buttonText} />
    </>
  )
}

export default NavbarComp