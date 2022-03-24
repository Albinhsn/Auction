import React from 'react'
import SignupForm from '../Components/SignupForm'
export default function Signup({setAuthId, authId, setUsers, users}) {
  return (
      <SignupForm setAuthId={setAuthId} authId={authId} setUsers={setUsers} users={users}/>
  )
}
