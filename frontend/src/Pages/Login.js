import React from 'react'
import LoginForm from '../Components/LoginForm'

export default function Login({setAuthId, users}) {
  return (
    <LoginForm setAuthId={setAuthId} users={users}/>
  )
}
