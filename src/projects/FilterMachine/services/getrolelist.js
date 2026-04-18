import {app_config} from "@/projects/config/setconfig";

async function getRoleList(params){
    try{
        let resp = await fetch(app_config.apiUrl+app_config.filterMachineApiUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                'action': 'getrolelist',
                'role_activeall': params.role_activeall,
                'role_activelist': params.role_activelist,
                'role_inactivelist': params.role_inactivelist,
                'role_searchinput': params.role_searchinput,
                'role_activepage': params.role_activepage,
                'role_sorting': params.role_sorting,
                'role_filters': params.role_filters,
                'role_pagecount': params.role_pagecount

            })
        })
        return await resp.json()
    }
    catch (e){
        console.log(e);
        return {'status':'error', 'error_mess': 'WARN: Error during request api', 'user_error': 'Ошибка при обращении к api для получения списка проектов'}
    }
}

export {getRoleList}