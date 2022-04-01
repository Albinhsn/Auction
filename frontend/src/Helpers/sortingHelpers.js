export const DateSortEnd = (auctions) => {
    return auctions.sort((a, b) => 
     Date.parse(a.StopTime) - Date.parse(b.StopTime)
     )
 }
 
 export const DateSortStart = (auctions) => {
     return auctions.sort((a, b) => 
     Date.parse(b.StartTime) - Date.parse(a.StartTime) 
      )
  }
  
 
 export const PriceSort = (auctions) => {
         return auctions.sort((a, b) => {
             const priceA = a.BidHistory.length > 0 ? a.BidHistory[a.BidHistory.length - 1].Bid : a.MinimalBid
             const priceB = b.BidHistory.length > 0 ? b.BidHistory[b.BidHistory.length - 1].Bid : b.MinimalBid
            return priceA - priceB
         }
         )
 }

export const PurchaseNowPriceSort = (auctions) => {
    return auctions.sort((a,b) => {
        const priceA = a.PurchaseNow > 0 ? a.PurchaseNow : Number.MAX_SAFE_INTEGER
        const priceB = b.PurchaseNow > 0 ? b.PurchaseNow : Number.MAX_SAFE_INTEGER
        return priceA - priceB
    })
}

const qualities = {
    "Perfekt": 5,
    "Utmärkt": 4,
    "Bra": 3,
    "Hygglig": 2,
    "Dåligt": 1,
}

 export const QualitySort = (auctions) => {
    return auctions.sort((a, b) => {
        return  qualities[b.Condition] - qualities[a.Condition]
    }
    )
 }

 export const TypeFilter = (auctions, id) => {
    
        return auctions.filter(a => a.Title.includes(id))
           
        
}
export const TagFilter = (auctions, tag) => {
    return auctions.filter(a => a.Tags.includes(tag))   
}
export const StateFilter = (auctions, state) => {
    return auctions.filter(a => a.State === state)
}

export const OngoingFilter = (auctions) => {
    const temp  = auctions.filter(a => a.State !== "Slut")
        return temp.sort((a, b) => {
            if(a.type.length == 0) return -1
        }
    )
}


 

 