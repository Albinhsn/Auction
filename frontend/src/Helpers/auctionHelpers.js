import auctionService from '../Services/auctionService'
import userService from '../Services/userService'

export const favoriteChange = (token, _id, favorite, setFavorite) => {
    console.log(_id, favorite)
    if(!token) return


    setFavorite(!favorite)
    userService.updateFavorite(token, _id)
}



export const watchlistChange = (token, _id, watchlist, setWatchlist) => {

    if(!token) return

    userService.updateWatchlist(token, _id)
    setWatchlist(!watchlist)
}

export const handleBid = (token, auction, bid, setAuction) => {
    
    if(!token) return
    if(auction.bidHistory.length > 0){
        if (parseInt(auction.bidHistory[auction.bidHistory.length - 1].bid) + 10 > bid) {
            alert("Vänligen ange korrekt bud")
            return
        }
    }else{
        if (auction.minimumBid + 10 > bid) {
            alert("Vänligen ange korrekt bud")
            return
        }
    }
    
    auctionService.makeBid(token, auction._id, bid).then(response => {
        console.log(response)
    }).then(() => {
        auctionService.getAuctionByObjectId(auction._id).then(response => {
            setAuction(response.data)
        })
    })

}

export const makePurchase = (token, auctionId, setAuction) => {

    if(!token) return

    auctionService.makePurchase(token, auctionId).then(response => {
        setAuction(response.data)
        console.log(response.data)
    })
}