import React from 'react'
import SearchComponent from '../Components/Auctions/Cards/SearchAuctionCard'
import {useState, useEffect} from 'react'
import SearchFilters from '../Components/Search/SearchFilters'
import auctionService from '../Services/auctionService'
import SearchAuctionCard from '../Components/Auctions/Cards/SearchAuctionCard'


export default function Search({authId}){
    
    const [auctions, setAuctions] = useState()

    useEffect(() => {
        let search = new URLSearchParams(window.location.search).get("search")
        auctionService.getAuctionsBySearch(search).then(response => {
            setAuctions(response.data)
        })
    },[])
   
    if(!auctions) return <></>

    return (
        <div className='d-flex justify-content-center pt-3'>
            <div className='col-2'>
                <SearchFilters/>
            </div>
            <div className='col-6'>
                    
                {auctions.map(auction => {
                    return (
                        <SearchAuctionCard key={auction.Id} auction={auction} authId={authId}/>
                    )
                })}
            </div>
        </div>
    )
}