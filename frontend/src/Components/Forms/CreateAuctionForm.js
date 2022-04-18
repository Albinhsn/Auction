
import ImageGallery from 'react-image-gallery'
import "react-image-gallery/styles/css/image-gallery.css";
import TextAreaAutoSize from 'react-textarea-autosize'
import {useState, useRef ,React} from 'react'
import imageService  from '../../Services/imageService';
import { useNavigate } from 'react-router';
import * as imageHelpers from '../../Helpers/imageHelpers'
import auctionService from '../../Services/auctionService';

export default function CreateAuctionForm({authId}) {

    let currentDate = new Date()
    const navigate = useNavigate();
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
    const [tags, setTags] = useState([])
    const myRef = useRef(null);


    
    
    const createAuction = () => {
        
        //Mapping tags
        tags.map(tag => {
            if(!auctionInfo.tags[tag.key]){
                auctionInfo.tags[tag.key] = tag.value
            }else if(typeof auctionInfo.tags[tag.key] === "string"){
                auctionInfo.tags[tag.key] = [auctionInfo.tags[tag.key], tag.value]
            }else{
                auctionInfo.tags[tag.key] = [...auctionInfo.tags[tag.key], tag.value]
            }
            
        })
        auctionInfo.images = imageHelpers.convertFromGallery(auctionInfo.images)
        //Post auction
        auctionService.postAuction(auctionInfo).then(response => {
            navigate(`/auction?auctionId=${response.data._id}`)
        }).catch(
            function(error){
                if(error.response){
                    alert(error.response.data.message)
                    auctionInfo.tags = {}
                }
        })
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
        imageService.uploadImage(e.target.files[0]).then(response => {
            let image = imageHelpers.convertToGallery(`http://localhost:8000/images/image/${response.data}`)
            setAuctionInfo({...auctionInfo, images: [... auctionInfo.images, image]})
            
        })
        
    }
    
    const changeSlide = (index) => {
        setCurrentIndex(index)
    }
    
    const addTag = () => {
        var e = document.querySelector("#tags")
        if(e.options[e.selectedIndex].text !== "Minneskort (flera val)" && e.options[e.selectedIndex].text !== "Uppkoppling (flera val)"){
            for(let i = 0; i<tags.length; i++){
                if (e.options[e.selectedIndex].text === tags[i].name){
                    alert("Taggen finns redan, ta bort den för att lägga till en ny")
                    return
                }
            }
        }else{
            for(let i = 0; i<tags.length; i++){
                var v = document.querySelector("#tag-value")
                if(e.options[e.selectedIndex].text  === tags[i].name && v.value === tags[i].value){
                    alert("Taggen finns redan, ta bort den för att lägga till en ny")
                    return
                }
            }
        }
        
        setTags([...tags, {
            name: e.options[e.selectedIndex].text,
            value: document.querySelector("#tag-value").value,
            key: document.querySelector("#tags").value
        }])
        
    }

    const removeTag = (e) => {
        for (let i = 0; i < tags.length; i++) {
            if (e.target.value === tags[i].name + tags[i].value) {
                console.log(tags)
                setTags(tags.filter(item => item.name + item.value !== e.target.value))
                delete auctionInfo.tags[tags[i].key]
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
                            {auctionInfo.auctionType === "Engelsk" ? 
                                    <input type="number" placeholder="Minimumbud" className='mt-2 align-self-center' id="bid-input" style={{ width: "20vw" }}
                                        onChange={e => setAuctionInfo({ ...auctionInfo, minimumBid: parseInt(e.target.value) })}
                                    />
                                : 
                                    <></>}
                            {auctionInfo.auctionType === "Engelsk" || auctionInfo.auctionType === "Holländsk"?
                                    <input type="number" placeholder="Köpa direkt" className='mt-2 align-self-center ' id="bid-input" style={{ width: "20vw" }}
                                        onChange={e => setAuctionInfo({ ...auctionInfo, purchasePrice: parseInt(e.target.value) })}
                                    />    
                                :
                                    <></>
                            }
                        </div>
                        <div className='d-flex flex-column'>
                            <TextAreaAutoSize maxRows={5} minRows={5} placeholder="Beskrivning" className='mt-2' id="bid-input" style={{ resize: "none" }} 
                                onChange={e => setAuctionInfo({ ...auctionInfo, description: e.target.value })}
                            />
                            <div className='input-group pt-2'>
                                <select name="tags" id="tags" className='form-select'>
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
                                        {tags.map(tag => {
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
