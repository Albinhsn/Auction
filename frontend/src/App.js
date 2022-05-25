// 7151 - Postage
// 7266 - Bid
// 7057 - Email
// 7279 - User
// 7157 - Watchlist
// 7292 - Auth
// 7141 - Image
// 7086 - Auction

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap';
import "./App.css"
import {useState, useEffect} from 'react'

//Pages and Components import
import Navbar from './Components/Homepage/Navbar'
import Home from "./Pages/Home";
import Login from './Pages/Login';
import Search from './Pages/Search';
import Profile from './Pages/Profile';
import Auction from './Pages/Auction';
import Footer from './Components/Homepage/Footer';
import Signup from './Pages/Signup';
import MyAuctions from './Pages/MyAuctions';
import CreateAuction from './Pages/CreateAuction';

import Favorites from './Pages/Favorites';
import Watchlist from './Pages/Watchlist';


function App() {

  const [token, setToken] = useState()

  console.log(token)
  useEffect(() => {
    
    if(!token){
      try {
        setToken(JSON.parse(localStorage.getItem("access_token")))
        
      } catch (error) {
        console.log(error)
      }
    }
  }, )
  
  return (
    <BrowserRouter>
      <div className="d-flex flex-column" style={{height: "100vh"}}>
        <Navbar token={token} setToken={setToken}/>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/profile" element={<Profile token={token} />}/>
          <Route path="/login" element={<Login setToken={setToken}/>}/>
          <Route path="/search" element={<Search  token={token}/>}/>
          <Route path="/auction" element={<Auction  token={token} />}/>
          <Route path="/signup" element={<Signup setToken={setToken} token={token}/>}/>
          <Route path="/profile/auction" element={<MyAuctions  token={token}/>}/>
          <Route path="/profile/watchlist" element={<Watchlist  token={token} />} />
          <Route path="/create/auction" element={<CreateAuction   token={token}/>}/>
          <Route path="/favorites" element={<Favorites  token={token}/>}/>

        </Routes>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
