import React from 'react'
import SearchComponent from '../Components/Auctions/Cards/SearchComponent'
import {useState, useEffect} from 'react'
import * as utils from '../Helpers/utils'



export default function Search({auctions, authId, users}){
    
    const search = new URLSearchParams(window.location.search).get("search")

    const [localAuc, setAuc] = useState([])
    const [user, setUser] = useState()
    const [filters, setFilters] = useState([{
        B: false,
        Name: "Nikon"
    },
    {
        B: false,
        Name: "Sony"
    },
    {
        B: false,
        Name: "Canon"
    },
    {
        B: false,
        Name: "Systemkamera"
    },
    {
        B: false,
        Name: "Kompaktkamera"
    },{
        B: false,
        Name: "Mellanformatskamera"
    },
    {
        B: false,
        Name: "Pågående"
    },
    {
        B: false,
        Name: "Slut"
    }
])
    let [filterAuc, setFilterAuc] = useState([])
    
    
    
    
    
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
        for(let i = 0; i<filters.length; i++){
            if(filters[i].B){
                if(type === "Name"){
                    filterAuc = filterAuc.concat(utils.TypeFilter(auctions, filters[i].Name))
                }
                else if (type === "Tag"){
                    filterAuc = filterAuc.concat(utils.TagFilter(auctions, filters[i].Name))
                }
                else if (type === "State"){
                    filterAuc = filterAuc.concat(utils.StateFilter(auctions, filters[i].Name))
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
                    <input type="checkbox" id="Pågående" className='ms-2' onChange={e => Filter(e, "State")}/>
                    <label className='ms-3'>
                        Slut
                    </label>
                    <input type="checkbox" id="Slut" className='ms-2' onChange={e => Filter(e, "State")}/>
                    <label htmlFor="ongoing" className='ms-3'>
                        Nikon
                    </label>
                    <input type="checkbox" id="Nikon" name="Nikon" className='ms-2' onChange={e => Filter(e, "Name")}/>
                    <label htmlFor="ongoing" className='ms-3'>
                        Sony
                    </label>
                    <input type="checkbox" id="Sony" name="Sony" className='ms-2' onChange={e => Filter(e, "Name")}/>
                    <label htmlFor="ongoing" className='ms-3'>
                        Canon
                    </label>
                    <input type="checkbox" id="Canon" name="Canon" className='ms-2' onChange={e => Filter(e, "Name")}/>
                    <label htmlFor="ongoing" className='ms-3'>
                        Systemkamera
                    </label>
                    <input type="checkbox" id="Systemkamera" name="Systemkamera" className='ms-2' onChange={e => Filter(e, "Tag")}/>
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