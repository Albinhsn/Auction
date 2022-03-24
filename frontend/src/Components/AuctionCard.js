import React from 'react'
import { Link } from 'react-router-dom'
import * as dates from '../Helpers/dates'
export default function AuctionCard({ auction, price}) {
  const timeRemaining = dates.getTimeRemaining(auction.StopTime)
  return (
    
    <Link to={`/auction?auctionId=${auction.Id}`} className="text-decoration-none" key={auction.Id}> 
      
      <div className='card text-secondary text-center bg-light mb-5 mx-3' style={{height: "20vh", width: "17vh"}}>
        {auction.Title}
        <img className="card-img-bot img-fluid" style={{height: "12vh"}} src={auction.Images[0].original} alt={auction.Title}/>
        <div className='justify-content-center'>
          <div className='d-flex justify-content-center'>
            <p className='mb-0'>
              Y:{timeRemaining.Year}
            </p>
            <p className='ps-1 mb-0'>
              M:{timeRemaining.Month}
            </p >
            <p className='ps-1 mb-0'>
              D:{timeRemaining.Day}
            </p>
            <p className='ps-1 mb-0'>
              H:{timeRemaining.Hour}
            </p>
            <p className='ps-1 mb-0'>
              M:{timeRemaining.Minutes}
            </p>
          </div>
          <p>Bud: {
              price === "Bid" ? 
                auction.BidHistory.length > 0 ? auction.BidHistory[auction.BidHistory.length - 1].Bid : auction.MinimalBid
              :
                auction.PurchaseNow
              } SEK</p>
        </div>
      </div>
    </Link>
  )
}
