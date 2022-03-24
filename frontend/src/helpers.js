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
     const temp  = auctions.filter(a => a.State !== "Slut")
         return temp.sort((a, b) => {
             if(a.BidHistory.length == 0) return -1
             return a.BidHistory[a.BidHistory.length - 1] - b.BidHistory[b.BidHistory.length - 1]
         }
     )
 }