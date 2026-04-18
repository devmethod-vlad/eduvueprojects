import {app_config} from "@/projects/config/setconfig";

async function deleteState(surveyid, userid){
    await fetch(app_config.apiUrl+app_config.surveyApiUrl, {
        method: "POST",
        headers: {
            Accept: "application/json",
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            "action":"stateprocess",
            "stateaction":"deletestate",
            "surveyid":Number(surveyid),
            "userid":Number(userid)
        })
    });
}

async function saveAnswer(data, workspaceParams){

    // await console.log("saveAnswer");

    await fetch(app_config.apiUrl+app_config.surveyApiUrl, {
        method: "POST",
        headers: {
            Accept: "application/json",
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            "action":"saveanswer",
            "surveyid":Number(workspaceParams.surveyID),
            "userid":Number(workspaceParams.userID),
            "surveydata": data,
            "starttime":workspaceParams.startime

        })
    });

    if (Number(workspaceParams.surveyTime) !== 0){
        if (Number(workspaceParams.maxAttemptsCount) !==0 && Number(workspaceParams.maxAttemptsCount) === Number(workspaceParams.userAttemptNumber)){
            await deleteState(workspaceParams.surveyID, workspaceParams.userID);
        }
    }
    else {
        await deleteState(workspaceParams.surveyID, workspaceParams.userID);
    }
}

export {saveAnswer}