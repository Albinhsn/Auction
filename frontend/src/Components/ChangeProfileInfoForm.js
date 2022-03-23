
import { React, useState} from 'react'
export default function ChangeProfileInfoForm({user}) {
    

    

    const [formInput, setFormInput] = useState({
        Email: "",
        ConfirmEmail: "",
        Password: "",
        ConfirmPassword: ""
    })

    const saveChanges = () => {
        if (formInput.Email === "" || formInput.ConfirmEmail === "" || formInput.Password === "" || formInput.ConfirmPassword === "" ){
            alert("Tom inmatning")
            return
        }
        if(formInput.Email != formInput.ConfirmEmail || formInput.Password != formInput.ConfirmPassword ){
            alert("Inmatningen stämmer inte överens")
            return
        }

        //Change object to correct information
        
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
                <button type="button" className='btn btn-primary' onClick={() => saveChanges()}>
                    Spara ändringar
                </button>
            </div>
        </div>
    )
}

