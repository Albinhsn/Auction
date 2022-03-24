import React from 'react'

export default function ProfileInfo({user}) {
    console.log(user)
    return (
        <div className='col-5 bg-light'>
            <p className='fw-bold'>
                Användarnamn
            </p>
            <p>
                {user.Name}
            </p>
            <p className='fw-bold'>
                Email
            </p>
            <p>
                {user.Email}
            </p>
        </div>
    )
}
