import {React, useState, useEffect} from 'react'
import { useNavigate } from 'react-router'
export default function SignupForm({setAuthId, authId, setUsers, users}) {

    
    const [accountInfo, setAccountInfo] = useState({
        Username: "",
        Email: "",
        ConfirmEmail: "",
        Password: "",
        ConfirmPassword: "",
        Id: users.length > 1 ? users[users.length - 1].Id + 1 : 1
    })
    
    
    const navigate = useNavigate()

    const createAccount = () => {
        
        //Check if empty input
        if (accountInfo.Username === "" || accountInfo.Email === "" || accountInfo.ConfirmEmail === "", accountInfo.Password === "", accountInfo.ConfirmPassword === ""){
            alert("Ett fält är tomt, var god och mata in all nödvändig information")
            return
        }

        //Check if correct email
        if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(accountInfo.Email)){
            alert("Var god och mata in en korrekt email adress")
            return
        }

        //Check if both emails correspond
        if (accountInfo.Email != accountInfo.ConfirmEmail){
            alert("Email adresserna stämmer inte överens")
            return
        }
        
        //Check whether username or email already exists
        let flag = false
        users.map(user => {
            if(accountInfo.Username == user.Username) {
                alert("Användarnamnet är upptaget, var vänlig välj ett nytt")
                flag = true
            }
            if(accountInfo.Email === user.Email){
                alert("Email adressen är upptagen, var vänlig välj en ny")
                flag = true
            }
        })
        if(flag) return
        setUsers([...users, accountInfo])
        setAuthId(accountInfo.Id)
    }
    useEffect(() =>{
        if(authId){
            navigate("/")
        }
    }, )

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
