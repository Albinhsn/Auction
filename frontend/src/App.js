
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap';
import "./App.css"
import {useState} from 'react'
import auctions from './Auctions/auctions.json'

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


function App() {

  const [authId, setAuthId] = useState('')
  return (
    <BrowserRouter>
      <div className="d-flex flex-column" style={{height: "100vh"}}>
        <Navbar authId={authId} setAuthId={setAuthId}/>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/login" element={<Login setAuthId={setAuthId}/>}/>
          <Route path="/search" element={<Search/>}/>
          <Route path="/searchBar" element={<SearchBar/>}/>
          <Route path="/auction" element={<Auction/>}/>
          <Route path="/signup" element={<Signup setAuthId={setAuthId} authId={authId}/>}/>
          <Route path="/profile/auction" element={<MyAuctions auctions={auctions} authId={authId}/>}/>
          <Route path="/create/auction" element={<CreateAuction/>}/>
        </Routes>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
