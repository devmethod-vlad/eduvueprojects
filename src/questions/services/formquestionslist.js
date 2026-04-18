import {getQuestionsList} from "@/questions/components/QuestionsList/services/getquestionslist";
import {app_config} from "@/questions/config/setconfig";


async function formQuestionsList(params, forSynchro=false){
    if(!params.listStore.$state.loading){
        await resetInfoError(params.errorStore);
        await processSearchInputData(params.listStore);
        await setGlobalLoading(params.listStore, true);
        let listParams = await setListParams(params.userStore, params.listStore, forSynchro);
        let firstAnswer = await getQuestionsList(listParams);
        await console.log("formQuestionsList firstAnswer: ", firstAnswer);

        let copyListStore = await {...params.listStore.$state};

        let succesFlag = true;

        if(firstAnswer.status === 'ok'){

            copyListStore = await updateListStore(copyListStore, firstAnswer);

            succesFlag = true;

            // let render_list = await firstAnswer['info']['render_list'];

            // if (render_list.length === 0){
            //     if(params.listStore.$state.statusId !==0){
            //         if(!findIdInStore(params.listStore.$state.statusId, params.listStore.$state.availableStatuses)){
            //             copyListStore.statusId = 0;
            //             await params.listStore.$patch(copyListStore);
            //         }
            //     }
            //     if(params.listStore.$state.spaceId !==0){
            //         if(!findIdInStore(params.listStore.$state.spaceId, params.listStore.$state.availableSpaces)){
            //             copyListStore.spaceId = 0;
            //             await params.listStore.$patch(copyListStore);
            //         }
            //     }
            //
            //     listParams = await setListParams(params.userStore, params.listStore, forSynchro);
            //
            //     let secondAnswer = await getQuestionsList(listParams);
            //     await console.log("formQuestionsList secondAnswer: ", secondAnswer);
            //
            //     if (secondAnswer.status === 'ok'){
            //         copyListStore = await updateListStore(copyListStore, secondAnswer);
            //     }
            //     else {
            //         succesFlag = false;
            //         await setGlobalLoading(params.listStore, false);
            //         await showError(params);
            //     }
            //
            // }
            // else {
            //     copyListStore = await updateListStore(copyListStore, firstAnswer);
            // }

        }
        else {
            succesFlag = false;
            await setGlobalLoading(params.listStore, false);
            await showError(params);
        }

        // await console.log("formQuestionslist params.listStore: ", params.listStore.$state);
        // await console.log("formQuestionslist copyListStore: ", copyListStore);
        await params.listStore.$patch(copyListStore);

        if (succesFlag){
            // await console.log("successFlag");
            // await console.log("params.activeQuestionStore.$state.order_id: ", params.activeQuestionStore.$state.order_id);
            let questionAlreadyOpen = false;

            if(params.appStore.$state.questionIdNeedOpen !==0){

                for (let item of params.listStore.$state.renderList){

                    if (Number(item.order_id) === Number(params.appStore.$state.questionIdNeedOpen)){
                        // await params.activeQuestionStore.$reset();
                        await params.activeQuestionStore.$patch(item);
                        questionAlreadyOpen = true;
                        params.appStore.questionIdNeedOpen = 0;
                    }
                }
            }

            if (Number(params.activeQuestionStore.$state.order_id) !==0){
                if(!questionAlreadyOpen){

                    await setActiveQuestion(params);

                    if (params.infoReactive){
                        params.infoReactive.value = await params.infoText;
                        params.textMode.value = 'info';
                    }
                }
            }

        }
        await setGlobalLoading(params.listStore, false);
    }
}

async function showError(params){
    if (params.infoReactive){
        params.infoReactive.value = params.warnText;
        params.textMode.value = 'warning';
    }
    else {
        if(params.raiseInfoError){
            await setInfoError(params.errorStore, params.warnText);
        }
    }
}

async function setInfoError(errorStore, text){
    errorStore.infoError.isActive = true;
    errorStore.infoError.message = text;
}

async function setActiveQuestion (params){

    let orderid= Number(params.activeQuestionStore.$state.order_id);
    let renderList = params.listStore.$state.renderList

    await console.log("renderList: ", renderList);

    let findFlag = false;

    for (let item of renderList){

        if (Number(item.order_id) === Number(orderid)){
            findFlag=true
            // await params.activeQuestionStore.$reset();
            await params.activeQuestionStore.$patch(item);
        }
    }
    if(!findFlag){
        await params.activeQuestionStore.$reset();
    }
}

const updateListStore = async (store, requestInfo)=>{
    store.renderList = await requestInfo['info']['render_list'];
    store.totalCountByConditions = await requestInfo['info']['total_count_by_conditions'];
    store.totalCount = await requestInfo['info']['total_count'];
    store.availableStatuses = await requestInfo['info']['available_statuses'];
    store.availableSpaces = await requestInfo['info']['available_spaces'];
    return store;
}

const findIdInStore = (id, store)=>{
    let findFlag = false;
    for (let item in store){
        if(Number(item.id)===Number(id)){
            findFlag = true;
        }
    }
    return findFlag;
}

async function setListParams(userStore, listStore, forSynchro){

    let searchInput = await listStore.$state.searchInput;

    if (forSynchro){
        if(searchInput !=='' && listStore.$state.enableSearch === 0){
            searchInput = '';
        }
    }

    return {
        apiurl: app_config.apiUrl+app_config.questionsUrl,
        userid: userStore.$state.userid,
        roleid: userStore.$state.userrole.id,
        spaceid: listStore.$state.spaceId,
        statusid: listStore.$state.statusId,
        perpagecount: listStore.$state.countPerPage,
        activepage: listStore.$state.activePage,
        datesort: listStore.$state.sorting,
        isfeedback: listStore.$state.isFeedback,
        showonlypublic: listStore.$state.onlyPublic,
        searchinput: searchInput,
        enablesearch: listStore.$state.enableSearch,
        usertoken: userStore.$state.token,
        forsynchroflag: forSynchro ? 1 : 0
    }
}

async function setGlobalLoading(listStore, flag){
    listStore.loading = flag;
}

async function resetInfoError(errorStore){
    errorStore.infoError.isActive = false;
    errorStore.infoError.message = '';
}

async function processSearchInputData(listStore){
    if(listStore.$state.searchInput.trim() !==''){
        listStore.spaceId = 0;
        listStore.statusId = 0;
    }
}


export {formQuestionsList, setListParams}