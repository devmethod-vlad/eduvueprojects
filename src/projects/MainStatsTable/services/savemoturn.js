import {app_config} from "@/projects/config/setconfig";

async function saveMoTurnInfo(projectid, moid, moturn){
    try{

        const moTurnResp = await fetch(app_config.apiUrl+app_config.enrolPluginApiUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify({"action":"changemoturn", "moid":moid,
                "moturn": moturn, "projectid": projectid
            })
        });

        return  await moTurnResp.json()
    }
    catch(e) {
        return {'status':'error', 'error_mess':e}
    }
}

export {saveMoTurnInfo}