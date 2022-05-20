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

    auctionService.getAuctionsSortedLimited("highestBid", -1, 5).then(response => {
      
      setAuctionsByBid(response.data)
    })

    auctionService.getAuctionsSortedLimited("endDate", -1, 5).then(response => {
      
      setAuctionsByTime(response.data)
    })
    
    auctionService.getAuctionsSortedLimited("purchasePrice", 1, 5).then(response => {
      
      
      setAuctionsByPurchase(response.data)
    })

  }, [])

  return (
    <>
      <Jumbo />
      <Explore auctions={auctionsByPurchase} title={"Most Expensive"}/>
      <Explore auctions={auctionsByTime} title={"Ending Soon..."} />
      <Explore auctions={auctionsByBid} title={"Cheapest Bids here"} />
    </>
  )
}
