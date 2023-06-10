import React, { useContext } from 'react'
import { UserAuth } from '../Context/AuthContext'
import { ChatContext } from '../Context/ChatContext'

const Messages = ({ message }) => {
    const { user } = UserAuth()
    const { data } = useContext(ChatContext)
    return (
        <div className={`message ${message.senderId === user.uid && "owner"}`}>
            {message.text}
        </div>
    )
}

export default Messages