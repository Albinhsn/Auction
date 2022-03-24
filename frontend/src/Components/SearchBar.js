import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Searchbar() {
    const [searchInput, setSearchInput] = useState("");

    return (
      <div className="SearchBar input-group  w-50 ">        
        <input type="text" onChange={e => setSearchInput(e.target.value)} />
        <Link to={`/search?${searchInput}`}><span className='input-group-text'>Sök</span></Link>
      </div>
    );
  }