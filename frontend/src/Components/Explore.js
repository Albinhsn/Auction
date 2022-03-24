import React from 'react'
import AuctionCard from './AuctionCard'
import * as utils from '../Helpers/utils'

export default function Explore({auctions, type}) {
    if(auctions === null || auctions.length === 0) return<></>
    var renderAuctions
    var title = " "
    switch (type){
        case "End":
            renderAuctions = utils.DateSortEnd(auctions).slice(0,5);
            title= "Ending Soon"
            break;
        case "Price":
            renderAuctions = utils.PriceSort(auctions.filter(a => a.State !== "Slut")).slice(0,5);
            title= "Lowest Price"
            break;
        case "Start":
            title= "Starting Soon"
            renderAuctions = utils.DateSortStart(auctions).slice(0,5).reverse();
            break;
        default:
            renderAuctions = auctions
            break;
    }
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
                    {renderAuctions.map((auction, i) =>{
                        return(                    
                            <AuctionCard key={i} auctionId={auction.Id} auction={auction}/>
                        )
                    })}
                </div>
            </div>
        </div>
    </div>
  )
}
