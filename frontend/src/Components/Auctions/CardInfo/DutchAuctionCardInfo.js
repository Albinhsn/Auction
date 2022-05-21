import React from 'react'
import * as auctionHelpers from '../../../Helpers/auctionHelpers'
export default function DutchAuctionCardInfo({token, auction, setAuction}) {
  return (
      <div className='d-flex'>
          <p className='ms-1 align-self-center m-0'>Frakt: {auction.postage}</p>
          <button type="button" className="btn btn-warning ms-3"
              onClick={() => auctionHelpers.makePurchase(token, auction._id, setAuction)}
          >
              Köp
          </button>
      </div>
  )
}
