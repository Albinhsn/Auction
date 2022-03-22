import React from 'react'
import ImageGallery from 'react-image-gallery'
import "react-image-gallery/styles/css/image-gallery.css";
import TextAreaAutoSize from 'react-textarea-autosize'
export default function CreateAuction() {
    const images = [
            {
                original: "https://cf-images.dustin.eu/cdn-cgi/image/format=auto,quality=75,width=640/image/d200001002104947/panasonic-lumix-dmc-fz300.jpg",
                thumbnail: ""
            },
            {
                original: "https://cdn.abicart.com/shop/ws96/73196/art96/h1060/153121060-origpic-fff8b7.jpg",
                thumbnail: ""
            },
            {
                original: "https://reviewed-com-res.cloudinary.com/image/fetch/s--Ygs5ZmIO--/b_white,c_fill,cs_srgb,f_auto,fl_progressive.strip_profile,g_xy_center,h_668,q_auto,w_1187,x_2688,y_433/https://reviewed-production.s3.amazonaws.com/1441123262000/Panasonic-Lumix-DMC-FZ300-Hero.jpg",
                thumbnail: ""
            },  
        
    ]
    return (
    <div className='row d-flex justify-content-center' style={{width: "100vw"}}>
        <div className='col-8 bg-light'>
            <div className='row'>
                <div className='col-4'>
                    <ImageGallery 
                        items={images}
                        showPlayButton={false}
                        useBrowserFullscreen={false}
                        originalHeight={"200"}
                        originalWidth={"200"}
                        className="image-gallery"                        
                        />
                </div>
                <div className='col-6'>
                    <div className='d-flex flex-column'>
                            <input type="text" placeholder="Titel" style={{ width: "20vw" }} className='align-self-center'/>
                            <input type="number" placeholder="Minimumbud" className='mt-2 align-self-center'id="bid-input" style={{ width: "20vw" }}/>
                            <input type="number" placeholder="Köpa direkt" className='mt-2 align-self-center ' id="bid-input" style={{ width: "20vw" }}/>
                    </div>
                    <div className='input-group pt-2'>
                        <label htmlFor="condition" className='pe-5 input-group-text'> 
                            Skick
                        </label>
                        <select name="condition" id="condition" className='form-select'>
                            <option value="excellent">
                                Perfekt
                            </option>
                            <option value="excellent">
                                Utmärkt
                            </option>
                            <option value="good">
                                Bra
                            </option>
                            <option value="decent">
                                Hyggligt
                            </option>
                            <option value="bad">
                                Dåligt
                            </option>
                        </select>
                    </div>
                    
                    <div className='input-group pt-2'>
                        <label 
                            htmlFor="auctionType"
                            className='input-group-text'
                        >
                            Typ Av Auktion
                        </label>
                        <select name="auctionType" id="auctionType" className='form-select'>
                            <option value="excellent">
                                Engelsk
                            </option>
                            <option value="good">
                                Holländsk
                            </option>
                            <option value="decent">
                                SMRA (Simultaneous Multiple Round Auction)
                            </option>
                        </select>
                    </div>
                    <div className='d-flex flex-column'>
                        <TextAreaAutoSize maxRows={5} minRows={5} placeholder="Beskrivning" className='mt-2' id="bid-input" style={{resize: "none"}}/>
                        <button type="button" className='btn btn-primary align-self-center pt-2' style={{width: "40%"}}>Skapa auktion</button>
                    </div>
                </div>    
            </div>
            
            
        </div>

    </div>
  )
}
