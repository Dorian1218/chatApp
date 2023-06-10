import React, {useState} from 'react'
import { GoogleButton } from "react-google-button"
import { Form, Button, Container } from "react-bootstrap"
import { UserAuth } from '../Context/AuthContext'
import { useNavigate } from "react-router-dom"

function Login() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { signInWithGoogle, login } = UserAuth()
    const navigate = useNavigate()
    const handleGoogleLogin = async () => {
        await signInWithGoogle()
        setTimeout(() => {
            navigate("/")
        }, 1000)
    }

    const handleLogin = async () => {
        await login(email, password)
        setTimeout(() => {
            navigate("/")
        }, 1000)
    }

    return (
        <div className='signup-container'>
            <Container style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <h2>Login</h2>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
                    <GoogleButton style={{ width: "100%" }} onClick={handleGoogleLogin} />
                </div>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                    </Form.Group>
                    <Button variant="primary" onClick={handleLogin}>
                        Login
                    </Button>
                </Form>
            </Container>
        </div>
    )
}

export default Login