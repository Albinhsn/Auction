import React from 'react'

export default function TimeRemaining({date}) {
    
    if(!date){
        return <></>
    }
    return (
    <div className='d-flex'>          
          {date.Year > 0 ? <p className=' mb-0' style={{fontSize: "1.75vh"}}> {date.Year}  år</p> : <></>}
          {date.Month > 0 ? <p className=' mb-0' style={{fontSize: "1.75vh"}}> {date.Month} {date.Month === 1 ? "Månad" : "Månader"}</p> : <></>}
          {date.Day > 0 ? <p className=' mb-0' style={{fontSize: "1.75vh"}}> {date.Day} {date.Day === 1 ? "Dag": "Dagar"}</p> : <></>}
          {date.Hour > 0 ? <p className=' mb-0' style={{fontSize: "1.75vh"}}> {date.Hour} {date.Hour === 1 ? "Timme" : "Timmar"}</p> : <></>}
          {date.Minutes > 0 ? <p className={` mb-0 ${date.Minutes < 10 ? "text-danger" : ""}`} style={{fontSize: "1.75vh"}}> {date.Minutes} {date.Minutes === 1 ? "Minut" : "Minuter"}</p> : <></>}
          {date.Seconds > 0 ? <p className=' mb-0' style={{fontSize: "1.75vh"}}> {date.Seconds} {date.Seconds} {date.Seconds === 1 ? "Sekund" : "Sekunder"}</p> : <></>}
    </div>
  )
}
