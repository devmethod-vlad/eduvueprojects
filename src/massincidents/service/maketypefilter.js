function makeTypeFilter(appStore, freezeArrStore, useInitial=false){
    // console.log("maketypefilter");

    let dataCopy = [];

    if(useInitial){
        dataCopy = JSON.parse(JSON.stringify(freezeArrStore.$state.dataArr));
    }
    else {
        dataCopy = JSON.parse(JSON.stringify(appStore.$state.dataArr));
    }

    if (appStore.$state.incidentFilter === ''){
        return dataCopy;
    }
    else if(appStore.$state.incidentFilter === 'problems'){
        return dataCopy.filter((item)=>{
            return item.incident_type === 'problem';
        });
    }
    else if(appStore.$state.incidentFilter === 'proposals'){
        return dataCopy.filter((item)=>{
            return item.incident_type === 'proposal';
        });
    }
}

export {makeTypeFilter}