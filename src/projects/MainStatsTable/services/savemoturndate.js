import {app_config} from "@/projects/config/setconfig";

async function saveMoTurnDateInfo(projectid, moid, moturndate){
    try{

        const moTurnDateResp = await fetch(app_config.apiUrl+app_config.enrolPluginApiUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify({"action":"changemoturndate", "moid":moid,
                "moturndate": moturndate, "projectid": projectid
            })
        });

        return  await moTurnDateResp.json()
    }
    catch(e) {
        return {'status':'error', 'error_mess':e}
    }
}

export {saveMoTurnDateInfo}