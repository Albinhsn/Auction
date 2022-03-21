import React from 'react'
import AuctionCard from './AuctionCard'
export default function Explore() {
    
    const auctions  = ["Panasonic", "Canon", "Sony", "Jeppe", "Jeppe"]
    

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
                    {auctions.map(name =>{
                        return(
                            <AuctionCard auctionId={'1'} auctionName={name}/>
                        )
                    })}
                </div>
            </div>
        </div>
    </div>
  )
}
