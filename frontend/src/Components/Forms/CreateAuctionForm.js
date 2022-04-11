
import ImageGallery from 'react-image-gallery'
import "react-image-gallery/styles/css/image-gallery.css";
import TextAreaAutoSize from 'react-textarea-autosize'
import {useState, useRef ,React} from 'react'
import imageService  from '../../Services/imageService';
import { useNavigate } from 'react-router';


export default function CreateAuctionForm({authId}) {

    let currentDate = new Date()

    let [auctionInfo, setAuctionInfo] = useState({
        name: "",
        minimumBid: 0,
        purchasePrice: 0,
        condition: "",
        auctionType: "",
        description: "",
        images: [],
        bidHistory: [],
        startDate: new Date(),
        endDate: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()+7),
        seller: authId,
        state: "Pågående",
        tags: {}     
    })

    const [currentIndex, setCurrentIndex] = useState(0)
    const [currentTag, setCurrentTag] = useState()
    const [tags, setTags] = useState()
    const myRef = useRef(null);
    const navigate = useNavigate()


    
    
    const createAuction = () => {
        
    }


    const removeImage = () => {    
            if (! auctionInfo.images) return
            if(auctionInfo.images.length > 1){
                if (currentIndex <= 1) {
                    auctionInfo.images.splice(currentIndex, 1)
                    myRef.current.slideToIndex(auctionInfo.images.length - 1)
                   
                }
                else {                   
                    auctionInfo.images.splice(currentIndex, 1)                    
                    myRef.current.slideToIndex(currentIndex) 
                }
                return
            }
            setAuctionInfo({...auctionInfo, images: []})
            setCurrentIndex(1)    
    
    }
    const addImage = async e => {
        imageService.uploadImage().then(response => {
            console.log(response)
        })
       
    }
    
    const changeSlide = (index) => {
        setCurrentIndex(index)
    }
    
    return (
        <div className='row d-flex justify-content-center' style={{ width: "100vw" }}>
            <div className='col-8 bg-light'>
                <div className='row'>
                    <div className='col-4'>
                        <div className='position-relative'>
                            <ImageGallery
                                items={auctionInfo.images}
                                showPlayButton={false}
                                useBrowserFullscreen={false}
                                originalHeight={"200"}
                                originalWidth={"200"}
                                className="image-gallery"
                                showFullscreenButton={false}                                
                                ref={myRef}
                                onSlide={changeSlide.bind(this)}                        
                            />
                            <button type="button" className='btn border position-absolute top-0 end-0 mt-3' style={{ zIndeX: "2" }} onClick={() => removeImage()}>X</button>
                        </div>
                        <div className="input-group mb-3">
                            <input type="file" className="form-control" id="inputGroupFile01" 
                                onChange={e => addImage(e)}/>
                        </div>

                    </div>
                    <div className='col-6'>
                        <div className='d-flex flex-column'>
                            <input type="text" placeholder="Titel" style={{ width: "20vw" }} className='align-self-center' 
                                onChange={e => setAuctionInfo({...auctionInfo, name: e.target.value})}
                            />
                            <input type="number" placeholder="Minimumbud" className='mt-2 align-self-center' id="bid-input" style={{ width: "20vw" }} 
                                onChange={e => setAuctionInfo({ ...auctionInfo, minimumBid: parseInt(e.target.value)})}
                            />
                            <input type="number" placeholder="Köpa direkt (ej obligatorisk)" className='mt-2 align-self-center ' id="bid-input" style={{ width: "20vw" }} 
                                onChange={e => setAuctionInfo({ ...auctionInfo, purchasePrice: parseInt(e.target.value) })}
                            />
                        </div>
                        <div className='input-group pt-2'>
                            <select name="condition" id="condition" className='form-select'
                                onChange={e => setAuctionInfo({...auctionInfo, condition: e.target.value })}
                            >
                                <option value="">
                                    Välj Skick
                                </option>
                                <option value="Perfekt">
                                    Perfekt
                                </option>
                                <option value="Utmärkt">
                                    Utmärkt
                                </option>
                                <option value="Bra">
                                    Bra
                                </option>
                                <option value="Hyggligt">
                                    Hyggligt
                                </option>
                                <option value="Dåligt">
                                    Dåligt
                                </option>
                            </select>
                        </div>

                        <div className='input-group pt-2'>
                            <select name="auctionType" id="auctionType" className='form-select'
                                onChange={e => setAuctionInfo({ ...auctionInfo, auctionType: e.target.value })}
                            >
                                <option value="">
                                    Välj typ av Auktion
                                </option>
                                <option value="Engelsk">
                                    Engelsk
                                </option>
                                <option value="Holländsk">
                                    Holländsk
                                </option>
                                <option value="Schweizisk">
                                    Schweizisk
                                </option>
                            </select>
                        </div>
                        <div className='d-flex flex-column'>
                            <TextAreaAutoSize maxRows={5} minRows={5} placeholder="Beskrivning" className='mt-2' id="bid-input" style={{ resize: "none" }} 
                                onChange={e => setAuctionInfo({ ...auctionInfo, description: e.target.value })}
                            />
                            <div className='input-group pt-2'>
                                <select name="tags" id="tags" className='form-select'
                                    onChange={e => setCurrentTag(e.target.value)}
                                >
                                    <option value="">
                                        Välj tag
                                    </option>
                                    <option value="brand">
                                        Märke
                                    </option>
                                    <option value="type">
                                        Typ av kamera
                                    </option>
                                    <option value="imageSensorSize">
                                        Bildsensorstorlek
                                    </option>
                                    <option value="resolution">
                                        Upplösning
                                    </option>
                                    <option value="weatherProof">
                                        Vädertålig
                                    </option>
                                    <option value="memoryCards">
                                        Minneskort
                                    </option>
                                    <option value="wirelessConnection">
                                        Uppkoppling
                                    </option>
                                    <option value="angledScreen">
                                        Skärm vinkel
                                    </option>
                                </select>

                                <input type="text" />
                                <button type="button" className='btn btn-primary'>Lägg till tag</button>
                            </div>
                            <button type="button" className='btn btn-primary align-self-center mt-2' style={{ width: "40%" }}
                                onClick={() => createAuction()}>
                                    Skapa auktion
                            </button>
                        </div>
                    </div>
                </div>


            </div>
          
        </div>
    )
}
