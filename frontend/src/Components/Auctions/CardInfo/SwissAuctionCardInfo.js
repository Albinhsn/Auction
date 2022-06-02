import {React, useEffect, useState} from 'react'
import { useNavigate } from 'react-router'
import * as auctionHelpers from '../../../Helpers/auctionHelpers'
import bidService from '../../../Services/bidService'
export default function SwissAuctionCardInfo({token, auction, setAuction}) {
    
    const [bid, setBid] = useState()
    const [myBid, setMyBid] = useState()
    const navigate = useNavigate
    useEffect(() => {
        if(!myBid){
            bidService.getMyHighestBid(token, auction.id).then(response => {                
                if(!response.data){
                    setMyBid(-1)
                }else{
                    setMyBid(response.data.amount)
                }                
            })
        }        
    }, [myBid])

    



    return (
      <>
        <div className='d-flex mt-2'>
            <input type="number" id="bid-input" className="" placeholder={myBid === -1 ? "minst 10" : `minst ${parseInt(myBid) + 10}`}
                onChange={e => setBid(e.target.value)}
            />
            
                
            <button type="button" className="btn btn-warning ms-3"
                onClick={() => {auctionHelpers.handleSwissBid(token, auction, bid, myBid, setMyBid); document.querySelector("#bid-input").value = ""}}
            >
                Lägg bud
            </button>
            <p className='ms-1 align-self-center m-0'>Frakt: {auction.postage}</p>
            
        </div>
            <p className='text-success fs-5 mb-0'> {myBid === -1 ? "Du har inte lagt något bud" : myBid}</p>
    </>
  )
}
