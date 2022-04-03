import {React, useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import * as dates from '../../../Helpers/datesHelpers'
import * as favoriteHelper from '../../../Helpers/favoriteHelpers'

export default function SearchAuctionCard({auction}){
    const [favorite, setFavorite] = useState()
    const [timeRemaining, setTimeRemaining] = useState(dates.getTimeRemaining(auction.StopTime))
    useEffect(() => {
        
        
    }, )

    if(!auction) return <></>    
    return(
       
        <div className='border border-dark'>
            <Link to={`/auction?auctionId=${auction.Id}`} className="link-dark d-flex text-decoration-none">    
                <img src={auction.images[0].original} placeholder="" style={{height: "15vh", width: "15vh"}}/>
    
                <div>
                    <div className='d-flex'>
                        <p className='fs-2 '>
                            {auction.Title}
                        </p>
                        <p className='mt-3 ms-3'>
                            {auction.Tags}
                        </p>
                    </div>
                    <div className='d-flex'>
                        <p className='pt-1'>
                            {auction.State} -
                        </p>
        
                        <p className='ps-2 pt-1'>
                            Slut: {new Date(auction.StopTime).toLocaleString("en-US")}
                        </p>
                    </div>
                    {auction.State === "Pågående" ? 
                        <div className='d-flex'>
                            <p>
                                Tid kvar: M:{timeRemaining.Month}
                            </p>
                            <p className='ps-1'>
                                D:{timeRemaining.Day}
                            </p>
                            <p className='ps-1'>
                                H:{timeRemaining.Hour}
                            </p>
                            <p className='ps-1'>
                                M:{timeRemaining.Minutes}
                            </p>
                        </div>
                        :
                        <></>}
                    <p className=''>
                        Bud: {auction.BidHistory.length > 0 ? auction.BidHistory[auction.BidHistory.length - 1].Bid : auction.MinimalBid} SEK - Köp nu: {auction.PurchaseNow} SEK
                    </p> 
                
                    <div className='d-flex'>
                        <p className=''>
                            Skick: {auction.Condition}
                        </p>
                        <FontAwesomeIcon icon={faHeart} className="ps-3 fa-xl" style={{color: favorite}} 
                            onClick={() => setFavorite((favorite) => (favorite === "red" ? "black" : "red"))}
                        />
                        <p className='ps-2'>
                            Säljare: {auctionSeller}
                        </p>
                    </div>
                    
                
                    <p className='d-flex' style={{fontSize: "1.5vh"}}>
                        {auction.Description}
                    </p>
                </div>
            
            </Link>            
        </div>
    )
}