import {app_config} from "@/questions/config/setconfig";

async function getQuestionInfo(userid, questionid){
    try{

        const questionResp = await fetch(app_config.apiUrl+app_config.questionsUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                "userid": userid,
                "roleid": app_config.BASE_ROLE.redactor.id,
                "spaceid": 0,
                "statusid": 0,
                "perpagecount": 5,
                "activepage": 1,
                "datesort": 'desc',
                "searchinput": questionid.toString(),
                "enablesearch": 1,
                "usertoken": '',
                "forsynchroflag": 0,
                "isfeedback": 0,
                "showonlypublic": 0
            })
        });

        return  await questionResp.json()
    }
    catch(e) {
        return {'status':'error', 'error_mess':e}
    }
}

export {getQuestionInfo}