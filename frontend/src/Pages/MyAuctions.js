import React from 'react'
import { Link } from 'react-router-dom'
import SearchComponent from '../Components/SearchComponent'

export default function MyAuctions({authId, auctions, users,}){
    return (
        <div className='d-flex justify-content-center'>
            <div className='col-6'>
                <div>
                    <input type="text" placeholder='Sök efter Namn'/>
                    <label htmlFor="ongoing" className='ms-3'>
                        Pågående
                    </label>
                    <input type="checkbox" name="ongoing" className='ms-2'/>
                    <label htmlFor="ongoing" className='ms-3'>
                        Slut
                    </label>
                    <input type="checkbox" name="sold" className='ms-2'/>
                </div>
                
                {auctions.map(auction => {
                   
                    if(auction.Seller === authId){
                        return(
                            <div className='pt-3' key={auction.Id}>
                                <Link className='text-decoration-none text-dark' to={`/auction?auctionId=${auction.Id}`}><SearchComponent key={auction.Id} auction={auction} users={users}/></Link>
                            </div>
                        )
                    }
                })}
                
            </div>
        </div>
    )
}