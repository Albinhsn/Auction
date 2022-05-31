import React from 'react'
import {Link} from 'react-router-dom'


export default function Navbar({token, setToken}) {
  
  const logout = () => {
    localStorage.removeItem("access_token")
    setToken('')
  }
  
  return (
    token ? 
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="col-5 mx-3">
        <Link to={"/"} className="nav-link navbar-brand">Auctionista</Link>
        </div>        
        <ul className="container navbar-nav justify-content-end">
          <li><Link to={"/favorites"} className="nav-link">Favoriter</Link></li>
          <li><Link to={"/profile/watchlist"} className="nav-link">Watchlist</Link></li>
          <li><Link to={"/profile/auction"} className="nav-link">Mina Auktioner</Link></li>
          <li><Link to={"/create/auction"} className="nav-link">Skapa Auktion</Link></li>
          <li className="nav-item"><Link to={"/profile"} className="nav-link">Profile</Link></li>
          <li className='nav-item' onClick={() => logout()}><Link to={"/"} className='nav-link'>Logga ut</Link></li>
        </ul>
    </nav>
    :
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="col-5 mx-3">
          <Link to={"/"} className="nav-link navbar-brand">Auctionista</Link>
          </div>        
            <ul className="container navbar-nav justify-content-end">
              <li className="nav-item"><Link to={"/Login"} className="nav-link">Login</Link></li>
            </ul>
      </nav>
  )
}
