import {React, useState, useEffect} from 'react'
import TimeRemaining from '../../Time/TimeRemaining'
import * as datesHelpers from '../../../Helpers/datesHelpers'

export default function AuctionCardTimeInfo({auction}) {
    
    const [date, setDate] = useState(datesHelpers.reformatDate(datesHelpers.getTimeRemaining(auction.endDate)))

    return (
    <>
        <div className='pt-5'>
            <p className='text-uppercase fw-bold' style={{}}>
                Auktionen avslutas:
            </p>
            <div className='d-flex'>
                {new Date(auction.endDate).toLocaleString("en-US")}
            </div>
            <TimeRemaining 
                
                date={date} 
            />
        </div>
        <p>
            Auktionstyp: {auction.auctionType}
        </p>
        <p>
            Säljare: {auction.seller}
        </p>
    </>
  )
}
