import {app_config} from "@/questions/config/setconfig";

async function changeFilePublicity(attachid, publicflag){
    try{

        const publResp = await fetch(app_config.apiUrl+app_config.serviceUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                "action": "changefilepublicity",
                "attachid": attachid,
                "publicflag": publicflag
            })
        });

        return  await publResp.json()
    }
    catch(e) {
        return {'status':'error', 'error_mess':e}
    }
}

export {changeFilePublicity}