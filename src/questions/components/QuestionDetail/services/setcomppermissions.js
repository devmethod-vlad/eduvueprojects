import {getQuestionStatus} from "@/questions/services/getquestionstatus";
import {getRoleInfo} from "@/questions/services/getrole";
import {setTextAreaPermissions} from "@/questions/components/QuestionDetail/services/compermissions/textarea";
import {setFileUploadPermissions} from "@/questions/components/QuestionDetail/services/compermissions/fileupload";
import {setUserInfoPermissions} from "@/questions/components/QuestionDetail/services/compermissions/userinfo";
import {setSelectRolePermissions} from "@/questions/components/QuestionDetail/services/compermissions/selectrole";
import {setSelectSpacePermissions} from "@/questions/components/QuestionDetail/services/compermissions/selectspace";
import {setFileGalleryPermissions} from "@/questions/components/QuestionDetail/services/compermissions/filegallery";

function setCompPermissions(component, question, target, user){
    let permission_object = {
        'visible': false,
        'edit': false,
        'question_author': false,
        'answer_author': false,
        'inwork_user': false,
        'is_answer': false,
        'question_public': false,
        'approve_attachment': false,
        'question_status': '',
        'role': '',
        'is_feedback': false
    }

    if(Number(user.userid) === Number(question.order_userid)){
        permission_object.question_author = true;
    }

    if(Number(user.userid) === Number(question.inwork_userid)){
        permission_object.inwork_user = true;
    }

    if(Number(user.userid) === Number(question.answer_userid)){
        permission_object.answer_author = true;
    }
    if(question.public_id !== null && question.public_id !==0 && question.public_id.toString() !=='0'){
        permission_object.question_public = true;
    }

    if(question.feedback_id !== null && question.feedback_id !==0 && question.feedback_id.toString() !=='0'){
        permission_object.is_feedback = true;
    }

    if(question.answer_id !== null && question.answer_id !==0 && question.answer_id.toString() !=='0'){
        permission_object.is_answer = true;
    }

    let statusInfo = getQuestionStatus(question.status_id);

    let status = statusInfo[0];

    permission_object.question_status = status;

    let roleInfo = getRoleInfo(user.userrole.id);
    let role = roleInfo[0];

    permission_object.role = role;

    let params = {
        role: role,
        status: status,
        target: target,
        question: question,
        user: user,
        permission_object: permission_object
    }

    if (component === 'textarea'){
        permission_object = setTextAreaPermissions(params);
    }
    else if (component === 'fileupload'){
        permission_object = setFileUploadPermissions(params);
    }
    else if (component === 'userinfo'){
        permission_object = setUserInfoPermissions(params);
    }
    else if (component === 'selectrole'){
        permission_object = setSelectRolePermissions(params);
    }
    else if (component === 'selectspace'){
        permission_object = setSelectSpacePermissions(params);
    }
    else if (component === 'filegallery'){
        permission_object = setFileGalleryPermissions(params);
    }

    return permission_object;
}

export {setCompPermissions}