import React from 'react'
import LoginForm from '../Components/LoginForm'

export default function Login({setAuthId, users, setUsers}) {
  return (
    <LoginForm setAuthId={setAuthId} users={users} setUsers={setUsers}/>
  )
}
