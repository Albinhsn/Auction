import React from 'react'
import SearchComponent from '../Components/SearchComponent'

export default function MyAuctions({auctions, user}){
    
    const search = new URLSearchParams(window.location.search).get("search")
    console.log(search)
    

    return (
        
        
        <div className=' d-flex justify-content-center '>
            <div className='col-6'>
                    <div className="col-12 row">
                    <div className='col-8'>
                    <input type="text" placeholder='Sök efter Namn'/>
                    <label htmlFor="ongoing" className='ms-3'>DSLR</label>
                    <input type="checkbox" name="ongoing" className='ms-2'/>
                    <label htmlFor="ongoing" className='ms-3'>Action Kamera</label>
                    <input type="checkbox" name="sold" className='ms-2'/>
                    </div>
                    <div className='col-4 d-flex justify-content-end'>
                    <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                        Sortering
                    </a>

                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <li><a className="dropdown-item" href="#">Price</a></li>
                        <li><a className="dropdown-item" href="#">Quality</a></li>
                        <li><a className="dropdown-item" href="#">Time</a></li>
                        </ul>
                        </div>
                    </div>
                    


                {auctions.map(auction => {
                    
                    if(auction.Title.toLowerCase().includes(search.toLowerCase())){
                        return (
                            <div className='pt-3' key={auction.Id}>
                                <SearchComponent key={auction.Id} auction={auction} user={user} />
                            </div>
                        )
                    }
                    
                    
                })}
            </div>
        </div>
    )
}