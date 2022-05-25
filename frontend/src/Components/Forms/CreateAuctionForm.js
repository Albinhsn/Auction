
import ImageGallery from 'react-image-gallery'
import "react-image-gallery/styles/css/image-gallery.css";
import TextAreaAutoSize from 'react-textarea-autosize'
import {useState, useRef ,React} from 'react'
import imageService  from '../../Services/imageService';
import { useNavigate } from 'react-router';
import * as imageHelpers from '../../Helpers/imageHelpers'
import auctionService from '../../Services/auctionService';

export default function CreateAuctionForm({token}) {

    let currentDate = new Date()
    const navigate = useNavigate();
    let [auctionInfo, setAuctionInfo] = useState({
        Name: "",
        MinimumBid: 0,
        PurchasePrice: 0,
        Condition: "",
        AuctionType: "",
        Description: "",
        Images: [],                        
        SellerToken: token,    
        Tags:  []       
    })

    const [currentIndex, setCurrentIndex] = useState(0)
    
    const myRef = useRef(null);
    
    if(!token){
        navigate("/")
    }

    
    
    const createAuction = () => {
        
        //Mapping Tags
        auctionInfo.Tags.map(tag => {
            if(!auctionInfo.Tags[tag.key]){
                auctionInfo.Tags[tag.key] = tag.value
            }else if(typeof auctionInfo.Tags[tag.key] === "string"){
                auctionInfo.Tags[tag.key] = [auctionInfo.Tags[tag.key], tag.value]
            }else{
                auctionInfo.Tags[tag.key] = [...auctionInfo.Tags[tag.key], tag.value]
            }
            
        }) 
        
        auctionInfo.Images = imageHelpers.convertFromGallery(auctionInfo.Images)
        //Post auction
        auctionService.postAuction(auctionInfo, token).then(response => {
            console.log(response)
            navigate(`/auction?auctionId=${response.data}`)
        }).catch(
            function(error){
                if(error.response){
                    alert(error.response.data.message)
                    let imgs = []
                    auctionInfo.Images.forEach(image => {
                        imgs.push(imageHelpers.convertToGallery(image))
                    })
                    auctionInfo.Images = imgs
                    auctionInfo.Tags = {}
                }
        })
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
                return
            }
            setAuctionInfo({...auctionInfo, Images: []})
            setCurrentIndex(1)    
    
    }
    const addImage = async e => {
        imageService.uploadImage(e.target.files[0]).then(response => {
            console.log(response.data)
            let image = imageHelpers.convertToGallery(`https://localhost:7141/api/Image/${response.data}`)
            setAuctionInfo({...auctionInfo, Images: [... auctionInfo.Images, image]})
            
        })
        
    }
    
    const changeSlide = (index) => {
        setCurrentIndex(index)
    }
    
    const addTag = () => {
        var e = document.querySelector("#Tags")
        if(e.options[e.selectedIndex].text !== "Minneskort (flera val)" && e.options[e.selectedIndex].text !== "Uppkoppling (flera val)"){
            for(let i = 0; i<auctionInfo.Tags.length; i++){
                if (e.options[e.selectedIndex].text === auctionInfo.Tags[i].name){
                    alert("Taggen finns redan, ta bort den för att lägga till en ny")
                    return
                }
            }
        }else{
            for(let i = 0; i<auctionInfo.Tags.length; i++){
                var v = document.querySelector("#tag-value")
                if(e.options[e.selectedIndex].text  === auctionInfo.Tags[i].name && v.value === auctionInfo.Tags[i].value){
                    alert("Taggen finns redan, ta bort den för att lägga till en ny")
                    return
                }
            }
        }
        
        setAuctionInfo({...auctionInfo, Tags:
            [
                ...auctionInfo.Tags,
                {
                    name: e.options[e.selectedIndex].text,
                    value: document.querySelector("#tag-value").value,
                    key: document.querySelector("#Tags").value
                }
            ]
        })
        
    }

    const removeTag = (e) => {
        for (let i = 0; i < auctionInfo.Tags.length; i++) {
            if (e.target.value === auctionInfo.Tags[i].name + auctionInfo.Tags[i].value) {
                
                setAuctionInfo({...auctionInfo, Tags: [auctionInfo.Tags.filter(item => item.name + item.value !== e.target.value)]})                                
                return
            }
        }
    }

    const changeAuctionType = (e) => {

        if(e.target.value === "Holländsk"){
            setAuctionInfo({...auctionInfo, minimumBid: 0, auctionType: e.target.value})
        }
        else if(e.target.value === "Schweizisk" || e.target.value === "none"){            
            setAuctionInfo({...auctionInfo, minimumBid: 0, purchasePrice: 0, auctionType: e.target.value})
        }else{
            setAuctionInfo({...auctionInfo, auctionType: e.target.value})
        }
        
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
                                onChange={e => setAuctionInfo({...auctionInfo, Name: e.target.value})}
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
                                    Hyggligt
                                </option>
                                <option value="Dåligt">
                                    Dåligt
                                </option>
                            </select>
                        </div>

                        <div className='input-group pt-2'>
                            <select name="auctionType" id="auctionType" className='form-select'
                                onChange={e => changeAuctionType(e)}
                            >
                                <option value="none">
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
                            {auctionInfo.AuctionType === "Engelsk" ? 
                                    <input type="number" placeholder="Minimumbud" className='mt-2 align-self-center' id="bid-input" style={{ width: "20vw" }}
                                        onChange={e => setAuctionInfo({ ...auctionInfo, MinimumBid: parseInt(e.target.value) })}
                                    />
                                : 
                                    <></>}
                            {auctionInfo.AuctionType === "Engelsk" || auctionInfo.AuctionType === "Holländsk"?
                                    <input type="number" placeholder="Köpa direkt" className='mt-2 align-self-center ' id="bid-input" style={{ width: "20vw" }}
                                        onChange={e => setAuctionInfo({ ...auctionInfo, PurchasePrice: parseInt(e.target.value) })}
                                    />    
                                :
                                    <></>
                            }
                        </div>
                        <div className='d-flex flex-column'>
                            <TextAreaAutoSize maxRows={5} minRows={5} placeholder="Beskrivning" className='mt-2' id="bid-input" style={{ resize: "none" }} 
                                onChange={e => setAuctionInfo({ ...auctionInfo, Description: e.target.value })}
                            />
                            <div className='input-group pt-2'>
                                <select name="Tags" id="Tags" className='form-select'>
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
                                        Minneskort (flera val)
                                    </option>
                                    <option value="wirelessConnection">
                                        Uppkoppling (flera val)
                                    </option>
                                    <option value="angledScreen">
                                        Skärm vinkel
                                    </option>
                                </select>

                                <input type="text" id="tag-value"/>
                                <button type="button" className='btn btn-primary' onClick={() => addTag()}>Lägg till tag</button>
                            </div>
                                <div>
                                    <li className='list-group'>
                                        {auctionInfo.Tags.map(tag => {
                                            return(
                                                <ul className='list-item d-flex' key={tag.name + tag.value}>
                                                    <p className='mb-0 align-self-center'>
                                                        {tag.name}: {tag.value}
                                                    </p>
                                                    <button type="button" className='btn btn-secondary border ms-3' value={tag.name + tag.value} onClick={e => removeTag(e)}>X</button>
                                                </ul>
                                            )
                                        })}
                                    </li>
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
