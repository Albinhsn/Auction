import http from "../http-common";


class userDataService{

    getAllUsers(){
        return http.get(`/user/users`);
    }

    postRegistrationForm(formInfo){
        return http.post("/registration/user",formInfo)
    }

    validateLogin(formInfo){
        const token = http.post("/auth/authenticate", formInfo)
        
        localStorage.setItem("access_token", token)
        return token
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

    checkFavorite(token, auctionId){
        return http.get("/user/favorite", {
            params:{
                token: token, 
                auctionId: auctionId
            }
        })
    }

    updateFavorite(token, auctionId){
        return http.get("/user/update/favorite",{ params: { token: token, auctionId: auctionId}})
    }
    updateWatchlist(token, auctionId){
        return http.get("/user/update/watchlist",{ params: { token: token, auctionId: auctionId}})
    }

    getUserFromObjectId(userId){
        return http.get("/user/user", {params: {userId: userId}})
    }

    changeEmail(token, email, matchingEmail){
        console.log(email)
        console.log(matchingEmail)
        return http.get("/registration/email", {
            params: 
                {
                    token: token, 
                    email: email, 
                    matchingEmail: matchingEmail
                }
        })
    }
    
    changePassword(token, password, matchingPassword){
        return http.get("/registration/password", {
            params: {
                token: token,
                password: password, 
                matchingPassword: matchingPassword                
            }
        })
    }
}


export default new userDataService;