import {React, useState, useEffect} from 'react'

import { Link } from 'react-router-dom'

import SearchAuctionCard from '../Components/Auctions/Cards/SearchAuctionCard'

import auctionService from '../Services/auctionService'
import { useNavigate } from 'react-router'
export default function MyAuctions({token}){
    
    const [auctions, setAuctions] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        if(!token){
            navigate("/login")
            return <></>
        }
        auctionService.getUserAuctions("6246eaaafb49cf2ed543fd5f").then(response => {            
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
                                <Link className='text-decoration-none text-dark pt-3' to={`/auction?auctionId=${auction.id}`}><SearchAuctionCard key={auction.id} auction={auction} token={token}/></Link>
                        )
                    }
                )}
            </div>
        </div>
    )
}