import React from 'react'
import SearchComponent from '../Components/Auctions/Cards/SearchAuctionCard'
import {useState, useEffect} from 'react'
import * as utils from '../Helpers/utils'



export default function Search({auctions, authId, users}){
    
    let search = new URLSearchParams(window.location.search).get("search")

    const [localAuc, setAuc] = useState([])
    const [user, setUser] = useState()
    const [filters, setFilters] = useState([{
        B: false,
        Name: "Nikon",
        Type: "Name"
    },
    {
        B: false,
        Name: "Sony",
        Type: "Name"
    },
    {
        B: false,
        Name: "Canon",
        Type: "Name"
    },
    {
        B: false,
        Name: "Systemkamera",
        Type: "Tag"
    },
    {
        B: false,
        Name: "Kompaktkamera",
        Type: "Tag"
    },{
        B: false,
        Name: "Mellanformatskamera",
        Type: "Tag"
    },
    {
        B: false,
        Name: "Pågående",
        Type: "State"
    },
    {
        B: false,
        Name: "Slut",
        Type: "State"
    }
])
    
    
    
    
    
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
    const SortAuc = (type) =>{
        var newLoc = []
        switch(type){
            case "Price":
                newLoc = utils.PriceSort([...localAuc])
                break;
            case "Quality":
                newLoc = utils.QualitySort([...localAuc])
                break;
            case "Time":
                newLoc = utils.DateSortEnd([...localAuc]).filter(a => a.State != "Slut")
                break;
                default:
                    newLoc = localAuc
                    break;
                }
                setAuc(newLoc)
    }
  
    const Filter = (e, type) => {
        
        
        let flag = false
        for(let i = 0; i<filters.length;i++){
            if(e.target.id === filters[i].Name){
                filters[i].B = !filters[i].B
                if(filters[i].B){
                    flag = true
                    
                    break;
                }
                
            }
            if(filters[i].B){
                flag = true
            }
        }
        if(!flag){
            setAuc(auctions)
            
            return
        }
        let filterAuc = auctions
        for(let i = 0; i<filters.length; i++){
            if(filters[i].B){
                if(filters[i].Type === "Name"){
                    filterAuc = utils.TypeFilter(filterAuc, filters[i].Name)
                }
                else if (filters[i].Type === "Tag"){
                    filterAuc = utils.TagFilter(filterAuc, filters[i].Name)
                }
                else if (filters[i].Type === "State"){
                    filterAuc = utils.StateFilter(filterAuc, filters[i].Name)
                }
            }
        }    
        
        setAuc(filterAuc)
    }
    

    return (
        <div className=' d-flex justify-content-center '>
            <div className='col-6'>
                    <div className="col-12 row">
                    <div className='col-8'>
                    <label className='ms-3'>
                        Pågående
                    </label>
                    <input type="checkbox" id="Pågående" className='ms-2' onChange={e => Filter(e)}/>
                    <label className='ms-3'>
                        Slut
                    </label>
                    <input type="checkbox" id="Slut" className='ms-2' onChange={e => Filter(e)}/>
                    <label htmlFor="ongoing" className='ms-3'>
                        Nikon
                    </label>
                    <input type="checkbox" id="Nikon" name="Nikon" className='ms-2' onChange={e => Filter(e,)}/>
                    <label htmlFor="ongoing" className='ms-3'>
                        Sony
                    </label>
                    <input type="checkbox" id="Sony" name="Sony" className='ms-2' onChange={e => Filter(e)}/>
                    <label htmlFor="ongoing" className='ms-3'>
                        Canon
                    </label>
                    <input type="checkbox" id="Canon" name="Canon" className='ms-2' onChange={e => Filter(e)}/>
                    <label htmlFor="ongoing" className='ms-3'>
                        Systemkamera
                    </label>
                    <input type="checkbox" id="Systemkamera" name="Systemkamera" className='ms-2' onChange={e => Filter(e)}/>
                    <label htmlFor="ongoing" className='ms-3'>
                        Mellanformatskamera
                    </label>
                    <input type="checkbox" id="Mellanformatskamera" name="Mellanformatskamera" className='ms-2' onChange={e => Filter(e, "Tag")}/>
                    <label htmlFor="ongoing" className='ms-3'>
                        Kompaktkamera
                    </label>
                    <input type="checkbox" id="Kompaktkamera" name="Kompaktkamera" className='ms-2' onChange={e => Filter(e, "Tag")}/>
                    </div>
                    <div className='col-4 d-flex justify-content-end'>
                    <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                        Sortering
                    </a>

                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <li><a className="dropdown-item" onClick={() => SortAuc("Price")} >Price</a></li>
                        <li><a className="dropdown-item" onClick={() =>SortAuc("Quality")} >Quality</a></li>
                        <li><a className="dropdown-item" onClick={() =>SortAuc("Time")} >Time</a></li>
                        </ul>
                        </div>
                    </div>
                    


                {
                localAuc.map(auction => {
                    if(!search){
                        return (
                            <div className='pt-3' key={auction.Id}>
                                <SearchComponent key={auction.Id} auction={auction} user={user} users={users}/>
                            </div>
                        )
                    }
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