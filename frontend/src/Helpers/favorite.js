export const isFavorite = (auction, user) => {
    for(let i = 0;i<user.Favorites.length; i++){
        if(auction.Id === user.Favorites[i]){
            
            return "red"
        }
    }
    return "black"
}