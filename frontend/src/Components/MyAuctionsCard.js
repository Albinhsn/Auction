import {React} from 'react'


export default function MyAuctionsCard({auction}){
    

    return(
        
        <div className='d-flex border border-dark'>    
            <img src={auction.Img} placeholder="" style={{height: "15vh", width: "15vh"}}/>
            <div className='ps-3 row'>
                <div className='col-8'>
                    <p className='fs-2'>{auction.Name}</p>
                    <div className='d-flex'>
                        <p>{auction.State}</p>
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