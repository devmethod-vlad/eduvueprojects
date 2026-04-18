async function checkUserToken(authurl, token){
    try{
        let resp = await fetch(authurl, {
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
export {checkUserToken}