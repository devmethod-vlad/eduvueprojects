import {getRoleInfo} from "@/questions/services/getrole";
import {getQuestionStatus} from "@/questions/services/getquestionstatus";

function setButtonActions(userid, roleid, question){
    let button_arr = []

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

    let role = role_info_array[0];

    let status_info_arr = getQuestionStatus(question.status_id);

    let status = status_info_arr[0];

    console.log("setButtonActions status:", status);

    if(status === 'create'){

        if (role === 'admin'){
            button_arr.push('to_trash', 'update');
        }

        else if (role === 'redactor'){

            button_arr.push('update');
            if(isAuthor){
                button_arr.push('to_trash');
            }
            else {
                button_arr.push('in_work');
            }

        }

        else if ( role === 'personal'){
            if(isAuthor){
                button_arr.push( 'to_trash', 'update');
            }
        }
    }

    else if (status === 'inwork'){

        if (role === 'admin'){
            if(inWorkExecutor){
                button_arr.push('from_work');
            }
            else{
                button_arr.push('from_work_admin');
            }
            button_arr.push('update');
        }
        else if (role === 'redactor'){
            if(inWorkExecutor){
                button_arr.push('from_work', 'update');
            }
        }
    }

    else if (status === 'received_answer'){
        if (role === 'admin'){
            button_arr.push('to_archive', 'update');

        }
        else if (role === 'redactor'){
            if(isAuthor){
                button_arr.push('to_archive', 'update');
            }
            else if(isAnswerAuthor){
                button_arr.push('update');
            }

        }
        else if (role === 'personal'){
            if(isAuthor){
                button_arr.push('to_archive');
            }
        }
    }
    else if(status === 'archive'){
        if (role === 'admin'){
            button_arr.push('back_in_work', 'update');
        }
        else if (role === 'redactor'){
            if(isAuthor){
                button_arr.push('to_trash', 'back_in_work');
            }
        }
        else if (role === 'personal'){
            if(isAuthor){
                button_arr.push('back_in_work');
            }
        }
    }

    else if(status === 'trash'){
        if (role === 'admin'){
            button_arr.push('from_trash', 'delete');
        }
        else if (role === 'redactor' || role === 'personal'){
            if(isAuthor){
                button_arr.push('from_trash', 'delete');
            }
        }
    }

    else if (status === 'back_in_work'){
        if (role === 'admin'){
            button_arr.push('to_archive', 'update');
        }
        else if (role === 'redactor'){
            if(isAnswerAuthor){
                button_arr.push('update')
            }

        }
        else if (role === 'personal'){
            if(isAuthor){
                button_arr.push('update','to_archive');
            }
        }
    }

    console.log("button_arr :", button_arr);
    return button_arr
}

export {setButtonActions}