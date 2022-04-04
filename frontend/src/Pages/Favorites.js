import {React, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import SearchAuctionCard from '../Components/Auctions/Cards/SearchAuctionCard'
import auctionService from '../Services/auctionService'
export default function Favorites({authId}) {
    
    const [auctions, setAuctions] = useState()
    
    useEffect(() => {
        auctionService.getFavoritesById(authId).then(response => {
            setAuctions(response.data)
        })
    }, [])
    

    if(!authId || !auctions) return<></>

    return (
        <div className='d-flex justify-content-center'>
            <div className='col-6'>
                <div>
                    <input type="text" placeholder='Sök efter Namn' />
                    <label htmlFor="ongoing" className='ms-3'>
                        Pågående
                    </label>
                    <input type="checkbox" name="ongoing" className='ms-2' />
                    <label htmlFor="ongoing" className='ms-3'>
                        Slut
                    </label>
                    <input type="checkbox" name="sold" className='ms-2' />
                </div>
                    {auctions.map(auction => {
                        return (
                            <div className='pt-3' key={auction.Id}>
                                <Link className='text-decoration-none text-dark' to={`/auction?auctionId=${auction.Id}`}><SearchAuctionCard  key={auction._id} auction={auction}/></Link>
                            </div>
                        )
                    })
                    }
            </div>
        </div>
    )
}


