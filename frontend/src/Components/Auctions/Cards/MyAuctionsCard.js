import {React, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'


export default function MyAuctionsCard({auction}){
    const [favorite, setFavorite] = useState(auction.Favorite)
    
    return(
        <div className='d-flex border border-dark'>    
            <img src={auction.Images[0].original} placeholder="" style={{height: "15vh", width: "15vh"}}/>
            <div className='ps-3 col'>
                <div className='d-flex align-items-center ps-2'>
                <p className='fs-2'>{auction.Title}</p>
                <p className='ps-3 pt-1'>STATUS: {auction.Title} - {auction.StartTime}</p>
                </div>
                <div className='d-flex'>
                    <p className='ps-3'>Bud: {auction.BidHistory.length > 0 ? auction.BidHistory[auction.BidHistory.length - 1].Bid : auction.MinimalBid}</p> 
                </div>
                <div className='d-flex'>
                    <p className='ps-3'>Skick: {auction.Condition}</p>
                    <FontAwesomeIcon icon={faHeart} className="ps-3 fa-xl" style={{color: favorite}} onClick={() => setFavorite((favorite) => (favorite === "red" ? "black" : "red"))}/>
                </div>               
                <p className='d-flex' style={{ fontSize: "1.5vh" }}>{auction.Description}</p>
            </div>                     
        </div>
    )
}