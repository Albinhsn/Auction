import {React, useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import SearchAuctionCard from '../Components/Auctions/Cards/SearchAuctionCard'
import auctionService from '../Services/auctionService'
import { useNavigate } from 'react-router'

export default function Watchlist({token}) {
  
    const [auctions, setAuctions] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        if (token) {

            auctionService.getWatchlistById(token).then(response => {
                setAuctions(response.data)
            }).catch(function (error) {
                if (error.response) {
                    alert(error.response.data.message)
                }
            })
        }
        if (!token) {
            navigate("/login")
        }
    }, [])
    return (
        <div className='d-flex justify-content-center'>
            <div className='col-6'>
                {auctions.map(auction => {
                    return (
                        <div className='pt-3' key={`div-${auction._id}`}>
                            <Link
                                className='text-decoration-none text-dark'
                                to={`/auction?auctionId=${auction._id}`}>
                                <SearchAuctionCard
                                    key={auction._id}
                                    auction={auction}
                                    token={token}
                                />
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
  )
}
