async function getEmAuth(app_config, login, snils){
    let status ='error';
    let info = {};
    try{
        const emiasResp = await fetch(app_config.apiUrl+app_config.authUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify({"action": 'checkemiasauth', "emiaslogin": login, "snils":snils})
        });
        const emiasAnswer = await emiasResp.json();
        if (emiasAnswer['status']==='ok'){
            status = 'ok';
            info = await emiasAnswer['info'];
        }
        else {
            if(emiasAnswer['info']['error_mess']){
                info['error_mess'] = emiasAnswer['info']['error_mess'];
            }
            if(emiasAnswer['info']['error_mess_user']){
                info['error_mess_user'] = emiasAnswer['info']['error_mess_user'];
            }
        }

    }
    catch (error) {
        await console.log(error);
        info['error_mess'] = error;
    }
    return {'status': status, 'info': info}
}

export {getEmAuth}