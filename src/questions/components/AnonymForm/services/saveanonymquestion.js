import {app_config} from "@/questions/config/setconfig";

async function saveAnonQuest(params){
    // try{

    let newFormData = await new FormData();

    await newFormData.append("action", "save_anonym_question");
    await newFormData.append("fio", params.fio);
    await newFormData.append("muname", params.muname);
    await newFormData.append("userfingerprintid", params.userfingerprintid);
    await newFormData.append("question_text", params.question_text);
    await newFormData.append("phone", params.phone);
    await newFormData.append("mail", params.mail);
    await newFormData.append("spacekey", params.spacekey);


    const saveResp = await fetch(app_config.apiUrl+app_config.saveOrUpdateUrl, {
        method: "POST",
        body: newFormData
    });

    return  await saveResp.json()
    // }
    // catch(e) {
    //     return {'status':'error', 'error_mess':e}
    // }
}

export {saveAnonQuest}