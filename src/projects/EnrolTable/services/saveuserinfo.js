import {app_config} from "@/projects/config/setconfig";

async function saveUserDbInfo(userid, phone, mail){
    try{

        const infoResp = await fetch(app_config.apiUrl+app_config.enrolPluginApiUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify({"action":"saveuserinfo", "userphone": phone,
                "usermail": mail, "userid": userid
            })
        });

        return  await infoResp.json()
    }
    catch(e) {
        return {'status':'error', 'error_mess':e}
    }
}

export {saveUserDbInfo}