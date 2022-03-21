import React from 'react'

export default function MyAuctionsCard({auction}){

    const catJam = 'https://static-cdn.jtvnw.net/jtv_user_pictures/ec92e3d9-fc70-42e7-aee0-4fd987e306f5-profile_image-300x300.png'
    return(
        
        <div className='d-flex border border-dark'>
            <img src={catJam} placeholder="" style={{height: "15vh", width: "15vh"}}/>
            <div className='ps-3 row'>
                <div className='col-8'>
                    <div className='d-flex'>
                        <p className='fs-2'>{auction.Title}</p>
                        <p className='ps-4 pt-2'>{auction.State}</p>
                    </div>
                    <div className='d-flex'>
                        <p>{auction.Category}</p>
                        <p className='ps-3'>{auction.Bid} SEK</p>
                        <p className='ps-3'>{auction.Time}</p>
                    </div>
                </div>
                <div className='col-4'>
                    <p className='d-flex' style={{fontSize: "1.5vh"}}>{auction.Description}</p>
                </div>
            </div>         
        </div>
    )
}