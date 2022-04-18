import {React, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import TimeRemaining from '../../Time/TimeRemaining'
import * as datesHelpers from '../../../Helpers/datesHelpers'
import * as imageHelpers from '../../../Helpers/imageHelpers'
export default function HomepageAuctionCard({ auction}) {
  
  const [date, setDate] = useState()
  useEffect(() => {
    if (!date) {
      setDate(datesHelpers.reformatDate(datesHelpers.getTimeRemaining(auction.endDate)))
    }
  })
  
  return (
    <Link to={`/auction?auctionId=${auction._id}`} className="text-decoration-none" key={auction._id}> 
      
      <div className='card text-secondary justify-content-center bg-light mb-5 mx-3' style={{height: "25vh", width: "19vh"}}>
        {auction.name}
        <img className="card-img-bot img-fluid" style={{height: "12vh"}} src={imageHelpers.convertToUrl(auction.images)} alt={auction.name}/>
        <div>
          <TimeRemaining 
            date={date}
            className='d-flex justify-content-center'
          />
          {auction.auctionType === "Schweizisk" || auction.auctionType === "Holländsk"
          ?  
            <></>
          : 
            <p className='mb-0'> Bud : {auction.highestBid}</p>
          }
          {auction.auctionType != "Schweizisk" && auction.purchasePrice != 0 ? 
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
