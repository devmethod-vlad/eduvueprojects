export default async function checkUserToken(app_config, token){
    try{
        let resp = await fetch(app_config.apiUrl+app_config.authUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify({"usertoken":token, "action":"checktoken"})
        })
        return await resp.json()
    }
    catch (e){
        return {'status':'error', 'error_mess': 'WARN: Error during request api', 'user_error': 'Ошибка при обращении к api авторизации'}
    }

}