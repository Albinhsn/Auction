import React, { useEffect } from 'react'
import HomepageAuctionCard from '../Auctions/Cards/HomepageAuctionCard'



export default function Explore({auctions, title}) {
    



    if(auctions === null || auctions.length === 0) return<></>
    
    
    
    return (
      <div className='row justify-content-center'>
        <div className='col-6' style={{padding: "0"}}>
            <div className='row'>
                <div className='fs-4 d-flex'>
                    {title}
                </div>
            </div>
            <div className='row pt-2'>
                <div className='d-flex justify-content-evenly'>
                    {auctions.map((auction, i) =>{
                        return(                    
                            <HomepageAuctionCard key={i} auction={auction}/>
                        )
                    })}
                </div>
            </div>
        </div>
    </div>
  )
}
