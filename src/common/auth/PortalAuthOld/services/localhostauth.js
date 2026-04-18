export default async function localHostServiceAuth(appConfig){
    try{
        let login='';
        if (appConfig.fakeLocalAuth){
            login = appConfig.fakeLocalLogin;
        }
        else {
            let localResp = await fetch('https://localhost');
            let answer = await localResp.json();

            if (answer.user){
                login = await answer.user;
            }
        }

        // await console.log("localHostServiceAuth login: ", login);
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
        await console.log('error fetch https://localhost: ');
        return {'status':'error'};
    }
}
