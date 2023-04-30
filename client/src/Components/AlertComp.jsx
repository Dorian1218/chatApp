import React from 'react'

const AlertComp = props => {
    if (!props.showAlertMsg) {
        return null
    }

    return (
        <p className='alert-msg'>{props.message}</p>
    )
}

export default AlertComp