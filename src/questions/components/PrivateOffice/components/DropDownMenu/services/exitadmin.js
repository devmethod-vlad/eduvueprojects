import {app_config} from "@/questions/config/setconfig";

async function exitAdminAcc(userid){
    try{
        let resp = await fetch(app_config.apiUrl+app_config.serviceUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify(
                {
                    "userid":userid,
                    "action":"exitadmin"
                }
            )
        })
        return await resp.json()
    }
    catch (e){
        console.log(e);
        return {'status':'error', 'error_mess': 'WARN: Error during request api'}
    }
}

export {exitAdminAcc}