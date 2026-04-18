function getNewItemId(store){
    let runtimeData = JSON.parse(JSON.stringify(store.$state.runtime));
    let newItemList = runtimeData.filter((item) => {
        return item.id.toString().includes('new');
    });

    if (newItemList.length > 0) {
        let newIdList = newItemList.map((item) => {
            return Number(item.id.toString().replace('new', ''));
        });
        return 'new'+(Math.max.apply(Math, newIdList)+1).toString();
    }
    else {
        return 'new1';
    }
}

export {getNewItemId}