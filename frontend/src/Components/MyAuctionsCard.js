import {React, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

export default function MyAuctionsCard({auction}){
    const [favorite, setFavorite] = useState(auction.Favorite)

    return(
        <div className='d-flex border border-dark'>    
            <img src={auction.Img} placeholder="" style={{height: "15vh", width: "15vh"}}/>
            <div className='ps-3 col'>
                <div className='d-flex align-items-center ps-2'>
                <p className='fs-2'>{auction.Name}</p>
                <p className='ps-3 pt-1'>STATUS: {auction.State} - {auction.Time}</p>
                </div>
                <div className='d-flex'>
                    <p className='ps-3'>Bud: {auction.Bid} SEK - Köp nu: {auction.Purchase} SEK</p> 
                </div>
                <div className='d-flex'>
                    <p className='ps-3'>Skick: {auction.Condition}</p>
                    <FontAwesomeIcon icon={faHeart} className="ps-3 fa-xl" style={{color: favorite}} onClick={() => setFavorite((favorite) => (favorite === "red" ? "black" : "red"))}/>
                </div>
                <div className='col-4'>
                    <p className='d-flex' style={{fontSize: "1.5vh"}}>{auction.Description}</p>
                </div>
            </div>                     
        </div>
    )
}