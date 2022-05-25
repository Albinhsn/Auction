import {React, useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import * as dates from '../../../Helpers/datesHelpers'
import * as auctionHelpers from '../../../Helpers/auctionHelpers'
import * as imageHelpers from '../../../Helpers/imageHelpers'
import userService from '../../../Services/userService'

export default function SearchAuctionCard({auction, token, search}){
    const [favorite, setFavorite] = useState()
    const [timeRemaining, setTimeRemaining] = useState(dates.getTimeRemaining(auction.endDate))
    const [auc, setAuction] = useState(auction)
    useEffect(() => {
        if(token){
            userService.checkFavorite(token, auction.id).then(response => {
                
                if(response.data){
                    setFavorite("red")
                }else{
                    setFavorite("black")
                }
            })
        }{
            setFavorite("black")
        }
        if(auction && !search){            
        
            userService.getNameFromObjectId(auction.seller).then(response => {
                
                setAuction({...auction, seller: response.data})
                
            })           
        }
        
        
    }, [])
    
    if(!auc || auction.images == null) return <></>    
    
    return(
       
        <div className='border border-dark'>
            <Link to={`/auction?auctionId=${auc.id}`} className="link-dark d-flex text-decoration-none">    
                <img src={imageHelpers.convertToUrl(auc.images[0])} placeholder="" style={{height: "15vh", width: "15vh"}}/>
    
                <div>
                    <div className='d-flex'>
                        <p className='fs-2 '>
                            {auc.name}
                        </p>
                    </div>
                    <div className='d-flex'>
                        <p className='pt-1'>
                            Status: {auc.state} -
                        </p>
        
                        <p className='ps-2 pt-1'>
                            Slut: {new Date(auc.endDate).toLocaleString("en-US")}
                        </p>
                    </div>
                    {auc.state === "Pågående" ? 
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
                    {auc.state === "Pågående" ? 
                    <p className=''>
                        Bud: {auc.highestBid > 0 ? auc.highestBid : auc.minimumBid} SEK {auc.purchasePrice > 0 ? <>- Köp nu: {auc.purchasePrice} SEK</> : ""} 
                    </p> 
                    :
                    <p>
                        Slutpris: {auc.purchasePrice} SEK
                    </p>
                    }
                    <div className='d-flex'>
                        <p className=''>
                            Skick: {auc.condition}
                        </p>
                        <FontAwesomeIcon icon={faHeart} className="ps-3 fa-xl" style={{color: favorite}} 
                            onClick={() => auctionHelpers.favoriteChange()}
                        />
                        <p className='ps-2'>
                            Säljare: {auc.seller}
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