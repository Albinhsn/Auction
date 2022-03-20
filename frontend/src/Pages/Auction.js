import React from 'react'

export default function Auction() {
  const auctionId = new URLSearchParams(window.location.search).get('auctionId')
  const catJam = 'https://static-cdn.jtvnw.net/jtv_user_pictures/ec92e3d9-fc70-42e7-aee0-4fd987e306f5-profile_image-300x300.png'
  return (
    <div>
      <div className='row justify-content-center'>
        <div className='col-5'>
          <h2 className='ms-5'>Title Here</h2>
        </div>
        <div className='col-4'></div>
      </div>


      <div className='row justify-content-center' style={{height: "100vh"}}>
        <div className='col-5'>
          <div className='row bg-primary' style={{height: "50vh"}}>
            <div className='col-1'></div>
            <div className='col-10'>
              <img className="img-fluid" src={catJam} alt="catJam" style={{width: "100%", height: "72.5%"}}/>
            </div>
            <div className='col-1'></div>
          </div>
        </div>


        <div className='col-4 bg-secondary'>
          <div className='bg-success'>
            <div className='row'>
              <div className='col-2 d-flex align-items-center'>
                Icon
              </div>
              <div className='col-8'>
                <p className='text-uppercase fw-bold' style={{}}>Auktionen avslutas</p>
                <div className='d-flex'>
                  <p className='fw-bold'> Tisdag, </p>
                  <p className='ms-1'>2022-03-22 10:00</p>
                </div>
              </div>
            </div>
            
            <div className='row'>
              <div className='col-2'></div>
              <div className='col-8'>
                <p>1D 21H 5M</p>
              </div>
            </div>
          </div>


          <div className=''>
            <p className='fw-bold text-uppercase'>Nuvarande bud</p>
            <p className='text-success fs-1'>14 100 SEK</p>
            <div className='d-flex'>
              <input type="number" id="bid-input"/>
              <button type="button" class="btn btn-warning ms-3">Lägg bud</button>
            </div>
          </div> 

          
        </div>  
      </div>
    </div>
  )
}
