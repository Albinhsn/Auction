import axios from "axios";


class authService {
    authMicroService = axios.create({
        baseURL: "http://188.166.50.198:7292",
        headers: {
            "Content-type": "application/json",
            'Accept': "application/json"
        }
    })

    validateLogin = (username, password) => {
        return this.authMicroService.post("/api/UserAuthentication/AuthenticateUser",{
            Email: username,
            Password: password
        })
    }

    changePassword = (formInput) => {
        return this.authMicroService.put("/api/UserAuthentication/update/password", formInput)
    }
}
export default new authService;
