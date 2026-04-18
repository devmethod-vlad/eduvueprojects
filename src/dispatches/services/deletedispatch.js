import {app_config} from "@/dispatches/config/setconfig";


async function deleteDispatch(dispatch_id, dispatchStore){

    dispatchStore.modalLoading = true;

    let isError = false;

    let userErrorMess = '';

    // console.log("deleteDispatch");

    try {

        let delResp = await fetch(app_config.apiUrl + app_config.dispatchDeleteUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                dispatch_id: dispatch_id

            })
        });

        let respStatus = Number(delResp.status);

        let delAnswer = await delResp.json();

        console.log("deleteDispatch delAnswer: ", delAnswer);

        dispatchStore.modalLoading = false;

        if (respStatus === 200){
            if (delAnswer.status === 'ok'){
                dispatchStore.modalPurpose = 'success';
                dispatchStore.modalText = "Рассылка была успешно удалена!";
            }
            else {
                isError = true;
                userErrorMess = delAnswer.info.user_mess;
            }
        }
        else {
            isError = true;
            userErrorMess = "Ошибка при попытке удалить рассылку";
        }
    }
    catch (error) {
        console.log(error);
        isError = true;
        userErrorMess = "Ошибка при попытке удалить рассылку";
        dispatchStore.modalLoading = false;
    }

    if (isError){
        dispatchStore.modalPurpose = 'fail';
        dispatchStore.modalText = userErrorMess;
    }
}

export {deleteDispatch}