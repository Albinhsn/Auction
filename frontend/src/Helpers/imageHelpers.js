export const convertToGallery= (image) => {
    let obj = {
        original: image,
        thumbnail: ""
    }    
    return obj
}

export const convertFromGallery = () => {

}

export const convertToUrl = (id) => {
    return `http://localhost:8000/images/image/${id}`
}