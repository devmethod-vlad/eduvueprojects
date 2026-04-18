function makeKpiFilter(appStore, freezeArrStore, useInitial=true){
    // console.log("makekpifilter");

    let dataCopy = [];

    if(useInitial){
        dataCopy = JSON.parse(JSON.stringify(freezeArrStore.$state.dataArr));
    }
    else {
        dataCopy = JSON.parse(JSON.stringify(appStore.$state.dataArr));
    }

    return dataCopy.filter((item)=>{
        return appStore.$state.activekpilist.includes(item.incident_ke);
    });
}

export {makeKpiFilter}