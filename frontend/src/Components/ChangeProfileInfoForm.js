
import { React, useState} from 'react'
export default function ChangeProfileInfoForm({authId, users, setUsers}) {
    

    

    const [formInput, setFormInput] = useState({
        Email: "",
        ConfirmEmail: "",
        Password: "",
        ConfirmPassword: ""
    })

    const savePassword = () => {
        if (formInput.Password === "" || formInput.ConfirmPassword === "" || formInput.ConfirmPassword != formInput.Password){
            handleWrongInput()
            emptyForms("password")
            return
        }
        for(let i = 0; i<users.length; i++){
            let user = users[i]
            user.Password = formInput.Password
            users[i] = user
            updateUsers(user, "password")
        }
        
    }

    const updateUsers = (u, type) => {
        setUsers(u)
        emptyForms(type)
    }

    const emptyForms = (type) => {
        document.querySelector(`#${type}`).value = ""
        document.querySelector(`#confirm-${type}`).value = ""
    }
    const handleWrongInput = (type) => {
        alert("Tom/Fel inmatning")
        
    }


    const saveEmail = () => {
        if (formInput.Email === "" || formInput.ConfirmEmail === "" || formInput.ConfirmEmail != formInput.Email){
            handleWrongInput()
            emptyForms("email")
            return
        }
        for(let i = 0; i<users.length; i++){
            if(authId === users[i].Id){
                let user = users[i]
                user.Email = formInput.Email
                users[i] =  user
                updateUsers(users, "email")
                console.log(users)
            }
        }
    }

    return (
        <div className='col-7 bg-light'>
            <div className="mb-3 row">
                <label className="col-sm-4 col-form-label">
                    Email
                </label>
                <div className="col-sm-7">
                    <input type="email" className='form-control' id="email" 
                        onChange={e => setFormInput({...formInput, Email: e.target.value})}
                    />
                </div>
            </div>
            <div className="mb-3 row">
                <label className="col-sm-4 col-form-label">
                    Bekräfta Email
                </label>
                <div className="col-sm-7">
                    <input type="email" className="form-control" id="confirm-email" 
                        onChange={e => setFormInput({ ...formInput, ConfirmEmail: e.target.value })}
                    />
                </div>
            </div>
            <div className='mb-3 row'>
                <div className='d-flex justify-content-center'>
                    <button type="button" className='btn btn-primary' onClick={() => saveEmail()}>
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
                        onChange={e => setFormInput({ ...formInput, Password: e.target.value })}
                    />
                </div>
                
            </div>
            <div className="mb-3 row">
                <label className="col-sm-4 col-form-label">
                    Bekräfta Lösenord
                </label>
                <div className="col-sm-7">
                    <input type="password" className="form-control" id="confirm-password" 
                        onChange={e => setFormInput({ ...formInput, ConfirmPassword: e.target.value })}
                    />
                </div>
            </div>
            <hr />
            <div className='d-flex justify-content-center'>
                <button type="button" className='btn btn-primary' onClick={() => savePassword()}>
                    Byt Lösenord
                </button>
            </div>
        </div>
    )
}

