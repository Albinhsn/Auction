import {React, useState} from 'react'
import * as auctionHelpers from "../../../Helpers/auctionHelpers"

export default function EnglishAuctionCardInfo({setAuction, auction, token}) {
    const [bid, setBid] = useState(0)
    return (
      <>
        <div className='d-flex'>
            <input type="number" id="bid-input" className="" placeholder={`Minsta bud: ${auction.highestBid + 10}`}
                onChange={e => setBid(e.target.value)}
            />
            <button type="button" className="btn btn-warning ms-1" style={{ height: "5vh" }}
                onClick={() => auctionHelpers.handleBid(token, auction, bid, setAuction)}>
                Lägg bud
            </button>
            {auction.purchasePrice > 0 ?
                <button type="button" className='btn btn-warning ms-1' style={{ height: "5vh" }}
                    onClick={() => auctionHelpers.makePurchase(token, auction._id, setAuction)}>
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
                            Start pris: {auction.minimumBid} Tid: {new Date(auction.startDate).toLocaleDateString("en-US")}
                        </p>
                    </li>
                    {auction.bidHistory.map(bid =>{                                                                                                                
                        return(
                            <li key={bid._id} className="dropdown-item d-flex pb-0 ps-1 pe-1 pt-0 justify-content-center">
                                <p className=''>Bud:{bid.bid} Tid: {new Date(bid.time).toLocaleDateString("en-US")}</p>
                                
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
