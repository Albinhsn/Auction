import http from '../http-common'


class imageService {

    uploadImage(image){
        const formData = new FormData();
        formData.append('file',image)

        return http.post(
            "/images/upload", 
            formData,
        )
    }
} 

export default new imageService