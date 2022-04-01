import { React, useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import * as auctionHelpers from '../../Helpers/auctionHelpers'
import AuctionCardProductInfo from './CardInfo/AuctionCardProductInfo'
import AuctionCardTimeInfo from './CardInfo/AuctionCardTimeInfo'

export default function DutchAuction({ auction, authId}) {


  const [watchlist, setWatchlist] = useState()
  const [favorite, setFavorite] = useState()
  
  useEffect(() => {
    if(!favorite){
      
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
            <p className='fw-bold text-uppercase'>Nuvarande pris</p>
            <div className='d-flex align-items-center'>
              <p className='text-success fs-1 mb-0'>
                {auction.purchasePrice}
              </p>
              <FontAwesomeIcon icon={faHeart} className="ps-3 fa-2xl mt-1"
                onClick={() => auctionHelpers.favoriteChange()} style={{ color: `black` }}
              />
              <button className='btn btn-warning ms-3' type="button"
                onClick={() => auctionHelpers.watchlistChange()}
              >
                {watchlist ? "Ta bort påminnelse" : "Lägg till påminnelse"}
              </button>
            </div>
            <div className='d-flex'>
              <button type="button" className="btn btn-warning ms-3"
                onClick={() => auctionHelpers.makePurchase()}
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
