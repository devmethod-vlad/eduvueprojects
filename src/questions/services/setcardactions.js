import {getRoleInfo} from "@/questions/services/getrole";
import {getQuestionStatus} from "@/questions/services/getquestionstatus";
import {app_config} from "@/questions/config/setconfig";

function setQuestionActions(userid, roleid, question){
    let action_arr = []

    let isAuthor = false;

    let inWorkExecutor = false;

    let isAnswerAuthor = false;

    if(Number(question.order_userid) === Number(userid)){
        isAuthor = true;
    }

    if(Number(question.inwork_userid) === Number(userid)){
        inWorkExecutor = true;
    }

    if(Number(question.answer_userid) === Number(userid)){
        isAnswerAuthor = true;
    }

    let role_info_array = getRoleInfo(roleid);
    if (role_info_array !== null){
        let role = role_info_array[0];

        let status_info_arr = getQuestionStatus(question.status_id);

        if (status_info_arr !==null){

            let status = status_info_arr[0];

            let public_action;

            if(role === 'admin' || role === 'redactor'){
                if(['received_answer', 'archive', 'back_in_work'].includes(status)){
                    if (question.public_id !==null){
                        public_action = 'from_public';
                    }
                    else {
                        if(question.space_id !== 0
                            && question.space_id !== '0'
                            && Number(question.space_id) !== Number(app_config.NULLSPACE.id)){
                            public_action = 'public';
                        }
                    }
                }
            }

            if(status === 'create'){

                if (role === 'admin'){
                    action_arr.push('update', 'in_work', 'to_trash');
                }
                else if (role === 'redactor'){

                    if(isAuthor){
                        action_arr.push('update', 'to_trash');
                    }
                    action_arr.push('in_work');


                }
                else if ( role === 'personal'){
                    if(isAuthor){
                        action_arr.push('update', 'to_trash');
                    }
                }
            }

            else if (status === 'inwork'){
                if (role === 'admin'){
                    action_arr.push('update');
                    if(inWorkExecutor){
                        action_arr.push('from_work');
                    }
                    else{
                        action_arr.push('from_work_admin');
                    }
                    action_arr.push('to_trash');
                }
                else if (role === 'redactor'){
                    if(inWorkExecutor){
                        action_arr.push('update', 'from_work');
                    }
                }
            }

            else if (status === 'received_answer'){
                if (role === 'admin'){
                    action_arr.push('update', 'to_archive', 'to_trash', public_action);

                }
                else if (role === 'redactor'){
                    action_arr.push('update');
                    if(isAuthor){
                        action_arr.push('to_archive', 'to_trash', public_action);
                    }
                    else {
                        action_arr.push(public_action);
                    }

                }
                else if (role === 'personal'){
                    if(isAuthor){
                        action_arr.push('to_archive');
                    }
                }
            }
            else if(status === 'archive'){
                if (role === 'admin'){
                    action_arr.push('update', 'back_in_work', 'to_trash', public_action);
                }
                else if (role === 'redactor'){
                    if(isAuthor){
                        action_arr.push('back_in_work', 'to_trash', public_action);
                    }
                    else{
                        action_arr.push(public_action);
                    }
                }
                else if (role === 'personal'){
                    if(isAuthor){
                        action_arr.push('back_in_work');
                    }
                }
            }

            else if(status === 'trash'){
                if (role === 'admin'){
                    action_arr.push('from_trash', 'delete');
                }
                else if (role === 'redactor' || role === 'personal'){
                    if(isAuthor){
                        action_arr.push('from_trash', 'delete');
                    }
                }
            }

            else if (status === 'back_in_work'){
                if (role === 'admin'){
                    action_arr.push('update', 'to_archive', 'to_trash', public_action);
                }
                else if (role === 'redactor'){
                    if(isAuthor){
                        action_arr.push('update', 'to_archive', 'to_trash',public_action)
                    }
                    else {
                        action_arr.push(public_action)
                    }

                }
                else if (role === 'personal'){
                    if(isAuthor){
                        action_arr.push('to_archive');
                    }
                }
            }
        }
    }
    return action_arr;
}

export {setQuestionActions}