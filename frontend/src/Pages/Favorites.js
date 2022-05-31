import {React, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import SearchAuctionCard from '../Components/Auctions/Cards/SearchAuctionCard'
import auctionService from '../Services/auctionService'
import { useNavigate } from 'react-router'
export default function Favorites({token}) {
    
    const [auctions, setAuctions] = useState()
    const navigate = useNavigate()
    
    useEffect(() => {
        if(token && !auctions){
                  
            auctionService.getUserFavorites(token).then(response => {
                setAuctions(response.data)
                
            }).catch(function(error){
                if(error.response){
                    alert(error.response.data.message)
                }
            })
        }
        if(!token){
            navigate("/login")
        }
    }, [])
    
    if(!auctions) return<></>
    return (
        <div className='d-flex justify-content-center'>
            <div className='col-6'>               
                {auctions.map(auction => {
                    return (
                        <div className='pt-3' key={`div-${auction.id}`}>
                            <Link 
                                className='text-decoration-none text-dark' 
                                to={`/auction?auctionId=${auction.id}`}>
                                    <SearchAuctionCard  
                                        key={auction.id} 
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


