import http from "../http-common";


class userDataService{

    getAllUsers(){
        return http.get(`/user/users`);
    }

    postRegistrationForm(formInfo){
        return http.post("/user/registration",formInfo)
    }
  
}


export default new userDataService;