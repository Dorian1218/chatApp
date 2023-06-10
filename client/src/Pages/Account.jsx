import { updateProfile } from 'firebase/auth'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { UserAuth } from '../Context/AuthContext'
import { upload } from '../Context/StorageContext'
import { collection } from 'firebase/firestore'
import { db } from '../firebase'

const Account = () => {

    const { user } = UserAuth()
    const [photoUrl, setPhotoUrl] = useState("defaultprofilepic.jpeg")
    const [photo, setPhoto] = useState(null)
    const [loading, setLoading] = useState(false)
    const showInfo = () => {
        console.log(user)
    }

    useEffect(() => {
        if (!user.photoURL) {
            updateProfile(user, { photoURL: photoUrl })
        }

        else {
            setPhotoUrl(user.photoURL)
            console.log(photoUrl)
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
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <img className="avatar" src={user.photoURL} />
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", margin: "10px" }}>
                        <button className='choosePhoto'>Choose Photo</button>
                        <input type="file" style={{ width: "68%" }} onChange={handleChange} className='fileChoose'></input>
                    </div>
                    <div>
                        <button onClick={handleClick}>Set Photo</button>
                    </div>
                </div>
                <div>
                    Hello
                    <button onClick={showInfo}>User</button>
                </div>
            </div>
        </div>
    )
}

export default Account