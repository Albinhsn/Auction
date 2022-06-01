import {React, useState} from 'react'
import { Link } from 'react-router-dom'
import {useNavigate} from 'react-router'
import {GoogleLogin } from 'react-google-login'
import userService from '../../Services/userService'
import authService from '../../Services/authService'

export default function LoginForm({setToken}) {


    const navigation = useNavigate()
    const [loginInfo, setLoginInfo] = useState({
        username: "",
        password: ""
    })
    const checkLogin = () => {
        authService.validateLogin(loginInfo.username, loginInfo.password).then(response => {      
            setToken(response.data)
            localStorage.setItem("access_token", JSON.stringify(response.data))
            navigation("/")
        }).catch(
            function (error) {
                if (error.response) {
                    alert(error.response.data)
                }
            })
       
    } 

   
    return (
        <div className='d-flex align-items-center justify-content-center' style={{ height: "75vh" }}>
            <div className='row card'>
                <div className=" card-body">
                    <label className="form-label">
                        Email
                        </label>
                    <input type="username" className="form-control" id="exampleInputusername1"
                        onChange={e => setLoginInfo({...loginInfo, username: e.target.value})}
                    />
                </div>
                <div className="mb-3 justify-content-center">
                    <label className="form-label">
                        Password
                    </label>
                    <input type="password" className="form-control"
                            onChange={e => setLoginInfo({ ...loginInfo, password: e.target.value })}
                    />
                </div>
                <div className='d-flex justify-content-center'>
                    <button className="btn btn-primary" onClick={e => checkLogin()}>
                        Sign In
                    </button>
            
            
                </div>
                <div className='d-flex justify-content-center'>
                    <p style={{ margin: "0" }} className="mt-1">
                        <Link to={"/signup"} className="text-dark mt-1" style={{ textDecoration: "none", fontSize: "1.25vh"}}>
                            Sign up here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
  )
}
