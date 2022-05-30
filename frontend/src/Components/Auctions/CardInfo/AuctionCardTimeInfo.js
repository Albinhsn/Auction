import {React, useState, useEffect} from 'react'
import TimeRemaining from '../../Time/TimeRemaining'
import * as datesHelpers from '../../../Helpers/datesHelpers'

export default function AuctionCardTimeInfo({auction}) {
    
    const [date, setDate] = useState()
    useEffect(() => {
        if(auction.endDate && !date){
            setDate(datesHelpers.reformatDate(datesHelpers.getTimeRemaining(auction.endDate)))
        }                                
    }, )
    return (
    <>
        <div className='pt-5 d-flex'>
            
            {auction.state === "Pågående" ?                 
                <div>
                    <p className="fs-5 mb-0 me-1">
                        Slutar om:                        
                    </p>
                    <TimeRemaining
                        date={date}
                    />
                </div>                
            :
                <p className='fs-5 mb-0 me-1'>
                    Slutade: {auction.endDate}
                </p>
        }
            
        </div>
        <p className='fs-5 mt-2'>
            Auktionstyp: {auction.auctionType}
        </p>
        <p>
            Säljare: {auction.seller}
        </p>
        {auction.winner ? 
                <p>Köpare: {auction.winner}</p> 
            :
                <></>    
    }
    </>
  )
}
