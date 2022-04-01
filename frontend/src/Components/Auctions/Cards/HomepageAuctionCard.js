import React from 'react'
import { Link } from 'react-router-dom'
import * as dates from '../../../Helpers/datesHelpers'
export default function HomepageAuctionCard({ auction}) {
  const timeRemaining = dates.getTimeRemaining(auction.endDate) 
  return (
    <Link to={`/auction?auctionId=${auction._id}`} className="text-decoration-none" key={auction._id}> 
      
      <div className='card text-secondary text-center bg-light mb-5 mx-3' style={{height: "20vh", width: "17vh"}}>
        {auction.name}
        <img className="card-img-bot img-fluid" style={{height: "12vh"}} src={auction.images} alt={auction.name}/>
        <div className='justify-content-center'>
          <div className='d-flex justify-content-center'>
          </div>
          <div className='d-flex ms-1 mb-0'>
          <p className='mb-0'>
            Y: {timeRemaining.Year}
          </p>
            <p className='mb-0'>
            M: {timeRemaining.Month}
          </p>
            <p className='mb-0'>
              D: {timeRemaining.Day}
            </p>
            <p className='mb-0'>
              H: {timeRemaining.Hour}
            </p>
            <p className='mb-0'>
              M: {timeRemaining.Minutes}
            </p>
          </div>
            {auction.auctionType === "Schweizisk" || auction.auctionType === "Holländsk"
            ?  
             <></>
            : 
              <p className='mb-0'> Bud : {auction.highestBid}</p>
            }
          {auction.auctionType != "Holländsk" ? 
            <p className='mb-0'>
              Köp nu : {auction.purchasePrice}
              SEK
            </p>
          :
            <></>
          }
          
        </div>
      </div>
    </Link>
  )
}
