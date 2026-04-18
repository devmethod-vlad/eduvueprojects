import {app_config} from "@/dispatches/config/setconfig";


async function deleteDispatchAttachment(dispatch_id, attach_id){

    // console.log("deleteDispatchAttachment");

    try {

        let delResp = await fetch(app_config.apiUrl + app_config.deleteAttachmentUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                dispatch_id: dispatch_id,
                attach_id: attach_id

            })
        });

        let respStatus = Number(delResp.status);

        let delAnswer = await delResp.json();

        console.log("deleteDispatchAttachment delAnswer: ", delAnswer);

        if (respStatus === 200){
            return delAnswer;
        }
    }
    catch (error) {
        console.log(error);
        return {'status': 'error'}
    }
}

export {deleteDispatchAttachment}