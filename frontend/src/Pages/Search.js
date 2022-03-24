import React from 'react'
import SearchComponent from '../Components/SearchComponent'
import {useState, useEffect} from 'react'
import * as utils from '../Helpers/utils'



export default function MyAuctions({auctions, user}){
    
    const search = new URLSearchParams(window.location.search).get("search")

    const [localAuc, setAuc] = useState([])
    useEffect(() => setAuc(auctions),[])
    const FilterAuc = (type) =>{
        console.log("HAHAHA")
        switch(type){
            case "Price":
                setAuc(utils.PriceSort(localAuc))
                break;
            case "Quality":
                setAuc(utils.QualitySort(localAuc))
                break;
            case "Time":
                setAuc(utils.DateSortEnd(localAuc))
                break;
            default:
                break;
        }
    }
    console.log(localAuc)
    return (
        
        
        <div className=' d-flex justify-content-center '>
            <div className='col-6'>
                    <div className="col-12 row">
                    <div className='col-8'>
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
                        <li><a className="dropdown-item" onClick={() => FilterAuc("Price")} >Price</a></li>
                        <li><a className="dropdown-item" onClick={() =>FilterAuc("Quality")} >Quality</a></li>
                        <li><a className="dropdown-item" onClick={() =>FilterAuc("Time")} >Time</a></li>
                        </ul>
                        </div>
                    </div>
                    


                {localAuc.map(auction => {
                    
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