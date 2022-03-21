import React from 'react'
import MyAuctionsCard from '../Components/MyAuctionsCard'

export default function MyAuctions(){
    const arr = [1,2,3,4,5,6]
    return (
        <div className='d-flex justify-content-center'>
            <div className='col-6'>
                <div>
                    <input type="text" placeholder='Sök efter Namn'/>
                    <label htmlFor="ongoing" className='ms-3'>Pågående</label>
                    <input type="checkbox" name="ongoing" className='ms-2'/>
                    <label htmlFor="ongoing" className='ms-3'>Såld</label>
                    <input type="checkbox" name="sold" className='ms-2'/>
                </div>
                
                {arr.map(a => {
                    return(
                        <div className='pt-3'>
                            <MyAuctionsCard/>
                        </div>
                    )
                    
                })}
            </div>
        </div>
    )
}