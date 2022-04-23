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
    getFavoritesById(token){
        return http.get("/auction/favorites", {
            params: {token: token},
            headers:{ Authorization: `Bearer ${token}`}
        })
    }

    getUserAuctions(token){
        return http.get("/auction/user", {
            params:{ token: token },
            headers:{ Authorization: `Bearer ${token}`}
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