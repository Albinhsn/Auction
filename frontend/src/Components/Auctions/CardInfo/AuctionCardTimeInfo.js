import {React, useState, useEffect} from 'react'
import TimeRemaining from '../../Time/TimeRemaining'
import * as datesHelpers from '../../../Helpers/datesHelpers'

export default function AuctionCardTimeInfo({auction}) {
    
    const [date, setDate] = useState(datesHelpers.reformatDate(datesHelpers.getTimeRemaining(auction.endDate)))

    return (
    <>
        <div className='pt-5'>
            {auction.state === "Pågående" ? 
                <p className='text-uppercase fw-bold' style={{}}>
                    Auktionen avslutas:
                </p>
            :
                <p className='text-uppercase fw-bold'>
                    Auktionen avlustades: 
                </p>
            }
            <div className='d-flex'>
                {new Date(auction.endDate).toLocaleString("en-US")}
            </div>
            {auction.state === "Slut" ? 
                    <></>
                :
                    <TimeRemaining                         
                        date={date} 
                    />
            }
            
        </div>
        <p>
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
