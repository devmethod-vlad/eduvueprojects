
function resetFilters(store) {
    if (store.$state.filter_pagecount){
        store.filter_pagecount = 10;
    }

    if (store.$state.filter_page_number){
        store.filter_page_number = 1;
    }

    if (store.$state.total){
        store.total = 0;
    }

    if (store.$state.info_list){
        store.info_list = [];
    }

    if (store.$state.sort){
        store.sort = {
            "active": 1,
            "type": "asc"
        };
    }

    if (store.$state.name_sort){
        store.name_sort = {
            "active": 1,
            "type": "asc"
        };
    }

    if (store.$state.shortname_sort){
        store.shortname_sort = {
            "active": 0,
            "type": "asc"
        };
    }

    if (store.$state.check_first){
        store.check_first = 0;
    }

    // if (store.$state.checkList){
    //     store.checkList = [];
    // }

}

function resetFilterError(store){
    if (store.$state.requestError){
        store.requestError = false;
    }

    if (store.$state.requestErrorInfo){
        store.requestErrorInfo = '';
    }

    if (store.$state.requestErrorUserInfo){
        store.requestErrorUserInfo = '';
    }
}

export {resetFilters, resetFilterError}