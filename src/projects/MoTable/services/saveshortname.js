import {app_config} from "@/projects/config/setconfig";

async function saveMoShortName(moid, shortname){
    try{

        const moPartResp = await fetch(app_config.apiUrl+app_config.enrolPluginApiUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify({"action":"changemoname", "moid":moid,
                "shortname": shortname
            })
        });

        return  await moPartResp.json()
    }
    catch(e) {
        return {'status':'error', 'error_mess':e}
    }
}

export {saveMoShortName}