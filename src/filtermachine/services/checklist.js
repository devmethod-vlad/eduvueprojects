async function prepareCheckBoxes(store, id_list, prefill, for_mu=false){

    await checkCheckBoxesInitial(store, id_list, prefill);
    await checkCheckBoxState(store, id_list, prefill);
}

async function checkCheckBoxesInitial(store, id_list, prefill){
    let storeCopy = await JSON.parse(JSON.stringify(store.$state));
    if (prefill === 1){
        storeCopy.checkList = []
        id_list.forEach((id)=>{
            if(!storeCopy.checkListReverse.includes(id)){
                storeCopy.checkList.push(id)
            }
        });
    }
    await store.$patch(storeCopy);

}

async function checkCheckBoxState(store, id_list, prefill){
    let storeCopy = await JSON.parse(JSON.stringify(store.$state));

    if(prefill === 1){
        storeCopy.checkAllCheckBoxList = [store.$state.selectAllCheckBoxId];
    }
    else{
        storeCopy.checkAllCheckBoxList = [];
    }
    await store.$patch(storeCopy);
}

function checkAllPage(store, id_list, prefill){
    let storeCopy = {...store.$state};
    id_list.forEach((id)=>{
        if(!storeCopy.checkList.includes(id)){
            storeCopy.checkList.push(id)
        }
        if (prefill === 1){
            let index = storeCopy.checkListReverse.indexOf(id);
            if(index !==-1){
                storeCopy.checkListReverse.splice(index, 1);
            }
        }
    });
    store.$patch(storeCopy);
}

function unCheckAllPage(store, id_list, prefill){
    // console.log("unCheckAllPage");
    let storeCopy = {...store.$state};
    id_list.forEach((id)=>{
        let index = storeCopy.checkList.indexOf(id);
        if(index !==-1){
            storeCopy.checkList.splice(index, 1);
        }
        if (prefill === 1){
            if(!storeCopy.checkListReverse.includes(id)){
                storeCopy.checkListReverse.push(id)
            }
        }
    })
    store.$patch(storeCopy);
}

function addToCheckList(store, id, prefill){
    let storeCopy = {...store.$state};
    if(!storeCopy.checkList.includes(id)){
        storeCopy.checkList.push(id)
    }
    if (prefill === 1){
        let index = storeCopy.checkListReverse.indexOf(id);
        if(index !==-1){
            storeCopy.checkListReverse.splice(index, 1);
        }
    }

    store.$patch(storeCopy);
}

function removeFromCheckList(store, id, prefill){
    let storeCopy = {...store.$state};
    let index = storeCopy.checkList.indexOf(id);
    if(index !==-1){
        storeCopy.checkList.splice(index, 1);
    }
    if (prefill === 1){
        if(!storeCopy.checkListReverse.includes(id)){
            storeCopy.checkListReverse.push(id)
        }
    }
    store.$patch(storeCopy);
}

function getCheckUncheckInRenderList(target, store){

    let includeArray = [];

    let checkList = JSON.parse(JSON.stringify(store.$state.checkList));

    checkList = checkList.map((item)=>{
        return Number(item);
    })

    let reverseCheckList = JSON.parse(JSON.stringify(store.$state.checkListReverse));

    reverseCheckList = reverseCheckList.map((item)=>{
        return Number(item);
    })

    let infoList = JSON.parse(JSON.stringify(store.$state.info_list));

    if (target === 'role'){
        infoList = infoList.map((item)=>{
            return Number(item.roleid)
        })
    }

    if (target === 'spec'){
        infoList = infoList.map((item)=>{
            return Number(item.specid)
        })
    }

    if (target === 'mu' || target === 'mo'){
        infoList = infoList.map((item)=>{
            return Number(item.moid)
        })
    }

    if (store.$state.prefill === 1){
        reverseCheckList.forEach((item)=>{
            if (infoList.includes(item)){
                includeArray.push(item)
            }
        })
    }
    else {
        checkList.forEach((item)=>{
            if (infoList.includes(item)){
                includeArray.push(item)
            }
        })
    }

    return includeArray.length;

}


function setCheckUncheckPageMode(store, target){

    let mode = "check";

    let includeCount = getCheckUncheckInRenderList(target, store);

    // console.log("includeCount: ", includeCount);

    if (store.$state.prefill === 1){

        if(includeCount < store.$state.info_list.length/2){
            mode = "uncheck";
        }
    }
    else {
        if(includeCount > store.$state.info_list.length/2){
            mode = "uncheck";
        }
    }
    console.log("setCheckUncheckPageMode mode: ", mode);

    return mode;
}



export {
    addToCheckList,
    removeFromCheckList,
    checkAllPage,
    unCheckAllPage,
    checkCheckBoxState,
    prepareCheckBoxes,
    checkCheckBoxesInitial,
    setCheckUncheckPageMode
}