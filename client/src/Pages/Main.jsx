import React, { useContext, useEffect } from 'react'
import { AuthContextProvider, UserAuth } from '../Context/AuthContext'
import { Button, Form, Nav } from 'react-bootstrap'
import { CiPaperplane } from "react-icons/ci"
import { BsPower } from "react-icons/bs"
import { Timestamp, addDoc, collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where, onSnapshot, arrayUnion } from 'firebase/firestore'
import { usernameFromSignUp, usersCollectionRef } from './SignUp'
import { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { updateProfile } from 'firebase/auth'
import { db } from "../firebase"
import { ChatContext } from '../Context/ChatContext'
import Messages from '../Components/Messages'
import { v4 as uuid } from "uuid"

export const UNIVERSALPHOTOID = "defaultprofilepic.jpeg"
export const chatsCollectionRef = collection(db, "chats")

function Main() {

  const { user, logout } = UserAuth()
  const { dispatch, data } = useContext(ChatContext)
  const [buttonText, setButtonText] = useState("Logout")
  const navigate = useNavigate()
  var dbUsers = []
  var userdata = []
  const [username, setUsername] = useState("")
  const [users, setUsers] = useState({})
  const [err, setErr] = useState(false)
  const [chats, setChats] = useState()
  const [messages, setMessages] = useState([])
  const [text, setText] = useState()
  const showInfo = () => {
    console.log(user)
  }

  useEffect(() => {
    const getUsers = async () => {
      if (!user.displayName) {
        console.log(usernameFromSignUp)
        updateProfile(user, { displayName: usernameFromSignUp })
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
        setDoc(doc(db, "users", user.uid), { email: user.email, username: !user.displayName ? usernameFromSignUp : user.displayName, uid: user.uid, photoURL: !user.photoURL ? UNIVERSALPHOTOID : user.photoURL })
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

  const handleSelect = async () => {
    const combinedID = user.uid > users.uid ? user.uid + users.uid : users.uid + user.uid

    try {
      const res = await getDoc(doc(db, "chats", combinedID))

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedID), { messages: [] })

        const res = await getDoc(doc(db, "usersChats", user.uid))

        if (!res.exists()) {
          await setDoc(doc(db, "usersChats", user.uid), {})

          await updateDoc(doc(db, "usersChats", user.uid), {
            [combinedID + ".userInfo"]: {
              uid: users.uid,
              displayName: users.username,
              photoURL: users.photoURL
            },
            [combinedID + ".date"]: Timestamp.fromDate(new Date())
          })
        }
      }
    } catch (err) {
      console.log(err.message)
    }

    setUsers("")
    setUsername("")
  }

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "usersChats", user.uid), (doc) => {
        setChats(doc.data())
        console.log(doc.data())
      })

      return () => {
        unsub()
      }
    }
    user.uid && getChats()

  }, [user.uid])

  const handleSelectChatter = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u })
    console.log("success")
  }

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages)
    })

    return () => {
      unSub()
    }
  }, [data.chatId])
  return (
    <div className="main-page" style={{ display: "flex", justifyContent: "flex-start", width: "100%" }}>
      <div className='sideBar'>
        <div style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <p style={{ textAlign: "center" }}>Logged in as: {user.displayName}</p>
          <input placeholder='Search for Users...' onChange={(e) => setUsername(e.target.value)} value={username} onKeyDown={handleKeyDown} style={{ width: "90%", border: "none", backgroundColor: "transparent", borderBottom: "1px solid black" }} />
          <div className='user-window' style={{ padding: "5px", display: "flex", alignItems: "center", justifyContent: "center", margin: "10px" }} onClick={handleSelect}>
            {err && <p>User Not Found. Try Again</p>}
            {users && !err && <img src={users.photoURL} className="avatar-medium" style={{ marginRight: "5px" }} />}
            {users && !err && <p style={{ textAlign: "center", margin: "0" }}>{users.username}</p>}
          </div>
        </div>
        <div>
          <Nav className="flex-column">
            {chats && Object.entries(chats)?.map((chat) => {
              return (
                <div>
                  <div key={chat[0]} style={{ display: "flex" }} onClick={() => handleSelectChatter(chat[1].userInfo)} className='user-chatter'>
                    <img src={chat[1].userInfo.photoURL} className="avatar-medium" />
                    <p style={{ textAlign: "center", margin: "0" }}>{chat[1].userInfo.displayName}</p>
                  </div>
                  <p>{chat[1].lastMessage?.text}</p>
                </div>
              )
            })}
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
      <div className='chat-div' style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "calc(100vh - 50px)", width: "80%", padding: "10px" }}>
        <div className='chat-header'>Chatting With: {data.user?.displayName}</div>
        <div className='chat-main' style={{ height: "calc(100vh - 50px - 24px - 38px)", display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
          {messages.map(message => {
            return (
              <div className={`message ${message.senderId === user.uid && "owner"}`}>
                {message.text}
              </div>
            )
          })}
        </div>
        <div className='chatFooter' style={{ display: "flex", justifyContent: "space-between" }}>
          <Form.Control type="text" placeholder="Type message..." onChange={(e) => setText(e.target.value)} />
          <Button style={{ marginLeft: "10px" }} onClick={async () => {
            console.log("hello")
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: user.uid,
                date: Timestamp.now()
              })
            })

            await updateDoc(doc(db, "usersChats", user.uid), {
              [data.chatId + ".lastMessage"]: {
                text
              },
              [data.chatId + ".date"]: Timestamp.fromDate(new Date())
            })
            await updateDoc(doc(db, "usersChats", data.user.uid), {
              [data.chatId + ".lastMessage"]: {
                text
              },
              [data.chatId + ".date"]: Timestamp.fromDate(new Date())
            })
            setText("")
          }
          }><CiPaperplane /></Button>
        </div>
      </div>
    </div>
  )
}

export default Main