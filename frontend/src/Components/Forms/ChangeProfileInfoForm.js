
import { React, useState} from 'react'
import authService from '../../Services/authService'
import userService from '../../Services/userService'
import { useNavigate } from 'react-router'
export default function ChangeProfileInfoForm({token, setToken, setUser}) {
    

    const navigation = useNavigate()

    const [formInput, setFormInput] = useState({
        token: token,
        newEmail: "",
        matchingNewEmail: "",
        newPassword: "",
        matchingNewPassword: "",
        oldPasswordEmail: "",
        oldPasswordPassword: ""
    })

    const changePassword = () => {
        
        authService.changePassword(formInput).then(response=>{
            localStorage.removeItem("access_token")
            setToken()            
            alert(response.data)
            navigation("/Login")
            
        }).catch(function (error) {
            if(error.response){
                alert(error.response.data)
            }
            
        })
        emptyForms("password")
    }

    

    const emptyForms = (type) => {
        document.querySelector(`#${type}`).value = ""
        document.querySelector(`#matching-${type}`).value = ""
    }

    const changeEmail = () => {
       
        userService.changeEmail(token, formInput.newEmail, formInput.matchingNewEmail).then(response => {
            setUser(response.data)
            
            localStorage.removeItem("access_token")
            setToken()
            alert("Emailen byttes var god logga in igen")
            navigation("/login")
        }).catch(function(error){
            if(error.response){
                
                alert(error.response.data.message)
            }
        })
        emptyForms("email")
    }

    return (
        <div className='col-7 bg-light'>
            <div className="mb-3 row">
                <label className="col-sm-4 col-form-label">
                    Email
                </label>
                <div className="col-sm-7">
                    <input type="email" className='form-control' id="email" 
                        onChange={e => setFormInput({...formInput, newEmail: e.target.value})}
                    />
                </div>
            </div>
            <div className="mb-3 row">
                <label className="col-sm-4 col-form-label">
                    Bekr??fta Email
                </label>
                <div className="col-sm-7">
                    <input type="email" className="form-control" id="matching-email" 
                        onChange={e => setFormInput({ ...formInput, matchingNewEmail: e.target.value })}
                    />
                </div>
            </div>
            <div className="mb-3 row">
                <label className="col-sm-4 col-form-label">
                    Nuvarande l??senord
                </label>
                <div className="col-sm-7">
                    <input type="password" className="form-control" id="matching-email"
                        onChange={e => setFormInput({ ...formInput, oldPasswordEmail: e.target.value })}
                    />
                </div>
            </div>
            <div className='mb-3 row'>
                <div className='d-flex justify-content-center'>
                    <button type="button" className='btn btn-primary' onClick={() => changeEmail()}>
                        Byt Email
                    </button>
                </div>
            </div>
            <hr />
            <div className="mb-3 row">
                <label className="col-sm-4 col-form-label">
                    Nytt L??senord
                </label>
                <div className="col-sm-7">
                    <input type="password" className='form-control' id="password" 
                        onChange={e => setFormInput({ ...formInput, newPassword: e.target.value })}
                    />
                </div>
                
            </div>
            <div className="mb-3 row">
                <label className="col-sm-4 col-form-label">
                    Bekr??fta nytt L??senord
                </label>
                <div className="col-sm-7">
                    <input type="password" className="form-control" id="matching-password" 
                        onChange={e => setFormInput({ ...formInput, matchingNewPassword: e.target.value })}
                    />
                </div>
            </div>
            <div className="mb-3 row">
                <label className="col-sm-4 col-form-label">
                    Nuvarande l??senord
                </label>
                <div className="col-sm-7">
                    <input type="password" className="form-control" id="matching-email"
                        onChange={e => setFormInput({ ...formInput, oldPasswordPassword: e.target.value })}
                    />
                </div>
            </div>
            <hr />            
            <div className='d-flex justify-content-center'>
                <button type="button" className='btn btn-primary' onClick={() => changePassword()}>
                    Byt L??senord
                </button>
            </div>
        </div>
    )
}

