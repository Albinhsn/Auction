import React from 'react'
import { useNavigate } from 'react-router'
import * as auctionHelpers from '../../../Helpers/auctionHelpers'
export default function DutchAuctionCardInfo({token, auction, setAuction}) {
  
  return (
      <div className='d-flex'>          
          <button type="button" className="btn btn-warning ms-3"
              onClick={() => auctionHelpers.makePurchase(token, auction.id, setAuction)}
          >
              Köp
          </button>
      </div>
  )
}
