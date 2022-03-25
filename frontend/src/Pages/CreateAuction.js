import React from 'react'

import CreateAuctionForm from '../Components/Forms/CreateAuctionForm';

export default function CreateAuction({setAuctions, auctions, authId}) {
    return (
        <CreateAuctionForm auctions={auctions} setAuctions={setAuctions} authId={authId}/>
  )
}
