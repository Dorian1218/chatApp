import React from 'react'
import { GoogleButton } from "react-google-button"
import { Card, Form, Button, Container } from "react-bootstrap"
import { UserAuth } from '../Context/AuthContext'

function Login() {

    const {signInWithGoogle} = UserAuth()
    const handleGoogleLogin = async () => {
        await signInWithGoogle()
    }

    return (
        <Container style={{width: "450px", display: "flex", flexDirection: "column", justifyContent: "center"}}>
            <h2>Login</h2>
            <div style={{display: "flex", justifyContent: "center", marginBottom: "10px"}}>
                <GoogleButton style={{width: "100%"}} onClick={handleGoogleLogin}/>
            </div>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"/>
                </Form.Group>
                <Button variant="primary">
                    Login
                </Button>
            </Form>
        </Container>
    )
}

export default Login