import {getQuestionStatus} from "@/questions/services/getquestionstatus";
import {getRoleInfo} from "@/questions/services/getrole";
import {app_config} from "@/questions/config/setconfig";
import {cleanInputText} from "@/questions/services/cleaninputtext";

function validateRoleSelect(role, question){
    let validateFlag = true;
    // if (role === 'personal'){
    //     // if (question.order_union_roles.length>=2){
    //     //     if(Number(question.order_unionrole_id)===Number(app_config.NULLROLE.id)){
    //     //         validateFlag = false;
    //     //     }
    //     // }
    // }
    // else {
    //     if (Number(question.space_id)!==Number(app_config.NULLSPACE.id)){
    //         if (question.order_union_roles.length>=2){
    //             if(Number(question.order_unionrole_id)===Number(app_config.NULLROLE.id)){
    //                 validateFlag = false;
    //             }
    //         }
    //     }
    // }
    return validateFlag;
}

function validateQuestionAction(action, question, user){

    let validateObject = {
        valid: true,
        needSubmit: false,
        comp_validators: {

            selectSpace: true,
            selectRole: true,
            questionTextArea: true,
            answerTextArea: true,
        }
    }

    let is_question_author = false;

    if(Number(user.userid) === Number(question.order_userid)){
        is_question_author = true;
    }

    let is_inwork_user = false;

    if(Number(user.userid) === Number(question.inwork_userid)){
        is_inwork_user = true;
    }

    let is_answer_author = false;

    if(Number(user.userid) === Number(question.answer_userid)){
        is_answer_author = true;
    }

    let status_info_arr = getQuestionStatus(question.status_id);

    let status = status_info_arr[0];

    let role_info_array = getRoleInfo(user.userrole.id);

    let role = role_info_array[0];

    // console.log("question.order_text: ", question.order_text);
    let cleanQuestionText = cleanInputText(question.order_text);

    // console.log("question.answer_text: ", question.answer_text);
    let cleanAnswerText = cleanInputText(question.answer_text);

    let roleValidate = validateRoleSelect(role, question);

    let questionTextValidate = true;

    if (cleanQuestionText === ''){
        questionTextValidate = false;
    }

    let answerTextValidate = true;

    if (cleanAnswerText === ''){
        answerTextValidate= false;
    }


    if (status === 'create'){
        if (action === 'in_work'){
            validateObject.needSubmit = true
        }
        else if (action === 'update'){

            if(!roleValidate){
                validateObject.valid = false;
                validateObject.comp_validators.selectRole = false;
            }

            if(!questionTextValidate){
                validateObject.valid = false;
                validateObject.comp_validators.questionTextArea = false;
            }
        }
    }
    else if (status ==='inwork'){
        if(action==='from_work' || action === 'from_work_admin'){
            validateObject.needSubmit = true;
        }

        if(action==='update'){
            if (role === 'redactor'){

                if(!roleValidate){
                    validateObject.valid = false;
                    validateObject.comp_validators.selectRole = false;
                }

                if (!answerTextValidate && !is_inwork_user){
                    validateObject.valid = false;
                    validateObject.comp_validators.answerTextArea = false;
                }
            }
            if(role === 'admin'){
                if(!roleValidate){
                    validateObject.valid = false;
                    validateObject.comp_validators.selectRole = false;
                }
                if(!questionTextValidate){
                    validateObject.valid = false;
                    validateObject.comp_validators.questionTextArea = false;
                }
            }
        }
    }
    else if(status === 'received_answer' || status === 'back_in_work'){
        if(action === 'update') {
            if (role === 'admin' || role === 'redactor'){

                if(!roleValidate){
                    validateObject.valid = false;
                    validateObject.comp_validators.selectRole = false;
                }

                if (!answerTextValidate){
                    validateObject.valid = false;
                    validateObject.comp_validators.answerTextArea = false;
                }
            }
            if(role === 'admin'){
                if(!questionTextValidate){
                    validateObject.valid = false;
                    validateObject.comp_validators.questionTextArea = false;
                }
            }
        }
        if(action === 'to_archive'){
            validateObject.needSubmit = true;
        }
    }
    else if (status === 'archive'){
        if(action === 'update'){
            if(role === 'admin'){
                if(!roleValidate){
                    validateObject.valid = false;
                    validateObject.comp_validators.selectRole = false;
                }

                if (!answerTextValidate){
                    validateObject.valid = false;
                    validateObject.comp_validators.answerTextArea = false;
                }

                if(!questionTextValidate){
                    validateObject.valid = false;
                    validateObject.comp_validators.questionTextArea = false;
                }
            }
            else if (role === 'redactor'){
                if(!roleValidate){
                    validateObject.valid = false;
                    validateObject.comp_validators.selectRole = false;
                }
            }
        }
    }
    else if (status === 'trash'){
        if(action === 'delete'){
            validateObject.needSubmit = true;
        }
    }


    return validateObject;
}

export {validateQuestionAction}