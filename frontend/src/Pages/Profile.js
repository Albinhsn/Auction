
import ProfileInfo from '../Components/ProfileInfo'
import {useState, useEffect, React} from 'react'
import userJSON from '../Users/users.json'
import ChangeProfileInfoForm from '../Components/ChangeProfileInfoForm'
export default function Profile({authId}) {
  
  const [user, setUser] = useState({})
  
  useEffect(() => {
    userJSON.map(u => {
      if(u.Id === authId){
        setUser(u)
      }
    })
  }, [])
  return (
    <>

      <div className='row d-flex align-items-center justify-content-center' style={{height: "85%"}}>
        <div className='col-8'>
          <div className='row justify-content-center'>
            <div className='col-8 bg-light'>              
              <div className='row mt-5'>
                <ProfileInfo user={user}/>

                <ChangeProfileInfoForm user={user}/>
              </div>
            </div>
          </div> 
        </div>
      </div>
    </>
  )
}
