import React from 'react'
import MyAuctionsCard from '../Components/MyAuctionsCard'

export default function MyAuctions(){
    const auctions = [{
        Name: "Panasonic",
        Img: "https://www.panasonic.com/content/dam/pim/se/sv/HC/HC-V18/HC-V180EC/HC-V180EC-Variation_Image_for_See_All_1Global-1_se_sv.png",
        Bid: 120,
        Condition: "Utmärkt",
        Time: "2022-03-01 09.00",
        State: "Slut",
        Purchase: 250,
        Favorite: "red"
    }, {
        Name: "Canon",
        Img: "https://i1.adis.ws/i/canon/eos_5d_mark_iv-frt-w-ef-50mm_800x800?w=800&h=800&fmt=jpg&fmt.options=interlaced&bg=rgb(236,237,237)",
        Bid: 210,
        Condition: "Bra",
        Time: "2022-03-23 12.20",
        State: "Pågående",
        Purchase: 350,
        Favorite: "black"
    }, {
        Name: "Sony",
        Img: "https://www.sony.se/image/14df0d210e44e2526441eeb1024ad89a?fmt=pjpeg&wid=330&bgcolor=FFFFFF&bgc=FFFFFF",
        Bid: 1000,
        Condition: "Dåligt",
        Time: "2022-03-25 14.10",
        State: "Pågående",
        Purchase: 3225,
        Favorite: "red"
    }, {
        Name: "Nikon",
        Img: "https://www.nikon.se/imported/images/web/EU/products/digital-cameras/dslr/D3500/D3500_AFP_18_55_VR_front_classic--original.png",
        Bid: 250,
        Condition: "Hyggligt",
        Time: "2022-03-14 10.00",
        State: "Slut",
        Purchase: 500,
        Favorite: "black"
    }, {
        Name: "GoPro",
        Img: "https://www.scandinavianphoto.se/globalassets/1049274_gopro_hero_9_black.jpg?ref=DBB4E5E3ED&w=960&h=960&mode=max",
        Bid: 1234,
        Condition: "Perfekt",
        Time: "2022-03-24 00.00",
        State: "Pågående",
        Purchase: 1500,
        Favorite: "black"
    }]


    return (
        <div className='d-flex justify-content-center'>
            <div className='col-6'>
                <div>
                    <input type="text" placeholder='Sök efter Namn'/>
                    <label htmlFor="ongoing" className='ms-3'>Pågående</label>
                    <input type="checkbox" name="ongoing" className='ms-2'/>
                    <label htmlFor="ongoing" className='ms-3'>Slut</label>
                    <input type="checkbox" name="sold" className='ms-2'/>
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