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
}


export default new AuctionDataService;