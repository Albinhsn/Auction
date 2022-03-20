
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap';
import "./App.css"



//Pages and Components import
import Navbar from './Components/Navbar'
import Home from "./Pages/Home";
import Login from './Pages/Login';
import Search from './Pages/Search';
import Profile from './Pages/Profile';
import Auction from './Pages/Auction';
import Footer from './Components/Footer';

function App() {
  return (
    <BrowserRouter>
      <div style={{height: "100vh"}}>
        <Navbar/>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/search" element={<Search/>}/>
          <Route path="/auction" element={<Auction/>}/>
        </Routes>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
