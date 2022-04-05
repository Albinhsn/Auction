import React from 'react'
import {useState, useEffect} from 'react'
import SearchFilters from '../Components/Search/SearchFilters'
import auctionService from '../Services/auctionService'
import SearchAuctionCard from '../Components/Auctions/Cards/SearchAuctionCard'


export default function Search({authId}){
    
    const [auctions, setAuctions] = useState()
    const [localAuc, setLocalAuc] = useState()
    useEffect(() => {
        let search = new URLSearchParams(window.location.search).get("search")
        auctionService.getAuctionsBySearch(search).then(response => {
            setAuctions(response.data)
            setLocalAuc(response.data.filter(auc => auc.state !== "Slut"))
        
        })        
    },[])

    if(!auctions || !localAuc) return <></>

    return (
        <div className='d-flex justify-content-center pt-3'>
            <div className='col-2'>
                <SearchFilters auctions={auctions} setLocalAuc={setLocalAuc} localAuc={localAuc}/>
            </div>
            <div className='col-6'>
                    
                {localAuc.map(auction => {
                    return (
                        <SearchAuctionCard key={auction._id} auction={auction} authId={authId}/>
                    )
                })}
            </div>
        </div>
    )
}