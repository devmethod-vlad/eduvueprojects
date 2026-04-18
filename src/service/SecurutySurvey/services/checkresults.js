
async function checkSurveyResults(apiurl, userid, emiaslogin){
    try{
        let resp = await fetch(apiurl+'/security-survey/', {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                'action': 'checkresults',
                'userid': userid,
                'emiaslogin': emiaslogin,

            })
        })
        return await resp.json()
    }
    catch (e){
        console.log(e);
        return {'status':'error', 'error_mess': 'WARN: Error during request api', 'user_error': 'Ошибка при обращении к api для проверки данных пользователя'}
    }
}

export {checkSurveyResults}