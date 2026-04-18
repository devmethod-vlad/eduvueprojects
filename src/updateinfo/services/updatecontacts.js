import {app_config} from "@/updateinfo/config/setconfig";

async function updateContactsInfo(login, contactsInfo){
    await console.log("contactsInfo: ", contactsInfo);
    try {
        let infoResp = await fetch(app_config.updateContactsUrl, {
            method: "POST",
            headers: {
                Accept: "application/json",
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                login: login,
                new_mails: contactsInfo.new_mails,
                mails_to_delete: contactsInfo.del_mails,
                mails_change_base: contactsInfo.mails_change_base,
                new_phones: contactsInfo.new_phones,
                phones_to_delete: contactsInfo.del_phones,
                phones_change_base: contactsInfo.phones_change_base
            })
        });

        let respStatus = Number(infoResp.status);

        let respAnswer = await infoResp.json();

        if (respStatus === 200){
            // console.log("updateContactsInfo respAnswer: ", respAnswer);
            return {'status': 'ok'};
        }
        else {
            return {'status': 'error'}
        }
    }
    catch (e) {
        console.log(e);
        return {'status': 'error'}
    }
}

export {updateContactsInfo}