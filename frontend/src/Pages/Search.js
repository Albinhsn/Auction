import React from 'react'
import {useState, useEffect} from 'react'
import SearchFilters from '../Components/Search/SearchFilters'
import auctionService from '../Services/auctionService'
import SearchAuctionCard from '../Components/Auctions/Cards/SearchAuctionCard'
import Searchbar from '../Components/Homepage/SearchBar'


export default function Search({token}){
    
    const [auctions, setAuctions] = useState()
    const [localAuc, setLocalAuc] = useState()
    const [search, setSearch] = useState(new URLSearchParams(window.location.search).get("search"))
    const [currentFilters, setCurrentFilters] = useState([])
    useEffect(() => {
        getAuctionsBySearch()
    }, [])

    const getAuctionsBySearch = () => {
        auctionService.getAuctionsBySearch(search).then(response => {
            
            setLocalAuc(response.data.filter(auc => auc.state !== "Slut"))
            setAuctions(response.data)
            
        })
        currentFilters.map(filter => {
            filter.val.map(v => {
                document.getElementById(`${v.replace(/\s/g, "")}`).checked = false
            })
            
        })
        setCurrentFilters([])
    }
    


    if(!auctions || !localAuc) return <></>
    return (
        <div className='d-flex justify-content-center pt-3'>
            <div className='col-2'>
                <SearchFilters auctions={auctions} setLocalAuc={setLocalAuc} localAuc={localAuc} currentFilters={currentFilters} setCurrentFilters={setCurrentFilters}/>
            </div>
            <div className='col-6'>
                <Searchbar getAuctionsBySearch={getAuctionsBySearch} setSearch={setSearch} search={search}/>
                {localAuc.map(auction => {                    
                    return (
                        <SearchAuctionCard key={auction.id} search={true} auction={auction} token={token}/>
                    )
                })}
            </div>
        </div>
    )
}