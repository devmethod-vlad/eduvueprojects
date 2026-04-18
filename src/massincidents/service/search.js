function performSearch(appStore, freezeArrStore, useInitial=true) {

    let dataCopy = [];

    if(useInitial){
        dataCopy = JSON.parse(JSON.stringify(freezeArrStore.$state.dataArr));
    }
    else {
        dataCopy = JSON.parse(JSON.stringify(appStore.$state.dataArr));
    }

    if (appStore.$state.activeTab === 'table') {
        return dataCopy.filter((item)=>{
            return item.incident.toLowerCase().includes(appStore.$state.searchInput.toLowerCase())
                || item.description.toLowerCase().includes(appStore.$state.searchInput.toLowerCase())
                || item.incident_ke.toLowerCase().includes(appStore.$state.searchInput.toLowerCase());

        });
    }
    else {
        return dataCopy.filter((item)=>{
            return item.incident.toLowerCase().includes(appStore.$state.searchInput.toLowerCase())
                || item.incident_ke.toLowerCase().includes(appStore.$state.searchInput.toLowerCase());
        });
    }
}

export {performSearch}