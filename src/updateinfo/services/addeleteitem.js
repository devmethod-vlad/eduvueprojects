import {getNewItemId} from "@/updateinfo/services/getnewitemid";

function createNewItem(target, newId){
    let newItem = {};
    newItem.id = newId;
    if (target === 'mail'){
        newItem.mail = '';
    }
    if (target === 'phone'){
        newItem.phone = '';
    }
    newItem.base = 0;
    newItem.archive = 0;
    newItem.valid = false;
    return newItem;
}


function deleteItem(target, store, index, app){
    let runtimeData = JSON.parse(JSON.stringify(store.$state.runtime));
    let baseList = JSON.parse(JSON.stringify(store.$state.base));
    let delItem = runtimeData[index];
    let baseIndex = baseList.indexOf(delItem.id.toString());
    if(delItem.valid){
        app.submitform_list = [];
    }
    runtimeData.splice(index, 1);
    if(baseIndex !== -1){
        baseList.splice(baseIndex, 1);
    }
    if(runtimeData.length === 0){
        let newItem = createNewItem(target, 'new1');
        runtimeData.push(newItem);
    }

    if (runtimeData.length === 1 && baseList.length === 0 && runtimeData[0].valid){
        runtimeData[0].base = 1;
        baseList = [runtimeData[0].id];
    }

    store.base = baseList;
    store.runtime = runtimeData;
}

function addItem(target, store){
    let runtimeData = JSON.parse(JSON.stringify(store.$state.runtime));
    let baseList = JSON.parse(JSON.stringify(store.$state.base));
    let newId = getNewItemId(store);
    let newItem = createNewItem(target, newId);
    runtimeData.push(newItem);

    if (runtimeData.length === 1 && baseList.length === 0 && runtimeData[0].valid){
        runtimeData[0].base = 1;
        baseList = [runtimeData[0].id]
    }
    if (runtimeData.length > 1) {
        if (!store.$state.userInteraction){
            runtimeData.forEach((item)=>{
                item.base = 0;
            });
            baseList = [];
        }
    }
    store.runtime = runtimeData;
    store.base = baseList;
}

export {deleteItem, addItem, createNewItem}