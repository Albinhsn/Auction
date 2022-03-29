import {React, useState, useEffect} from 'react'
import { useNavigate } from 'react-router'
export default function SignupForm({setAuthId, authId}) {

    
    const [accountInfo, setAccountInfo] = useState({
        Username: "",
        Email: "",
        ConfirmEmail: "",
        Password: "",
        ConfirmPassword: "",
        Id: -1
    })
    
    
    const navigate = useNavigate()

    const createAccount = () => {
        

        
        


        
        setAuthId()
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
                            onChange={e => setAccountInfo({...accountInfo, Username: e.target.value})}/>
                    </div>


                    <div className="mb-3">
                        <label className="form-label">
                            Email address
                            </label>
                        <input type="email" className="form-control" 
                            onChange={e => setAccountInfo({ ...accountInfo, Email: e.target.value })}/>
                    </div>
                    
                    <div className="mb-3">
                        <label className="form-label">
                            Bekräfta Email address
                            </label>
                        <input type="email" className="form-control" 
                            onChange={e => setAccountInfo({ ...accountInfo, ConfirmEmail: e.target.value })}
                        />
                    </div>


                    <div className="mb-3">
                        <label className="form-label">
                            Lösenord
                            </label>
                        <input type="password" className="form-control" 
                            onChange={e => setAccountInfo({ ...accountInfo, Password: e.target.value })}
                        />
                    </div>
                    
                    <div className="mb-3">
                        <label className="form-label">
                            Confirm Lösenord
                            </label>
                        <input type="password" className="form-control" 
                            onChange={e => setAccountInfo({ ...accountInfo, ConfirmPassword: e.target.value })}
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
