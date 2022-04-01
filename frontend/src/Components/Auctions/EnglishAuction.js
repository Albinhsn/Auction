import {React, useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import ImageGallery from 'react-image-gallery'
import { useNavigate } from 'react-router'
import * as datesHelpers from '../../Helpers/datesHelpers'

export default function EnglishAuction({auction, authId}) {
    
    
   

    const navigate = useNavigate()
        
    
       
    if (!auction || !auction.endDate) {
        
        return <></>
    }



    //Handle functions

    let date = datesHelpers.getTimeRemaining(auction.endDate)
    console.log(date)
    const favoriteChange = () => {

    }
    const madeBid = () => {

    }

    const watchlistChange = () => {

    }
    const handleBid = () => {

    }
    const makePurchase = () => {

    }
    return (
        <div className='d-flex align-items-center'>
             

                        <div key={auction._id} className='row justify-content-center'>
                            <div className='col-5 bg-light'>
                                <div className='row justify-content-center' style={{ height: "50vh" }}>
                                    <div className='col-10'>
                                        <ImageGallery
                                            items={auction.images}
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
                                            {auction.name}
                                        </h3>
                                        <p className='ps-5 mb-0'>
                                            Skick:
                                        </p>
                                        <p className='ps-3 mb-0'>
                                            {auction.condition}
                                        </p>
                                    </div>
                                </div>

                                <p className='pt-4'>
                                    {auction.description}
                                </p>
                            </div>


                            <div className='col-4 bg-light'>
                                <div className='pt-5'>
                                    <p className='text-uppercase fw-bold' style={{}}>
                                        Auktionen avslutas:
                                    </p>
                                    <div className='d-flex'>
                                        {new Date(auction.endDate).toLocaleString("en-US")}
                                    </div>
                                    <div className='d-flex'>
                                        <p className='mb-0'>
                                            Y: {date.Year}
                                        </p>
                                        <p className='ms-2 mb-0'>
                                            M: {date.Month}
                                        </p>
                                        <p className='ms-2 mb-0'>
                                            D:{date.Day}
                                        </p>
                                        <p className='ms-2 mb-0'>
                                            H: {date.Hour}
                                        </p>
                                        <p className='ms-2 mb-0'>
                                            M: {date.Minutes}
                                        </p>
                                    </div>
                                </div>
                                <p>Auktionstyp: {auction.auctionType}</p>
                                <p>Säljare: {auction.seller}</p>
                                <div className='row pt-5'>
                                    <p className='fw-bold text-uppercase'>Nuvarande bud</p>
                                    <div className='d-flex align-items-center'>
                                        <p className='text-success fs-1 mb-0'>
                                            {auction.minimumBid}
                                        </p>
                                        <FontAwesomeIcon icon={faHeart} className="ps-3 fa-2xl mt-1" onClick={() => favoriteChange()} style={{ color: `black` }} />
                                        <button className='btn btn-warning ms-3' type="button" onClick={() => watchlistChange()}>
                    
                                        </button>
                                    </div>
                                    <div className='d-flex'>
                                        <input type="number" id="bid-input" className="" placeholder={`Minsta bud: ${auction.minimumBid + 10}`}
                                            onChange={e => handleBid()}
                                        />
                                        <button type="button" className="btn btn-warning ms-3"
                                            onClick={() => madeBid()}
                                        >
                                            Lägg bud
                                        </button>
                                        
                                    </div>
                                    <div className='d-flex'>
                                        <div className="dropdown mt-2 pe-3">
                                            <a className="btn btn-warning dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                                Bud Historik
                                            </a>
                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <ul className='mb-0 ps-0'>
                                                {auction.bidHistory.map(bid =>{                    
                                                    console.log(bid)
                                                    return(
                                                        <li key={bid._id} className="dropdown-item d-flex pb-0 ps-1 pe-1 pt-0 align-content-center">
                                                            <p className=''>Bud:{bid.bid} Tid: {new Date(bid.time).toLocaleDateString("en-US")}</p>
                                                            
                                                        </li>

                                                    )
                                                })}
                                                </ul>
                                            </div>
                                        </div>
                                        {auction.PurchaseNow > 0 ?
                                            <button type="button" className='btn btn-warning ms-5 mt-2'
                                                onClick={() => makePurchase()} 
                                                >                                                
                                                    Köp Nu {auction.PurchaseNow}</button>
                                            :
                                            <></>
                                        }
                                    </div>
                                </div>


                            </div>
                        </div>

                    

        </div>
    )   
}
