import React from 'react'
import {Link} from 'react-router-dom'
export default function Profile() {
  return (
    <div>

      <div className='row justify-content-center'>
        <div className='col-8'>
          <div className='row justify-content-center'>
            <div className='col-8 bg-light'>              
              <p className='fs-3 text-uppercase mt-5'>Mina uppgifter</p>
            
            <div className='row mt-5'>
              <div className='col-5 bg-light mt-5'>
                <p>Användarnamn</p>
              </div>


              <div className='col-7 bg-light mt-5'>
                  <div class="mb-3 row">
                    <label for="staticEmail" class="col-sm-4 col-form-label">Email</label>
                    <div class="col-sm-7">
                      <input type="email" className='form-control' id="email"/>
                    </div>
                  </div>
                  <div class="mb-3 row">
                    <label for="confirm-email" class="col-sm-4 col-form-label">Bekräfta Email</label>
                    <div class="col-sm-7">
                      <input type="email" class="form-control" id="confirm-email"/>
                    </div>
                  </div>
                  <hr/>
                  <div class="mb-3 row">
                    <label class="col-sm-4 col-form-label">Lösenord</label>
                    <div class="col-sm-7">
                      <input type="password" className='form-control' id="password"/>
                    </div>
                  </div>
                  <div class="mb-3 row">
                    <label class="col-sm-4 col-form-label">Bekräfta Lösenord</label>
                    <div class="col-sm-7">
                      <input type="password" class="form-control" id="confirm-password" />
                    </div>
                  </div>
                  <hr />
                  <div className='d-flex justify-content-center'>
                    <button type="button" className='btn btn-primary'>Spara ändringar</button>
                  </div>
                </div>
              </div>
            </div>
          </div> 
        </div>
      </div>
    </div>
  )
}
