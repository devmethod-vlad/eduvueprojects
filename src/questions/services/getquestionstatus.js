import {app_config} from "@/questions/config/setconfig";

function getQuestionStatus(statusid){
    for (const [key, value] of Object.entries(app_config.QUESTION_STATUS)) {
        if (Number(value.id) === Number(statusid)){
            return [key, value.show_name];
        }
    }
    return null;
}
export {getQuestionStatus}