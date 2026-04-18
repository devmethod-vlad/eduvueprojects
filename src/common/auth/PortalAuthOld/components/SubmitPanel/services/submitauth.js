import {user_object} from "@/objects/user";
import setUserinfoParams from "../../../services/setuserobject";

async function submitAuth(app_config, submitInfo){

    let status = 'error';

    let userState = {...user_object};

    try{
        const submitResp = await fetch(app_config.apiUrl+app_config.authUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify(
                {
                    "action":"submitauth",
                    "emiaslogin":submitInfo.login,
                    "snils":submitInfo.snils,
                    "lastname":submitInfo.lastname,
                    "firstname":submitInfo.firstname,
                    "secondname":submitInfo.secondname,
                    "usertelid": submitInfo.usertelid,
                    "usertelname": submitInfo.usertelname
                })
        });
        const submitAnswer = await submitResp.json();

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
            // this.warnInfoText = 'При подтверждении данных в ЕМИАС возникли проблемы. Попробуйте повторить позже!';
            if (localStorage.getItem('userinfo')){
                localStorage.setItem('userinfo', JSON.stringify({'userToken': ''}));
            }
        }
    }
    catch (error) {
        // this.warnInfoText = 'При подтверждении данных в ЕМИАС возникли проблемы. Попробуйте повторить позже!';
        await console.log(error);
    }
    return {'status': status, 'info': {
        'userState': userState
        }}
}

export {submitAuth}