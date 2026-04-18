import setUserinfoParams from "../setuserobject";

const wikiWarnText = 'При попытке авторизоватся через портал возникли проблемы. Обновите страницу или зайдите позже!';

async function processWikiAuth(userState, appConfig){

    // console.log("processWikiAuth ");

    //'userinfo'
    let storageKey = appConfig.localStorage.userInfo.key;

    //'userToken'
    let storageTokenProp = appConfig.localStorage.userInfo.props.token;

    let localInfo = {}

    let warningText=''

    let status=''

    let wikiUserResp={};

    try {
        if (appConfig.prod) {
            let wikiCheckUserResp = await fetch(appConfig.portalUrl + '/rest/api/user/current');
            wikiUserResp = await wikiCheckUserResp.json();
        }
        else {
            //Если скрипт работает в dev-окружении, то эмулируем авторизацию
            //если выставлен глобальный параметр
            if (appConfig.enableFakeEduAuth) {
                wikiUserResp['type'] = 'known';
                wikiUserResp['username'] = appConfig.eduFakeUserName;
                wikiUserResp['displayName'] = appConfig.eduFakeDisplayName;
            }
        }

        // console.log("this.eduFakeUserName: ", this.eduFakeUserName);

        //Если пользователь авторизован на портале
        if (wikiUserResp['type'] === 'known') {

            //Делаем запрос к api для получения информации о пользователе
            //Если пользователь не найден - создаем нового
            const wikiProcResp = await fetch(appConfig.apiUrl+appConfig.authUrl, {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({"wikilogin":wikiUserResp['username'], 'name':wikiUserResp['displayName'], "action":"wikiinfo"})
            })
            const wikiProcAnswer = await wikiProcResp.json();

            // console.log("wikiProcAnswer: ", wikiProcAnswer);

            if (wikiProcAnswer['status'] === 'ok') {
                userState.authSource = 'wiki';
                userState.auth = true;
                userState.tokenExpire = false;
                if(Number(wikiProcAnswer['info']['appreginfo']['telegram'])===1){
                    userState.appRegistration.telegram = 1;
                }
                await setUserinfoParams(wikiProcAnswer, userState);

                localInfo[storageTokenProp] = wikiProcAnswer['info']['token'];

                localStorage.setItem(storageKey, JSON.stringify(localInfo));

                status = 'ok';
            }
            else {
                status = 'no_wiki_user';
                //При авторизации через портал токен не проверяется, т.к.
                //каждый раз выдается новый или обновляется старый
                warningText = wikiWarnText;
            }
        }
        else {
            status = 'api_no_access'
        }

    } catch (error) {
        status = 'error'
        warningText = wikiWarnText;
        console.log(error);
    }

    return {'status': status, 'info': {
        'warningText': warningText
        }}
}

export {processWikiAuth}