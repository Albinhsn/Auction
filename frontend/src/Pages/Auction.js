import React, { useEffect, useState } from 'react'
import DutchAuction from '../Components/Auctions/DutchAuction'
import EnglishAuction from '../Components/Auctions/EnglishAuction'
import SwissAuction from '../Components/Auctions/SwissAuction'
import auctionService from '../Services/auctionService'

export default function Auction({authId}) {
  
  const [auction, setAuction] = useState({})
  
  const auctionId = new URLSearchParams(window.location.search).get('auctionId')
  

  
  
  useEffect(() => {
    if (!auctionId) return <></>
    auctionService.getAuctionByObjectId(auctionId).then(response=> {
      console.log(response.data)
      setAuction(response.data)
      //Handle images format
      
      
    })
  }, [])


  if (Object.keys(auction).length === 0) return <></>
  switch(auction.auctionType){
    case "Engelsk":
      return (
        <EnglishAuction auction={auction} authId={authId} />
      )
    case "Holländsk":
      return(
        <DutchAuction auction={auction} authId={authId} />
      )
    case "Schweizisk":
      return(
        <SwissAuction auction={auction} authId={authId} />
      )
  }
  
}
