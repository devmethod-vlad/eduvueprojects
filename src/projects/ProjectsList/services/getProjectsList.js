import {app_config} from "@/projects/config/setconfig";

async function getprojectslist(renderParams){
    try{
        let resp = await fetch(app_config.apiUrl+app_config.projectListApiUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                "token":renderParams.token,
                "userid": renderParams.userid,
                "action":"projectslist",
                "activityfilter": renderParams.activityfilter,
                "sorttitle": renderParams.sorttitle,
                "sortdate": renderParams.sortdate,
                "pagecount" : renderParams.pagecount,
                "searchfraze" : renderParams.searchfraze,
                "activepage" : renderParams.activepage
            })
        })
        return await resp.json()
    }
    catch (e){
        return {'status':'error', 'error_mess': 'WARN: Error during request api', 'user_error': 'Ошибка при обращении к api для получения списка проектов'}
    }
}

export {getprojectslist}