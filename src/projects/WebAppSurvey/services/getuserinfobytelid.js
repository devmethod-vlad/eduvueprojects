import {auth_config} from "@/projects/config/setconfig";

async function userInfoByTelId(telid){
    console.log("userInfoByTelId(telid): ", telid)
    try{
        let resp = await fetch(auth_config.apiUrl+auth_config.authUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                'action': 'userinfobytelid',
                'usertelid': telid
            })
        });
        return await resp.json()
    }
    catch (e){
        console.log(e);
        return {'status':'error', 'error_mess': 'WARN: Error during request api', 'user_error': 'Ошибка при обращении к api для получения списка проектов'}
    }
}

export {userInfoByTelId}