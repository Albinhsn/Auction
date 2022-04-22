import {React, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import SearchAuctionCard from '../Components/Auctions/Cards/SearchAuctionCard'
import auctionService from '../Services/auctionService'
export default function Favorites({token}) {
    
    const [auctions, setAuctions] = useState()
    
    useEffect(() => {
        if(token && !auctions){
            
            auctionService.getFavoritesById(token).then(response => {
                setAuctions(response.data)
            }).catch(function(error){
                if(error.response){
                    alert(error.response.data.message)
                }
            })
        }
    }, [])
    

    if(!token || !auctions) return<></>

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
                            <div className='pt-3' key={`div-${auction.Id}`}>
                                <Link 
                                    className='text-decoration-none text-dark' 
                                    to={`/auction?auctionId=${auction.Id}`}>
                                        <SearchAuctionCard  
                                            key={auction._id} 
                                            auction={auction} 
                                            token={token}
                                        />
                                    </Link>
                            </div>
                        )
                    })
                    }
            </div>
        </div>
    )
}


