import React from 'react'

export default function TimeRemaining({date}) {
    
    if(!date){
        return <></>
    }
    
    return (
    <div className='d-flex'>          
          {date.Year > 0 ? <p className=' mb-0' style={{fontSize: "1.75vh"}}>{date.Year} år</p> : <></>}
          {date.Month > 0 ? <p className=' mb-0' style={{fontSize: "1.75vh"}}>{date.Month} månader</p> : <></>}
          {date.Day > 0 ? <p className=' mb-0' style={{fontSize: "1.75vh"}}> {date.Day} dagar</p> : <></>}
          {date.Hour > 0 ? <p className=' mb-0' style={{fontSize: "1.75vh"}}>{date.Hour} timmar</p> : <></>}
          {date.Minutes > 0 ? <p className={` mb-0 ${date.Minutes < 15 ? "text-danger" : ""}`} style={{fontSize: "1.75vh"}}>{date.Minutes} minuter</p> : <></>}
          {date.Seconds > 0 ? <p className=' mb-0 text-danger' style={{fontSize: "1.75vh"}}>{date.Seconds} sekunder</p> : <></>}
    </div>
  )
}
