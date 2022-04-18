import http from "../http-common";


class AuctionDataService{

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
        return http.get("/auction/objectid", {params: 
            {
                _id: _id
            } 
        })
    }

    makeBid(authId, _id, bid){
        return http.get("/auction/bid", {params: 
            {
                auctionId: _id,
                userId: authId,
                bid: bid
            }
        })
    }

    makePurchase(userId, auctionId){
        return http.get("/auction/purchase", { params:
            {
                userId: userId,
                auctionId: auctionId
            }
        })
    }
    getFavoritesById(authId){
        return http.get("/auction/favorites", {params: {authId: authId}})
    }

    getUserAuctions(authId){
        return http.get("/auction/user", {
            params:
            {
                userId: authId
            }
        })
    }

    getAuctionsBySearch(search){
        return http.get("/auction/search",{
            params:{
                search: search
            }
        })
    }

    postAuction(auctioninfo){
        return http.post("/auction/create", auctioninfo)
    }
}


export default new AuctionDataService;