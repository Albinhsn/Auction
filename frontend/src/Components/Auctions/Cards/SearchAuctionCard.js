import {React, useEffect, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import * as datesHelpers from '../../../Helpers/datesHelpers'
import * as auctionHelpers from '../../../Helpers/auctionHelpers'
import * as imageHelpers from '../../../Helpers/imageHelpers'
import userService from '../../../Services/userService'
import TimeRemaining from '../../Time/TimeRemaining'

export default function SearchAuctionCard({auction, token, search}){
    const [favorite, setFavorite] = useState()
    const [timeRemaining, setTimeRemaining] = useState(datesHelpers.getTimeRemaining(auction.endDate))
    const [auc, setAuction] = useState(auction)
    useEffect(() => {
        if(token){
            userService.checkFavorite(token, auction.id).then(response => {
                
                if(response.data){
                    setFavorite(true)
                }else{
                    setFavorite(false)
                }
            })
        }{
            setFavorite(false)
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
                <img src={imageHelpers.convertToUrl(auc.images[0])} placeholder="" style={{height: "25vh", width: "25vh"}}/>
    
                <div className='ms-3'>
                    <div className='d-flex'>
                        <p className='fs-2 '>
                            {auc.name}
                             <FontAwesomeIcon icon={faHeart} className="ps-3 fa-l" style={{color: favorite ? "red": "black"}} 
                                onClick={(e) => { auctionHelpers.favoriteChange(token, auction.id, setFavorite); e.preventDefault()}}
                        />
                        </p>
                    </div>
                    <div className='d-flex'>
                        
                    </div>
                    {auc.state === "Pågående" ?                         
                        <TimeRemaining date={datesHelpers.reformatDate(timeRemaining)}/>                        
                        :
                        <p className='pt-1'>
                            Tog slut: {auc.endDate.substring(0, 10)}
                        </p>
                    }
                    {auc.state === "Pågående" ? 
                        <>{auc.auctionType === "Engelsk" ? 
                            <p className=''>
                                Bud: {auc.highestBid > 0 ? auc.highestBid : auc.minimumBid} {auc.purchasePrice > 0 ? <>- Köp nu: {auc.purchasePrice} SEK</> : ""}
                            </p>
                            :
                            <></>                         
                        }
                        
                        {auc.purchasePrice > 0 ? 
                            <p>Köp nu: {auc.purchasePrice} kr</p>
                            :
                            <></>
                        }
                        </>   
                        :
                        <p>
                            Slutpris: {auc.purchasePrice} SEK
                        </p>
                    }
                    <div className='d-flex'>
                        <p className=''>
                            Skick: {auc.condition}
                        </p>                       
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