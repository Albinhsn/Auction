import React from 'react'

export default function AuctionPriceInfo({auction}) {
    
    switch(auction.auctionType){
        case "Engelsk":
            return(
                <div>                
                    <p className='fs-5 fw-bold mb-0'>Högsta bud: </p>
                    <div className='d-flex'>
                    <p className='text-success fs-1 mb-0' id="highest-bid">
                        {auction.highestBid === 0 ? auction.minimumBid : auction.highestBid}
                    </p>
                    <p className='ms-1 align-self-center m-0'>(Frakt: {auction.postage})</p>
                    </div>
                </div>

            )
        case "Holländsk":
            return(
                <div className='d-flex'>
                    <p className='text-success fs-1 mb-0'>
                        {auction.purchasePrice}
                    </p>
                    <p className='ms-1 align-self-center m-0'>(Frakt: {auction.postage})</p>
                </div>
            )
        case "Schweizisk":
            return(
                <p className='text-success fs-5 mb-0'>
                    Mörk budgivning
                </p>
            )
        default:
            return(
                <>
                </>
            )
    }
}
