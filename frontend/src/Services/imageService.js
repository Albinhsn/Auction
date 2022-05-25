import axios from 'axios'


class imageService {
    imageMicroService = axios.create({
        baseURL: "https://localhost:7141",
        headers: {
            "Content-type": "application/json"
        }
    })
    uploadImage(image){
        const formData = new FormData();
        formData.append('file',image)

        return this.imageMicroService.post(
            "/api/Image", 
            formData,{
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        )
    }
} 

export default new imageService