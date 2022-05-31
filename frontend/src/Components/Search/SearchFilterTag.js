import {React, useState} from 'react'
import * as filterHelpers from '../../Helpers/filterHelpers'

export default function SearchFilterTag({currentFilters, setCurrentFilters, arr, title}){
    
    const [showMore, setShowMore] = useState(false)
    
    
    return(
        <div key={title}>
            <p className='mb-0 fs-5'>
                {title}
            </p>
            {showMore ? 
                <>{arr.map(ele => {
                    return(
                        <div key={ele.replace(/\s/g, "")}>                        
                            <label className='search-label'>
                                {ele}
                            </label>
                            <input 
                                type="checkbox" 
                                id={ele.replace(/\s/g, "")}
                                name={ele}
                                className="ms-2"
                                onClick={
                                    () => filterHelpers.handleFilterChange(currentFilters, setCurrentFilters, title, ele)}
                            />
                            <br/>       
                        </div>
                    )
                })}</>
                : 
                <>                
                {arr.slice(0,3).map(ele => {
                    return(
                        <div key={ele.replace(/\s/g, "")}>                        
                            <label className='search-label'>
                                {ele}
                            </label>
                            <input 
                                type="checkbox" 
                                id={ele.replace(/\s/g, "")}
                                name={ele}
                                className="ms-2"
                                onClick={
                                    () => filterHelpers.handleFilterChange(currentFilters, setCurrentFilters, title, ele)}
                            />
                            <br/>       
                        </div>
                    )
                })}</>
            }
            
            <p style={{fontSize: "1.35vh", cursor: "pointer"}} onClick={() => setShowMore(!showMore)}> 
                {arr.length > 5  ? <>{showMore ? "visa mindre.." : "visa mer.."}</> : <></>}
            </p>
            <hr/>
        </div>
    )
}