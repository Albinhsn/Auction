import {React, useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import * as dates from '../../../Helpers/datesHelpers'
import * as auctionHelpers from '../../../Helpers/auctionHelpers'
import * as imageHelpers from '../../../Helpers/imageHelpers'
import userService from '../../../Services/userService'

export default function SearchAuctionCard({auction, token}){
    const [favorite, setFavorite] = useState()
    const [timeRemaining, setTimeRemaining] = useState(dates.getTimeRemaining(auction.endDate))
    useEffect(() => {
        if(token){
            userService.checkFavorite(token, auction._id).then(response => {
                if(response.data){
                    setFavorite("red")
                }else{
                    setFavorite("black")
                }
            })
        }{
            setFavorite("black")
        }
        
        
    }, [])
    
    if(!auction || auction.images == null) return <></>    
    return(
       
        <div className='border border-dark'>
            <Link to={`/auction?auctionId=${auction.id}`} className="link-dark d-flex text-decoration-none">    
                <img src={imageHelpers.convertToUrl(auction.images[0])} placeholder="" style={{height: "15vh", width: "15vh"}}/>
    
                <div>
                    <div className='d-flex'>
                        <p className='fs-2 '>
                            {auction.name}
                        </p>
                    </div>
                    <div className='d-flex'>
                        <p className='pt-1'>
                            Status: {auction.state} -
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
                    {auction.state === "Pågående" ? 
                    <p className=''>
                        Bud: {auction.highestBid > 0 ? auction.highestBid : auction.minimumBid} SEK {auction.purchasePrice > 0 ? <>- Köp nu: {auction.purchasePrice} SEK</> : ""} 
                    </p> 
                    :
                    <p>
                        Slutpris: {auction.purchasePrice} SEK
                    </p>
                    }
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