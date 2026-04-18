import {app_config} from "@/projects/config/setconfig";

async function updateFmState(params){
    try{
        let resp = await fetch(app_config.apiUrl+app_config.filterMachineApiUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify({

                'action': 'updatefmstate',
                'role_activeall': params.role_activeall,
                'role_activelist': params.role_activelist,
                'role_inactivelist': params.role_inactivelist,
                'spec_activeall': params.spec_activeall,
                'spec_activelist': params.spec_activelist,
                'spec_inactivelist': params.spec_inactivelist,
                'mo_disableall': params.mo_disableall,
                'mo_activelist': params.mo_activelist,
                'mo_inactivelist': params.mo_inactivelist,
                'user_disableall': params.user_disableall,
                'user_activelist': params.user_activelist,
                'user_inactivelist': params.user_inactivelist,
                'fm_rewrite': params.fm_rewrite,
                'fm_synchronized': params.fm_synchronized,
                'projectid': params.projectid
            })
        })
        return await resp.json()
    }
    catch (e){
        console.log(e);
        return {'status':'error', 'error_mess': 'WARN: Error during request api', 'user_error': 'Ошибка при обращении к api для получения списка проектов'}
    }
}

export {updateFmState}