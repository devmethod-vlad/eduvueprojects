
async function sendResult(params){
    try{
        let resp = await fetch(params.apiurl+'/security-survey/', {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                'action': 'saveresult',
                'userid': params.userid,
                'emiaslogin': params.emiaslogin,
                'fingerprint': params.fingerprint,
                'authtype': params.authtype

            })
        })
        return await resp.json()
    }
    catch (e){
        console.log(e);
        return {'status':'error', 'error_mess': 'WARN: Error during request api', 'user_error': 'Ошибка при обращении к api для проверки данных пользователя'}
    }
}

export {sendResult}