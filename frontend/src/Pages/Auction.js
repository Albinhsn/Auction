import React, { useEffect, useState } from 'react'
import EnglishAuction from '../Components/EnglishAuction'

export default function Auction({auctions}) {
  
  const [auction, setAuction] = useState({})
  const auctionId = new URLSearchParams(window.location.search).get('auctionId')
  
  useEffect(() => {
    auctions.map(a => {
      if(auctionId === a.Id){
        setAuction(a)
      }
    })

  },)
  
  return (
      <EnglishAuction auction={auction}/>
  )
}
