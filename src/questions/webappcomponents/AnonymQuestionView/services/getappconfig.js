import {app_config} from "@/questions/config/setconfig";

async function getAppConfig(){
    try{

        const appResp = await fetch(app_config.apiUrl+app_config.serviceUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                "action": "getappconfiginfo"
            })
        });

        return  await appResp.json()
    }
    catch(e) {
        return {'status':'error', 'error_mess':e}
    }
}

export {getAppConfig}