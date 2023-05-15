import React from 'react'
import { GoogleButton } from "react-google-button"
import { Form, Button, Container } from "react-bootstrap"
import { UserAuth } from '../Context/AuthContext'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import AlertComp from '../Components/AlertComp'
import { db } from "../firebase"
import { ref, set } from "firebase/database"

function SignUp() {

  const [isDiabled, setIsDisabled] = useState(false)
  const [buttonText, setButtonText] = useState("Signup")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [showMsg, setShowMsg] = useState(false)
  const navigate = useNavigate()
  const { signInWithGoogle, createUser } = UserAuth()
  const handleGoogleLogin = async () => {
    await signInWithGoogle()
    setTimeout(() => {
      navigate("/")
    }, 1000)
  }

  const handleLogin = async () => {
    try {
      await createUser(email, password)
      navigate("/")
      setIsDisabled(true)
      setButtonText("Loading...")
      setTimeout(() => {
        setIsDisabled(false)
        setButtonText("Sign up")
      }, 2000)
    } catch (e) {
      console.log(e.message)
      if (password !== confirmPassword) {
        setShowMsg(true)
        setError("Passwords do not match")
        setTimeout(() => {
          setShowMsg(false)
          setError("")
        }, 2000)
        return
      }
      const splitPass = password.split("")
      const allEqual = arr => arr.every(val => val === arr[0]);
      const equalPass = allEqual(splitPass)
      if (password === "" || password.length < 6 || equalPass === true) {
        setShowMsg(true)
        setError("Invalid Password")
        setTimeout(() => {
          setShowMsg(false)
          setError("")
        }, 2000)
      }
      if (email === "" || !email.includes("@")) {
        setShowMsg(true)
        setError("Invalid Email")
        setTimeout(() => {
          setShowMsg(false)
          setError("")
        }, 2000)
        return
      }
      if (e.message === "Firebase: Error (auth/email-already-in-use).") {
        setError("Email is alreaedy in use")
        setShowMsg(true)
        setTimeout(() => {
          setShowMsg(false)
          setError("")
        }, 2000)
        return
      }
    }
  }

  return (
    <div className='signup-container'>
      <Container style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <h2>Sign up</h2>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
          <GoogleButton style={{ width: "100%" }} onClick={handleGoogleLogin} />
        </div>
        <AlertComp message={error} showAlertMsg={showMsg} />
        <Form>
          {/* <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Username" value={username} onChange={(e) => { setUsername(e.target.value) }} />
          </Form.Group> */}

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} />
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