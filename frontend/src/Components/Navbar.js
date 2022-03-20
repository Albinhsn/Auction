import React from 'react'
import {Link} from 'react-router-dom'


export default function Navbar() {
  const authId = "1";
  return (
    authId ? 
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <Link to={""} className="nav-link navbar-brand">Auctionista</Link>
          <div className="collapse navbar-collapse justify-content-end">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">Profile</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    :
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link to={""} className="nav-link navbar-brand">Auctionista</Link>
          <div className="collapse navbar-collapse justify-content-end">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to={"/Login"} className="nav-link">Login</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
  )
}
