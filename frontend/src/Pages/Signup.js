import React from 'react'
import SignupForm from '../Components/SignupForm'
export default function Signup({setAuthId, authId}) {
  return (
      <SignupForm setAuthId={setAuthId} authId={authId}/>
  )
}
