import {useState, useEffect, React} from 'react'
import ChangeProfileInfoForm from '../Components/Forms/ChangeProfileInfoForm'
import userService from '../Services/userService'

export default function Profile({authId}) {
  
  const [user, setUser] = useState()

  useEffect(() => {
    userService.getUserFromObjectId(authId).then(response => {
      setUser(response.data)
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

                <ChangeProfileInfoForm authId={authId} user={user} setUser={setUser}/>
              </div>
            </div>
          </div> 
        </div>
      </div>
    </>
  )
}
