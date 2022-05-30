import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Searchbar({getAuctionsBySearch, setSearch, search}) {
    

    return (
      <div className="SearchBar input-group justify-content-center">        
        <input type="text" onChange={e => setSearch(e.target.value)} style={{width: "40%"}}/>
        <Link to={`/search?search=${search}`} className="text-decoration-none">
          <span className='input-group-text'    onClick={getAuctionsBySearch}>Sök</span>
        </Link>
      </div>
    );
  }