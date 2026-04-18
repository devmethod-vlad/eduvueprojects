import {app_config} from "@/questions/config/setconfig";

async function execQuestionAction(orderid, userid, execute_action){
    try{

        const execResp = await fetch(app_config.apiUrl+app_config.serviceUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                "action": "execaction",
                "userid": userid,
                "orderid": orderid,
                "execute_action":execute_action
            })
        });

        return  await execResp.json()
    }
    catch(e) {
        return {'status':'error', 'error_mess':e}
    }
}

export {execQuestionAction}