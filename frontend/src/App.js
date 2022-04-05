
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
import SearchBar from './Components/Homepage/SearchBar';
import CreateAuction from './Pages/CreateAuction';

import Favorites from './Pages/Favorites';


function App() {

  const [authId, setAuthId] = useState('')
  const [auctions, setAuctions] = useState([])
  
  
  return (
    <BrowserRouter>
      <div className="d-flex flex-column" style={{height: "100vh"}}>
        <Navbar authId={authId} setAuthId={setAuthId}/>
        <Routes>
          <Route index element={<Home auctions={auctions}/>} />
          <Route path="/profile" element={<Profile authId={authId} />}/>
          <Route path="/login" element={<Login setAuthId={setAuthId}/>}/>
          <Route path="/search" element={<Search auctions={auctions} authId={authId}/>}/>
          <Route path="/auction" element={<Auction auctions={auctions} authId={authId} setAuctions={setAuctions}/>}/>
          <Route path="/signup" element={<Signup setAuthId={setAuthId} authId={authId}/>}/>
          <Route path="/profile/auction" element={<MyAuctions auctions={auctions} authId={authId}/>}/>
          <Route path="/create/auction" element={<CreateAuction auctions={auctions} setAuctions={setAuctions} authId={authId}/>}/>
          <Route path="/favorites" element={<Favorites auctions={auctions} authId={authId}/>}/>
        </Routes>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
