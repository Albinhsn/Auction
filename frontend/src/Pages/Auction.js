import React, { useEffect, useState } from 'react'
import DutchAuction from '../Components/Auctions/DutchAuction'
import EnglishAuction from '../Components/Auctions/EnglishAuction'
import SwissAuction from '../Components/Auctions/SwissAuction'
import auctionService from '../Services/auctionService'
import * as imageHelpers from '../Helpers/imageHelpers'

export default function Auction({token}) {
  
  const [auction, setAuction] = useState({})
  const [images, setImages] = useState([])
  const auctionId = new URLSearchParams(window.location.search).get('auctionId')
  

  
  
  useEffect(() => {
    if (!auctionId) return <></>
    if(Object.keys(auction).length === 0){
      auctionService.getAuctionByObjectId(auctionId).then(response=> {
        
        setAuction(response.data)
        let images = []
        response.data.images.map(image => {
          images.push(  
            imageHelpers.convertToGallery(
              imageHelpers.convertToUrl(image)
            )
          )
        })

        setImages(images)       
        
      })
    }
    
  }, [])

  useEffect(() => {
    if(images.length>0 && auction.images != images){
        setAuction({...auction, images: images})
    }
}, )
  

  if(Object.keys(auction).length === 0) return <></>
  switch(auction.auctionType){
    case "Engelsk":
      return (
        <EnglishAuction setAuction={setAuction} auction={auction} token={token} />
      )
    case "Holländsk":
      return(
        <DutchAuction setAuction={setAuction}  auction={auction} token={token}/>
      )
    case "Schweizisk":
      return(
        <SwissAuction setAuction={setAuction} auction={auction} token={token}/>
      )
  }
  
}
