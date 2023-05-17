import React from 'react'
import { Form, Button, Container } from "react-bootstrap"
import { UserAuth } from '../Context/AuthContext'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import { db } from "../firebase"
import { ref, set } from "firebase/database"
import {collection, addDoc} from "firebase/firestore"

export const usersCollectionRef = collection(db, "users")

const MoreInfo = () => {

    const [username, setUsername] = useState("")
    const navigate = useNavigate()
    const {user} = UserAuth()
    const createFullAcc = async () => {
        if (username === "") {
            return
        }
        await addDoc(usersCollectionRef, {email: user.email, username: username})
        console.log(usersCollectionRef)
        navigate("/")
    }

    return (
        <div className='signup-container'>
            <Container style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Label>Create a username for your account</Form.Label>
                        <Form.Control type="text" placeholder="Username" value={username} onChange={(e) => { setUsername(e.target.value) }} />
                    </Form.Group>
                    <Button onClick={createFullAcc}>Submit</Button>
                </Form>
            </Container>
        </div>
    )
}

export default MoreInfo