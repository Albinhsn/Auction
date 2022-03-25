import React from 'react'
import Jumbo from '../Components/Homepage/Jumbo'
import Explore from '../Components/Homepage/Explore'


export default function Home({auctions}) {
  return (
    <>
      <Jumbo />
      <Explore auctions={auctions} type = {"End"}/>
      <Explore auctions={auctions}type ={"Start"}/>
      <Explore auctions={auctions}type ={"Price"}/>
    </>
  )
}
