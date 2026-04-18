import {app_config} from "@/questions/config/setconfig";

async function addAdmin(edulogin, adminlogin, adminpass){
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
                        "action": "createnewadmin",
                        "edulogin": edulogin,
                        "adminlogin": adminlogin,
                        "adminpass": adminpass
                    }
                )
        });
        return await resp.json();
    }
    catch (error) {
        return {'status': 'error'}
    }
}

export {addAdmin}