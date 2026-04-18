async function checkAccessLocalService (appConfig){

    let localHostInfo = {};

    try{
        if (appConfig.fakeLocalAuth){
            localHostInfo.user = appConfig.fakeLocalLogin;
        }
        else {
            let localResp = await fetch('https://localhost');
            let answer = await localResp.json();

            if (answer.user){
                localHostInfo = answer;
                // login = await answer.user;
            }
        }
    }
    catch (e) {
        console.log(e)
    }

    return localHostInfo;
}

async function localHostServiceAuth(appConfig, userState){
    try{
        let login='';

        if (userState.$state.localhostServiceEnable && userState.$state.localhostServiceInfo.user){
            login=userState.$state.localhostServiceInfo.user;
        }

        // console.log("localHostServiceAuth login: ", login);

        if (login !== ''){

            let resp = await fetch(appConfig.apiUrl+appConfig.authUrl, {
                method: 'POST',
                headers: {
                    Accept: "application/json",
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({"emiaslogin":login, "action": "localauthservice"})
            });
            return await resp.json()
        }
        else {
            return {'status':'error'};
        }

    }
    catch (e) {
        console.log('error fetch https://localhost: ', e);
        return {'status':'error'};
    }
}

export {localHostServiceAuth, checkAccessLocalService}
