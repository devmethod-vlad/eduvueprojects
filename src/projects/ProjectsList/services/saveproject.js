import {app_config} from "@/projects/config/setconfig";

async function saveProject(action, project_params){
    try{
        let resp = await fetch(app_config.apiUrl+app_config.projectListApiUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                "action": action,
                "projectid": project_params.id,
                "project_name": project_params.name,
                "project_desc": project_params.description,
                "project_active": project_params.active,
                "project_enrols": project_params.project_enrols,
                "project_actions": project_params.project_actions,
                "new_project_actions": project_params.new_project_actions,
                "actions_to_delete": project_params.actions_to_delete,
                "actions_to_redact": project_params.actions_to_redact
            })
        })
        return await resp.json()
    }
    catch (e){
        return {'status':'error', 'error_mess': 'WARN: Error during request api', 'user_error': 'Ошибка при обращении к api для проверки имени новой активности'}
    }
}

export {saveProject}