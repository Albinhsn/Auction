import http from "../http-common";


class userDataService{

    getAllUsers(){
        return http.get(`/user/users`);
    }

    postRegistrationForm(formInfo){
        return http.post("/user/registration",formInfo)
    }

    validateLogin(formInfo){
        return http.get("/user/login", {params: formInfo })
    }
    
    handleGoogleLogin(googleInfo){
        console.log(googleInfo)
        return http.post("/user/login/google", googleInfo)
    }

    getNameFromObjectId(_id){
        return http.get("/user/id", {
            params: {_id: _id}
        })
    }

    checkFavorite(userId, auctionId){
        console.log(userId, auctionId)
        return http.get("/user/favorite", {
            params:{
                userId: userId, 
                auctionId: auctionId
            }
        })
    }

    updateFavorite(userId, auctionId){
        return http.get("/user/update/favorite",{ params: { userId: userId, auctionId: auctionId}})
    }
    updateWatchlist(userId, auctionId){
        return http.get("/user/update/watchlist",{ params: { userId: userId, auctionId: auctionId}})
    }


}


export default new userDataService;