import {React, useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

import { useNavigate } from 'react-router'
import * as datesHelpers from '../../Helpers/datesHelpers'
import * as auctionHelpers from '../../Helpers/auctionHelpers'

import AuctionCardProductInfo from './CardInfo/AuctionCardProductInfo'
import AuctionCardTimeInfo from './CardInfo/AuctionCardTimeInfo'

export default function EnglishAuction({setAuction, auction, authId}) {
    
    
    const [watchlist, setWatchlist] = useState(false)
    const [favorite, setFavorite] = useState()
    const [bid, setBid] = useState(0)
    const navigate = useNavigate()
        
   
       
    if (!auction || !auction.endDate ) {
        
        return <></>
    }
       
    
    
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
                            <FontAwesomeIcon icon={faHeart} className="ps-3 fa-2xl mt-1" onClick={() => auctionHelpers.favoriteChange(authId, auction._id, favorite, setFavorite)} style={{ color: `black` }} />
                            <button className='btn btn-warning ms-3' type="button" 
                                onClick={() => auctionHelpers.watchlistChange(authId, auction._id, watchlist, setWatchlist)}>
                                    {watchlist ? "Ta bort påminnelse": "Lägg till påminnelse"}
                            </button>
                        </div>
                        <div className='d-flex'>
                            <input type="number" id="bid-input" className="" placeholder={`Minsta bud: ${auction.highestBid + 10}`}
                                onChange={e => setBid(e.target.value)}
                            />
                            <button type="button" className="btn btn-warning ms-3"
                                onClick={() => auctionHelpers.handleBid(authId, auction, bid, setAuction)}>
                                    Lägg bud
                            </button>
                        </div>
                        <div className='d-flex'>
                            <div className="dropdown mt-2 pe-3">
                                <a className="btn btn-warning dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                    Bud Historik
                                </a>
                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <ul className='mb-0 ps-0'>
                                    <li key="init-price" className='dropdown-item d-flex pb-0 ps-1 pe-1 pt-0 align-content-center'>
                                        <p >
                                            Start pris: {auction.minimumBid} Tid: {new Date(auction.startDate).toLocaleDateString("en-US")}
                                        </p>
                                    </li>
                                    {auction.bidHistory.map(bid =>{                                                                                                                
                                        return(
                                            <li key={bid._id} className="dropdown-item d-flex pb-0 ps-1 pe-1 pt-0 justify-content-center">
                                                <p className=''>Bud:{bid.bid} Tid: {new Date(bid.time).toLocaleDateString("en-US")}</p>
                                                
                                            </li>
                                        )
                                    })}
                                    </ul>
                                </div>
                            </div>
                            {auction.purchasePrice > 0 ?
                                <button type="button" className='btn btn-warning ms-5 mt-2'
                                    onClick={() => auctionHelpers.makePurchase()}>                                                
                                        Köp Nu {auction.purchasePrice}
                                </button>
                                :
                                <></>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )   
}
