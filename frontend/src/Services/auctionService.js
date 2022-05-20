import http from "../http-common";
import axios from 'axios';

class AuctionDataService{
    auctionMicroService = axios.create({
        baseURL: "https://localhost:7086",
        headers: {
            "Content-type": "application/json"
        }
    })
    
    getAllCurrent(){
        return http.get(`/auction/state`);
    }

    getAuctionsByBidAsc(){
        return http.get("/auction/bid/asc")
    }

    getAuctionsByTimeAsc(){
        return http.get("/auction/time/asc")
    }

    getAuctionsByPurchaseAsc(){
        return http.get("/auction/purchase/asc")
    }

    getAuctionByObjectId(_id){
        return this.auctionMicroService.get("/api/Auction/single/auction", {params: {
            Id: _id
        }})
        // return http.get("/auction/objectid", {params: 
        //     {
        //         _id: _id
        //     } 
        // })
    }

    makeBid(token, _id, bid){
        return http.get("/auction/bid", 
        {
            params: { auctionId: _id, token: token, bid: bid},
            headers: { Authorization: `Bearer ${token}` }
        })
    }

    makePurchase(token, auctionId){
        return http.get("/auction/purchase", { 
            params:{ token: token, auctionId: auctionId},
            headers: { Authorization: `Bearer ${token}` }
        })
    }
   

    

    getAuctionsBySearch(search){
        return http.get("/auction/search",{
            params:{
                search: search
            }
        })
    }

    postAuction(auctioninfo, token){
        return http.post("/auction/create",
            auctioninfo, 
            {headers: { Authorization: `Bearer ${token}` }}
    )}

    getWatchlistById(token){
        return http.get("/auction/watchlist",{
                params: { token: token },
                headers: { Authorization: `Bearer ${token}` }
            }
        )
    }
    getAuctionsSortedLimited(sort, direction, limitedBy){
        return this.auctionMicroService.get("/api/auction/Auction/sorted/limited",{
            params: {
                sort: sort,
                direction: direction,
                limitedBy: limitedBy
            }
        })
    }
    getAuctionsByTimeRemainingAsc(){
        return this.auctionMicroService.get("/api/auction/auction/sorted/endDate")
    }
    getAuctionsByPurchasePriceAsc(){
        return this.auctionMicroService.get("/api/auction/auction/sorted/purchasePrice")
    }
    getAuctionByHighestBidAsc(){        
        return this.auctionMicroService.get("/api/auction/auction/sorted/highestBid")
    }

    getUserAuctions(id){
        return this.auctionMicroService.get("/api/auction/user/auctions", {
            params: {
                Id: id
            }
        })
    }
}


export default new AuctionDataService;