import {React, useState} from 'react'
import * as auctionHelpers from "../../../Helpers/auctionHelpers"
import { useNavigate } from 'react-router';
export default function EnglishAuctionCardInfo({setAuction, auction, token}) {
    const [bid, setBid] = useState(0)
    const navigate = useNavigate()
    
    const handleBid = () => {
        if(!token) {

            
        }
    }


    return (
      <>
        <div className='d-flex'>
            <input type="number" id="bid-input" className="" placeholder={`Minsta bud: ${auction.highestBid + 10}`}
                onChange={e => setBid(e.target.value)}
            />
            <button type="button" className="btn btn-warning ms-1" id="make-bid-btn" style={{ height: "5vh" }}
                onClick={() => auctionHelpers.handleBid(token, auction, bid, setAuction, navigate)}>
                Lägg bud
            </button>
            
            {auction.purchasePrice > 0 ?
                <button type="button" className='btn btn-warning ms-1' style={{ height: "5vh" }}
                    onClick={() => auctionHelpers.makePurchase(token, auction.id, setAuction, navigate)}>
                    Köp Nu {auction.purchasePrice}
                </button>
                :
                <></>
            }
        </div>
        <div className='d-flex'>
            <div className="dropdown mt-2 pe-3">
                <a className="btn btn-warning dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                    Bud Historik
                </a>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <ul className='mb-0 ps-0'>
                    <li key="init-price" className='dropdown-item d-flex pb-0 ps-1 pe-1 pt-0 align-content-center'>
                        <p >
                            Start pris: {auction.minimumBid} Tid: {new Date(auction.startDate).toUTCString()}
                        </p>
                    </li>
                    {auction.bids.map(bid =>{                                                                                                                                    
                        return(
                            <li key={bid.id} className="dropdown-item d-flex pb-0 ps-1 pe-1 pt-0 justify-content-center">
                                <p className=''>Bud:{bid.amount} Tid: {new Date(bid.date).toUTCString()}</p>
                                
                            </li>
                        )
                    })}
                    </ul>
                </div>
            </div>
            
        </div>
    </>
  )
}
