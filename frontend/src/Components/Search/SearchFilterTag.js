import {React} from 'react'


export default function SearchFilterTag({arr, title}){
    return(
        <div key={title}>
            <p className='mb-0'>
                {title}
            </p>
            {arr.map(ele => {
                return(
                    <div key={ele}>                        
                        <label className='search-label'>
                            {ele}
                        </label>
                        <input 
                            type="checkbox" 
                            id={ele}
                            name={ele}
                            className="ms-2"
                        />
                        <br/>       
                    </div>
                )
            })}
            <hr/>
        </div>
    )
}