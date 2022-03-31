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

}


export default new userDataService;