import React from 'react'
import MyAuctionsCard from '../Components/SearchComponent'

export default function MyAuctions(){
  const auctions = [{
      Name: "4k Blue Cam",
      Img: "https://www.kjell.com/globalassets/productimages/837841_57743.tif?ref=A2EA2785D9&format=jpg",
      Bid: 99,
      Condition: "Utmärkt",
      State: "Slut",
      Purchase: 111,
      Favorite: "black"
  }, {
      Name: "Bear Cam",
      Img: "https://www.capida.se/media/catalog/product/cache/2/image/265x265/9df78eab33525d08d6e5fb8d27136e95/0/7/078700280h-1_1000x1000.jpg",
      Bid: 500,
      Condition: "Bra",
      Time: "2022-03-23 12.20",
      State: "Pågående",
      Purchase: 750,
      Favorite: "black"
  }, {
      Name: "Sony Bunny CamX3000",
      Img: "https://www.mytrendyphone.se/images/Animal-Shape-Kids-20MP-Digital-Camera-X5-Rabbit-Pink-21092020-01.jpg",
      Bid: 1337,
      Condition: "Dåligt",
      Time: "2022-03-25 14.10",
      State: "Pågående",
      Purchase: 3225,
      Favorite: "red"
  }, {
      Name: "Nickzon",
      Img: "https://plusshop.se/media/catalog/product/cache/2/image/0dc2d03fe217f8c83829496872af24a0/m/y/myfirst-kamera-pink-03.jpg",
      Bid: 250,
      Condition: "Hyggligt",
      Time: "2022-03-14 10.00",
      State: "Slut",
      Purchase: 500,
      Favorite: "black"
  }, {
      Name: "GåProffs",
      Img: "https://m.media-amazon.com/images/I/61NY4XFI26L._AC_SX569_.jpg",
      Bid: 1234,
      Condition: "Perfekt",
      Time: "2022-03-24 00.00",
      State: "Pågående",
      Purchase: 5750,
      Favorite: "black"
  }]


  return (
      <div className=' d-flex justify-content-center'>
          <div className='col-6'>
                  <div className="col-12 row">
                  <div className='col-8'>
                  <input type="text" placeholder='Sök efter Namn'/>
                  <label htmlFor="ongoing" className='ms-3'>DSLR</label>
                  <input type="checkbox" name="ongoing" className='ms-2'/>
                  <label htmlFor="ongoing" className='ms-3'>Action Kamera</label>
                  <input type="checkbox" name="sold" className='ms-2'/>
                  </div>
                  <div className='col-4 d-flex justify-content-end'>
                   <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                     Sortering
                   </a>

                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                      <li><a className="dropdown-item" href="#">Price</a></li>
                      <li><a className="dropdown-item" href="#">Quality</a></li>
                      <li><a className="dropdown-item" href="#">Time</a></li>
                    </ul>
                    </div>
                  </div>
                  


              {auctions.map(auction => {
                  return(
                      <div className='pt-3' key={auction.Name}>
                          <MyAuctionsCard auction={auction}/>
                      </div>
                  )
                  
              })}
          </div>
      </div>
  )
}