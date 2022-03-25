import React, { useEffect, useState } from 'react'
import DutchAuction from '../Components/Auctions/DutchAuction'
import EnglishAuction from '../Components/Auctions/EnglishAuction'
import SwissAuction from '../Components/Auctions/SwissAuction'
export default function Auction({setAuctions, auctions, users, authId}) {
  
  const [auction, setAuction] = useState({})
  const [user, setUser] = useState()
  const [favo, setFavorite] = useState()
  const auctionId = parseInt(new URLSearchParams(window.location.search).get('auctionId'))
  

  

  useEffect(() => {
    auctions.map(a => {
      if(auctionId === a.Id){
        setAuction(a)
        
      }
    })
    users.map(u =>{
      if(authId === u.Id){
        setUser(u)
        u.Favorites.map(favorite => {
          if(parseInt(favorite) === auction.Id){
            setFavorite("red")
            
          }
        })
        
      }
    })
  }, )
  if (Object.keys(auction).length === 0) return <></>
  switch(auction.AuctionType){
    case "Engelsk":
      return (
        <EnglishAuction auction={auction} user={user} setAuctions={setAuctions} auctions={auctions} favo={favo} authId={authId} users={users}/>
      )
    case "Holländsk":
      return(
        <DutchAuction auction={auction} user={user} setAuctions={setAuctions} auctions={auctions} favo={favo} authId={authId} users={users}/>
      )
    case "Schweizisk":
      return(
        <SwissAuction auction={auction} user={user} setAuctions={setAuctions} auctions={auctions} favo={favo} authId={authId} users={users}/>
      )
  }
  
}
