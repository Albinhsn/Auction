import React from 'react'
import { Link } from 'react-router-dom'

export default function AuctionCard({ auction}) {
  
  return (
    
    <Link to={`/search?search=${auction.Title}`} className="text-decoration-none" key={auction.Id}> 
      
      <div className='card text-secondary text-center bg-light mb-5 mx-3' style={{height: "15vh", width: "15vh"}}>
        {auction.Title}
        <img className="card-img-bot img-fluid" style={{height: "12vh"}} src={auction.Images[0].original} alt={auction.Title}/>
      </div>
    </Link>
  )
}
