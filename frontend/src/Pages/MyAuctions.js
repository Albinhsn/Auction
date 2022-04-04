import {React, useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import SearchComponent from '../Components/Auctions/Cards/SearchAuctionCard'

export default function MyAuctions({authId}){
    
    const [auctions, setAuctions] = useState([])

    useEffect(() => {

    }, [])
    return (
        <div className='d-flex justify-content-center'>
            <div className='col-6'>
                {auctions.map(auction => {
                   
                    if(auction.Seller === authId ||auction.Winner === authId){
                        return(
                                <Link className='text-decoration-none text-dark pt-3' to={`/auction?auctionId=${auction._id}`}><SearchComponent key={auction._id} auction={auction} myAuctions={"myAuctions"}/></Link>
                        )
                    }
                })}
                
            </div>
        </div>
    )
}