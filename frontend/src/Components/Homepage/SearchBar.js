import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Searchbar({getAuctionsBySearch, setSearch, search}) {
    

    return (
      <div className="SearchBar input-group justify-content-center mb-2">        
        <input type="text" id="search-input" onChange={e => setSearch(e.target.value)} style={{width: "40%"}}/>
        <Link to={`/search?search=${search}`} className="text-decoration-none">
        <span className='input-group-text'    onClick={() => {getAuctionsBySearch(); document.querySelector("#search-input").value = '';}}>Sök</span>
        </Link>
      </div>
    );
  }