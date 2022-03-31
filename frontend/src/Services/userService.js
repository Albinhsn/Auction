import http from "../http-common";


class userDataService{

    getAllUsers(){
        return http.get(`/user/users`);
    }

    postCreateUserForm(){
        return http.post('/user/registration')
    }
  
}


export default new userDataService;