export const convertToGallery= (image) => {
    let obj = {
        original: image,
        thumbnail: ""
    }    
    return obj
}

export const convertFromGallery = (images) => {
    let I = []
    
    images.map(image => {
        
        image = image.original.replace('http://localhost:7141/api/Image/', '')
        I.push(image)
    }) 
    return I
}

export const convertToUrl = (id) => {
    return `http://localhost:7141/api/Image/${id}`
}