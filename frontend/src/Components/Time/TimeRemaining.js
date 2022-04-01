import React from 'react'

export default function TimeRemaining({date}) {
    
    if(!date){
        return <></>
    }
    
    return (
    <div className='d-flex'>
          Tid kvar:
          {date.Year > 0 ? <p className='ms-1 mb-0'>Y: {date.Year}</p> : <></>}
          {date.Month > 0 ? <p className='ms-1 mb-0'>M: {date.Month}</p> : <></>}
          {date.Day > 0 ? <p className='ms-1 mb-0'>D: {date.Day}</p> : <></>}
          {date.Hour > 0 ? <p className='ms-1 mb-0'>H: {date.Hour}</p> : <></>}
          {date.Minutes > 0 ? <p className='ms-1 mb-0'>M: {date.Minutes}</p> : <></>}
    </div>
  )
}
