import React from 'react'
import { UserAuth } from '../Context/AuthContext'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const NavbarDrop = props => {
    const { user, } = UserAuth()
    if (!props.showDropdown) {
        return null
    }
    return (
        <div style={{ position: "absolute", width: "100vw", marginTop: "5px", display: "flex", justifyContent: "flex-end" }} className='Dropbox-cont'>
            <div style={{ width: "150px", textAlign: "center", backgroundColor: "rgba(255, 255, 255, 0.5)", display: "flex", flexDirection: "column", padding: "5px", borderRadius: "8px"}} className='Dropdown'>
                {!user && <Link to="/signup"><Button style={{ marginBottom: "10px" }} onClick={props.navSignin}>Sign Up</Button></Link>}
                {!user && <Link to="/login"><Button variant='outline-primary' onClick={props.navLogin}>Log In</Button></Link>}
                {user && <Button variant='danger' disabled={props.isDisabled} onClick={props.handleLogout}>{props.buttonText}</Button>}
            </div>
        </div>
    )
}

export default NavbarDrop