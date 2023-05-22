import React from 'react'
import { Button } from 'react-bootstrap'

const Account = () => {
    return (
        <div className="main-page" style={{ display: "flex", justifyContent: "flex-start", width: "100%" }}>
            <div className='sideBar1'>
                <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    <img className="avatar" src='defaultprofilepic.jpeg' />
                    <div style={{display: "flex", alignItems: "center", justifyContent: "center", width: "100%"}}>
                    <input type="file" style={{width: "68%"}}></input>
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