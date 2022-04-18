import {React, useEffect, useState} from 'react'

import * as filterHelpers from '../../Helpers/filterHelpers'
import * as sortingHelpers from '../../Helpers/sortingHelpers'

import SearchFilterTag from './SearchFilterTag'

export default function SearchFilters({setLocalAuc, auctions}){

    const [sort, setSort] = useState('')
    const [currentFilters, setCurrentFilters] = useState([])
    useEffect(() => {
            
            //Sort list
            
            switch(sort){
                case 'PriceAsc':
                    break;
                case 'Quality':
                    break;
                case 'Time':
                    break;
                default: 
                    break;
            }
            filterHelpers.filterAuctions(auctions, setLocalAuc, currentFilters)
        }, [currentFilters])

    const filters = [
        ["Pågående", "Slut"],
        ["Nikon", "Sony", "Canon", "Fujifilm", "Panasonic", "Olympus"],
        ["Systemkamera", "Mellanformatskamera", "Kompaktkamera"],
        ["Canon EOS M", "Fuji X", "Nikon Z", "Sony E", "Canon RF", "Fuji GF", "Canon EF"],
        ["12", "16", "17", "20", "20.1", "20.3", "20.5", "24.1", "24.2", "24.5", "26", "26.1", "30.3", "32.5", "42.4", "45", "102", ],
        ["Ja", "Nej"],
        ["1'", "2.3'" ,"High Sens MOS", "APS-C", "43.8x32.9", "24x36"],
        ["Fast skärm", "Fällbar med selfieläge", "Fällbar", "Full router- & fällbar"],
        ["SD", "SDHC", "SDXC", "CFexpress type B", "XQD", "UHS-II"],
        ["Bluetooth", "Wi-Fi", "NFC", "GPS"]
    ]
    const titles = [
        "Status",
        "Märke",
        "Typ av kamera",
        "Lens",
        "Upplösning",
        "Vädertålig",
        "Bildsensorstorlek",
        "Skärmvinkel",
        "Minneskort",
        "Trådlös Uppkoppling"
    ]
    

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
                {filters.map((filter,i) => {
                    return(
                        <SearchFilterTag currentFilters={currentFilters} setCurrentFilters={setCurrentFilters} arr={filter} title={titles[i]} key={titles[i]}/>
                    )
                })}
                            
                
            </div>
            
        </div>
    )
}