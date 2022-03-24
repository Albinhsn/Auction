import {React, useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import ImageGallery from 'react-image-gallery'

export default function EnglishAuction({auction, setAuctions, user}) {
    
    
    //Set useState favorite to "red" if favorite
    const [favorite, setFavorite] = useState("black")
    const [watchlist, setWatchlist] = useState(false)
    const [currentBid, setCurrentBid] = useState(120)
    const [userBid, setUserBid] = useState(0)
    let [bidHistory, setbidHistory] = useState([])

    
    //Fixa så nuvarande bud är från bidhistory/minimum bud
    //Ändra så att auktionen i auctions stämmer överens, lägg till i bidhistory
    //Lägg till i min auktioner för user
    
    if(Object.keys(auction).length === 0) return null
    auction.BidHistory.map(bid =>{
        bidHistory = [...bidHistory, bid]
    })
    
    const favoriteChange = () => {
        setFavorite((favorite) => (favorite === "red" ? "black" : "red"))
        if(favorite === "black"){
            user.Favorites.push(auction)
            return
        }
        for(let i = 0; i<user.Favorites.length; i++){
            if (user.Favorites[i] === auction){
                user.Favorites.splice(i, 1)
            }
        }
    }
    const madeBid = () => {
        console.log(currentBid, userBid)
        if(currentBid > userBid + 10){
            alert("Vänligen mata in över minsta bud")
            return
        }

    }

    const watchlistChange = () => {
        setWatchlist(!watchlist)
    }
    return (
        <div className='d-flex align-items-center'>
             

                        <div key={auction.Id} className='row justify-content-center'>
                            <div className='col-5 bg-light'>
                                <div className='row justify-content-center' style={{ height: "50vh" }}>
                                    <div className='col-10'>
                                        <ImageGallery
                                            items={auction.Images}
                                            showPlayButton={false}
                                            useBrowserFullscreen={false}
                                            originalHeight={"200"}
                                            originalWidth={"200"}
                                            className="image-gallery"
                                            showFullscreenButton={false}                                
                                            

                                        />
                                    </div>
                                    <div className='d-flex align-items-center ms-5 pt-3'>
                                        <h3 className=''>
                                            {auction.Title}
                                        </h3>
                                        <p className='ps-5 mb-0'>
                                            Skick:
                                        </p>
                                        <p className='ps-3 mb-0'>
                                            {auction.Condition}
                                        </p>
                                    </div>
                                </div>

                                <p className='pt-4'>
                                    {auction.Description}
                                </p>
                            </div>


                            <div className='col-4 bg-light'>
                                <div className='pt-5'>
                                    <p className='text-uppercase fw-bold' style={{}}>
                                        Auktionen avslutas:
                                    </p>
                                    <div className='d-flex'>
                                        {auction.StopTime}
                                    </div>
                                    <p>
                                        "TID KVAR"
                                    </p>
                                </div>


                                <div className='row pt-5'>
                                    <p className='fw-bold text-uppercase'>Nuvarande bud</p>
                                    <div className='d-flex align-items-center'>
                                        <p className='text-success fs-1 mb-0'>
                                            120 SEK
                                        </p>
                                        <FontAwesomeIcon icon={faHeart} className="ps-3 fa-2xl mt-1" onClick={() => favoriteChange()} style={{ color: `${favorite}` }} />
                                        <button className='btn btn-warning ms-3' type="button" onClick={() => watchlistChange()}>
                                            {watchlist ? "Lägg Till Påminnelse" : "Ta bort påminnelse"}
                                        </button>
                                    </div>
                                    <div className='d-flex'>
                                        <input type="number" id="bid-input" placeholder="Minsta bud: 130" 
                                            onChange={e => setUserBid(e.target.value)}
                                        />
                                        <button type="button" className="btn btn-warning ms-3"
                                            onClick={() => madeBid()}
                                        >
                                            Lägg bud
                                        </button>
                                    </div>
                                    <div className="dropdown">
                                    <a className="btn btn-warning dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                        Bud Historik
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <ul>
                                        {bidHistory.map(bid =>{                    
                                            return(
                                                <li key={bid.Id} className="dropdown-item" href="#">
                                                    <p>{bid.Bid}</p>
                                                    <p className='ms-1'>{bid.Time}</p>    
                                                </li>

                                            )
                                        })}
                                        </ul>
                                    </div>
                        
                                    </div>
                                </div>


                            </div>
                        </div>

                    

        </div>
    )   
}
