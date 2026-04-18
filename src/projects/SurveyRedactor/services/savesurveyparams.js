import {app_config} from "@/projects/config/setconfig";

async function saveSurveyParams(surveyObject){
    try{
        // await console.log("saveSurveyParams surveyObject: ", surveyObject);
        surveyObject.content = '';
        surveyObject['action'] = 'savesurveyparams';
        surveyObject['surveyid'] = surveyObject['id'];

        const surveyResp = await fetch(app_config.apiUrl+app_config.surveyApiUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify(surveyObject)
        });

        return  await surveyResp.json()
    }
    catch(e) {
        return {'status':'error', 'error_mess':e}
    }
}

export {saveSurveyParams}