
async function getSurveyStatistic(apiUrl, surveyid) {
    await console.log("getSurveyStatistic apiUrl: ", apiUrl);
    await console.log("getSurveyStatistic surveyid: ", surveyid);

    try{
        let resp = await fetch(apiUrl+'/surveyprocess/', {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                "action": "getsurveystats",
                "surveyid": surveyid,
            })
        })
        return await resp.json()
    }
    catch (e){
        return {'status':'error', 'error_mess': 'WARN: Error during request api', 'user_error': 'Ошибка при проверке данных по статистике опроса'}
    }
}

export {getSurveyStatistic}