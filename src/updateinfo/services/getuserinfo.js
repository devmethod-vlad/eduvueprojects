import {app_config} from "@/updateinfo/config/setconfig";
import {createJwt} from "@/common/auth/PortalAuth/services/authtype/createjwt";


async function getUserFormInfo(user, mailStore, phoneStore){
    try{
        let token = await createJwt({"login": user.$state.emiaslogin}, app_config.jwt_secret);
        let infoResp = await fetch(app_config.getUpdateFormInfoUrl, {
            method: "POST",
            headers: {
                Authorization: 'Bearer '+token,
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                login: user.$state.emiaslogin.trim()
            })
        });

        let respStatus = Number(infoResp.status);

        let respAnswer = await infoResp.json();

        if (respStatus === 200){
            // console.log("respAnswer: ", respAnswer);
            mailStore.exist = respAnswer.contact_info.mail;
            phoneStore.exist = respAnswer.contact_info.phone;
            user.lastname = respAnswer.user_info.lastname;
            user.firstname = respAnswer.user_info.firstname;
            user.secondname = respAnswer.user_info.secondname;
            return {'status': 'ok'};
        }
        else {
            return {'status': 'error'}
        }
    }
    catch(e){
        console.error(e);
        return {'status': 'error'}
    }
}

export {getUserFormInfo}