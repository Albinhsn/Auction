
import ProfileInfo from '../Components/ProfileInfo'
import {useState, useEffect, React} from 'react'

import ChangeProfileInfoForm from '../Components/ChangeProfileInfoForm'
export default function Profile({authId, users, setUsers}) {
  
  const [user, setUser] = useState({})
  useEffect(() => {
    users.map(u => {
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

                <ChangeProfileInfoForm authId={authId} users={users} setUsers={setUsers}/>
              </div>
            </div>
          </div> 
        </div>
      </div>
    </>
  )
}
