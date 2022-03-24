import {React, useState} from 'react'
import { Link } from 'react-router-dom'
import {useNavigate} from 'react-router'
import {GoogleLogin } from 'react-google-login'


export default function LoginForm({users, setAuthId, setUsers}) {

    
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

    const handleFailure = (resp) => {
        alert("Failed login")
        console.log(resp)
    }
    const handleLogin = (data) => {
        setUsers([...users, {
            Id: data.profileObj.googleId,
            Email: data.profileObj.email,
            Name: data.profileObj.givenName,
            Favorites: []
        }])
        setAuthId(data.profileObj.googleId)
        navigate("/")
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
                
                    
                    <GoogleLogin
                        clientId={"44982811480-q1q6cq5d1edlu8g32s3ji20v030ba4t1.apps.googleusercontent.com"}
                        buttonText="Login with Google"
                        onSuccess={handleLogin}
                        onFailure={handleFailure}
                        cookiePolicy={'single_host_origin'}
                    />
                    
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
