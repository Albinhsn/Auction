import http from "../http-common";


class userDataService{

    getAllUsers(){
        return http.get(`/user/users`);
    }

    postRegistrationForm(formInfo){
        return http.post("/user/registration",formInfo)
    }

    validateLogin(formInfo){
        console.log(formInfo)
        return http.get("/user/login", {params: formInfo })
    }
  
}


export default new userDataService;