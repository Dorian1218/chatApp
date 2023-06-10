import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { CiPaperplane } from "react-icons/ci"
import { UserAuth } from '../Context/AuthContext'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'

const { user } = UserAuth()

const Chat = () => {
    const [chats, setChats] = useState()

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "usersChats", user.uid), (doc) => {
                setChats(doc.data())
            })

            return () => {
                unsub()
            }
        }
        user.uid && getChats()

    }, [user.uid])

    console.log(Object.entries(chats))
    return (
        <div className='chat-div' style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "calc(100vh - 50px)", width: "80%" }}>
            <div className='chat-header'>Chat</div>
            <div className='chat-main' style={{ height: "calc(100vh - 50px - 24px - 38px)" }}></div>
            <div className='chatFooter' style={{ display: "flex", justifyContent: "space-between" }}>
                <Form.Control type="text" placeholder="Type message..." />
                <Button style={{ marginLeft: "10px" }}><CiPaperplane /></Button>
            </div>
        </div>
    )
}

export default Chat