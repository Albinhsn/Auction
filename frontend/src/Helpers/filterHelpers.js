export const filterAuctions = (auctions, setLocalAuc, currentFilters, localAuc) => {
           
    if(currentFilters.length === 0){ 
        setLocalAuc(localAuc)
    }else{    
        let localAuc = [...auctions]        
        let flag = false
        currentFilters.map(filter => {
            let i = 0    
            
            switch(filter.tag){
                case "Status":
                    if(filter.val === "Slut"){
                        flag = true
                    }                    
                    localAuc = localAuc.filter(auc => filter.val.includes(auc.state) === true) 
                    
                    break;
                case "Märke":
                    
                    localAuc = localAuc.filter(auc => filter.val.includes(auc.tags.brand) === true)
                    
                    break; 
                case "Typ av kamera":
                    localAuc = localAuc.filter(auc => filter.val.includes(auc.tags.type) === true)
                    
                    break; 
                case "Lens":
                    localAuc = localAuc.filter(auc => filter.val.includes(auc.tags.lens) === true)
                    // for (let j = i; j>=0; j--){
                    //     console.log(localAuc[j])
                    //     if(!filter.val.includes(localAuc[j].tags.lens)){
                    //         localAuc.splice(j, 1, )
                    //     }
                    // }
                    break;
                case "Upplösning":
                    localAuc = localAuc.filter(auc => filter.val.includes(auc.tags.resolution) === true)    
                    // for (let j = i; j>=0; j--){
                    //     if(!filter.val.includes(localAuc[j].tags.resolution)){
                    //         localAuc.splice(j, 1, )
                    //     }
                    // }
                    break; 
                case "Vädertålig":
                    localAuc = localAuc.filter(auc => filter.val.includes(auc.tags.weatherProof) === true)
                    // for (let j = i; j>=0; j--){
                    //     if(!filter.val.includes(localAuc[j].tags.weatherProof)){
                    //         localAuc.splice(j, 1, )
                    //     }
                    // }
                    break; 
                case "Bildsensorstorlek":
                    localAuc = localAuc.filter(auc => filter.val.includes(auc.tags.imageSensorSize) === true)
                    // for (let j = i; j>=0; j--){
                    //     if(!filter.val.includes(localAuc[j].tags.imageSensorSize)){
                    //         localAuc.splice(j, 1, )
                    //     }
                    // }
                    break; 
                case "Skärmvinkel":
                    localAuc = localAuc.filter(auc => filter.val.includes(auc.tags.angledScreen) === true)
                    // for (let j = i; j>=0; j--){
                    //     if(!filter.val.includes(localAuc[j].tags.angledScreen)){
                    //         localAuc.splice(j, 1, )
                    //     }
                    // }
                    break; 
                case "Minneskort":
                    i = localAuc.length - 1
                    for(let j = i; j>=0; j--){
                        let flag = false
                        if(localAuc[j].tags.memoryCards !== null){
                            localAuc[j].tags.memoryCards.map(memoryCard => {
                                if(filter.val.includes(memoryCard)){
                                    flag = true
                                }
                            })
                        }
                        if(!flag){
                            localAuc.splice(j, 1, )
                        }
                    }
                    break;
                case "Trådlös Uppkoppling":
                    i = localAuc.length - 1
                    for(let j = i; j>=0; j--){
                        let flag = false
                        if(localAuc[j].tags.wirelessConnection !== null){    
                            localAuc[j].tags.wirelessConnection.map(connection => {
                                if(filter.val.includes(connection)){
                                    flag = true
                                }
                            })
                        }
                        if(!flag){
                            localAuc.splice(j, 1, )
                        }
                    }
                    break;
            }
            if(!flag){
                localAuc = localAuc.filter(auc => auc.state !== "Slut")
            }
            setLocalAuc(localAuc)
            
        })
    }
}

export const handleFilterChange = (currentFilters, setCurrentFilters, tag, val) => {
    let locFilters = [...currentFilters]
    let flag = false
    locFilters.map(filter => {
        if(filter.tag === tag){
            
            if(!document.getElementById(`${val.replace(/\s/g, "")}`).checked){
                filter.val.splice(filter.val.indexOf(val),1, )
                if(filter.val.length === 0){
                    locFilters.splice(locFilters.indexOf(filter), 1, )
                }
            }else{
                filter.val.push(val)
            }
            flag = true        
        }
    })
    if(!flag){
        locFilters.push({
            tag: tag,
            val: [val]
        })
    }
    console.log(locFilters)
    setCurrentFilters(locFilters)
    
}

