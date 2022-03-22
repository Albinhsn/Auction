import React from 'react'
import { Link } from 'react-router-dom'

export default function AuctionCard({auctionId}) {
  const catJam = 'https://static-cdn.jtvnw.net/jtv_user_pictures/ec92e3d9-fc70-42e7-aee0-4fd987e306f5-profile_image-300x300.png'
  const blueWaffle = 'https://i.pinimg.com/originals/41/e3/8e/41e38e58a24f74c86cbbaccc876df0cf.png'
  //Skicka request med id't for cardet till databas som hämtar informationen vi behöver
  //Do stuff

  //Rendera ut komponenten
  return (
    <Link to={`/auction?auctionId=${auctionId}`}> 
      <div className='card ms-1 me-1'>
        AuctionCard
        <img className="card-img-bot" style={{height: "15vh", width: "25vh", borderRadius: "50%"}} src={catJam} alt="CatJam"/>
      </div>
    </Link>
  )
}
