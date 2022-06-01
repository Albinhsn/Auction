import {useState, useEffect, React} from 'react'
import { useNavigate } from 'react-router'
import ChangeProfileInfoForm from '../Components/Forms/ChangeProfileInfoForm'
import userService from '../Services/userService'
import ProfileInfo from '../Components/Profile/ProfileInfo'
export default function Profile({token, setToken}) {
  
  const [user, setUser] = useState()
  const navigate = useNavigate()  
  useEffect(() => {
    if(!token){
      navigate("/login")
    }else{
      userService.getUserFromToken(token).then(response => {        
        setUser(response.data)
      })
    }
    
      

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
                  <ProfileInfo user={user}/>
                </div>

                <ChangeProfileInfoForm token={token} setToken={setToken} setUser={setUser}/>
              </div>
            </div>
          </div> 
        </div>
      </div>
    </>
  )
}
