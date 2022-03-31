import React from 'react'
import SignupForm from '../Components/Forms/SignupForm'
export default function Signup({setAuthId, authId}) {
  return (
      <SignupForm setAuthId={setAuthId} authId={authId}/>
  )
}
