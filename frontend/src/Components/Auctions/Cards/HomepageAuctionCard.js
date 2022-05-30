import {React, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import TimeRemaining from '../../Time/TimeRemaining'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import * as datesHelpers from '../../../Helpers/datesHelpers'
import * as imageHelpers from '../../../Helpers/imageHelpers'
import * as auctionHelpers from '../../../Helpers/auctionHelpers'


export default function HomepageAuctionCard({ auction, token}) {
  
  const [date, setDate] = useState()
  const [favorite, setFavorite] = useState(false)
  useEffect(() => {
    if (!date) {
      setDate(datesHelpers.reformatDate(datesHelpers.getTimeRemaining(auction.endDate)))
    }
  })
  useEffect(() => {

  })
  
  return (
    <Link to={`/auction?auctionId=${auction.id}`} className="text-decoration-none" key={auction.id}> 
      
      <div className='card text-secondary justify-content-center bg-light mb-3 mx-2' style={{height: "27vh", width: "20vh"}}>
        
        {auction.images.length > 0? 
          <img className="card-img-top img-fluid" style={{ height: "14vh"}} src={imageHelpers.convertToUrl(auction.images[0])} alt={auction.name} />
        : 
          <></>
        }
        
        <div className='card-body p-0'>
          
            <p className='fs-5 mb-0' style={{overflow: "hidden", textOverflow: "ellipsis", width: "20vh", whiteSpace: "nowrap"}}>{auction.name}</p>
            <div className='row' >   
              <div className='col-8'>
                <TimeRemaining 
                  date={date}
                  className='d-flex justify-content-center'
                
                />
            
                  {auction.auctionType === "Schweizisk" || auction.auctionType === "Holländsk"
                  ?  
                    <></>
                  : 
                    <p className='mb-0' style={{fontSize: "1.75vh"}}>{auction.highestBid === 0 ? auction.minimumBid : auction.highestBid} kr</p>
                  }          
                  {auction.auctionType != "Schweizisk" && auction.purchasePrice != 0 ? 
                    <p className='mb-0' style={{fontSize: "1.75vh"}}>
                        Köp:{auction.purchasePrice}kr
                    </p>
                  :
                    <p className='mb-0' style={{fontSize: "1.5vh"}}>Mörk budgivning</p>
                  }
              </div>
              <div className='col-4 d-flex align-items-baseline'>
                <FontAwesomeIcon icon={faHeart} className="fa-xl mt-1"
                      onClick={() => auctionHelpers.favoriteChange(token, auction.id, favorite, setFavorite)} style={{ color: favorite ? "red" : "black"}}
                    />
              </div>
            </div>
        </div>
      </div>
    </Link>
  )
}
