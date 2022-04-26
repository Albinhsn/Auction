import {useState, useEffect, React} from 'react'
import { useNavigate } from 'react-router'
import ChangeProfileInfoForm from '../Components/Forms/ChangeProfileInfoForm'
import userService from '../Services/userService'

export default function Profile({token}) {
  
  const [user, setUser] = useState()
  const navigate = useNavigate()
  console.log(token)
  useEffect(() => {
    if(!token){
      navigate("/login")
    }
    userService.getUserFromObjectId(token).then(response => {
      setUser(response.data)
      console.log(response)
    })

  }, [])

  if(!user) return <></>
  return (
    <>

      <div className='row d-flex align-items-center justify-content-center' style={{height: "85%"}}>
        <div className='col-8'>
          <div className='row justify-content-center'>
            <div className='col-8 bg-light'>              
              <div className='row mt-5'>
                <div className='col-5 bg-light'>
                  <p className='fw-bold'>
                    Användarnamn
                  </p>
                  <p>
                    {user.username}
                  </p>
                  <p className='fw-bold'>
                    Email
                  </p>
                  <p>
                    {user.email}
                  </p>
                </div>

                <ChangeProfileInfoForm token={token} user={user} setUser={setUser}/>
              </div>
            </div>
          </div> 
        </div>
      </div>
    </>
  )
}
