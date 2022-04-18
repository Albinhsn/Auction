import {React} from 'react'
import * as filterHelpers from '../../Helpers/filterHelpers'

export default function SearchFilterTag({currentFilters, setCurrentFilters, arr, title}){
    return(
        <div key={title}>
            <p className='mb-0'>
                {title}
            </p>
            {arr.map(ele => {
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
            })}
            <hr/>
        </div>
    )
}