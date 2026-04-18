import {user_object} from "@/objects/user";
import setUserinfoParams from "../../../services/setuserobject";

async function submitAuth(app_config, app, userState){

    let status = 'error';

    try{
        const submitResp = await fetch(app_config.$state.apiUrl+app_config.$state.authUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify(
                {
                    "action":"submitauth",
                    "emiaslogin": app.$state.submitInfo.login,
                    "snils": app.$state.submitInfo.snils,
                    "lastname": app.$state.submitInfo.lastname,
                    "firstname": app.$state.submitInfo.firstname,
                    "secondname": app.$state.submitInfo.secondname,
                    "usertelid": app.$state.submitInfo.usertelid,
                    "usertelname": app.$state.submitInfo.usertelname
                })
        });
        const submitAnswer = await submitResp.json();
        console.log("submitAuth submitAnswer:", submitAnswer);

        if (submitAnswer['status'] === 'ok'){

            status = 'ok';

            userState.auth = true;
            userState.authSource = 'emiasdb';

            if(Number(submitAnswer['info']['appreginfo']['telegram']) === 1){
                userState.appRegistration.telegram = 1
            }
            await setUserinfoParams(submitAnswer, userState);

        }
        else {
            // this.warnInfoText = 'При подтверждении данных в медицинской системе возникли проблемы. Попробуйте повторить позже!';
            if (localStorage.getItem('userinfo')){
                localStorage.setItem('userinfo', JSON.stringify({'userToken': ''}));
            }
        }
    }
    catch (error) {
        // this.warnInfoText = 'При подтверждении данных в ЕМИАС возникли проблемы. Попробуйте повторить позже!';
        console.log(error);
    }
    return {'status': status}
}

export {submitAuth}