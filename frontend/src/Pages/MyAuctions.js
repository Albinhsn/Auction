import React from 'react'
import MyAuctionsCard from '../Components/MyAuctionsCard'
import auctions from '../Auctions/auctions.json'
export default function MyAuctions(){

    return (
        <div className='d-flex justify-content-center'>
            <div className='col-6'>
                <div>
                    <input type="text" placeholder='Sök efter Namn'/>
                    <label htmlFor="ongoing" className='ms-3'>Pågående</label>
                    <input type="checkbox" name="ongoing" className='ms-2'/>
                    <label htmlFor="ongoing" className='ms-3'>Slut</label>
                    <input type="checkbox" name="sold" className='ms-2'/>
                </div>
                
                {auctions.map(auction => {
                    return(
                        <div className='pt-3' key={auction.Id}>
                            <MyAuctionsCard key={auction.Id} auction={auction}/>
                        </div>
                    )
                    
                })}
            </div>
        </div>
    )
}