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
                _id: _id,
                authId: authId,
                bid: bid
            }
        })
    }
}


export default new AuctionDataService;