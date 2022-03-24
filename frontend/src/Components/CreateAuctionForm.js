
import ImageGallery from 'react-image-gallery'
import "react-image-gallery/styles/css/image-gallery.css";
import TextAreaAutoSize from 'react-textarea-autosize'
import {useState, useRef ,React} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router';


export default function CreateAuctionForm({setAuctions, auctions}) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const myRef = useRef(null);
    const navigate = useNavigate()

    let [auctionInfo, setAuctionInfo] = useState({
        Id: auctions.length + 1,
        Title: "",
        MinimumBid: 0,
        PurchaseNow: 0,
        Condition: "",
        AuctionType: "",
        Description: "",
        Images: []
    })

    const createAuction = () => {
        if (auctionInfo.Title === "" || auctionInfo.MinimumBid === 0 || auctionInfo.Condition === "" || auctionInfo.AuctionType === "" || auctionInfo.Description === "" || auctionInfo.Images === []){
            alert("Var vänlig fyll i alla fält")
            return
        }


        if (auctionInfo.MinimumBid >= auctionInfo.PurchaseNow && auctionInfo.PurchaseNow != 0){
            alert("Var vänlig ange godtyckligt köp nu pris")
            return
        }
        let imgs = []
        auctionInfo.Images.map(image => {
            imgs.push(image.original)
        })
        auctionInfo.Images = imgs
        setAuctions([...auctions, auctionInfo])
        navigate("/")
        alert("Auktionen har lagts till")
    }


    const removeImage = () => {    
            if (! auctionInfo.Images) return
            if(auctionInfo.Images.length > 1){
                if (currentIndex <= 1) {
                    auctionInfo.Images.splice(currentIndex, 1)
                    myRef.current.slideToIndex(auctionInfo.Images.length - 1)
                   
                }
                else {                   
                    auctionInfo.Images.splice(currentIndex, 1)                    
                    myRef.current.slideToIndex(currentIndex) 
                }
                console.log(auctionInfo.Images)
                return
            }
            setAuctionInfo({...auctionInfo, Images: []})
            setCurrentIndex(1)    
    
    }
    const addImage = async e => {
        
        const formData = new FormData()
        formData.append(
            'file',
            e.target.files[0]
        )
        try {
            const res = await axios.post('/upload', formData, {
                baseURL: "http://localhost:5000",
                headers: {
                    'Content-type': 'multipart/form-data',
                },
                
            })
            const { fileName, filePath } = res.data
            const img = {
                original: `http://127.0.0.1:8887/${fileName}`,
                thumbnail: ""
            }
            setAuctionInfo({ ...auctionInfo, Images: [...auctionInfo.Images, img] })
        } catch (error) {
            console.log(error)
        }    
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
                                items={auctionInfo.Images}
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
                                onChange={e => setAuctionInfo({...auctionInfo, Title: e.target.value})}
                            />
                            <input type="number" placeholder="Minimumbud" className='mt-2 align-self-center' id="bid-input" style={{ width: "20vw" }} 
                                onChange={e => setAuctionInfo({ ...auctionInfo, MinimumBid: parseInt(e.target.value) })}
                            />
                            <input type="number" placeholder="Köpa direkt (ej obligatorisk)" className='mt-2 align-self-center ' id="bid-input" style={{ width: "20vw" }} 
                                onChange={e => setAuctionInfo({ ...auctionInfo, PurchaseNow: parseInt(e.target.value) })}
                            />
                        </div>
                        <div className='input-group pt-2'>
                            <select name="condition" id="condition" className='form-select'
                                onChange={e => setAuctionInfo({...auctionInfo, Condition: e.target.value })}
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
                                    Hygglig
                                </option>
                                <option value="Dåligt">
                                    Dåligt
                                </option>
                            </select>
                        </div>

                        <div className='input-group pt-2'>
                            <select name="auctionType" id="auctionType" className='form-select'
                                onChange={e => setAuctionInfo({ ...auctionInfo, AuctionType: e.target.value })}
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
                                <option value="SMRA">
                                    SMRA (Simultaneous Multiple Round Auction)
                                </option>
                            </select>
                        </div>
                        <div className='d-flex flex-column'>
                            <TextAreaAutoSize maxRows={5} minRows={5} placeholder="Beskrivning" className='mt-2' id="bid-input" style={{ resize: "none" }} 
                                onChange={e => setAuctionInfo({ ...auctionInfo, Description: e.target.value })}
                            />
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
