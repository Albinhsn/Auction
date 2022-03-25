import { React, useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import ImageGallery from 'react-image-gallery'


export default function SwissAuction({ auction, setAuctions, user, auctions, favo, authId }) {



  const [favorite, setFavorite] = useState()
  const [watchlist, setWatchlist] = useState(false)
  const [userBid, setUserBid] = useState(0)
  const [currentBid, setCurrentBid] = useState(0)
  const [bidHistory, setBidhistory] = useState([])

  useEffect(() => {
    if (favo && !favorite) {
      setFavorite(favo)
    }
    if (currentBid === 0 && Object.keys(auction).length > 0) {
      setCurrentBid(auction.MinimalBid)
      if (auction.BidHistory.length > 0) {
        setBidhistory(auction.BidHistory)
        setCurrentBid(auction.BidHistory[auction.BidHistory.length - 1].Bid)
      }
    }
  })










  const favoriteChange = () => {
    if (!user) return
    setFavorite((favorite) => (favorite === "red" ? "black" : "red"))
    if (favorite === "black" || !favorite) {
      user.Favorites.push(auction.Id)
      return
    }
    for (let i = 0; i < user.Favorites.length; i++) {
      if (user.Favorites[i] === auction.Id) {
        user.Favorites.splice(i, 1)
      }
    }
  }
  const makePurchase = () => {
    if (!user) return
    if (currentBid > userBid + 10) {
      alert("Vänligen mata in över minsta bud")
      return
    }
    setCurrentBid(userBid)
    setBidhistory([...bidHistory, {
      Id: user.Id,
      Bid: userBid,
      Time: new Date().toString()
    }])
    auction.BidHistory = [...bidHistory, {
      Id: user.Id,
      Bid: userBid,
      Time: new Date().toString()
    }]
    for (let i = 0; i < auctions.length; i++) {
      if (auctions[i].Id === auction.Id) {
        auctions[i].BidHistory = auction.BidHistory
        setAuctions(auctions)
        document.querySelector("#bid-input").value = ""
        return
      }
    }
  }

  const watchlistChange = () => {
    if (!authId) return
    if (!watchlist) {
      alert("Du kommer få en mail påminnelse 2 timmar innan auktionens avslut")
    }
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
              {new Date(auction.StopTime).toLocaleString("en-US")}
            </div>
          </div>  
          <p>Auktionstyp: {auction.AuctionType}</p>

          <div className='row pt-5'>
            <p className='fw-bold text-uppercase'>Nuvarande pris</p>
            <div className='d-flex align-items-center'>
              <p className='text-success fs-1 mb-0'>
                {currentBid}
              </p>
              <FontAwesomeIcon icon={faHeart} className="ps-3 fa-2xl mt-1" onClick={() => favoriteChange()} style={{ color: `${favorite}` }} />
              <button className='btn btn-warning ms-3' type="button" onClick={() => watchlistChange()}>
                {watchlist ? "Ta bort påminnelse" : "Lägg Till Påminnelse"}
              </button>
            </div>
            <div className='d-flex'>
              <input type="number" id="bid-input" className="" 
                onChange={e => setUserBid(parseInt(e.target.value))}
              />
              <button type="button" className="btn btn-warning ms-3"
                onClick={() => makePurchase()}
              >
                Köp
              </button>

            </div>

          </div>


        </div>
      </div>



    </div>
  )
}
