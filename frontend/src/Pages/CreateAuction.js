import React from 'react'

import CreateAuctionForm from '../Components/CreateAuctionForm';

export default function CreateAuction({setAuctions, auctions}) {
    return (
        <CreateAuctionForm auctions={auctions} setAuctions={setAuctions}/>
  )
}
