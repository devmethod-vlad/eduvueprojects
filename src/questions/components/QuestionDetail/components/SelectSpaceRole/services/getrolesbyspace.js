import {app_config} from "@/questions/config/setconfig";

async function getRolesBySpace(spaceid, roleid, userid){
    try{

        const rolesResp = await fetch(app_config.apiUrl+app_config.spaceAndRolesUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                "action": "getrolesbyspace",
                "spaceid": spaceid,
                "roleid": roleid,
                "userid": userid
            })
        });
        const answer = await rolesResp.json();
        // await console.log("answer", answer);
        return  answer;
    }
    catch(e) {
        return {'status':'error', 'error_mess':e}
    }
}

export {getRolesBySpace}