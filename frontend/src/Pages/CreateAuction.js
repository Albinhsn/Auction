import React from 'react'
import ImageGallery from 'react-image-gallery'
import useState from 'react'
export default function CreateAuction() {
    // <ImageGallery items={[]} originalHeight="15vh" originalWidth="15vh"/>
    return (
    <div className='row justify-content-center'>
        <div className='col-8 bg-light'>
            <form>
                <input type="text" placeholder="title"/>
                <input type="number" placeholder="minimumbud" />
                <input type="text" placeholder="beskrivning" />
               
                <label htmlFor="condition">Välj Skick</label>
                <select name="condition" id="condition">
                    <option value="excellent">Utmärkt</option>
                    <option value="good">Bra</option>
                    <option value="decent">Hyggligt</option>
                    <option value="bad">Dåligt</option>
                </select>
            </form>
        </div>

    </div>
  )
}
