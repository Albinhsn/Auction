import React from 'react'
import {Link} from 'react-router-dom'
export default function Profile() {
  return (
    <>

      <div className='row d-flex align-items-center justify-content-center' style={{height: "85%"}}>
        <div className='col-8'>
          <div className='row justify-content-center'>
            <div className='col-8 bg-light'>              
              <div className='row mt-5'>
                <div className='col-5 bg-light'>
                  <p className='fw-bold'>
                    Användarnamn
                  </p>
                  <p>
                    Albinhsn
                  </p>
                  <p className='fw-bold'>
                    Email
                  </p>
                  <p>
                    albin.henningsson@gmail.com
                  </p>
                </div>


                <div className='col-7 bg-light'>
                    <div class="mb-3 row">
                      <label for="staticEmail" class="col-sm-4 col-form-label">
                        Email
                      </label>
                      <div class="col-sm-7">
                        <input type="email" className='form-control' id="email"/>
                      </div>
                    </div>
                    <div class="mb-3 row">
                      <label for="confirm-email" class="col-sm-4 col-form-label">
                        Bekräfta 
                      </label>
                      <div class="col-sm-7">
                        <input type="email" class="form-control" id="confirm-email"/>
                      </div>
                    </div>
                    <hr/>
                    <div class="mb-3 row">
                      <label class="col-sm-4 col-form-label">
                        Lösenord
                      </label>
                      <div class="col-sm-7">
                        <input type="password" className='form-control' id="password"/>
                      </div>
                    </div>
                    <div class="mb-3 row">
                      <label class="col-sm-4 col-form-label">
                        Bekräfta Lösenord
                      </label>
                      <div class="col-sm-7">
                        <input type="password" class="form-control" id="confirm-password" />
                      </div>
                    </div>
                    <hr />
                    <div className='d-flex justify-content-center'>
                      <button type="button" className='btn btn-primary'>
                        Spara ändringar
                      </button>
                    </div>
                </div>
              </div>
            </div>
          </div> 
        </div>
      </div>
    </>
  )
}
