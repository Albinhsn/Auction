import React from 'react'
import { Link } from 'react-router-dom'

export default function AuctionCard({auctionId, auctionName}) {
  const catJam = 'https://static-cdn.jtvnw.net/jtv_user_pictures/ec92e3d9-fc70-42e7-aee0-4fd987e306f5-profile_image-300x300.png'
  
  return (

    <Link to={`/auction?auctionId=${auctionId}`} className="text-decoration-none"> 
      <div className='card text-secondary text-center bg-light mb-5 mx-3'>
        {auctionName}
        <img className="card-img-bot" style={{height: "100%", width: "100%"}} src={catJam} alt="CatJam"/>
      </div>
    </Link>
  )
}
