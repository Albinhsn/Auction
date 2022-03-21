import React from 'react'
import {Link} from 'react-router-dom'


export default function Navbar({authId}) {
  return (
    authId ? 
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <Link to={"/"} className="nav-link navbar-brand">Auctionista</Link>
          <div className="justify-content-end">
            <ul className="navbar-nav">
              <li><Link to={"/profile/favorites"} className="nav-link">Favoriter</Link></li>
              <li><Link to={"/profile/searches"} className="nav-link">Sökningar</Link></li>
              <li><Link to={"/profile/auction"} className="nav-link">Mina Auktioner</Link></li>
              <li><Link to={"/profile/favorites"} className="nav-link">Skapa Auktion</Link></li>
              <li className="nav-item"><Link to={"/profile"} className="nav-link">Profil</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    :
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link to={"/"} className="nav-link navbar-brand">Auctionista</Link>
          
          <div className="collapse navbar-collapse justify-content-end">
            <ul className="navbar-nav">
              <li><Link to={"/profile/favorites"} className="nav-link">Favoriter</Link></li>
              <li><Link to={"/profile/searches"} className="nav-link">Sökningar</Link></li>
              <li><Link to={"/profile/auction"} className="nav-link">Mina Auktioner</Link></li>
              <li><Link to={"/profile/favorites"} className="nav-link">Skapa Auktion</Link></li>
              <li className="nav-item"><Link to={"/Login"} className="nav-link">Login</Link></li>
            </ul>
          </div>
        </div>
      </nav>
  )
}
