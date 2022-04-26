import {React, useState, useEffect} from 'react'
import { useNavigate } from 'react-router'
import userService from '../../Services/userService'


export default function SignupForm({setAuthId, token}) {

    let navigation = useNavigate()
    const [accountInfo, setAccountInfo] = useState({
        username: "",
        email: "",
        matchingEmail: "",
        password: "",
        matchingPassword: "",
    })
    
    
    

    const createAccount = () => {

        userService.postRegistrationForm(accountInfo)
            .then(response => {
                alert("Kontot skapades, var vänligen logga in")
                navigation('/login')
            })
            .catch(
                function(error){
                    if(error.response){
                        alert(error.response.data.message)
                    }
            })
        
    }


    return (
        
        <div className='d-flex align-items-center justify-content-center' style={{ height: "75vh" }}>
            <div className='row card'>
                <form className='card-body'>


                    <div className="mb-3">
                        <label className="form-label">
                                Användarnamn
                            </label>
                        <input type="text" className="form-control" 
                            onChange={e => setAccountInfo({...accountInfo, username: e.target.value})}/>
                    </div>


                    <div className="mb-3">
                        <label className="form-label">
                            Email address
                            </label>
                        <input type="email" className="form-control" 
                            onChange={e => setAccountInfo({ ...accountInfo, email: e.target.value })}/>
                    </div>
                    
                    <div className="mb-3">
                        <label className="form-label">
                            Bekräfta Email address
                            </label>
                        <input type="email" className="form-control" 
                            onChange={e => setAccountInfo({ ...accountInfo, matchingEmail: e.target.value })}
                        />
                    </div>


                    <div className="mb-3">
                        <label className="form-label">
                            Lösenord
                            </label>
                        <input type="password" className="form-control" 
                            onChange={e => setAccountInfo({ ...accountInfo, password: e.target.value })}
                        />
                    </div>
                    
                    <div className="mb-3">
                        <label className="form-label">
                            Confirm Lösenord
                            </label>
                        <input type="password" className="form-control" 
                            onChange={e => setAccountInfo({ ...accountInfo, matchingPassword: e.target.value })}
                        />
                    </div>
                </form>
                
                <div className='d-flex justify-content-center'>
                    <button type="button" className='btn btn-primary' onClick={() => createAccount()}>
                        Skapa Konto
                        </button>
                </div>
            </div>
        </div>
    )
}
