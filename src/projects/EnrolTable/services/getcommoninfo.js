import {app_config} from "@/projects/config/setconfig";

async function getEnrolCommonInfo(projectid, moid, userid){
    try{

        const infoResp = await fetch(app_config.apiUrl+app_config.enrolPluginApiUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify({"action":"getenrolcommoninfo", "projectid":projectid,
                "moid": moid, "userid": userid
            })
        });

        return  await infoResp.json()
    }
    catch(e) {
        return {'status':'error', 'error_mess':e}
    }
}

export {getEnrolCommonInfo}