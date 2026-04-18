import {app_config} from "@/questions/config/setconfig";

async function enterAdminRole(adminlogin, adminpass, userid){
    try {
        let resp = await fetch(app_config.apiUrl+app_config.serviceUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body:
                JSON.stringify(
                    {
                        "action": "enteradmin",
                        "adminlogin": adminlogin,
                        "adminpass": adminpass,
                        "userid": userid
                    }
                )
        });
        return await resp.json();
    }
    catch (error) {
        return {'status': 'error'}
    }
}

export {enterAdminRole}
