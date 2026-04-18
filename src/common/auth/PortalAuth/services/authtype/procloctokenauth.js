import checkUserToken from "../checkusertoken";
import setUserinfoParams from "../setuserobject";

async function processLocalTokenAuth(userState, appConfig){
    // console.log("processLocalTokenAuth");

    //'userinfo'
    let storageKey = appConfig.localStorage.userInfo.key;

    //'userToken'
    let storageTokenProp = appConfig.localStorage.userInfo.props.token;

    let localInfo = {}

    let status=''


    try{

        // console.log("токен есть в localStorage");
        let userLocalStore = await JSON.parse(localStorage.getItem(storageKey));
        // console.log("userLocalStore: ", userLocalStore);
        if (userLocalStore.userToken !== ''){

            const checkLocalTokenAnswer = await checkUserToken(appConfig, userLocalStore.userToken);

            // console.log("checkLocalTokenAnswer :", checkLocalTokenAnswer);
            if(checkLocalTokenAnswer['status']==='ok'){
                status = checkLocalTokenAnswer['status'];
                userState.authSource = 'localtoken';
                userState.auth = true;
                userState.tokenExpire = false;
                if(Number(checkLocalTokenAnswer['info']['appreginfo']['telegram'])===1){
                    userState.appRegistration.telegram = 1;
                }
                await setUserinfoParams(checkLocalTokenAnswer, userState);

                localInfo[storageTokenProp] = checkLocalTokenAnswer['info']['token'];

                localStorage.setItem(storageKey, JSON.stringify(localInfo));
            }
            else {
                status= await checkLocalTokenAnswer['status'];
                //Токен проверяется, но предупреждение не выводится
                //так как пользователь, как правило, ничего не знает про localStorage
                //Но признак просроченного токена выставляем
                if(checkLocalTokenAnswer['status'] === 'token_expire'){
                    status = checkLocalTokenAnswer['status'];
                    if (localStorage.getItem(storageKey)){
                        localInfo[storageTokenProp] = ''
                        localStorage.setItem(storageKey, JSON.stringify(localInfo));
                    }
                    userState.tokenExpire = true;
                }
            }

        }
        else {
            status = 'empty';
        }

    }
    catch (error) {
        status = 'error';
        console.log(error);

    }

    return {'status' : status}
}

export {processLocalTokenAuth}