import React from 'react'
export default function Login() {
  return (
    <div className='d-flex align-items-center justify-content-center' style={{height: "75vh"}}>
      <div className='row card'>
        <form className='card-body'>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
          </div>
          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1"/>
          </div>
          <button type="submit" className="btn btn-primary">Sign in</button>
          <button type="submit" className="btn btn-primary ms-2">Sign in with google</button>
        </form>
      </div>
    </div>
  )
}
