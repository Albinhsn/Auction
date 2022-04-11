import http from '../http-common'


class imageService {

    uploadImage(image){
        return http.post("/images/upload")
    }
} 

export default new imageService