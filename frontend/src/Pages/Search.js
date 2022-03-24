import React from 'react'
import SearchComponent from '../Components/SearchComponent'
import {useState, useEffect} from 'react'
import * as utils from '../Helpers/utils'



export default function Search({auctions, authId, users}){
    
    const search = new URLSearchParams(window.location.search).get("search")

    const [localAuc, setAuc] = useState([])
    const [user, setUser] = useState()
    useEffect(() => {
        if(localAuc.length == 0){
            setAuc(auctions)
        }
        if(!user && users.length > 0){
            for(let i = 0; i<users.length; i++){
                if(users[i].Id === parseInt(authId)){
                    setUser(users[i])
                }
            }
        }
    },[])
    const FilterAuc = (type) =>{
        var newLoc = []
        switch(type){
            case "Price":
                newLoc = utils.PriceSort([...localAuc])
                break;
            case "Quality":
                newLoc = utils.QualitySort([...localAuc])
                break;
            case "Time":
                newLoc = utils.DateSortEnd([...localAuc])
                break;
                default:
                    newLoc = localAuc
                    break;
                }
                setAuc(newLoc)
    }
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
                    


                {
                localAuc.map(auction => {
                    if(auction.Title.toLowerCase().includes(search.toLowerCase())){
                        return (
                            <div className='pt-3' key={auction.Id}>
                                <SearchComponent key={auction.Id} auction={auction} user={user} users={users}/>
                            </div>
                        )
                    }  
                })}
            </div>
        </div>
    )
}