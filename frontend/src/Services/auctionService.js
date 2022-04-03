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
}


export default new AuctionDataService;