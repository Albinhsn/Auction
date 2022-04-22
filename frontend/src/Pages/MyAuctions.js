import {React, useState, useEffect} from 'react'

import { Link } from 'react-router-dom'

import SearchAuctionCard from '../Components/Auctions/Cards/SearchAuctionCard'

import auctionService from '../Services/auctionService'

export default function MyAuctions({token}){
    
    const [auctions, setAuctions] = useState([])

    useEffect(() => {
        auctionService.getUserAuctions(token).then(response => {
            setAuctions(response.data)
        })

    }, [])
    if(!auctions) return <></>
    return (
        <div className='d-flex justify-content-center'>
            <div className='col-6'>
                {auctions.map(auction => 
                    {                    
                        return(
                                <Link className='text-decoration-none text-dark pt-3' to={`/auction?auctionId=${auction._id}`}><SearchAuctionCard key={auction._id} auction={auction} token={token}/></Link>
                        )
                    }
                )}
            </div>
        </div>
    )
}