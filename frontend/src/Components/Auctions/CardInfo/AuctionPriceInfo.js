import React from 'react'

export default function AuctionPriceInfo({auction}) {
    
    switch(auction.auctionType){
        case "Engelsk":
            return(
                <p className='text-success fs-1 mb-0'>
                    {auction.minimumBid}
                </p>
            )
        case "Holländsk":
            return(
                <p className='text-success fs-1 mb-0'>
                    {auction.purchasePrice}
                </p>
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
