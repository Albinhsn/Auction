import auctionService from '../Services/auctionService'
import userService from '../Services/userService'
import bidService from '../Services/bidService'


export const favoriteChange = (token, _id, setFavorite) => {
    
    if(!token) return


    
    userService.updateFavorite(token, _id).then(response => {        
        console.log(response.data)
        setFavorite(response.data)
    })
}

export const updatedChange = (token, _id, updated, setUpdated) => {
    if (!token)

    //userService.updateKeepMePosted(token, _id).then(() => {
        setUpdated(!updated)
    //})
}

export const reminderChange = (token, _id, reminder, setReminder) => {

    if(!token) return

    userService.updateWatclist(token, _id).then(() => {
        setReminder(!reminder)
    })
    
}

export const handleBid = (token, auction, bid, setAuction) => {
    
    if(!token) return
    if(auction.highestBid > 0){
        if (auction.highestBid + 10 > bid) {
            alert("Vänligen ange korrekt bud")
            return
        }
    }else{
        if (auction.minimumBid + 10 > bid) {
            alert("Vänligen ange korrekt bud")
            return
        }
    }
    
    bidService.makeBid(token, auction.id, bid).then(response => {        
    }).then(() => {
        auctionService.getAuctionByObjectId(auction.id).then(response => {
            setAuction(response.data)
            alert(`Du la ett bud på ${bid}`)
        })
    }).catch(
        function (error) {
            if (error.response) {
                alert(error.response.data)
            }
        })

}
export const handleSwissBid = (token, auction, bid, myBid, setMyBid) => {
    if(!token) return
    
    if(bid <= myBid + 10){
        alert("Ditt bud måste vara högre än ditt förra")
        return
    }

    bidService.makeBid(token, auction.id, bid).then(response => {
        setMyBid(response.data.amount)
        alert(`Du la ett bud på ${bid}`)
        setMyBid(bid)

    })

}

export const makePurchase = (token, auctionId, setAuction) => {

    if(!token) return

    auctionService.makePurchase(token, auctionId).then(response => {
        setAuction(response.data)    
        alert("Grattis du vann auktionen")
    }).catch(
        function (error) {
            if (error.response) {
                alert(error.response.data)
            }
        })
}