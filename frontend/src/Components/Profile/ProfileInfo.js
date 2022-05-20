import React from 'react'

export default function ProfileInfo({user}) {
    console.log(user)
    console.log("HIHI")
    return (
        <div className='col-5 bg-light'>
            <p className='fw-bold'>
                Användarnamn
            </p>
            <p>
                
                {user.name}
            </p>
            <p className='fw-bold'>
                Email
            </p>
            <p>
                {user.email}
            </p>
        </div>
    )
}
