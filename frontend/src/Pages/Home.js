import React from 'react'
import Jumbo from '../Components/Homepage/Jumbo'
import Explore from '../Components/Homepage/Explore'
import {useState, useEffect} from 'react'
import auctionService from '../Services/auctionService'
export default function Home() {
  
  
  const [auctionsByBid, setAuctionsByBid] = useState([]) 
  const [auctionsByPurchase, setAuctionsByPurchase] = useState([]) 
  const [auctionsByTime, setAuctionsByTime] = useState([]) 
  

  

  useEffect(() => {

    auctionService.getAuctionByHighestBidAsc().then(response => {      
      
      setAuctionsByBid(response.data)
      console.log(response)
    })

    auctionService.getAuctionsByPurchasePriceAsc().then(response => {      
      setAuctionsByTime(response.data)
      console.log(response)
    })
    
    auctionService.getAuctionsByTimeRemainingAsc().then(response => {          
      setAuctionsByPurchase(response.data)
      console.log(response)
    })

  }, [])

  return (
    <>
      <Jumbo />
      <Explore auctions={auctionsByPurchase} title={"Cheapest PurchasePrice"}/>
      <Explore auctions={auctionsByTime} title={"Ending Soon..."} />
      <Explore auctions={auctionsByBid} title={"Cheapest Bids here"} />
    </>
  )
}
