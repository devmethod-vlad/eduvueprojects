import {app_config} from "@/projects/config/setconfig";

async function processMoPart(projectid, moid, partflag){
    try{

        const moPartResp = await fetch(app_config.apiUrl+app_config.enrolPluginApiUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify({"action":"mopart", "projectid":projectid,
                "moid": moid, "projectpartflag": partflag
            })
        });

        return  await moPartResp.json()
    }
    catch(e) {
        return {'status':'error', 'error_mess':e}
    }
}

export {processMoPart}