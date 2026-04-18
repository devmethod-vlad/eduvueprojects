import {app_config} from "@/projects/config/setconfig";

async function getSpecList(params){

    try{
        let resp = await fetch(app_config.apiUrl+app_config.filterMachineApiUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                'action': params.action,
                'spec_activeall': params.spec_activeall,
                'spec_activelist': params.spec_activelist,
                'spec_inactivelist': params.spec_inactivelist,
                'spec_searchinput': params.spec_searchinput,
                'spec_activepage': params.spec_activepage,
                'spec_sorting': params.spec_sorting,
                'spec_filters': params.spec_filters,
                'spec_pagecount': params.spec_pagecount

            })
        })
        return await resp.json()
    }
    catch (e){
        console.log(e);
        return {'status':'error', 'error_mess': 'WARN: Error during request api', 'user_error': 'Ошибка при обращении к api для получения списка проектов'}
    }
}

export {getSpecList}