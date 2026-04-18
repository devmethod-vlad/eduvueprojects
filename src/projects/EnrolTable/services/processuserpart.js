import {app_config} from "@/projects/config/setconfig";

async function processUserPart(projectid, moid, userid, partflag){
    try{

        const userPartResp = await fetch(app_config.apiUrl+app_config.enrolPluginApiUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify({"action":"processuserpart", "projectid":projectid,
                "moid": moid, "userpartflag": partflag, "userid": userid
            })
        });

        return  await userPartResp.json()
    }
    catch(e) {
        return {'status':'error', 'error_mess':e}
    }
}

export {processUserPart}