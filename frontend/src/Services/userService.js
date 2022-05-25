import http from "../http-common";
import axios from 'axios'

class userDataService{
    userMicroService = axios.create({
        baseURL: "https://localhost:7279",
        headers: {
            "Content-type": "application/json"
        }
    })
    getAllUsers(){
        return http.get(`/user/users`);
    }

    postRegistrationForm(formInfo){
        return this.userMicroService.post("/api/User/user",formInfo)
    }

    validateLogin(formInfo){
        const token = http.post("/auth/authenticate", formInfo)
        localStorage.setItem("access_token", token)
        return token
    }
    
    handleGoogleLogin(googleInfo){
        return http.post("/user/login/google", googleInfo)
    }

    getNameFromObjectId(_id){
        // return http.get("/user/id", {
        //     params: {_id: _id}
        // })
        return this.userMicroService.get("/api/user/name", {
            params:{
                Id: _id
            }
        })
    }

    checkFavorite(token, auctionId){
        return this.userMicroService.get("/api/user/favorite", {
            params: {
                token: token,
                auctionId: auctionId
            }
        }) 
        // return http.get("/user/favorite", 
        // {
        //     params:{ token: token, auctionId: auctionId },
        //     headers: { Authorization: `Bearer ${token}` }
        // })
    }

    updateFavorite(token, auctionId){
        console.log(token)
        console.log(auctionId)        
        return this.userMicroService.get("/api/User/update/favorite",
            {
                params: { token: token, auctionId: auctionId },                
            })
    }
    updateWatchlist(token, auctionId){
        
        return http.get("/user/update/watchlist",
        { 
            params: { token: token, auctionId: auctionId},
            headers: { Authorization: `Bearer ${token}` }
        }
            )
    }

    // getUserFromObjectId(token){
    //     return http.get("/user/user", {params: {token: token}})
    // }

    changeEmail(token, email, matchingEmail){
        
        return this.userMicroService.put("/api/user/email", null,
        {
            params:
            {            
                token: token,
                email: email,
                matchingEmail: matchingEmail            
            }
        }
    )
        // return http.get("/registration/email", {
        //     params: { token: token, email: email, matchingEmail: matchingEmail },
        //     headers: { Authorization: `Bearer ${token}` }
        // })
    }
    
    changePassword(token, password, matchingPassword){
        return this.userMicroService.put("/api/user/password",null, {
            params:{
                token: token,
                password: password,
                matchingPassword: matchingPassword
            }
        })
        // return http.get("/registration/password", {
        //     params: {token: token, password: password, matchingPassword: matchingPassword},
        //     headers: { Authorization: `Bearer ${token}` }
        // })
    }

    updateKeepMePosted(token, auctionId){
        return http.get("/user/update/keepmeposted",
            {
                params: { token: token, auctionId: auctionId },
                headers: { Authorization: `Bearer ${token}` }
            }
        )
    }
    getUserFromObjectId(id){
        return this.userMicroService.get("/api/user/user")
    }
    getUserFromToken(token){
        return this.userMicroService.get("/api/user/User", {
            params: {
                token: token
            }
        })
    }
}


export default new userDataService;