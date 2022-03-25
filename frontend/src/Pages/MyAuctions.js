import {React, useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import SearchComponent from '../Components/Auctions/Cards/SearchComponent'

export default function MyAuctions({authId, auctions, users,}){
    const [user, setUser] = useState('')

    useEffect(() => {
        if (users.length <= 0) return <></>
        for (let i = 0; i < users.length; i++) {
            if (parseInt(authId) === users[i].Id) {
                setUser(users[i])
            }
        }
    })
    return (
        <div className='d-flex justify-content-center'>
            <div className='col-6'>
                {auctions.map(auction => {
                   
                    if(auction.Seller === authId ||auction.Winner === authId){
                        return(
                            <div className='pt-3' key={auction.Id}>
                                <Link className='text-decoration-none text-dark' to={`/auction?auctionId=${auction.Id}`}><SearchComponent key={auction.Id} auction={auction} users={users} user={user} myAuctions={"myAuctions"}/></Link>
                            </div>
                        )
                    }
                })}
                
            </div>
        </div>
    )
}