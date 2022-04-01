export const convertToGallery= (images) => {
    let arr = []
    images.map(image => {
        let i = {
            original: image,
            thumbnail: ''
        }
        arr.push(i)
    })
    return arr
}

export const convertFromGallery = () => {

}