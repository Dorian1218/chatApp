import React from 'react'
import { UserAuth } from '../Context/AuthContext'

function Main() {

    const {user} = UserAuth()

  return (
    <div>
        <h2>Main</h2>
        {user.email}
    </div>
  )
}

export default Main