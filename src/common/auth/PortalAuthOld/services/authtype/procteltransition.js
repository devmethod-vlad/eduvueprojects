import checkUserToken from "../checkusertoken";
import setUserinfoParams from "../setuserobject";
const tokenExpireText = 'Извините! Ваши авторизационные данные устарели!';
const noUserText = 'Извините! Мы не нашли пользователя с полученными данными для авторизации!';

async function processTelegramTransition(urlState, appConfig, userState){

    console.log("processTelegramTransition");

    //'userinfo'
    let storageKey = appConfig.localStorage.userInfo.key;

    //'userToken'
    let storageTokenProp = appConfig.localStorage.userInfo.props.token;

    let localInfo = {}

    let warningText=''

    let status=''

    try{

        const checkUserAnswer = await checkUserToken(appConfig, urlState.telegram.telegramtoken);

        console.log("processTelegramTransition checkUserToken answer: ", checkUserAnswer);

        if(checkUserAnswer['status']==='ok'){
            userState.authSource = 'telegram';
            userState.auth = true;
            userState.tokenExpire = false;
            userState.appRegistration.telegram = 1;
            await setUserinfoParams(checkUserAnswer, userState);

            localInfo[storageTokenProp] = checkUserAnswer['info']['token']

            localStorage.setItem(storageKey, JSON.stringify(localInfo));

            status='ok'
        }
        else {
            if(checkUserAnswer['status'] === 'token_expire'){
                if (localStorage.getItem(storageKey)){
                    localInfo[storageTokenProp] = ''
                    localStorage.setItem(storageKey, JSON.stringify(localInfo));
                }
                userState.tokenExpire = true;

                warningText = tokenExpireText
            }
            else if(checkUserAnswer['status'] === 'token_error'){
                warningText = noUserText;
            }
            else{
                warningText = 'При попытке авторизации возникли проблемы! Попробуйте повторить снова!';
            }
            status = checkUserAnswer['status']
        }

    }
    catch (e) {
        status = 'error'
        warningText = 'При попытке авторизации возникли проблемы! Попробуйте повторить снова!'
        console.log(e);
    }

    return {'status': status, 'info': {'warningText': warningText}}
}

export {processTelegramTransition}