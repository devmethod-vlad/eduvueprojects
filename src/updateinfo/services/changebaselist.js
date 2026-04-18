function changeBaseList(store, id, index) {
    let baseIdList = JSON.parse(JSON.stringify(store.$state.base));
    let runtimeData = JSON.parse(JSON.stringify(store.$state.runtime));
    runtimeData.forEach((item)=>{
        if(baseIdList.includes(item.id.toString())){
            item.base = 0;
        }
    });

    store.runtime = runtimeData;

    if (!store.$state.base.includes(id)){
        store.base = [id];
        store.runtime[index].base=1;
    }
    // else {
    //     store.runtime[index].base=0;
    //     store.base = [];
    // }
    store.userInteraction = true;
}

export {changeBaseList}