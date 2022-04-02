import { React, useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import * as auctionHelpers from '../../Helpers/auctionHelpers'
import AuctionCardProductInfo from './CardInfo/AuctionCardProductInfo'
import AuctionCardTimeInfo from './CardInfo/AuctionCardTimeInfo'
import userService from '../../Services/userService'


export default function DutchAuction({ auction, authId}) {


  const [watchlist, setWatchlist] = useState()
  const [favorite, setFavorite] = useState()


  useEffect(() => {
    if(!favorite && authId){
      console.log(authId, auction._id)
      userService.checkFavorite(authId, auction._id).then(response => {
        if(response.data){
          setFavorite("red")
        }
        else{
          setFavorite("black")
        }
      }) 
    }
  }, )



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
            <p className='fw-bold text-uppercase'>Nuvarande pris</p>
            <div className='d-flex align-items-center'>
              <p className='text-success fs-1 mb-0'>
                {auction.purchasePrice}
              </p>
              <FontAwesomeIcon icon={faHeart} className="ps-3 fa-2xl mt-1"
                onClick={() => auctionHelpers.favoriteChange(authId, auction._id, favorite, setFavorite)} style={{ color: `${favorite}` }}
              />
              <button className='btn btn-warning ms-3' type="button"
                onClick={() => auctionHelpers.watchlistChange(watchlist, auction._id)}
              >
                {watchlist ? "Ta bort påminnelse" : "Lägg till påminnelse"}
              </button>
            </div>
            <div className='d-flex'>
              <button type="button" className="btn btn-warning ms-3"
                onClick={() => auctionHelpers.makePurchase(auction)}
              >
                Köp
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
