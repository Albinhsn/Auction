import {React, useState} from 'react'

import * as filterHelpers from '../../Helpers/filterHelpers'
import * as sortingHelpers from '../../Helpers/sortingHelpers'


export default function SearchFilters({setLocalAuc, localAuc, auctions}){

    const [sort, setSort] = useState()


    

    return (
        <div className="col-12 row flex-column">
            <div className='col-8 ms-3'>
            <div className='col-4 ms-4'>
                <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                    Sortering
                </a>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                
                <li><a className="dropdown-item" 
                    onClick={() => {
                        setLocalAuc(sortingHelpers.PurchasePriceSort([...auctions]));
                        setSort("PriceAsc");
                    }}
                    >
                        Price Asc
                </a></li>

                    <li><a className="dropdown-item" 
                        onClick={() => 
                            {
                                setLocalAuc(sortingHelpers.QualitySort([...auctions]));
                                setSort("Quality");
                            }}
                        >
                            Quality
                </a></li>
                
                    <li><a className="dropdown-item" 
                        onClick={() => {
                            setLocalAuc(sortingHelpers.DateSortEnd([...auctions]));
                            setSort("Time");
                            }}
                        >
                            Time
                </a></li>
                </ul>
            </div>
                <div className=''>
                    <p className='mb-0'>
                        Status: 
                    </p>                    
                    <label for="pågående" className='search-label'>
                        Pågående
                    </label>
                    <input type="checkbox" id="pågående" className='ms-2' />
                    <br/>
                    <label className='search-label'>
                        Slut
                    </label>
                    <input type="checkbox" id="Slut" className='ms-2'/>
                </div>
                <hr/>
                <p className='mb-0'>
                    Brand:
                </p>
                <label htmlFor="ongoing" className='search-label'>
                    Nikon
                </label>
                <input type="checkbox" id="Nikon" name="Nikon" className='ms-2'/>
                <br/>
                <label htmlFor="ongoing" className='search-label'>
                    Sony
                </label>
                <input type="checkbox" id="Sony" name="Sony" className='ms-2'/>
                <br/>
                <label htmlFor="ongoing" className='search-label'>
                    Canon
                </label>
                <input type="checkbox" id="Canon" name="Canon" className='ms-2'/>
                <hr/>
                <p className='mb-0'>
                    Typ av kamera:
                </p>
                <label htmlFor="ongoing" className='search-label'>
                    Systemkamera
                </label>
                <input type="checkbox" id="Systemkamera" name="Systemkamera" className='ms-2' />
                <br/>
                <label htmlFor="ongoing" className='search-label'>
                    Mellanformatskamera
                </label>
                <input type="checkbox" id="Mellanformatskamera" name="Mellanformatskamera" className='ms-2'/>
                <br/>
                <label htmlFor="ongoing" className='search-label'>
                    Kompaktkamera
                </label>
                <input type="checkbox" id="Kompaktkamera" name="Kompaktkamera" className='ms-2' />
            </div>
            
        </div>
    )
}