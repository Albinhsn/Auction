import React from 'react'
import AuctionCard from './AuctionCard'
import {useState, useEffect } from 'react'
export default function Explore({category}) {
    //Vad ska du explora?
    //Genom det, skicka efter information för vad du sedan ska rendera
    
    const [auctionIds, setAuctionIds] = useState([])
    
    

    return (
      <div className='row justify-content-center'>
        <div className='col-6' style={{padding: "0"}}>
            <div className='row'>
                <div className='col-2'>
                    Explore X
                </div>
            </div>
            <div className='row'>
                <div className='d-flex justify-content-evenly'>
                    <AuctionCard auctionId={'1'}/>
                    <AuctionCard auctionId={'2'}/>
                    <AuctionCard auctionId={'3'}/>
                </div>
            </div>
        </div>
    </div>
  )
}
