import React from 'react'
import { GoogleButton } from "react-google-button"
import { Card, Form, Button, Container } from "react-bootstrap"
import { UserAuth } from '../Context/AuthContext'
import { useState } from 'react'
import { Link } from 'react-router-dom'

function SignUp() {

  const [isDiabled, setIsDisabled] = useState(false)
  const [buttonText, setButtonText] = useState("Signup")
  const { signInWithGoogle } = UserAuth()
  const handleGoogleLogin = async () => {
    await signInWithGoogle()
  }

  const handleLogin = () => {
    setIsDisabled(true)
    setButtonText("Loading...")
    console.log("signed in")
    setTimeout(() => {
      setIsDisabled(false)
      setButtonText("Sign up")
    }, 1000)
  }

  return (
    <div>
      <Container style={{ width: "450px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <h2>Sign up</h2>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
          <GoogleButton style={{ width: "100%" }} onClick={handleGoogleLogin} />
        </div>

        <Form>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Username" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button variant="primary" onClick={handleLogin} disabled={isDiabled}>
            {buttonText}
          </Button>
          <p>Already Have an Account? <Link to="/login">Login</Link></p>
        </Form>
      </Container>
    </div>
  )
}

export default SignUp