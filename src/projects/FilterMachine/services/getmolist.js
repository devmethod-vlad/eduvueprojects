import {app_config} from "@/projects/config/setconfig";

async function getMoList(params){

    try{
        let resp = await fetch(app_config.apiUrl+app_config.filterMachineApiUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                'action': params.action,
                'mo_disableall': params.mo_disableall,
                'mo_activelist': params.mo_activelist,
                'mo_inactivelist': params.mo_inactivelist,
                'mo_searchinput': params.mo_searchinput,
                'mo_activepage': params.mo_activepage,
                'mo_sorting': params.mo_sorting,
                'mo_filters': params.mo_filters,
                'mo_pagecount': params.mo_pagecount,
                'mo_categorylist': params.mo_categorylist,
                'mo_visibility_filters': params.mo_visibility_filters

            })
        })
        return await resp.json()
    }
    catch (e){
        console.log(e);
        return {'status':'error', 'error_mess': 'WARN: Error during request api', 'user_error': 'Ошибка при обращении к api для получения списка проектов'}
    }
}

export {getMoList}