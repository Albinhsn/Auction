import React from 'react'
import { Link } from 'react-router-dom'
export default function LoginForm({users, setAuthId}) {
  return (
      <div className='d-flex align-items-center justify-content-center' style={{ height: "75vh" }}>
          <div className='row card'>
              <form className='card-body'>
                  <div className="mb-3">
                      <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                      <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                  </div>
                  <div className="mb-3">
                      <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                      <input type="password" className="form-control" id="exampleInputPassword1" />
                  </div>
                  <Link to={"/"}><button type="submit" className="btn btn-primary" onClick={e => setAuthId(1)}>Sign In</button></Link>
                  <button type="submit" className="btn btn-primary ms-2">Sign in with google</button>
                  <div className='d-flex justify-content-center'>
                      <p style={{ margin: "0" }} className="mt-1"><Link to={"/signup"} className="text-dark mt-1" style={{ textDecoration: "none" }}>Sign up here</Link></p>
                  </div>
              </form>


          </div>
      </div>
  )
}
