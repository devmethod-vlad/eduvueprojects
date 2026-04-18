function accessCreateNewItem(store){
    let newValidFlag = true;
    let existValidFlag = true;
    let newCount = 0;
    let runtimeData = JSON.parse(JSON.stringify(store.$state.runtime));
    runtimeData.forEach(item => {
        if(item.id.toString().includes('new')){
            newCount=newCount+1;
            if(!item.valid){
                newValidFlag = false;
            }
        }
        else{
            if(!item.valid){
                existValidFlag = false;
            }
        }
    });
    return (newCount === 0 && existValidFlag) || (newCount !== 0 && newValidFlag && existValidFlag);
}

export {accessCreateNewItem}