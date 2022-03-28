import React from 'react'
import Jumbo from '../Components/Homepage/Jumbo'
import Explore from '../Components/Homepage/Explore'
import {useState, useEffect} from 'react'
import auctionService from '../Services/auctionService'
export default function Home({auctions}) {
  
  
  const [auctionsByBid, setAuctionsByBid] = useState([]) 
  const [auctionsByPrice, setAuctionsByPrice] = useState([]) 
  const [auctionsByTime, setAuctionsByTime] = useState([]) 
  
  const fetchAuctions = () => {

  }



  useEffect(() => {
    auctionService.getAuctionsByBidAsc().then(response => {
      console.log(response)
    })



  }, [])

  return (
    <>
      <Jumbo />
      <Explore auctions={auctions} type={"End"}/>
      <Explore auctions={auctions} type={"Start"}/>
      <Explore auctions={auctions} type={"Price"}/>
    </>
  )
}
