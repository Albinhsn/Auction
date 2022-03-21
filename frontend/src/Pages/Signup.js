import React from 'react'
export default function Signup() {
  return (
      <div className='d-flex align-items-center justify-content-center' style={{ height: "75vh" }}>
        <div className='row card'>
            <form className='card-body'>


                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Användarnamn</label>
                    <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>


                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Bekräfta Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                </div>


                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Lösenord</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" />
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Confirm Lösenord</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" />
                </div>
            </form>
            <div className='d-flex justify-content-center'>
                <button type="button" className='btn btn-primary'>Skapa Konto</button>
            </div>
        </div>
    </div>

  )
}
