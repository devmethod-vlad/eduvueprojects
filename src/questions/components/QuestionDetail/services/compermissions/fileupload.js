
function setFileUploadPermissions(params){
    let permission_object = params.permission_object;

    if (params.is_feedback){
        permission_object.visible = false;
    }
    else {
        // 'create', 'inwork', 'received_answer', 'archive', 'trash', 'back_in_work'
        if(params.target === 'question'){

            if(params.role === 'admin'){
                if(['inwork', 'received_answer', 'back_in_work'].includes(params.status)){
                    permission_object.visible = true;
                }
            }
            else if (params.role === 'redactor'){
                if(Number(params.question.order_userid) === Number(params.user.userid)){
                    if(['create'].includes(params.status)){
                        permission_object.visible = true;
                    }
                }
            }
            else if (params.role === 'personal'){
                if(['create', 'back_in_work'].includes(params.status)){
                    permission_object.visible = true;
                    permission_object.edit = true;
                }
            }
        }
        else if (params.target === 'answer'){

            if(params.role === 'admin'){
                if(['inwork', 'received_answer', 'back_in_work'].includes(params.status)){
                    permission_object.visible = true;
                }
            }
            else if (params.role === 'redactor'){

                if(Number(params.question.answer_userid) === Number(params.user.userid)){
                    if(['received_answer', 'back_in_work'].includes(params.status)){
                        permission_object.visible = true;
                    }
                }

                if(Number(params.question.inwork_userid) === Number(params.user.userid)){
                    if(['inwork'].includes(params.status)){
                        permission_object.visible = true;
                    }
                }

            }
        }
    }
    return permission_object;
}

export {setFileUploadPermissions}