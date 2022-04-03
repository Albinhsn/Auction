import auctionService from '../Services/auctionService'
import userService from '../Services/userService'

export const favoriteChange = (authId, _id, favorite, setFavorite) => {
    if(!authId) return


    favorite === "black" ? 
        setFavorite("red")       
        : 
        setFavorite("black")
    userService.updateFavorite(authId, _id)
}



export const watchlistChange = (authId, _id, watchlist, setWatchlist) => {

    if(!authId) return

    userService.updateWatchlist(authId, _id)
    setWatchlist(!watchlist)
}

export const handleBid = (authId, auction, bid) => {
    
    if(!authId) return
    
    if(parseInt(auction.bidHistory[auction.bidHistory.length - 1].bid) + 10 > bid){
        alert("Vänligen ange korrekt bud")
        return
    }

    //handle bid
    auctionService.makeBid(authId, auction._id, bid).then(response => {
        
        //force rerender
        
    })
    
    

}

export const makePurchase = () => {



}