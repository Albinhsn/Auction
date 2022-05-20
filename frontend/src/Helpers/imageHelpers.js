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
        I.push(image.original)
    }) 
    return I
}

export const convertToUrl = (id) => {
    return `https://localhost:7141/api/Image/${id}`
}