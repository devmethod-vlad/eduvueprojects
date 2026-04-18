import {app_config} from "@/dispatches/config/setconfig";

function resetDispatchParams(dispatchStore){

    let dispatchStoreCopy = JSON.parse(JSON.stringify(dispatchStore.$state));

    dispatchStore.$reset();

    dispatchStore.modalVisible = dispatchStoreCopy.modalVisible;

    dispatchStore.modalPurpose = dispatchStoreCopy.modalPurpose;

    dispatchStore.modalText = dispatchStoreCopy.modalText;

    dispatchStore.modalTarget = dispatchStoreCopy.modalTarget;
}


async function sendTelDispatch(target, dispatchStore, activefilter){

    // console.log("sendTelDispatch");

    dispatchStore.modalVisible = true;
    dispatchStore.modalLoading = true;

    let isError = false;

    let userErrorMess = '';

    let formData = new FormData();

    formData.append("target", target);
    formData.append("title", dispatchStore.$state.title);
    formData.append("telegram_text", dispatchStore.$state.telegram_text);
    formData.append("schedule_type", dispatchStore.$state.scheduleType);
    formData.append("method_list", dispatchStore.$state.methodList);
    formData.append("filter", JSON.stringify({
        'mu': activefilter.$state.mu_params,
        'mo': activefilter.$state.mo_params,
        'role': activefilter.$state.role_params,
        'spec': activefilter.$state.spec_params,
        'user': activefilter.$state.user_params,
    }));

    if (dispatchStore.$state.dispatch_id){
        formData.append("dispatchid", dispatchStore.$state.dispatch_id);
    }
    else{
        formData.append("dispatchid", 0);
    }
    formData.append("dispatch_date", dispatchStore.$state.dispatchDate);
    formData.append("dispatch_time", dispatchStore.$state.dispatchTime);

    for (let fileItem of dispatchStore.$state.upload_files) {
        formData.append('files', fileItem);
    }

    try {
        let saveResp = await fetch(app_config.apiUrl + app_config.sendTelDispatchUrl, {
            method: 'POST',
            body: formData
        });

        let respStatus = Number(saveResp.status);

        let saveAnswer = await saveResp.json()

        console.log("sendTelDispatch saveAnswer: ", saveAnswer);

        dispatchStore.modalLoading = false;

        if (respStatus === 200){
            if (saveAnswer.status === 'ok'){

                dispatchStore.modalPurpose = 'success';

                dispatchStore.modalText = 'Рассылка успешно отправлена';

                resetDispatchParams(dispatchStore);

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
        }
        else {
            dispatchStore.modalText = 'При попытке отправить рассылку произошла ошибка';

        }
    }
}

export {sendTelDispatch}