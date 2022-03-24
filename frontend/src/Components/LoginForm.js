import {React, useState} from 'react'
import { Link } from 'react-router-dom'
import {useNavigate} from 'react-router'
export default function LoginForm({users, setAuthId}) {
    
    const navigate = useNavigate()
    const [loginInfo, setLoginInfo] = useState({
        Email: "",
        Password: ""
    })
    
    const checkLogin = () => {
        let flag = false
        users.map(user =>{
            if(user.Email === loginInfo.Email && loginInfo.Password === user.Password){
                setAuthId(user.Id)
                navigate("/")
                flag = true
            }
        })
        if(flag) return
        alert("Finns ingen användare med vald information")
        setLoginInfo({
            Email: "",
            Password: ""
        })
    } 
    return (
        <div className='d-flex align-items-center justify-content-center' style={{ height: "75vh" }}>
            <div className='row card'>
                <form className='card-body'>
                    <div className="mb-3">
                        <label className="form-label">
                            Email address
                            </label>
                        <input type="email" className="form-control" id="exampleInputEmail1"
                            onChange={e => setLoginInfo({...loginInfo, Email: e.target.value})}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">
                            Password
                        </label>
                        <input type="password" className="form-control"
                                onChange={e => setLoginInfo({ ...loginInfo, Password: e.target.value })}
                        />
                    </div>
                    
                    <button type="submit" className="btn btn-primary" onClick={e => checkLogin()}>
                        Sign In
                    </button>
                
                    
                    <button type="submit" className="btn btn-primary ms-2">
                        Sign in with google
                    </button>
                    
                    <div className='d-flex justify-content-center'>
                        <p style={{ margin: "0" }} className="mt-1">
                            <Link to={"/signup"} className="text-dark mt-1" style={{ textDecoration: "none" }}>
                                Sign up here
                            </Link>
                        </p>
                    </div>
                </form>


            </div>
        </div>
  )
}
