import React from 'react'
import ImageGallery from 'react-image-gallery'


export default function AuctionCardProductInfo({auction}) {
  
    return (
      <div className='col-5 bg-light'>
        <div className='row justify-content-center' style={{ height: "50vh" }}>
            <div className='col-10'>
                <ImageGallery
                    items={auction.images}
                    showPlayButton={false}
                    useBrowserFullscreen={false}
                    originalHeight={"200"}
                    originalWidth={"200"}
                    className="image-gallery"
                    showFullscreenButton={false}
                />
            </div>
            <div className='d-flex align-items-center ms-5 pt-3'>
                <h3 className=''>
                    {auction.name}
                </h3>
            </div>
            <div className='d-flex'>
                <p className='mb-0'>
                    Skick:
                </p>
                <p className='ps-3 mb-0'>
                    {auction.condition}
                </p>
            </div>
        </div>
          <p className='pt-4'>
              {auction.description}
          </p>
      </div>
  )
}
