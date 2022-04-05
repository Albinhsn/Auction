
//filter = {
//  tag: "",
//  vars: [val1, val2, ...]    
//}

export const filterAuctions = (auctions, currentFilters) => {
    
    if(currentFilters.length === 0) return auctions

    currentFilters.map(filter => {
        switch(filter.tag){
            case "state":
                
                break;
            case "brand":
                break; 
            case "type":
                break; 
            case "lens":
                break;
            case "resolution":
                break; 
            case "weatherProof":
                break; 
            case "imageSensorSize":
                break; 
            case "angledScreen":
                break; 
        }
    })
}

export const handleFilterChange = (currentFilters, setCurrentFilters, tag, val) => {
    let locFilters = [...currentFilters]
    locFilters.map(filter => {
        
    })
    
    setCurrentFilters(locFilters)
}

