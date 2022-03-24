import React, { useEffect, useState } from 'react'
import EnglishAuction from '../Components/EnglishAuction'

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
  
  return (
      <EnglishAuction auction={auction} user={user} setAuctions={setAuctions} auctions={auctions} favo={favo}/>
  )
}
