
import { React, useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import * as auctionHelpers from '../../Helpers/auctionHelpers'
import AuctionCardProductInfo from './CardInfo/AuctionCardProductInfo'
import AuctionCardTimeInfo from './CardInfo/AuctionCardTimeInfo'
import userService from '../../Services/userService'
import { useNavigate } from 'react-router'


export default function FinishedAuction({auction, setAuction, favorite, setFavorite, token}){
    
  const navigate = useNavigate

  useEffect(() => {
    
    if(auction.winner === null){
      setAuction({...auction, winner: "Ingen köpare"})
    }else if (auction.winner != "Ingen köpare"){
      
      userService.getNameFromObjectId(auction.winner).then(response => {
        
        setAuction({...auction, winner: response.data})
        
      })
    }
  }, [])
    


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
                onClick={() => auctionHelpers.favoriteChange(token, auction.id, setFavorite, navigate)} style={{ color: favorite ? "red" : "black"}}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    )
}