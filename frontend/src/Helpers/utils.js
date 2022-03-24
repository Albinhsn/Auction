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