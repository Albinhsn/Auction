import axios from 'axios'

class AuctionDataService {
    auctionMicroService = axios.create({
        baseURL: "http://188.166.50.198:7206",
        headers: {
            "Content-type": "application/json"
        }
    })

    makeBid(Token, _id, Amount) {        
        const date = new Date();
        return this.auctionMicroService.post("/api/bid/bid",
            {
                auctionId: _id, token: Token, amount: Amount, date: date
            })
    }
}
export default new AuctionDataService;