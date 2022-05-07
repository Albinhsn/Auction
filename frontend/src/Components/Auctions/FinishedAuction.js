
import { React, useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import * as auctionHelpers from '../../Helpers/auctionHelpers'
import AuctionCardProductInfo from './CardInfo/AuctionCardProductInfo'
import AuctionCardTimeInfo from './CardInfo/AuctionCardTimeInfo'
import userService from '../../Services/userService'


export default function FinishedAuction({auction, favorite, setFavorite, token}){
    
    useEffect(() => {
      if (!favorite && token) {
        userService.checkFavorite(token, auction._id).then(response => {
          if (response.data) {
            setFavorite(true)
          }
          else {
            setFavorite(false)
          }
        })
      }
    }, )


    if(auction.winner === null){
        auction.winner = "Ingen köpare"
    }


    return (
        <div className='d-flex align-items-center'>
      <div key={auction._id} className='row justify-content-center'>
        <AuctionCardProductInfo auction={auction} />
        <div className='col-4 bg-light'>
          <AuctionCardTimeInfo auction={auction} />
          <div className='row pt-5'>
            <p className='fw-bold'>Såld för: {auction.purchasePrice} SEK</p>
            <div className='d-flex align-items-center'>
              <FontAwesomeIcon icon={faHeart} className="ps-3 fa-2xl mt-1"
                onClick={() => auctionHelpers.favoriteChange(token, auction._id, setFavorite)} style={{ color: favorite ? "red" : "black"}}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}