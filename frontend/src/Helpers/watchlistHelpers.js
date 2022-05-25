import watchlistService from "../Services/watchlistService"

export const updateWatchlist = (token, type, auctionId, setFunction, state) => {

    if(!token) return
    if(type === "Reminder"){
        watchlistService.updateWatchlist(token, type, auctionId).then(() => {
            setFunction(!state)
        })
    }else{
        watchlistService.updateWatchlist(token, type, auctionId).then(() => {
            setFunction(!state)
        })
    }
    
} 