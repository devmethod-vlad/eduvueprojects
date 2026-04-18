import {app_config} from "@/questions/config/setconfig";

async function saveOrUpdateQuestion(params, action){

    await console.log("saveOrUpdateQuestion params", params)
    try{

        let newFormData = await new FormData();
        for (let fileItem of params.question_files) {
            await newFormData.append('question_files[]', fileItem);
        }

        if (params.answer_files){
            for (let fileAnswerItem of params.answer_files) {
                await newFormData.append('answer_files[]', fileAnswerItem);
            }
        }
        if (params.answer_text){
            await newFormData.append("answer_text", params.answer_text);

        }

        if (params.orderid){
            await newFormData.append("orderid", params.orderid);
        }

        await newFormData.append("action", action);
        await newFormData.append("publicorder", params.publicorder);
        await newFormData.append("userid", params.userid);
        await newFormData.append("spacekey", params.spacekey);
        await newFormData.append("unionroleid", params.unionroleid);
        await newFormData.append("question_text", params.question_text);
        await newFormData.append("question_files", params.question_files);
        await newFormData.append("fastformflag", params.fastformflag);
        await newFormData.append("isfeedback", params.isfeedback);

        const saveResp = await fetch(app_config.apiUrl+app_config.saveOrUpdateUrl, {
            method: "POST",
            body: newFormData
        });

        return  await saveResp.json()
    }
    catch(e) {
        return {'status':'error', 'error_mess':e}
    }
}

export {saveOrUpdateQuestion}