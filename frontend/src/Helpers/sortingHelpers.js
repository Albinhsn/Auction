export const DateSortEnd = (auctions) => {
    const temp = auctions.filter(a => a.state !== "Slut")
    return temp.sort((a, b) => 
    Date.parse(a.endDate) - Date.parse(b.endDate)
    )
 }

export const PurchasePriceSort = (auctions) => {
    const temp = auctions.filter(a => a.purchasePrice !== 0)
    return temp.sort((a,b) => {
        const priceA = a.purchasePrice > 0 ? a.purchasePrice : Number.MAX_SAFE_INTEGER
        const priceB = b.purchasePrice > 0 ? b.purchasePrice : Number.MAX_SAFE_INTEGER
        return priceA - priceB
    })
}

const qualities = {
    "Perfekt": 5,
    "Utmärkt": 4,
    "Bra": 3,
    "Hyggligt": 2,
    "Dåligt": 1,
}

 export const QualitySort = (auctions) => {
    return auctions.sort((a, b) => {
        return  qualities[b.condition] - qualities[a.condition]
    })
 }


export const OngoingFilter = (auctions) => {
    return auctions.filter(a => a.state !== "Slut")
}


 

 