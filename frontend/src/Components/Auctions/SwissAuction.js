import { React, useState, useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

import userService from '../../Services/userService'

import * as auctionHelpers from '../../Helpers/auctionHelpers'
import AuctionCardProductInfo from './CardInfo/AuctionCardProductInfo'
import AuctionCardTimeInfo from './CardInfo/AuctionCardTimeInfo'
import SwissAuctionCardInfo from './CardInfo/SwissAuctionCardInfo'


export default function SwissAuction({ auction, token, setAuction}) {

 

  const [watchlist, setWatchlist] = useState()
  const [favorite, setFavorite] = useState()
  const [bid, setBid] = useState()

  useEffect(() => {
    if(!favorite && token){
    userService.checkFavorite(token, auction.id).then(response => {
        if(response.data){
        setFavorite("red")
        }
        else{
        setFavorite("black")
        }
    }) 
    }
}, [])

  console.log(auction)
  if (!auction || !auction.endDate){
    return <></>
  }

  

  return (
    <div className='d-flex align-items-center'>
      <div key={auction._id} className='row justify-content-center'>
        <AuctionCardProductInfo auction={auction} />
        <div className='col-4 bg-light'>
          <AuctionCardTimeInfo auction={auction} />
          <div className='row pt-5'>
            <div className='d-flex align-items-center'>
              <FontAwesomeIcon icon={faHeart} className="ps-3 fa-2xl mt-1" onClick={() => auctionHelpers.favoriteChange(token, auction.id, favorite, setFavorite)} style={{ color: favorite ? "red" : "black" }} />
              <button className='btn btn-warning ms-3' type="button" onClick={() => auctionHelpers.watchlistChange(watchlist)}>
                {watchlist ? "Ta bort påminnelse" : "Lägg till påminnelse"}
              </button>
            </div>
           <SwissAuctionCardInfo token={token} auction={auction} setAuction={setAuction}/>
          </div>
        </div>
      </div>
    </div>
  )
}
