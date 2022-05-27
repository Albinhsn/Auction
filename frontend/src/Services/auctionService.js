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

    

    makePurchase(token, auctionId){
        console.log(token, auctionId)
        return this.auctionMicroService.put("/api/Auction/purchase", null, {
            params: {
                token: token, 
                auctionId: auctionId 
            } 
        })
        // return http.get("/auction/purchase", { 
        //     params:{ token: token, auctionId: auctionId},
        //     headers: { Authorization: `Bearer ${token}` }
        // })
    }
   

    getUserWatchlist(token){
        return this.auctionMicroService.get("/api/Auction/user/watchlist", {
            params: {
                token: token
            }
        })
    }

    getAuctionsBySearch(search){
        return this.auctionMicroService.get("/api/Auction/search",{
            params:{
                search: search
            }
        })
    }

    postAuction(auctioninfo){
        return this.auctionMicroService.post("api/auction/Auction",
            auctioninfo
            
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
    getUserFavorites(token) {
        return this.auctionMicroService.get("/api/auction/user/favorites", {
            params: {
                token: token
            }
        })
    }
}


export default new AuctionDataService;