import {React, useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import * as dates from '../../../Helpers/datesHelpers'
import * as auctionHelpers from '../../../Helpers/auctionHelpers'

export default function SearchAuctionCard({auction}){
    const [favorite, setFavorite] = useState("red")
    const [timeRemaining, setTimeRemaining] = useState(dates.getTimeRemaining(auction.endDate))
    useEffect(() => {
        
        
    }, [])
    console.log(auction)
    if(!auction) return <></>    
    return(
       
        <div className='border border-dark'>
            <Link to={`/auction?auctionId=${auction._id}`} className="link-dark d-flex text-decoration-none">    
                <img src={auction.images[0]} placeholder="" style={{height: "15vh", width: "15vh"}}/>
    
                <div>
                    <div className='d-flex'>
                        <p className='fs-2 '>
                            {auction.name}
                        </p>
                    </div>
                    <div className='d-flex'>
                        <p className='pt-1'>
                            {auction.state} -
                        </p>
        
                        <p className='ps-2 pt-1'>
                            Slut: {new Date(auction.endDate).toLocaleString("en-US")}
                        </p>
                    </div>
                    {auction.state === "Pågående" ? 
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
                        Bud: {auction.bidHistory.length > 0 ? auction.bidHistory[auction.bidHistory.length - 1].bid : auction.minimumBid} SEK {auction.purchasePrice > 0 ? <>- Köp nu: {auction.purchasePrice} SEK</> : ""} 
                    </p> 
                
                    <div className='d-flex'>
                        <p className=''>
                            Skick: {auction.condition}
                        </p>
                        <FontAwesomeIcon icon={faHeart} className="ps-3 fa-xl" style={{color: favorite}} 
                            onClick={() => auctionHelpers.favoriteChange()}
                        />
                        <p className='ps-2'>
                            Säljare: {auction.seller}
                        </p>
                    </div>
                    
                
                    <p className='d-flex' style={{fontSize: "1.5vh"}}>
                        {auction.description}
                    </p>
                </div>
            
            </Link>            
        </div>
    )
}