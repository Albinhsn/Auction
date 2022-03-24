import {React, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
export default function SearchComponent({auction, user}){
    const [favorite, setFavorite] = useState("black")
    
    return(
       
        <div className='border border-dark'>
            <Link to={`/auction?auctionId=${auction.Id}`} className="link-dark d-flex text-decoration-none">    
                <img src={auction.Images[0].original} placeholder="" style={{height: "15vh", width: "15vh"}}/>
                <div className='ps-3 col '>
                    <div className='d-flex align-items-center ps-2'>
    
                        <p className='fs-2 '>{auction.Title}</p>
                        
                        <p className='ps-3 pt-1'>
                            STATUS: {auction.State} - {auction.StartTime}
                        </p>
                    </div>
                    <div className='d-flex'>
                        <p className='ps-3'>
                            Bud: {auction.MinimalBid} SEK - Köp nu: {auction.PurchaseNow} SEK
                        </p> 
                    </div>
                    <div className='d-flex'>
                        <p className='ps-3'>
                            Skick: {auction.Condition}
                        </p>
                        <FontAwesomeIcon icon={faHeart} className="ps-3 fa-xl" style={{color: favorite}} 
                            onClick={() => setFavorite((favorite) => (favorite === "red" ? "black" : "red"))}
                        />
                        <p className='ps-5'>
                            Av: {auction.Seller}
                        </p>
                    </div>
                    <div className='col-4'>
                        <p className='d-flex' style={{fontSize: "1.5vh"}}>
                            {auction.Description}
                        </p>
                    </div>
                </div>
            </Link>            
        </div>
    )
}