export const DateSortEnd = (auctions) => {
    return auctions.sort((a, b) => 
     Date.parse(a.endDate) - Date.parse(b.endDate)
     )
 }
 
 export const DateSortStart = (auctions) => {
     return auctions.sort((a, b) => 
     Date.parse(b.startDate) - Date.parse(a.startDate) 
      )
  }
  
 
 export const PriceSort = (auctions) => {
         return auctions.sort((a, b) => {
             const priceA = a.bidHistory.length > 0 ? a.bidHistory[a.bidHistory.length - 1].bid : a.minimumBid
             const priceB = b.bidHistory.length > 0 ? b.bidHistory[b.bidHistory.length - 1].Bid : b.MinimumBid
            return priceA - priceB
         }
         )
 }

export const PurchasePriceSort = (auctions) => {
    return auctions.sort((a,b) => {
        const priceA = a.purchasePrice > 0 ? a.purchasePrice : Number.MAX_SAFE_INTEGER
        const priceB = b.purchasePrice > 0 ? b.purchasePrice : Number.MAX_SAFE_INTEGER
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
        return  qualities[b.condition] - qualities[a.condition]
    }
    )
 }

 export const TypeFilter = (auctions, id) => {
    
        return auctions.filter(a => a.name.includes(id))
           
        
}
export const TagFilter = (auctions, tag) => {
    return auctions.filter(a => a.tags.includes(tag))   
}
export const StateFilter = (auctions, state) => {
    return auctions.filter(a => a.state === state)
}

export const OngoingFilter = (auctions) => {
    const temp  = auctions.filter(a => a.state !== "Slut")
        return temp.sort((a, b) => {
            if(a.type.length == 0) return -1
        }
    )
}


 

 