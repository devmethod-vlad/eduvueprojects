import {localHostServiceAuth} from "../localhostauth";
import setUserinfoParams from "../setuserobject";

async function processLocalhostAuth(userState, appConfig){
    // console.log("processLocalhostAuth");

    //'userinfo'
    let storageKey = appConfig.localStorage.userInfo.key;

    //'userToken'
    let storageTokenProp = appConfig.localStorage.userInfo.props.token;

    let localInfo = {};


    let status=''

    try {

        let authLocalResp = await localHostServiceAuth(appConfig, userState);


        // console.log("localHost auth: ", authLocalResp);

        status = authLocalResp['status'];

        if (authLocalResp['status'] === 'ok') {
            userState.authSource = 'localhostservice';
            userState.auth = true;
            userState.tokenExpire = false;
            if(Number(authLocalResp['info']['appreginfo']['telegram'])===1){
                userState.appRegistration.telegram = 1;
            }
            await setUserinfoParams(authLocalResp, userState);

            localInfo[storageTokenProp] = authLocalResp['info']['token'];

            localStorage.setItem(storageKey, JSON.stringify(localInfo));

        }

    }
    catch (error) {
        status = 'error';
        console.log(error);
    }

    return {'status': status}
}

export {processLocalhostAuth}