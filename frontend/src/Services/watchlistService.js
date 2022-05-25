import axios from 'axios'


class watchlistService {
    watchlistMicroservice = axios.create({
        baseURL: "https://localhost:7294",
        headers: {
            "Content-type": "application/json"
        }
    })
    getWatchlist(token, auctionId){
        return this.watchlistMicroservice.get("/api/watchlist", {
            params: {
                token: token,
                auctionId: auctionId
            }
        })
    }
    updateWatchlist(token, type, auctionId){
        return this.watchlistMicroservice.put("/api/watchlist", null, {
            params: {
                token: token,
                type: type,
                auctionId: auctionId
            }
        })
    }
   
}

export default new watchlistService