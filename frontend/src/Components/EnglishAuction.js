import {React, useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'


export default function EnglishAuction({auctions, setAuctions, authId}) {
    
    
    const auctionId = new URLSearchParams(window.location.search).get('auctionId')
    const [favorite, setFavorite] = useState("black")
    const [currentBid, setCurrentBid] = useState()

    //Include image gallery instead of just <img>
    //Bidhistory (Auction object)
    //Favorite (Current user)
    //Watchlist (User)
    //Estimate price (All auctions)


    return (
        <div className='d-flex align-items-center'>
            {auctions.map(auction => {
                if (parseInt(auctionId) === auction.Id) {
                    return (

                        <div key={auctionId} className='row justify-content-center'>
                            <div className='col-5 bg-light'>
                                <div className='row justify-content-center' style={{ height: "50vh" }}>
                                    <div className='col-10'>
                                        <img
                                            className="img-fluid"
                                            src={auction.Images[0]}
                                            alt={auction.Title}
                                            style={{ width: "80vh", height: "45vh" }} />
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
                                        <p className='text-success fs-1 mb-0'>120 SEK</p>
                                        <FontAwesomeIcon icon={faHeart} className="ps-3 fa-2xl mt-1" onClick={() => setFavorite((favorite) => (favorite === "red" ? "black" : "red"))} style={{ color: `${favorite}` }} />
                                    </div>
                                    <div className='d-flex'>
                                        <input type="number" id="bid-input" placeholder="Minsta bud: 130" />
                                        <button type="button" className="btn btn-warning ms-3">Lägg bud</button>
                                    </div>
                                </div>


                            </div>
                        </div>

                    )
                }
            })}

        </div>
    )   
}
