import axios from 'axios'

class AuctionDataService {
    auctionMicroService = axios.create({
        baseURL: "http://localhost:7206",
        headers: {
            "Content-type": "application/json"
        }
    })

    makeBid(Token, _id, Amount) {
        console.log(Token, _id, Amount)
        return this.auctionMicroService.post("/api/bid/bid",
            {
                auctionId: _id, token: Token, amount: Amount 
            })
    }
}
export default new AuctionDataService;