import React from 'react'
import Jumbo from '../Components/Homepage/Jumbo'
import Explore from '../Components/Homepage/Explore'
import {useState, useEffect} from 'react'
import auctionService from '../Services/auctionService'
export default function Home({auctions}) {
  
  
  const [auctionsByBid, setAuctionsByBid] = useState([]) 
  const [auctionsByPurchase, setAuctionsByPurchase] = useState([]) 
  const [auctionsByTime, setAuctionsByTime] = useState([]) 
  



  useEffect(() => {
    auctionService.getAuctionsByBidAsc().then(response => {
      console.log(response.data, "Bid")
      setAuctionsByBid(response.data)

    })

    auctionService.getAuctionsByTimeAsc().then(response => {
      console.log(response.data, "Time")
      setAuctionsByTime(response.data)
      
    })
    auctionService.getAuctionsByPurchaseAsc().then(response => {
      console.log(response.data, "Purchase")
      setAuctionsByPurchase(response.data)
      
    })

  }, [])

  return (
    <>
      <Jumbo />
      <Explore auctions={auctionsByPurchase} title={"Cheapest Purchase Now"}/>
      <Explore auctions={auctionsByTime} title={"Ending Soon..."} />
      <Explore auctions={auctionsByBid} title={"Cheapest Items here"} />
    </>
  )
}
