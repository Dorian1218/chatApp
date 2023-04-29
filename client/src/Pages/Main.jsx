import React from 'react'
import { UserAuth } from '../Context/AuthContext'
import { Button, Form } from 'react-bootstrap'
import { CiPaperplane } from "react-icons/ci"

function Main() {

  const { user } = UserAuth()

  return (
    <div className="main-page" style={{ display: "flex", justifyContent: "flex-start", width: "100%" }}>
      {/* <h2>Main</h2>
        {user.email} */}
      <div className='sideBar'>
        <div>
          <h2>Side Bar</h2>
        </div>
        <div>
          <p>A</p>
          <p>A</p>
          <p>A</p>
          <p>A</p>
          <p>A</p>
          <p>A</p>
          <p>A</p>
        </div>
        <div>
          {user.email}
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