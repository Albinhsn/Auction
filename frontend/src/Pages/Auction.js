import React from 'react'
import { useState } from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faHeart} from '@fortawesome/free-solid-svg-icons'
export default function Auction() {
  const auctionId = new URLSearchParams(window.location.search).get('auctionId')
  const auctions = [{
    Name: "Panasonic",
    Img: "https://www.panasonic.com/content/dam/pim/se/sv/HC/HC-V18/HC-V180EC/HC-V180EC-Variation_Image_for_See_All_1Global-1_se_sv.png",
    Condition: "Utmärkt"
  }, {
    Name: "Canon",
    Img: "https://i1.adis.ws/i/canon/eos_5d_mark_iv-frt-w-ef-50mm_800x800?w=800&h=800&fmt=jpg&fmt.options=interlaced&bg=rgb(236,237,237)",
    Condition: "Perfekt"
  }, {
    Name: "Sony",
    Img: "https://www.sony.se/image/14df0d210e44e2526441eeb1024ad89a?fmt=pjpeg&wid=330&bgcolor=FFFFFF&bgc=FFFFFF",
    Condition: "Dåligt"
  }, {
    Name: "Nikon",
    Img: "https://www.nikon.se/imported/images/web/EU/products/digital-cameras/dslr/D3500/D3500_AFP_18_55_VR_front_classic--original.png",
    Condition: "Bra"
  }, {
    Name: "GoPro",
    Img: "https://www.scandinavianphoto.se/globalassets/1049274_gopro_hero_9_black.jpg?ref=DBB4E5E3ED&w=960&h=960&mode=max",
    Condition: "Hyggligt"
  }]

  const [favorite, setFavorite] = useState("black")

  return (
    <div className='d-flex align-items-center'>
      <div className='row justify-content-center'>
        <div className='col-5'>
          
        </div>
        <div className='col-4'></div>
      </div>


      <div className='row justify-content-center'>
        <div className='col-5 bg-light'>
          <div className='row justify-content-center' style={{height: "50vh"}}>
            <div className='col-10'>
              <img 
                className="img-fluid" 
                src={auctions[auctionId].Img} 
                alt={auctions[auctionId].Name} 
                style={{width: "80vh", height: "45vh"}}/>
            </div>
            <div className='d-flex align-items-center ms-5 pt-3'>
            <h3 className=''>
              {auctions[auctionId].Name}
            </h3>
            <p className='ps-5 mb-0'>
                Skick:
            </p>
              <p className='ps-3 mb-0'>
                {auctions[auctionId].Condition}
            </p>
            </div>
          </div>

          <p className='pt-4'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sit amet maximus elit, a sodales lectus. Cras quis commodo metus. Mauris dignissim cursus elit, id posuere tellus congue id. In ac lacus tempus, faucibus nibh nec, laoreet risus. Curabitur diam felis, congue accumsan diam in, tincidunt molestie massa. Donec vulputate diam nec nunc accumsan, ut sodales turpis iaculis. Cras odio tellus, tincidunt ac quam at, suscipit accumsan urna. Sed dapibus enim vel ex fringilla ullamcorper.
          </p>
        </div>


        <div className='col-4 bg-light'>
          <div className='pt-5'>
                <p className='text-uppercase fw-bold' style={{}}>
                  Auktionen avslutas
                </p>
                <div className='d-flex'>
                  <p className='fw-bold'>
                    Tisdag, 
                  </p>
                  <p className='ms-1'>
                    2022-03-22 10:00
                  </p>
                </div>
                <p>
                  1D 21H 5M
                </p>
          </div>


          <div className='row pt-5'>
            <p className='fw-bold text-uppercase'>Nuvarande bud</p>
            <div className='d-flex align-items-center'>
              <p className='text-success fs-1 mb-0'>120 SEK</p>
              <FontAwesomeIcon icon={faHeart} className="ps-3 fa-2xl mt-1" onClick={() => setFavorite((favorite) => (favorite === "red" ? "black" : "red"))} style={{color: `${favorite}`}}/>
            </div>
            <div className='d-flex'>
              <input type="number" id="bid-input" placeholder="Minsta bud: 130"/>
              <button type="button" className="btn btn-warning ms-3">Lägg bud</button>
            </div>
          </div> 

          
        </div>  
      </div>
    </div>
  )
}
