
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap';
import "./App.css"
import {useState, useEffect} from 'react'

//Pages and Components import
import Navbar from './Components/Navbar'
import Home from "./Pages/Home";
import Login from './Pages/Login';
import Search from './Pages/Search';
import Profile from './Pages/Profile';
import Auction from './Pages/Auction';
import Footer from './Components/Footer';
import Signup from './Pages/Signup';
import MyAuctions from './Pages/MyAuctions';
import SearchBar from './Components/SearchBar';
import CreateAuction from './Pages/CreateAuction';
//Data Import
import auctionJSON from './Auctions/auctions.json'
import userJSON from './Users/users.json'


function App() {

  const [authId, setAuthId] = useState('')
  const [auctions, setAuctions] = useState([])
  const [users, setUsers] = useState([])
  
  useEffect(() => {
    setAuctions(auctionJSON)
    setUsers(userJSON)
  }, [])
  return (
    <BrowserRouter>
      <div className="d-flex flex-column" style={{height: "100vh"}}>
        <Navbar authId={authId} setAuthId={setAuthId}/>
        <Routes>
          <Route index element={<Home auctions={auctions}/>} />
          <Route path="/profile" element={<Profile authId={authId} users={users} setUsers={setUsers}/>}/>
          <Route path="/login" element={<Login setAuthId={setAuthId} users={users} setUsers={setUsers}/>}/>
          <Route path="/search" element={<Search auctions={auctions} users={users}/>}/>
          <Route path="/searchBar" element={<SearchBar/>}/>
          <Route path="/auction" element={<Auction auctions={auctions} users={users} authId={authId} setAuctions={setAuctions}/>}/>
          <Route path="/signup" element={<Signup setAuthId={setAuthId} authId={authId} setUsers={setUsers} users={users}/>}/>
          <Route path="/profile/auction" element={<MyAuctions auctions={auctions} authId={authId}/>}/>
          <Route path="/create/auction" element={<CreateAuction auctions={auctions} setAuctions={setAuctions} authId={authId}/>}/>
        </Routes>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
