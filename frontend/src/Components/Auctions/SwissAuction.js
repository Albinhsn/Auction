import { React, useState, useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

import userService from '../../Services/userService'

import * as auctionHelpers from '../../Helpers/auctionHelpers'

import AuctionCardProductInfo from './CardInfo/AuctionCardProductInfo'
import AuctionCardTimeInfo from './CardInfo/AuctionCardTimeInfo'
export default function SwissAuction({ auction, authId, setAuction}) {

 

  const [watchlist, setWatchlist] = useState()
  const [favorite, setFavorite] = useState()
  const [bid, setBid] = useState()

  useEffect(() => {
    if(!favorite && authId){
    userService.checkFavorite(authId, auction._id).then(response => {
        if(response.data){
        setFavorite("red")
        }
        else{
        setFavorite("black")
        }
    }) 
    }
}, [])


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
              <FontAwesomeIcon icon={faHeart} className="ps-3 fa-2xl mt-1" onClick={() => auctionHelpers.favoriteChange(authId, auction._id, favorite, setFavorite)} style={{ color: `${favorite}` }} />
              <button className='btn btn-warning ms-3' type="button" onClick={() => auctionHelpers.watchlistChange(watchlist)}>
                {watchlist ? "Ta bort påminnelse" : "Lägg till påminnelse"}
              </button>
            </div>
            <div className='d-flex mt-2'>
              <input type="number" id="bid-input" className=""
                onChange={e => setBid(e.target.value)}
              />
              <button type="button" className="btn btn-warning ms-3"
                onClick={() => auctionHelpers.handleBid(authId, auction, bid, setAuction)}
              >
                Lägg bud
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
