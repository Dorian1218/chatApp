import React, { useEffect } from 'react'
import { UserAuth } from '../Context/AuthContext'
import { Button, Form, Nav } from 'react-bootstrap'
import { CiPaperplane } from "react-icons/ci"
import { BsPower } from "react-icons/bs"
import { addDoc, getDocs } from 'firebase/firestore'
import { usernameFromSignUp, usersCollectionRef } from './SignUp'
import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { updateProfile } from 'firebase/auth'

function Main() {

  const { user, logout } = UserAuth()
  const [buttonText, setButtonText] = useState("Logout")
  const navigate = useNavigate()
  var dbUsers = []
  var userdata = []
  var [username, setUsername] = useState()

  useEffect(() => {
    const getUsers = async () => {
      if (!user.displayName) {
        updateProfile(user, { displayName: usernameFromSignUp })
      }
      const data = await getDocs(usersCollectionRef)
      data.forEach((doc) => {
        dbUsers.push(doc.data())
      })
      dbUsers.map((users) => {
        if (users.email === user.email) {
          userdata.push(users.email, users.username)
        }

        return
      })
      var usersEmails = []
      dbUsers.map((users) => {
        usersEmails.push(users.email)
      })
      if (!usersEmails.includes(user.email)) {
        addDoc(usersCollectionRef, { email: user.email, username: user.displayName, id: user.uid })
      }
      console.log(dbUsers)
      setUsername(userdata[1])
    }

    setTimeout(() => {
      getUsers()
    }, 1000)
  }, [])

  const handleLogout = async () => {
    setButtonText("Logging out...")
    setTimeout(() => {
      setButtonText("Logout")
    }, 1000)
    await logout()
    navigate("/")
  }

  return (
    <div className="main-page" style={{ display: "flex", justifyContent: "flex-start", width: "100%" }}>
      <div className='sideBar'>
        <div>
          {/* <img className="avatar" src='defaultprofilepic.jpeg'/> */}
          <p>Logged in as: {user.displayName}</p>
        </div>
        <div>
          <Nav className="flex-column">
            <p>Account</p>
          </Nav>
        </div>
        <div>
          <p style={{ fontSize: "1em" }} className="user-email">
            <button style={{ background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center" }} onClick={handleLogout}>
              <BsPower style={{ marginRight: "10px" }} />
              {buttonText}
            </button>
          </p>
        </div>
      </div>
      <div className='chat' style={{ width: "80%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "10px" }}>
        <div>
          <h2>Chat</h2>
        </div>
        <div className='chatFooter' style={{ display: "flex", justifyContent: "space-between" }}>
          <Form.Control type="text" placeholder="Type message..." />
          <Button style={{ marginLeft: "10px" }}><CiPaperplane /></Button>
        </div>
      </div>
    </div>
  )
}

export default Main