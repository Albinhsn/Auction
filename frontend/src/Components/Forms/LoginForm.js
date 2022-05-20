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
    })

       
    } 

    const handleFailure = (resp) => {
        alert("Failed login")
    }
    const handleLogin = (data) => {
        let user = {       
            username: data.profileObj.username,
            username: data.profileObj.givenName,
        }
        console.log(user)
        console.log(data)
        userService.handleGoogleLogin(user)
            .then(response =>{
                console.log(response)
                setToken(response.data)
                navigation("/")
        })
            .catch(function(error){
                console.log(error)
        })


    }
    return (
        <div className='d-flex align-items-center justify-content-center' style={{ height: "75vh" }}>
            <div className='row card'>
                <div className="mb-3 card-body">
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
                <div className='justify-content-center'>
                <button className="btn btn-primary" onClick={e => checkLogin()}>
                    Sign In
                </button>
            
                
                <GoogleLogin
                    className='text-white ms-2 bg-primary'
                    style={{padding: "7px"}}
                    clientId={"44982811480-q1q6cq5d1edlu8g32s3ji20v030ba4t1.apps.googleusercontent.com"}
                    buttonText="Sign in with Google"
                    onSuccess={handleLogin}
                    onFailure={handleFailure}
                    cookiePolicy={'single_host_origin'}
                    icon={false}
                />
                </div>
                <div className='d-flex justify-content-center'>
                    <p style={{ margin: "0" }} className="mt-1">
                        <Link to={"/signup"} className="text-dark mt-1" style={{ textDecoration: "none" }}>
                            Sign up here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
  )
}
