import {app_config} from "@/questions/config/setconfig";

async function saveAppConfig(tokenlifetime, botname, uploadsize){
    try {
        let resp = await fetch(app_config.apiUrl+app_config.serviceUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body:
                JSON.stringify(
                    {
                        "action": "updateappconfig",
                        "tokenlifetime": tokenlifetime,
                        "botname": botname,
                        "uploadsize": uploadsize
                    }
                )
        });
        return await resp.json();
    }
    catch (error) {
        return {'status': 'error'}
    }
}

export {saveAppConfig}