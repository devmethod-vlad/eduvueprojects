import {app_config} from "@/projects/config/setconfig";

async function saveCreatorState(surveyid, content){
    try{

        const surveyResp = await fetch(app_config.apiUrl+app_config.surveyApiUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify({"action":"savecreatorstate", "surveyid":Number(surveyid), "content": content})
        });

        return  await surveyResp.json()
    }
    catch(e) {
        return {'status':'error', 'error_mess':e}
    }
}

export {saveCreatorState}