import {app_config} from "@/dispatches/config/setconfig";

function resetDispatchParams(dispatchStore){

    let dispatchStoreCopy = JSON.parse(JSON.stringify(dispatchStore.$state));

    dispatchStore.$reset();

    dispatchStore.modalVisible = dispatchStoreCopy.modalVisible;

    dispatchStore.modalPurpose = dispatchStoreCopy.modalPurpose;

    dispatchStore.modalText = dispatchStoreCopy.modalText;

    dispatchStore.modalTarget = dispatchStoreCopy.modalTarget;
}


async function saveDispatchInfo(target, dispatchStore, activefilter){

    console.log("saveDispatchInfo activefilter: ",activefilter.$state);

    dispatchStore.modalVisible = true;
    dispatchStore.modalLoading = true;

    let isError = false;

    let userErrorMess = '';

    let formData = await new FormData();

    await formData.append("target", target);
    await formData.append("title", dispatchStore.$state.title);
    await formData.append("telegram_text", dispatchStore.$state.telegram_text);
    await formData.append("schedule_type", dispatchStore.$state.scheduleType);
    await formData.append("method_list", dispatchStore.$state.methodList);
    await formData.append("filter", JSON.stringify({
        'mu': activefilter.$state.mu_params,
        'mo': activefilter.$state.mo_params,
        'role': activefilter.$state.role_params,
        'spec': activefilter.$state.spec_params,
        'user': activefilter.$state.user_params,
    }));

    if (dispatchStore.$state.dispatch_id){
        await formData.append("dispatchid", dispatchStore.$state.dispatch_id);
    }
    else{
        await formData.append("dispatchid", 0);
    }
    await formData.append("dispatch_date", dispatchStore.$state.dispatchDate);
    await formData.append("dispatch_time", dispatchStore.$state.dispatchTime);

    await formData.append("dispatch_files", JSON.stringify(dispatchStore.$state.dispatch_files));

    // console.log("save dispatch_files: ", JSON.stringify(dispatchStore.$state.dispatch_files));

    for (let fileItem of dispatchStore.$state.upload_files) {
        await formData.append('files', fileItem);
    }

    try {
        let saveResp = await fetch(app_config.apiUrl + app_config.saveUrl, {
            method: 'POST',
            body: formData
        });

        let respStatus = Number(saveResp.status);

        let saveAnswer = await saveResp.json()

        dispatchStore.modalLoading = false;

        if (respStatus === 200){
            if (saveAnswer.status === 'ok'){

                dispatchStore.modalPurpose = 'success';

                if (target === 'draft'){
                    if(dispatchStore.$state.dispatchStatus){
                        if(dispatchStore.$state.dispatchStatus.db_name === 'draft'){
                            dispatchStore.modalText = 'Изменения в черновике успешно сохранены';
                        }
                    }
                    else{
                        dispatchStore.modalText = 'Рассылка успешно сохранена в черновики';
                    }
                }
                else if(target === 'test'){
                    dispatchStore.modalText = 'Тестовая рассылка успешно отправлена';
                }
                else if(target === 'dispatch'){

                    if (dispatchStore.$state.dispatch_id){
                        if(dispatchStore.$state.scheduleType === 'rightaway'){
                            dispatchStore.modalText = 'Рассылка была успешно отправлена';
                        }
                        if(dispatchStore.$state.scheduleType === 'scheduled'){
                            dispatchStore.modalText = 'Изменения в рассылке успешно сохранены';
                        }
                    }
                    else {
                        if(dispatchStore.$state.scheduleType === 'rightaway'){
                            dispatchStore.modalText = 'Рассылка была успешно отправлена';
                        }
                        if(dispatchStore.$state.scheduleType === 'scheduled'){
                            dispatchStore.modalText = 'Успешно запланирована отправка рассылки';
                        }
                    }
                }

                let resetStoreFlag = true;

                if (dispatchStore.$state.dispatchStatus){
                    // console.log("saveDispatch dispatchStore.$state start: ", dispatchStore.$state);
                    if (['draft', 'pending'].includes(dispatchStore.$state.dispatchStatus.db_name) && dispatchStore.$state.modalTarget ==='draft'){
                        // console.log("if (['draft', 'pending'].includes(dispatchStore.$state.dispatchStatus.db_name) && dispatchStore.$state.modalTarget ==='draft')");
                        resetStoreFlag = false;
                    }
                }
                if(resetStoreFlag){
                    await resetDispatchParams(dispatchStore);
                }
                // console.log("saveDispatch dispatchStore.$state end: ", dispatchStore.$state);
            }
            else {
                isError = true;
                if(saveAnswer.info){
                    if(saveAnswer.info.user_mess){
                        userErrorMess = saveAnswer.info.user_mess;
                    }
                }
            }
        }
        else {
            isError = true;
        }

        // console.log("saveAnswer: ", saveAnswer);
    }
    catch (error) {
        isError = true;
        console.log(error);
    }

    if(isError){
        dispatchStore.modalLoading = false;
        dispatchStore.modalPurpose = 'fail';

        if(userErrorMess !== ''){
            dispatchStore.modalText = userErrorMess;
            if (userErrorMess === app_config.SAME_TITLE_ERROR_TEXT){
                dispatchStore.titleError = true;
            }
        }
        else {
            if (target === 'draft'){
                dispatchStore.modalText = 'При сохранении черновика произошла ошибка';
            }
            else if(target === 'test'){
                dispatchStore.modalText = 'При попытке отправить тестовую рассылку произошла ошибка';
            }
            else if(target === 'dispatch'){

                if (dispatchStore.$state.dispatch_id){
                    if(dispatchStore.$state.scheduleType === 'rightaway'){
                        dispatchStore.modalText = 'При попытке отправить рассылку произошла ошибка';
                    }
                    if(dispatchStore.$state.scheduleType === 'scheduled'){
                        dispatchStore.modalText = 'При попытке сохранить изменения в рассылке произошла ошибка';
                    }
                }
                else {
                    dispatchStore.modalText = 'При попытке отправить рассылку произошла ошибка';
                }

            }
        }
    }
}

export {saveDispatchInfo}