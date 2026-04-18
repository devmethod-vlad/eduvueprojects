import {app_config} from "@/dispatches/config/setconfig";

function resetDispatchParams(dispatchStore){

    let dispatchCopy = JSON.parse(JSON.stringify(dispatchStore.$state));

    dispatchStore.modalVisible = dispatchCopy.modalVisible;

    dispatchStore.modalPurpose = dispatchCopy.modalPurpose;

    dispatchStore.modalText = dispatchCopy.modalText;

    dispatchStore.modalTarget = dispatchCopy.modalTarget;
}

async function sendTelegramTestDispatch(dispatchStore, target){
    dispatchStore.modalVisible = true;
    dispatchStore.modalLoading = true;

    let isError = false;

    let userErrorMess = '';

    let formData = await new FormData();

    await formData.append("message", dispatchStore.$state.telegram_text);
    await formData.append("target", target);

    if (target === 'newdispatch'){
        await formData.append("dispatch_id", 0);
    }

    if (target === 'modifydispatch'){
        await formData.append("dispatch_id", dispatchStore.$state.dispatch_id);
    }

    for (let fileItem of dispatchStore.$state.upload_files) {
        await formData.append('files', fileItem);
    }

    try {
        let saveResp = await fetch(app_config.apiUrl + app_config.sendTelTestDispatch, {
            method: 'POST',
            body: formData
        });

        let respStatus = Number(saveResp.status);

        let saveAnswer = await saveResp.json();

        // console.log("sendTelegramTestDispatch saveAnswer: ", saveAnswer);

        dispatchStore.modalLoading = false;

        if (respStatus === 200){
            // console.log("sendTelegramTestDispatch if (respStatus === 200)");
            if (saveAnswer.status === 'ok'){

                dispatchStore.modalPurpose = 'success';

                dispatchStore.modalText = saveAnswer.info.user_mess;

                // await resetDispatchParams(dispatchStore);

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

        // console.log("sendTelegramTest dispatchStore: ", dispatchStore.$state);
    }
    catch (error) {
        isError = true;
        console.log(error);
    }

    if(isError){
        // console.log("sendTelegramTestDispatch if(isError)");
        // console.log("sendTelegramTestDispatch userErrorMess: ", userErrorMess);
        dispatchStore.modalLoading = false;
        dispatchStore.modalPurpose = 'fail';

        dispatchStore.modalText = userErrorMess;
    }
}

export {sendTelegramTestDispatch}