import axios from "axios";


class authService {
    authMicroService = axios.create({
        baseURL: "https://localhost:7292",
        headers: {
            "Content-type": "application/json"
        }
    })

    validateLogin = (username, password) => {
        return this.authMicroService.post("/api/UserAuthentication/AuthenticateUser",{
            Username: username,
            Password: password
        })
    }
}
export default new authService;
