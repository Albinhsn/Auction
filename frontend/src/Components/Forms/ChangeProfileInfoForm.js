
import { React, useState} from 'react'
import userService from '../../Services/userService'
export default function ChangeProfileInfoForm({authId, user, setUser}) {
    

    

    const [formInput, setFormInput] = useState({
        email: "",
        matchingEmail: "",
        password: "",
        matchingPassword: ""
    })

    const changePassword = () => {
        userService.changePassword(authId, formInput.password, formInput.matchingPassword).then(response=>{
            console.log(response)
        }).catch(function (error) {
            console.log(error)
        })
    }

    

    const emptyForms = (type) => {
        document.querySelector(`#${type}`).value = ""
        document.querySelector(`#confirm-${type}`).value = ""
    }
    const handleWrongInput = (type) => {
        alert("Tom/Fel inmatning")
        
    }


    const changeEmail = () => {
        userService.changeEmail(authId, formInput.password, formInput.matchingPassword).then(response => {
            console.log(response)
        }).catch(function(error){
            console.log(error)
        })
    }

    return (
        <div className='col-7 bg-light'>
            <div className="mb-3 row">
                <label className="col-sm-4 col-form-label">
                    Email
                </label>
                <div className="col-sm-7">
                    <input type="email" className='form-control' id="email" 
                        onChange={e => setFormInput({...formInput, email: e.target.value})}
                    />
                </div>
            </div>
            <div className="mb-3 row">
                <label className="col-sm-4 col-form-label">
                    Bekräfta Email
                </label>
                <div className="col-sm-7">
                    <input type="email" className="form-control" id="confirm-email" 
                        onChange={e => setFormInput({ ...formInput, matchingEmail: e.target.value })}
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
                    Lösenord
                </label>
                <div className="col-sm-7">
                    <input type="password" className='form-control' id="password" 
                        onChange={e => setFormInput({ ...formInput, password: e.target.value })}
                    />
                </div>
                
            </div>
            <div className="mb-3 row">
                <label className="col-sm-4 col-form-label">
                    Bekräfta Lösenord
                </label>
                <div className="col-sm-7">
                    <input type="password" className="form-control" id="confirm-password" 
                        onChange={e => setFormInput({ ...formInput, matchingPassword: e.target.value })}
                    />
                </div>
            </div>
            <hr />
            <div className='d-flex justify-content-center'>
                <button type="button" className='btn btn-primary' onClick={() => changePassword()}>
                    Byt Lösenord
                </button>
            </div>
        </div>
    )
}

