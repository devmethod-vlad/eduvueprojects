import {getDispatchesList} from "@/dispatches/services/dispatcheslist";
import {app_config} from "@/dispatches/config/setconfig";


async function compareDispatchState(dispatches, synchroStore, readactDispatch, previwStore){

    if(!dispatches.$state.loadingDispatches){
        let search_phrase = '';

        if (dispatches.$state.search_enable){
            search_phrase = dispatches.$state.search_phrase;
        }


        let infoResp = await fetch(app_config.apiUrl + app_config.infoUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                page_number: dispatches.$state.pageNumber,
                page_count: dispatches.$state.pageCount,
                search_phrase: search_phrase,
                method_list: dispatches.$state.methodIncludes,
                status_list: dispatches.$state.statusIncludes,
                created_sort: dispatches.$state.created_sort,

            })
        });

        let respStatus = Number(infoResp.status);

        let saveAnswer = await infoResp.json();

        // console.log("compareDispatchState saveAnswer: ", saveAnswer);

        if (respStatus === 200){

            let newData = await JSON.parse(JSON.stringify(saveAnswer));

            let sameFlag = true;

            let synchroData = await JSON.parse(JSON.stringify(synchroStore.$state));

            if (synchroData.total !== newData.total){
                // console.log("synchroData.total !== newData.total");
                sameFlag = false;
            }

            if (sameFlag){
                if(synchroData.renderList.length !== newData.dispatches.length){
                    // console.log("synchroData.renderList.length !== newData.dispatches.length");
                    sameFlag = false;
                }
            }

            if (sameFlag){
                synchroData.renderList.forEach((synchroItem)=>{
                    let existSynchroItem = false;

                    let sameSynchroItem = true;

                    newData.dispatches.forEach((dispatchItem)=>{
                        if (dispatchItem.dispatch_id === synchroItem.dispatch_id){
                            existSynchroItem = true;

                            if(!isDispatchItemsSame(synchroItem, dispatchItem)){
                                sameSynchroItem = false;
                            }
                        }
                    });

                    if (!existSynchroItem || !sameSynchroItem){
                        // console.log("!existSynchroItem || !sameSynchroItem");
                        sameFlag = false;
                    }
                })
            }

            if (sameFlag){

                // console.log("isArrayOfObjectSameById status");
                if(!isArrayOfObjectSameById(synchroData.availableStatus, newData.status)){
                    // console.log("!isArrayOfObjectSameById(synchroData.availableStatus, newData.status");
                    sameFlag = false;
                }

            }

            if(!sameFlag){
                console.log("NOT SYNCHRO!!!");
                await getDispatchesList(dispatches, readactDispatch, synchroStore, previwStore);
            }
        }
    }
}

function isDispatchItemsSame(synchroItem, dispatchItem){
    // console.log("isDispatchItemsSame synchroItem: ", synchroItem);
    // console.log("isDispatchItemsSame dispatchItem: ", dispatchItem);


    let sameFlag = true;

    if (synchroItem.description !== dispatchItem.description){
        sameFlag = false;
    }

    if (synchroItem.status_db_name !== dispatchItem.status_db_name){
        sameFlag = false;
    }

    if (synchroItem.telegram_text !== dispatchItem.telegram_text){
        sameFlag = false;
    }

    if (synchroItem.title !== dispatchItem.title){
        sameFlag = false;
    }

    if(!isArrayOfObjectSameById(synchroItem.method, dispatchItem.method)){
        // console.log("isArrayOfObjectSameById method: ");
        sameFlag = false;
    }

    if(!isArrayOfObjectSameById(synchroItem.dispatch_files, dispatchItem.dispatch_files)){
        // console.log("isArrayOfObjectSameById files: ");
        sameFlag = false;
    }

    return sameFlag;

}

function isArrayOfObjectSameById(arraySynchro, arrayDispatch){
    let sameFlag = true;

    // console.log("isArrayOfObjectSameById arraySynchro: ", arraySynchro);
    if(arraySynchro.length !== arrayDispatch.length){
        sameFlag = false;
    }

    if(sameFlag){
        arraySynchro.forEach((synchroItem)=>{
            let existFlag = false;
            arrayDispatch.forEach((dispatchItem)=>{
                if(synchroItem.id === dispatchItem.id){
                    existFlag = true;
                }
            })
            if (!existFlag){
                sameFlag = false;
            }
        })
    }

    return sameFlag;
}

export {compareDispatchState}