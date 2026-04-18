import {setListParams} from "@/questions/services/formquestionslist";
import {getQuestionsList} from "@/questions/components/QuestionsList/services/getquestionslist";
import { sortBy, isEqual, find, difference } from 'lodash';
import {app_config} from "@/questions/config/setconfig";
import {formQuestionsList} from "@/questions/services/formquestionslist";

async function compareGlobalState(params){

    if(!params.listStore.$state.loading && !params.synchroStore.$state.update){

        let copySynchroStore = await {...params.synchroStore.$state};

        await params.synchroStore.$reset();
        if (params.activeQuestionStore.$state.order_id !== 0) {
            if(copySynchroStore.activeQuestionError || copySynchroStore.activeQuestionNeedUpdate){
                let newCopySynchroStore = await {...params.synchroStore.$state};
                if (copySynchroStore.activeQuestionError){
                    newCopySynchroStore.activeQuestionError = true;
                }
                if (copySynchroStore.activeQuestionNeedUpdate){
                    newCopySynchroStore.activeQuestionNeedUpdate = true;
                }
                await params.synchroStore.$patch(newCopySynchroStore);
            }
        }

        await setSynchroUpdateFlag(params, true);
        // await console.log("compareGlobalState");

        if(params.userStore.$state.authSource === 'wiki'){
            await checkWikiAuth(params);
        }

        let newState = null;

        newState = await getNewStateInfo(params);

        if (newState !== null){

            // await console.log("newState: ", newState);
            await checkTokenSynchro(params, newState);
            // await console.log("newState.available_spaces: ", newState.available_spaces);
            // await console.log("params.listStore.$state.available_spaces: ", params.listStore.$state.availableSpaces);
            await compareAvailableSpaces(params, newState.available_spaces, params.listStore.$state.availableSpaces);
            await compareAvailableStatuses(params, newState.available_statuses, params.listStore.$state.availableStatuses);

            await compareRenderList(params, newState.render_list, params.listStore.$state.renderList);

            await processUpdateResults(params);

            await setSynchroUpdateFlag(params, false);

        }
        else {
            await setErrorOnSync(params, true);
            await setSynchroUpdateFlag(params, false);
        }
    }
}

async function compareRenderParams(params){
    let compareFlag = true;

    if(params.synchroStore.$state.updateParams.userid !== params.userStore.$state.userid){
        compareFlag = false;
    }
    if(params.synchroStore.$state.updateParams.roleid !== params.userStore.$state.userrole.id){
        compareFlag = false;
    }
    if(params.synchroStore.$state.updateParams.statusId !== params.listStore.$state.statusId){
        compareFlag = false;
    }
    if(params.synchroStore.$state.updateParams.spaceId !== params.listStore.$state.spaceId){
        compareFlag = false;
    }
    if(params.synchroStore.$state.updateParams.activePage !== params.listStore.$state.activePage){
        compareFlag = false;
    }
    if(params.synchroStore.$state.updateParams.countPerPage !== params.listStore.$state.countPerPage){
        compareFlag = false;
    }
    if(params.synchroStore.$state.updateParams.sorting !== params.listStore.$state.sorting){
        compareFlag = false;
    }
    if(params.synchroStore.$state.updateParams.searchInput !== params.listStore.$state.searchInput){
        compareFlag = false;
    }
    if(params.synchroStore.$state.updateParams.enableSearch !== params.listStore.$state.enableSearch){
        compareFlag = false;
    }
    return compareFlag;
}

async function processUpdateResults(params){

    let needUpdate = false

    let checkParams = await compareRenderParams(params);

    if (checkParams){

        if (Number(params.activeQuestionStore.$state.order_id) !==0){
            let copySynchroStore = await {...params.synchroStore.$state};
            if (params.synchroStore.$state.criticalQuestionsId.includes(Number(params.activeQuestionStore.$state.order_id))){
                copySynchroStore.activeQuestionError = true;
                if(params.appStore.$state.questionShowMode === 'panel'){
                    needUpdate = true;
                }
            }
            else{
                copySynchroStore.activeQuestionError = false;
            }

            if (params.synchroStore.$state.questionIdNeedUpdate.includes(Number(params.activeQuestionStore.$state.order_id))){
                copySynchroStore.activeQuestionNeedUpdate = true;
                needUpdate = true;
            }
            else{
                copySynchroStore.activeQuestionNeedUpdate = false;
            }
            await params.synchroStore.$patch(copySynchroStore);

        }
        else {
            if(params.synchroStore.$state.renderListOutOfSync.flag){
                needUpdate = true;
            }
            if(params.synchroStore.$state.availableSpacesOutOfSync.flag){
                needUpdate = true;
            }
            if(params.synchroStore.$state.availableStatusesOutOfSync.flag){
                needUpdate = true;
            }
        }
        // await console.log("processUpdateResults synchroStore: ", params.synchroStore.$state);

        if(needUpdate){
            await console.log("compare state need update!!!");
            await formQuestionsList(params);
        }
        if(params.synchroStore.$state.activeQuestionError){
            await console.log("synchroStore activeQuestionError!!!");
        }

    }
    else {
        let copySynchroStore = await {...params.synchroStore.$state};
        copySynchroStore.paramsInconsistent = true;
        await params.synchroStore.$patch(copySynchroStore);
        await params.synchroStore.$reset();
    }

    if (params.synchroStore.$state.errorOnSync){
        let copyErrorStore = await {...params.errorStore.$state};
        copyErrorStore.infoError.isActive = true;
        copyErrorStore.infoError.message = 'Во время синхронизации данных возникла проблема. Обновите страницу!';
    }
}

async function checkTokenSynchro(params, newState){
    // await console.log("checkTokenSynchro newState: ");
    if (newState['user_token_status'] === 'token_expire'){
        // await console.log("checkTokenSynchro newState.info['user_token_status'] === 'token_expire'");
        let copySynchroStore = await {...params.synchroStore.$state};
        copySynchroStore.userTokenOutOfSync = true;
        await params.synchroStore.$patch(copySynchroStore);
        await resetLocalInfo();
        // console.log("compare state check token reload");
        // await location.reload();
    }
}

async function setSynchroUpdateFlag(params, flag){
    let copySynchroStore = await {...params.synchroStore.$state};
    copySynchroStore.update = flag;
    await params.synchroStore.$patch(copySynchroStore);
}


async function compareOrderIdlist(params, new_render_list, render_list){
    let new_id_list = [];
    for (let new_item of new_render_list){
        await new_id_list.push(Number(new_item.order_id))
    }
    let id_list = [];
    for (let item of render_list){
        await id_list.push(Number(item.order_id))
    }
    await new_id_list.sort();
    await id_list.sort();
    if(!isEqual(new_id_list, id_list)){
        let copySynchroStore = await {...params.synchroStore.$state};
        copySynchroStore.renderListOutOfSync.flag = true;
        copySynchroStore.renderListOutOfSync.info.orderListComposition.flag = true;
        copySynchroStore.renderListOutOfSync.info.orderListComposition.info['new_id_list'] = new_id_list;
        copySynchroStore.renderListOutOfSync.info.orderListComposition.info['id_list'] = id_list;
        await params.synchroStore.$patch(copySynchroStore);
    }
    let difArr = difference(id_list, new_id_list);

    if (difArr.length !==0){
        let copySynchroStore = await {...params.synchroStore.$state};
        for (let item of difArr){
            copySynchroStore.criticalQuestionsId.push(item);
        }
        await params.synchroStore.$patch(copySynchroStore);
    }
}

async function compareItemByItem(params, new_render_list, render_list){
    for (let new_item of new_render_list){
        let new_order_id = new_item.order_id;
        let existItem = find(render_list, (item)=>{
            return Number(item.order_id) === Number(new_order_id);
        })
        if (existItem){
            // await console.log("exist_item order_id: ", existItem.order_id);
            let copySynchroStore = await {...params.synchroStore.$state};

            // await console.log("new_item.status_id: ", new_item.status_id);
            // await console.log("existItem.status_id: ", existItem.status_id);
            if(new_item.status_id !== existItem.status_id){
                // await console.log("new_item.status_id !== existItem.status_id");
                copySynchroStore.renderListOutOfSync.flag = true;
                copySynchroStore.renderListOutOfSync.info.statusId.flag = true;
                copySynchroStore.renderListOutOfSync.info.statusId.info.push(
                    {
                        'order_id': new_order_id,
                        'new_statusid': new_item.status_id,
                        'statusid': existItem.status_id
                    }
                );
                if(!copySynchroStore.criticalQuestionsId.includes(new_order_id)){
                    copySynchroStore.criticalQuestionsId.push(new_order_id);
                }
            }

            if(new_item.answer_id !== existItem.answer_id){
                copySynchroStore.renderListOutOfSync.flag = true;
                copySynchroStore.renderListOutOfSync.info.answerId.flag = true;
                copySynchroStore.renderListOutOfSync.info.answerId.info.push(
                    {
                        'order_id': new_order_id,
                        'new_answer_id': new_item.answer_id,
                        'answer_id': existItem.answer_id
                    }
                );

                if(!copySynchroStore.criticalQuestionsId.includes(new_order_id)){
                    copySynchroStore.criticalQuestionsId.push(new_order_id);
                }
            }

            if(new_item.order_text !== existItem.order_text){
                copySynchroStore.renderListOutOfSync.flag = true;
                copySynchroStore.renderListOutOfSync.info.questionText.flag = true;
                copySynchroStore.renderListOutOfSync.info.questionText.info.push(
                    {
                        'order_id': new_order_id,
                        'new_order_text': new_item.order_text,
                        'order_text': existItem.order_text
                    }
                );

                if(!copySynchroStore.questionIdNeedUpdate.includes(new_order_id)){
                    copySynchroStore.questionIdNeedUpdate.push(new_order_id);
                }
            }

            if(new_item.answer_text !== existItem.answer_text){
                copySynchroStore.renderListOutOfSync.flag = true;
                copySynchroStore.renderListOutOfSync.info.answerText.flag = true;
                copySynchroStore.renderListOutOfSync.info.answerText.info.push(
                    {
                        'order_id': new_order_id,
                        'new_answer_text': new_item.answer_text,
                        'answer_text': existItem.answer_text
                    }
                );
                if(!copySynchroStore.questionIdNeedUpdate.includes(new_order_id)){
                    copySynchroStore.questionIdNeedUpdate.push(new_order_id);
                }
            }

            let new_sorted_order_attachments;
            if(new_item.order_attachments.length !==0){
                new_sorted_order_attachments = sortBy(new_item.order_attachments, 'attachid');
            }
            else{
                new_sorted_order_attachments = {...new_item.order_attachments};
            }
            let sorted_order_attachments;
            if(existItem.order_attachments.length !==0){
                sorted_order_attachments = sortBy(existItem.order_attachments, 'attachid');
            }
            else {
                sorted_order_attachments = {...existItem.order_attachments};
            }

            if(!isEqual(new_sorted_order_attachments, sorted_order_attachments)){
                copySynchroStore.renderListOutOfSync.flag = true;
                copySynchroStore.renderListOutOfSync.info.questionAttachments.flag = true;
                copySynchroStore.renderListOutOfSync.info.questionAttachments.info.push(
                    {
                        'order_id': new_order_id,
                        'new_order_attachments': new_sorted_order_attachments,
                        'order_attachments': sorted_order_attachments
                    }
                );
                if(!copySynchroStore.questionIdNeedUpdate.includes(new_order_id)){
                    copySynchroStore.questionIdNeedUpdate.push(new_order_id);
                }
            }


            let new_sorted_answer_attachments;
            if(new_item.answer_attachments.length !==0){
                new_sorted_answer_attachments = sortBy(new_item.answer_attachments, 'attachid');
            }
            else{
                new_sorted_answer_attachments = {...new_item.answer_attachments};
            }
            let sorted_answer_attachments;
            if(existItem.answer_attachments.length !==0){
                sorted_answer_attachments = sortBy(existItem.answer_attachments, 'attachid');
            }
            else {
                sorted_answer_attachments = {...existItem.answer_attachments};
            }

            if(!isEqual(new_sorted_answer_attachments, sorted_answer_attachments)){
                copySynchroStore.renderListOutOfSync.flag = true;
                copySynchroStore.renderListOutOfSync.info.answerAttachments.flag = true;
                copySynchroStore.renderListOutOfSync.info.answerAttachments.info.push(
                    {
                        'order_id': new_order_id,
                        'new_order_attachments': new_sorted_answer_attachments,
                        'order_attachments': sorted_answer_attachments
                    }
                );
                if(!copySynchroStore.questionIdNeedUpdate.includes(new_order_id)){
                    copySynchroStore.questionIdNeedUpdate.push(new_order_id);
                }
            }

            await params.synchroStore.$patch(copySynchroStore);
        }
    }
}

async function compareRenderList(params, new_render_list, render_list){
    await compareOrderIdlist(params, new_render_list, render_list);
    await compareItemByItem(params, new_render_list, render_list);
}

async function compareAvailableSpaces(params, new_available_spaces, available_spaces){
    // await console.log("compareAvailableSpaces");
    let sorted_new_spaces;
    if (new_available_spaces.length !== 0){
        sorted_new_spaces = sortBy(new_available_spaces, 'id');
    }
    else {
        sorted_new_spaces = {...new_available_spaces};
    }
    // await console.log("sorted_new_spaces: ", sorted_new_spaces);

    let sorted_spaces;
    if(available_spaces.length !==0){
        sorted_spaces = sortBy(available_spaces, 'id');
    }
    else {
        sorted_spaces = {...available_spaces};
    }

    // await console.log("sorted_spaces: ", sorted_spaces);
    // await console.log("isEqual: ", isEqual(sorted_new_spaces, sorted_spaces));
    if(!isEqual(sorted_new_spaces, sorted_spaces)){
        let copySynchroStore = await {...params.synchroStore.$state};
        copySynchroStore.availableSpacesOutOfSync.flag = true;
        copySynchroStore.availableSpacesOutOfSync.info['new_spaces'] = sorted_new_spaces;
        copySynchroStore.availableSpacesOutOfSync.info['spaces'] = sorted_spaces;
        await params.synchroStore.$patch(copySynchroStore);
    }
}

async function compareAvailableStatuses(params, new_available_statuses, available_statuses){
    // await console.log("compareAvailableStatuses");
    let sorted_new_statuses;
    if(new_available_statuses.length !==0){
        sorted_new_statuses = sortBy(new_available_statuses, 'id');
    }
    else {
        sorted_new_statuses = {...new_available_statuses};
    }
    // await console.log("sorted_new_statuses: ", sorted_new_statuses);
    let sorted_statuses;

    if(available_statuses.length !==0){
        sorted_statuses = sortBy(available_statuses, 'id');
    }
    else {
        sorted_statuses = {...available_statuses};
    }
    // await console.log("sorted_statuses: ", sorted_statuses);
    // await console.log("isEqual: ", isEqual(sorted_new_statuses, sorted_statuses));
    if(!isEqual(sorted_new_statuses, sorted_statuses)){
        let copySynchroStore = await {...params.synchroStore.$state};
        copySynchroStore.availableStatusesOutOfSync.flag = true;
        copySynchroStore.availableStatusesOutOfSync.info['new_statuses'] = sorted_new_statuses;
        copySynchroStore.availableStatusesOutOfSync.info['statuses'] = sorted_statuses;
        await params.synchroStore.$patch(copySynchroStore);
    }
}

async function saveUpdateSynchroParams(params){
    let copySynchroStore = await {...params.synchroStore.$state};
    copySynchroStore.updateParams.userid = params.userStore.$state.userid;
    copySynchroStore.updateParams.roleid = params.userStore.$state.userrole.id;
    copySynchroStore.updateParams.statusId = params.listStore.$state.statusId;
    copySynchroStore.updateParams.spaceId = params.listStore.$state.spaceId;
    copySynchroStore.updateParams.activePage = params.listStore.$state.activePage;
    copySynchroStore.updateParams.countPerPage = params.listStore.$state.countPerPage;
    copySynchroStore.updateParams.sorting = params.listStore.$state.sorting;
    copySynchroStore.updateParams.searchInput = params.listStore.$state.searchInput;
    copySynchroStore.updateParams.enableSearch = params.listStore.$state.enableSearch;
    await params.synchroStore.$patch(copySynchroStore);
}

async function getNewStateInfo(params){
    // await console.log("getNewStateInfo");

    let listParams = await setListParams(params.userStore, params.listStore, true);

    await saveUpdateSynchroParams(params);

    let newStateAnswer = await getQuestionsList(listParams);
    // await console.log("getNewStateInfo answer: ", newStateAnswer);

    if (newStateAnswer.status === 'ok'){

        let copySynchroStore = await {...params.synchroStore.$state};
        copySynchroStore.renderList = newStateAnswer['info']['render_list'];
        copySynchroStore.availableStatuses = newStateAnswer['info']['available_statuses'];
        copySynchroStore.availableSpaces = newStateAnswer['info']['available_spaces'];
        await params.synchroStore.$patch(copySynchroStore);
        return newStateAnswer.info;
    }
    else {
        return null;
    }
}

async function resetLocalInfo(){
    //'userinfo'
    let storageKey = app_config.localStorage.userInfo.key;

    if (localStorage.getItem(storageKey)){
        //'userToken'
        let storageTokenProp = app_config.localStorage.userInfo.props.token;

        let localInfo = {};

        localInfo[storageTokenProp] = '';

        localStorage.setItem(storageKey, JSON.stringify(localInfo));
    }
}

async function setErrorOnSync(params, flag){
    let copySynchroStore = await {...params.synchroStore.$state};
    copySynchroStore.errorOnSync = flag;
    await params.synchroStore.$patch(copySynchroStore);
}


async function checkWikiAuth(params){

    let wikiUserResp={};

    if (app_config.prod) {
        let wikiCheckUserResp = await fetch(app_config.portalUrl + '/rest/api/user/current');
        wikiUserResp = await wikiCheckUserResp.json();
    }
    else {
        //Если скрипт работает в dev-окружении, то эмулируем авторизацию
        //если выставлен глобальный параметр
        if (app_config.enableFakeEduAuth) {
            wikiUserResp['type'] = 'known';
        }
    }
    if (wikiUserResp['type'] !== 'known'){
        let copySynchroStore = await {...params.synchroStore.$state};
        copySynchroStore.wikiAuthOutOfSync = true;
        await params.synchroStore.$patch(copySynchroStore);
        // console.log("compare state wiki reload");
        // await location.reload();
    }
}


export {compareGlobalState}