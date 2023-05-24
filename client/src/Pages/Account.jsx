import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { UserAuth } from '../Context/AuthContext'
import { upload } from '../Context/StorageContext'

const Account = () => {

    const {user} = UserAuth()
    const [photoUrl, setPhotoUrl] = useState("defaultprofilepic.jpeg")
    const [photo, setPhoto] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (user.photoURL) {
            setPhotoUrl(user.photoURL)
            console.log(user.photoURL)
        }

        else {
            user.photoURL = photoUrl
            console.log(user.photoURL)
        }
    }, [])

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setPhoto(e.target.files[0])
        }
    }

    const handleClick = () => {
        upload(photo, user, setLoading)
    }

    return (
        <div className="main-page" style={{ display: "flex", justifyContent: "flex-start", width: "100%" }}>
            <div className='sideBar1'>
                <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <img className="avatar" src={user.photoURL} />
                    <div style={{display: "flex", alignItems: "center", justifyContent: "center", width: "100%"}}>
                    <input type="file" style={{width: "68%"}} onChange={handleChange}></input>
                    <button onClick={handleClick}>Set Photo</button>
                    </div>
                </div>
                <div>
                    Hello
                </div>
            </div>
        </div>
    )
}

export default Account