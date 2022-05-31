import {React, useState, useEffect} from 'react'
import { useNavigate } from 'react-router'
import userService from '../../Services/userService'


export default function SignupForm({setAuthId, token}) {

    let navigation = useNavigate()
    const [accountInfo, setAccountInfo] = useState({
        Name: "",
        Email: "",
        MatchingEmail: "",
        Password: "",
        MatchingPassword: "",
    })
    
    
    

    const createAccount = () => {

        userService.postRegistrationForm(accountInfo)
            .then(() => {
                alert("Kontot skapades, var vänligen logga in")
                navigation('/login')
            })
            .catch(
                function(error){
                    if(error.response){
                        alert(error.response.data)
                    }
            })
        
    }
    if(token){
        navigation("/")
    }

    return (
        
        <div class='d-flex align-items-center justify-content-center' style={{ height: "75vh" }}>
            <div className='row card'>
                <form className='card-body'>


                    <div className="mb-3">
                        <label className="form-label">
                                Användarnamn
                            </label>
                        <input type="text" className="form-control" 
                            onChange={e => setAccountInfo({...accountInfo, Name: e.target.value})}/>
                    </div>


                    <div className="mb-3">
                        <label className="form-label">
                            Email address
                            </label>
                        <input type="Email" className="form-control" 
                            onChange={e => setAccountInfo({ ...accountInfo, Email: e.target.value })}/>
                    </div>
                    
                    <div className="mb-3">
                        <label className="form-label">
                            Bekräfta Email address
                            </label>
                        <input type="Email" className="form-control" 
                            onChange={e => setAccountInfo({ ...accountInfo, matchingEmail: e.target.value })}
                        />
                    </div>


                    <div className="mb-3">
                        <label className="form-label">
                            Lösenord
                            </label>
                        <input type="Password" className="form-control" 
                            onChange={e => setAccountInfo({ ...accountInfo, Password: e.target.value })}
                        />
                    </div>
                    
                    <div className="mb-1">
                        <label className="form-label">
                            Confirm Lösenord
                            </label>
                        <input type="Password" className="form-control" 
                            onChange={e => setAccountInfo({ ...accountInfo, MatchingPassword: e.target.value })}
                        />
                    </div>
                </form>
                
                <div className='d-flex justify-content-center'>
                    <button type="button" className='btn btn-primary mb-2' onClick={() => createAccount()}>
                        Skapa Konto
                        </button>
                </div>
            </div>
        </div>
    )
}
