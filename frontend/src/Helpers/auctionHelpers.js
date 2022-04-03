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

export const handleBid = (authId, auction, setAuction) => {

    
}

export const makePurchase = () => {

}