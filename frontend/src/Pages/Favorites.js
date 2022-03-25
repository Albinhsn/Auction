import {React, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import SearchComponent from '../Components/Auctions/Cards/SearchComponent'
export default function Favorites({authId, auctions, users}) {
    const [user, setUser] = useState('')
    
    useEffect(() => {
        if (users.length <= 0) return <></>
        for (let i = 0; i < users.length; i++) {
            if (parseInt(authId) === users[i].Id) {
                setUser(users[i])
            }
        }
    }, )

    

    if(user === '') return<></>

    return (
        <div className='d-flex justify-content-center'>
            <div className='col-6'>
                <div>
                    <input type="text" placeholder='Sök efter Namn' />
                    <label htmlFor="ongoing" className='ms-3'>
                        Pågående
                    </label>
                    <input type="checkbox" name="ongoing" className='ms-2' />
                    <label htmlFor="ongoing" className='ms-3'>
                        Slut
                    </label>
                    <input type="checkbox" name="sold" className='ms-2' />
                </div>

                {auctions.map(auction => {
                    if (user.Favorites.includes(auction.Id)) {
                        return (
                            <div className='pt-3' key={auction.Id}>
                                <Link className='text-decoration-none text-dark' to={`/auction?auctionId=${auction.Id}`}><SearchComponent key={auction.Id} auction={auction} users={users} user={user}/></Link>
                            </div>
                        )
                    }
                })}

            </div>
        </div>
    )
}
