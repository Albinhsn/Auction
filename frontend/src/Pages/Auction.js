import {React, useEffect, useState } from 'react'
import FinishedAuction from '../Components/Auctions/FinishedAuction'
import auctionService from '../Services/auctionService'
import * as imageHelpers from '../Helpers/imageHelpers'
import EnglishAuctionCardInfo from '../Components/Auctions/CardInfo/EnglishAuctionCardInfo'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import * as auctionHelpers from "../Helpers/auctionHelpers"
import * as watchlistHelpers from '../Helpers/watchlistHelpers'
import userService from '../Services/userService'
import AuctionCardProductInfo from "../Components/Auctions/CardInfo/AuctionCardProductInfo"
import AuctionCardTimeInfo from "../Components/Auctions/CardInfo/AuctionCardTimeInfo"
import DutchAuctionCardInfo from '../Components/Auctions/CardInfo/DutchAuctionCardInfo'
import SwissAuctionCardInfo from '../Components/Auctions/CardInfo/SwissAuctionCardInfo'
import AuctionPriceInfo from '../Components/Auctions/CardInfo/AuctionPriceInfo'
import watchlistService from '../Services/watchlistService'


export default function Auction({token}) {
  
  const [auction, setAuction] = useState({})
  const [images, setImages] = useState([])
  const [reminder, setReminder] = useState()
  const [updated, setUpdated] = useState()
  const [favorite, setFavorite] = useState()

  
  const auctionId = new URLSearchParams(window.location.search).get('auctionId')
  
  const renderAuctiontype = () => {
    
    switch(auction.auctionType){
      
      case "Engelsk":
        
        return (
          
          <EnglishAuctionCardInfo setAuction={setAuction} auction={auction} token={token} />
        )
      case "Holländsk":
        
        return (
          <DutchAuctionCardInfo setAuction={setAuction} auction={auction} token={token} />
        )
      case "Schweizisk":
        
        return(
          <SwissAuctionCardInfo setAuction={setAuction} auction={auction} token={token} />
        )
    }
  }
  
  
  useEffect(() => {
    if (!auctionId) return <></>
    if(Object.keys(auction).length === 0){
      auctionService.getAuctionByObjectId(auctionId).then(response=> {
        console.log(response)
        
        
        if(response.data.highestBid === 0){
          
          response.data.highestBid = response.data.minimumBid
        }

        userService.getNameFromObjectId(response.data.seller).then(nameResponse => {
          response.data.seller =  nameResponse.data
          
          setAuction(response.data)
          
        }).catch(error => {
          console.log(error)
          setAuction(response.data)
          
        })        
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
    if(favorite === undefined && token && auction.id){
        
        userService.checkFavorite(token, auction.id).then(resp => {
          
          
          if (resp.data === true) {
            setFavorite(true)
          }
          else {
            setFavorite(false)
          }
        })
    }
    if(updated === undefined && reminder === undefined && auction.id && token){
      watchlistService.getWatchlist(token, auction.id).then(response => {
        
        if(response.data === []){
          setUpdated(false)
          setReminder(false)
        }else{
          response.data.map(x => {
            if(x.type === "Reminder"){
              setReminder(true)
            }else{
              setUpdated(true)
            }
          })
        }        
      })
    }
}, )
  

  if(Object.keys(auction).length === 0) return <></>
  
  if(auction.state === "Slut"){
    
    return <FinishedAuction setAuction={setAuction} auction={auction} token={token} favorite={favorite} setFavorite={setFavorite}/>
  }
  return(
    <div className='d-flex align-items-center'>
      <div key={auction._id} className='row justify-content-center'>
        <AuctionCardProductInfo auction={auction} />
        <div className='col-4 bg-light'>
          <AuctionCardTimeInfo auction={auction} />
          <div className='row pt-2'>            
            <div className='d-flex align-items-center'>
              <>
                <AuctionPriceInfo auction={auction}/>
              </>
              <FontAwesomeIcon icon={faHeart} className="ps-3 fa-2xl mt-4 pt-2" onClick={() => auctionHelpers.favoriteChange(token, auction.id, setFavorite)} style={{ color: favorite ? "red" : "black" }} />              
              <div className='align-items-center'>
                <button className='btn btn-warning ms-3' type="button"
                  onClick={() => watchlistHelpers.updateWatchlist(token, "Reminder", auction.id, reminder, setReminder)}>
                  {reminder ? "Ta bort påminnelse" : "Lägg till påminnelse"}
                </button>
                <button className='btn btn-warning ms-3' type="button"
                  onClick={() => watchlistHelpers.updateWatchlist(token, "Updated", auction.id, updated, setUpdated)}
                >
                  {updated ? "Ta bort bevakning" : "Bevaka"}
                </button>
              </div>
            </div>
            
            {renderAuctiontype()}
            <div>
              
            </div>

          </div>
        </div>
      </div>
    </div>
  )

  
}
