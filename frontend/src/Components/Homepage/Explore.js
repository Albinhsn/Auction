import React, { useEffect } from 'react'
import AuctionCard from '../Auctions/Cards/HomepageAuctionCard'
import * as utils from '../../Helpers/utils'
import AuctionDataService from '../../Services/auctionService'


export default function Explore({auctions, type}) {
    
    
    if(auctions === null || auctions.length === 0) return<></>
    let renderAuctions
    let title = " "
    let price = " " 
    switch (type){
        case "End":
            renderAuctions = utils.DateSortEnd(auctions.filter(a => a.State !== "Slut")).slice(0,5);
            title= "Ending Soon"
            price = "Bid"
            break;
        case "Price":
            renderAuctions = utils.PurchaseNowPriceSort(auctions.filter(a => a.State !== "Slut")).slice(0,5);
            title= "Cheapest Purchase Now"
            price = "Purchase"
            break;
        case "Start":
            renderAuctions = utils.PriceSort(auctions).slice(0,5);
            title = "Lowest Bid"
            price = "Bid"
            break;
        default:
            renderAuctions = auctions
            break;
    }
    const fetchCurrentAuctions = () => {
        AuctionDataService.getAllCurrent().then(response => {
            console.log(response)
        })
    }
    
    
    fetchCurrentAuctions()
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
                            <AuctionCard key={i} auction={auction} price={price}/>
                        )
                    })}
                </div>
            </div>
        </div>
    </div>
  )
}
