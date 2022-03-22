import React from 'react'
import { Link } from 'react-router-dom'

export default function AuctionCard({auctionId, auction}) {
  //const catJam = 'https://static-cdn.jtvnw.net/jtv_user_pictures/ec92e3d9-fc70-42e7-aee0-4fd987e306f5-profile_image-300x300.png'
  
  return (
    
    <Link to={`/search?search=${auction.Name}`} className="text-decoration-none"> 
      
      <div className='card text-secondary text-center bg-light mb-5 mx-3' style={{height: "15vh", width: "15vh"}}>
        {auction.Name}
        <img className="card-img-bot img-fluid" style={{height: "12vh"}} src={auction.Img} alt={auction.Name}/>
      </div>
    </Link>
  )
}
