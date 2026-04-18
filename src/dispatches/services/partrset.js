
function dispatchesPartialReset(dispatches){
    dispatches.search_phrase = '';
    dispatches.pageNumber = 1;
    dispatches.pageCount =10;
    dispatches.created_sort = {
        "active": 1,
        "type": "desc"
    }
    dispatches.actuality_sort = {
        "active": 0,
        "type": "desc"
    }
}

export {dispatchesPartialReset}