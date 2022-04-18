export const filterAuctions = (auctions, setLocalAuc, currentFilters) => {
           
    if(currentFilters.length === 0){ 
        setLocalAuc(auctions)
    }else{    
        let localAuc = [...auctions]

        currentFilters.map(filter => {
            let i = localAuc.length - 1
            
            switch(filter.tag){
                case "Status":
                     
                    for (let j = i; j>=0; j--){
                        if(!filter.val.includes(localAuc[j].state)){
                            localAuc.splice(j, 1, )
                        }
                    }
                    break;
                case "Märke":
                    
                    for (let j = i; j>=0; j--){
                        if(!filter.val.includes(localAuc[j].tags.brand)){
                            localAuc.splice(j, 1, )
                        }
                    }
                    break; 
                case "Typ av kamera":
                    for (let j = i; j>=0; j--){
                        if(!filter.val.includes(localAuc[j].tags.type)){
                            localAuc.splice(j, 1, )
                        }
                    }
                    break; 
                case "Lens":
                    
                    for (let j = i; j>=0; j--){
                        console.log(localAuc[j])
                        if(!filter.val.includes(localAuc[j].tags.lens)){
                            localAuc.splice(j, 1, )
                        }
                    }
                    break;
                case "Upplösning":
                    for (let j = i; j>=0; j--){
                        if(!filter.val.includes(localAuc[j].tags.resolution)){
                            localAuc.splice(j, 1, )
                        }
                    }
                    break; 
                case "Vädertålig":
                    for (let j = i; j>=0; j--){
                        if(!filter.val.includes(localAuc[j].tags.weatherProof)){
                            localAuc.splice(j, 1, )
                        }
                    }
                    break; 
                case "Bildsensorstorlek":
                    for (let j = i; j>=0; j--){
                        if(!filter.val.includes(localAuc[j].tags.imageSensorSize)){
                            localAuc.splice(j, 1, )
                        }
                    }
                    break; 
                case "Skärmvinkel":
                    for (let j = i; j>=0; j--){
                        if(!filter.val.includes(localAuc[j].tags.angledScreen)){
                            localAuc.splice(j, 1, )
                        }
                    }
                    break; 
                case "Minneskort":
                    
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

