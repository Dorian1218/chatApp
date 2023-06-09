import React, { useEffect } from 'react'
import { UserAuth } from '../Context/AuthContext'
import { Button, Form, Nav } from 'react-bootstrap'
import { CiPaperplane } from "react-icons/ci"
import { BsPower } from "react-icons/bs"
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { usernameFromSignUp, usersCollectionRef } from './SignUp'
import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { updateProfile } from 'firebase/auth'
import { db } from "../firebase"

export const UNIVERSALPHOTOID = "defaultprofilepic.jpeg"

function Main() {

  const { user, logout } = UserAuth()
  const [buttonText, setButtonText] = useState("Logout")
  const navigate = useNavigate()
  var dbUsers = []
  var userdata = []
  const [username, setUsername] = useState()
  const [users, setUsers] = useState()
  const [err, setErr] = useState()
  const showInfo = () => {
    console.log(user)
  }

  useEffect(() => {
    const getUsers = async () => {
      if (!user.displayName) {
        updateProfile(user, { displayName: usernameFromSignUp })
        console.log(user.displayName)
      }

      if (!user.photoURL) {
        updateProfile(user, { photoURL: UNIVERSALPHOTOID })
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
        addDoc(usersCollectionRef, { email: user.email, username: user.displayName, id: user.uid, photoURL: user.photoURL })
      }
      console.log(dbUsers)
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

  const handleSearch = async () => {
    const q = query(collection(db, "users"), where("username", "==", username))

    try {
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data())
        setUsers(doc.data())
        console.log(users)
      })
    } catch (e) {
      setErr(true)
      console.log(e.message)
    }
  }

  const handleKeyDown = (e) => {
    e.code === "Enter" && handleSearch()
  }

  return (
    <div className="main-page" style={{ display: "flex", justifyContent: "flex-start", width: "100%" }}>
      <div className='sideBar'>
        <div style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          {/* <img className="avatar" src='defaultprofilepic.jpeg'/> */}
          <p style={{ textAlign: "center" }}>Logged in as: {user.displayName}</p>
          <input placeholder='Search for Users...' onChange={(e) => setUsername(e.target.value)} onKeyDown={handleKeyDown} style={{ width: "90%", border: "none", backgroundColor: "transparent", borderBottom: "1px solid black" }} />
          <span style={{padding: "5px", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid black", margin: "5px"}} onClick={{handleSelect}}>
            {err && <p>User Not Found. Try Again</p>}
            {users && !err && <img src={users.photoURL} className="avatar-medium" style={{marginRight: "5px"}}/>}
            {users && !err && <p style={{textAlign: "center", margin: "0"}}>{users.username}</p>}
          </span>
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
            <button onClick={showInfo}>Press</button>
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