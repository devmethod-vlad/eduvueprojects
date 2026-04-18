import {app_config} from "@/projects/config/setconfig";

async function checkMoresp(projectid, userid){
    try{

        const userResp = await fetch(app_config.apiUrl+app_config.enrolPluginApiUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify({"action":"checkmoresp", "projectid":projectid,
                "userid": userid
            })
        });

        return  await userResp.json()
    }
    catch(e) {
        return {'status':'error', 'error_mess':e}
    }
}

export {checkMoresp}