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
      console.log(response.data, "highestBid")
      setAuctionsByBid(response.data)
      
    })

    auctionService.getAuctionsByPurchasePriceAsc().then(response => {      
      console.log(response.data, "purchase")
      setAuctionsByPurchase(response.data)
      
    })
    
    auctionService.getAuctionsByTimeRemainingAsc().then(response => {          
      setAuctionsByTime(response.data)
      console.log(response.data, "time")
    })

  }, [])

  return (
    <>
      <Jumbo />
      <Explore auctions={auctionsByPurchase} title={"Cheapest Purchase Price"}/>
      <Explore auctions={auctionsByTime} title={"Ending Soon..."} />
      <Explore auctions={auctionsByBid} title={"Cheapest Bids Here"} />
    </>
  )
}
