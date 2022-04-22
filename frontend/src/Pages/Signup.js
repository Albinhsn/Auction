import React from 'react'
import SignupForm from '../Components/Forms/SignupForm'
export default function Signup({setToken, token}) {
  return (
      <SignupForm setToken={setToken} token={token}/>
  )
}
