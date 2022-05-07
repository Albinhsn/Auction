import {React, useState, useEffect} from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

import { useNavigate } from 'react-router'

import userService from '../../Services/userService'

import * as auctionHelpers from '../../Helpers/auctionHelpers'

import AuctionCardProductInfo from './CardInfo/AuctionCardProductInfo'
import AuctionCardTimeInfo from './CardInfo/AuctionCardTimeInfo'
import EnglishAuctionCardInfo from './CardInfo/EnglishAuctionCardInfo'

export default function EnglishAuction({setAuction, auction, token}) {
    
    
    const [watchlist, setWatchlist] = useState(false)
    const [favorite, setFavorite] = useState()
    const [bid, setBid] = useState(0)
    
    


    useEffect(() => {
        if(!favorite && token){
        userService.checkFavorite(token, auction._id).then(response => {
            if(response.data){
            setFavorite("red")
            }
            else{
            setFavorite("black")
            }
        }) 
        }
    }, [])
   
       
    if (!auction || !auction.endDate ) {
        
        return <></>
    }
       
    
    console.log(bid)
    return (
        <div className='d-flex align-items-center'>             
            <div key={auction._id} className='row justify-content-center'>
                <AuctionCardProductInfo auction={auction}/>
                <div className='col-4 bg-light'>
                    <AuctionCardTimeInfo auction={auction}/>
                    <div className='row pt-2'>
                        <p className='fw-bold text-uppercase'>
                            Nuvarande bud
                        </p>
                        <div className='d-flex align-items-center'>
                            <p className='text-success fs-1 mb-0'>
                                {auction.highestBid}
                            </p>
                            <FontAwesomeIcon icon={faHeart} className="ps-3 fa-2xl mt-1" onClick={() => auctionHelpers.favoriteChange(token, auction._id, favorite, setFavorite)} style={{ color: favorite ? "red" : "black" }} />
                            <button className='btn btn-warning ms-3' type="button" 
                                onClick={() => auctionHelpers.watchlistChange(token, auction._id, watchlist, setWatchlist)}>
                                    {watchlist ? "Ta bort påminnelse": "Lägg till påminnelse"}
                            </button>
                        </div>
                        <EnglishAuctionCardInfo setAuction={setAuction} auction={auction} token={token} bid={bid} setBid={setBid}/>
                        
                    </div>
                </div>
            </div>
        </div>
    )   
}
