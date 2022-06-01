import React from 'react'
import Jumbo from '../Components/Homepage/Jumbo'
import Explore from '../Components/Homepage/Explore'
import {useState, useEffect} from 'react'
import auctionService from '../Services/auctionService'
import HomepageCategories from '../Components/Homepage/HomepageCategories'
import SearchBar from '../Components/Homepage/SearchBar'
import { useNavigate } from 'react-router'

export default function Home() {
  
  
  const [auctionsByBid, setAuctionsByBid] = useState([]) 
  const [auctionsByPurchase, setAuctionsByPurchase] = useState([]) 
  const [auctionsByTime, setAuctionsByTime] = useState([]) 
  const [searchInput, setSearchInput] = useState("")

  const navigate = useNavigate()

  

  useEffect(() => {

    auctionService.getAuctionByHighestBidAsc().then(response => {      
      
      setAuctionsByBid(response.data.slice(0,4))
      
    })

    auctionService.getAuctionsByPurchasePriceAsc().then(response => {            
      setAuctionsByPurchase(response.data.slice(0,4))
      
    })
    
    auctionService.getAuctionsByTimeRemainingAsc().then(response => {          
      setAuctionsByTime(response.data.slice(0,4))
      
    })

  }, [])

  const GetAuctionsBySearch = () => {    
    navigate(`/search?=${searchInput}`)
  }

  return (
    <div className='row justify-content-center d-flex'>
      
      <div className='col col-lg-10'>
        <Jumbo />
        <SearchBar getAuctionsBySearch={GetAuctionsBySearch} search={searchInput} setSearch={setSearchInput}/>
        <div className='row justify-content-center'>
          <div className='col-2'>
            <HomepageCategories /> 
          </div>
          <div className='col-7'>
            <Explore auctions={auctionsByPurchase} title={"Lägsta Köp nu Pris"}/>
            <Explore auctions={auctionsByTime} title={"Avslutas Snart..."} />
            <Explore auctions={auctionsByBid} title={"Lägsta Bud"} />
          </div>
        </div>
      </div>
      
    </div>
  )
}
