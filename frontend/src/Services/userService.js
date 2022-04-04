import http from "../http-common";


class userDataService{

    getAllUsers(){
        return http.get(`/user/users`);
    }

    postRegistrationForm(formInfo){
        return http.post("/registration/user",formInfo)
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

    getUserFromObjectId(userId){
        return http.get("/user/user", {params: {userId: userId}})
    }

    changeEmail(userId, email, matchingEmail){
        console.log(email)
        console.log(matchingEmail)
        return http.get("/registration/email", {
            params: 
                {
                    userId: userId, 
                    email: email, 
                    matchingEmail: matchingEmail
                }
        })
    }
    
    changePassword(userId, password, matchingPassword){
        return http.get("/registration/password", {
            params: {
                userId: userId,
                password: password, 
                matchingPassword: matchingPassword                
            }
        })
    }
}


export default new userDataService;