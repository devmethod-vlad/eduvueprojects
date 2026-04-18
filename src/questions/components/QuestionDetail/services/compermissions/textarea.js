
function setTextAreaPermissions(params){
    let permission_object = params.permission_object;
    // 'create', 'inwork', 'received_answer', 'archive', 'trash', 'back_in_work'

    // QUESTION
    if(params.target === 'question'){
        if (params.is_feedback){
            permission_object.visible = true;
            permission_object.edit = false;
        }
        else {
            if(params.role === 'admin'){
                permission_object.visible = true;
                if(['create', 'inwork', 'received_answer', 'archive', 'back_in_work'].includes(params.status)){
                    if (!permission_object.question_public) {
                        permission_object.edit = true;
                    }
                }
            }
            else if (params.role === 'redactor' || params.role === 'personal'){
                permission_object.visible = true;
                if(['create', 'back_in_work'].includes(params.status)){
                    if(permission_object.question_author){
                        permission_object.edit = true;
                    }
                }

            }
            else if (params.role === 'anonym'){
                permission_object.visible = true;
            }
        }
    }

    // ANSWER
    else if (params.target === 'answer'){
        if (params.is_feedback){
            permission_object.visible = false;
        }
        else {
            if(params.role === 'admin'){
                if(['inwork', 'received_answer', 'archive', 'back_in_work'].includes(params.status)){
                    permission_object.visible = true;
                    permission_object.edit = true;
                }
                if(['trash'].includes(params.status)){
                    if(permission_object.is_answer){
                        permission_object.visible = true;
                    }
                    permission_object.edit = false;
                }
            }
            else if (params.role === 'redactor'){
                if(['inwork'].includes(params.status)){
                    if(Number(params.question.inwork_userid) === Number(params.user.userid)) {
                        permission_object.visible = true;
                        permission_object.edit = true;
                    }
                    else {
                        permission_object.visible = false;
                        permission_object.edit = false;
                    }
                }

                if(['received_answer', 'back_in_work'].includes(params.status)){
                    if(Number(params.question.answer_userid) === Number(params.user.userid)) {
                        permission_object.visible = true;
                        permission_object.edit = true;
                    }
                    else {
                        permission_object.visible = true;
                        permission_object.edit = false;
                    }
                }

                if(['archive'].includes(params.status)){

                    permission_object.visible = true;
                    permission_object.edit = false;
                }
                if(['trash'].includes(params.status)){
                    if(permission_object.is_answer){
                        permission_object.visible = true;
                    }
                    permission_object.edit = false;
                }
            }
            else if (params.role === 'personal'){
                if(permission_object.is_answer){
                    permission_object.visible = true;
                }
            }
            else if (params.role === 'anonym'){
                permission_object.visible = true;
            }
        }
    }

    return permission_object;
}

export {setTextAreaPermissions}