import {app_config} from "@/projects/config/setconfig";

async function checkNewActionName(actionname){
    try{
        let resp = await fetch(app_config.apiUrl+app_config.projectListApiUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                "action": "checknewactioname",
                "projectaction": actionname,
            })
        })
        return await resp.json()
    }
    catch (e){
        return {'status':'error', 'error_mess': 'WARN: Error during request api', 'user_error': 'Ошибка при обращении к api для проверки имени новой активности'}
    }
}

export {checkNewActionName}