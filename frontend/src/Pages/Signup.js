import React from 'react'
import SignupForm from '../Components/Forms/SignupForm'
export default function Signup({setAuthId, authId, setUsers, users}) {
  return (
      <SignupForm setAuthId={setAuthId} authId={authId} setUsers={setUsers} users={users}/>
  )
}
