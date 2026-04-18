import {app_config} from "@/dispatches/config/setconfig";
import {setRedactFromId} from "@/dispatches/services/setredactfromid";
import {openDispatchPreview} from "@/dispatches/services/openpreview";


async function getDispatchesList(dispatches, redactDispatch, synchroStore, previewStore){

    // console.log("getDispatchesList");

    if(!dispatches.requestExecution){
        dispatches.infoText = '';
        dispatches.dispatchesError = false;
        dispatches.loadingDispatches = true;

        let errorFlag = true;

        try {

            dispatches.requestExecution = true;

            let infoResp = await fetch(app_config.apiUrl + app_config.infoUrl, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({
                    page_number: dispatches.$state.pageNumber,
                    page_count: dispatches.$state.pageCount,
                    search_phrase: dispatches.$state.search_phrase,
                    method_list: dispatches.$state.methodIncludes,
                    status_list: dispatches.$state.statusIncludes,
                    created_sort: dispatches.$state.created_sort,

                })
            });

            let respStatus = Number(infoResp.status);

            let saveAnswer = await infoResp.json();

            console.log("getDispatchesList saveAnswer: ", saveAnswer);

            dispatches.requestExecution = false;

            if (respStatus === 200){

                let copyAnswer = await JSON.parse(JSON.stringify(saveAnswer));

                synchroStore.renderList = copyAnswer.dispatches;
                synchroStore.total = copyAnswer.total;
                synchroStore.availableStatus = copyAnswer.status;

                dispatches.renderList = saveAnswer.dispatches;
                dispatches.total = saveAnswer.total;
                dispatches.availableStatus = saveAnswer.status;
                dispatches.is_dispatch_exist = saveAnswer.dispatch_exist;
                errorFlag = false;

                if(redactDispatch.$state.dispatch_id !==0){
                    await setRedactFromId(redactDispatch.$state.dispatch_id, dispatches, redactDispatch);
                }
                if(previewStore.$state.dispatch_id !==0){
                    dispatches.$state.renderList.forEach((item)=>{
                        if (item.dispatch_id === previewStore.$state.dispatch_id){
                            openDispatchPreview(previewStore);
                        }
                    })
                }

            }
            dispatches.loadingDispatches = false;
        }
        catch (error) {
            console.log(error);
            dispatches.requestExecution = false;
            dispatches.loadingDispatches = false;

        }

        if(errorFlag){
            dispatches.infoText = 'При получении данных о рассылках произошла ошибка. Перезагрузите страницу или повторите попытку немного позже';
            dispatches.dispatchesError = true;
        }
    }

}

export {getDispatchesList}