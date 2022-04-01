import { React, useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import ImageGallery from 'react-image-gallery'


export default function DutchAuction({ auction, authId}) {



  


  
  useEffect(() => {
    
  }, [])

  console.log(auction)
  if (!auction){
    return <></>
  }







  const favoriteChange = () => {
   
  }
  const madeBid = () => {
   
  }

  const watchlistChange = () => {
    
  }
  const handleBid = () => {

  }


  return (
    <div className='d-flex align-items-center'>


      <div key={auction._id} className='row justify-content-center'>
        <div className='col-5 bg-light'>
          <div className='row justify-content-center' style={{ height: "50vh" }}>
            <div className='col-10'>
              <ImageGallery
                items={auction.images}
                showPlayButton={false}
                useBrowserFullscreen={false}
                originalHeight={"200"}
                originalWidth={"200"}
                className="image-gallery"
                showFullscreenButton={false}


              />
            </div>
            <div className='d-flex align-items-center ms-5 pt-3'>
              <h3 className=''>
                {auction.name}
              </h3>
              <p className='ps-5 mb-0'>
                Skick:
              </p>
              <p className='ps-3 mb-0'>
                {auction.condition}
              </p>
            </div>
          </div>

          <p className='pt-4'>
            {auction.description}
          </p>
        </div>


        <div className='col-4 bg-light'>
          <div className='pt-5'>
            <p className='text-uppercase fw-bold' style={{}}>
              Auktionen avslutas:
            </p>
            <div className='d-flex'>
              {new Date(auction.endDate).toLocaleString("en-US")}
            </div>
          </div>
          <p>Auktionstyp: {auction.auctionType}</p>
          <p>Säljare: {auction.seller}</p>
          <div className='row pt-5'>
            <div className='d-flex align-items-center'>
              
              <FontAwesomeIcon icon={faHeart} className="ps-3 fa-2xl mt-1" onClick={() => favoriteChange()} style={{ color: `black` }} />
              <button className='btn btn-warning ms-3' type="button" onClick={() => watchlistChange()}>
                
              </button>
            </div>
            <div className='d-flex mt-2'>
              <input type="number" id="bid-input" className="" 
                onChange={e => handleBid(parseInt(e.target.value))}
              />
              <button type="button" className="btn btn-warning ms-3"
                onClick={() => madeBid()}
              >
                Lägg bud
              </button>

            </div>
          </div>


        </div>
      </div>



    </div>
  )
}
