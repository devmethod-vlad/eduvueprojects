function setSelectSpacePermissions(params){
    let permission_object = params.permission_object;

    if (params.is_feedback){
        permission_object.visible = false;
        permission_object.edit = false;
    }
    else {
        // 'create', 'inwork', 'received_answer', 'archive', 'trash', 'back_in_work'

        if(params.role === 'admin'){
            if(['create', 'inwork', 'received_answer', 'archive', 'back_in_work'].includes(params.status)){
                permission_object.visible = true;
                permission_object.edit = true;
            }
        }
        else if (params.role === 'redactor'){
            if(['create'].includes(params.status)){
                permission_object.visible = true;
                permission_object.edit = true;
                // if(params.permission_object.question_author){
                //     permission_object.visible = true;
                //     permission_object.edit = true;
                // }
            }

            if(['inwork'].includes(params.status)){
                if(permission_object.inwork_user){
                    permission_object.visible = true;
                    permission_object.edit = true;
                }
            }
            if(['received_answer', 'archive', 'back_in_work'].includes(params.status)){
                if(permission_object.answer_author){
                    permission_object.visible = true;
                    permission_object.edit = true;
                }

            }
        }
    }

    return permission_object;
}

export {setSelectSpacePermissions}