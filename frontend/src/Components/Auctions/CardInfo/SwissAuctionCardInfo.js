import {React, useState} from 'react'
import { useNavigate } from 'react-router'
import * as auctionHelpers from '../../../Helpers/auctionHelpers'
export default function SwissAuctionCardInfo({token, auction, setAuction}) {
    const [bid, setBid] = useState()
    const navigate = useNavigate
    return (
      <div className='d-flex mt-2'>
          <input type="number" id="bid-input" className=""
              onChange={e => setBid(e.target.value)}
          />
          
            
          <button type="button" className="btn btn-warning ms-3"
              onClick={() => auctionHelpers.handleBid(token, auction, bid, setAuction, navigate)}
          >
              Lägg bud
          </button>
            <p className='ms-1 align-self-center m-0'>Frakt: {auction.postage}</p>
      </div>
  )
}
