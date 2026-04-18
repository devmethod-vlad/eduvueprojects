import {app_config} from "@/questions/config/setconfig";

async function getAppConfigInfo(){
    try{

        const confResp = await fetch(app_config.apiUrl+app_config.serviceUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                "action": 'getappconfiginfo'
            })
        });

        return  await confResp.json()
    }
    catch(e) {
        return {'status':'error', 'error_mess':e}
    }
}

export {getAppConfigInfo}