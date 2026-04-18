
function setUserInfoPermissions(params){
    let permission_object = params.permission_object;

    // 'create', 'inwork', 'received_answer', 'archive', 'trash', 'back_in_work'
    if(params.target === 'question'){

        if(params.role === 'admin' || params.role === 'redactor'){
            permission_object.visible = true;
        }
    }
    else if (params.target === 'answer'){
        if (params.is_feedback){
            permission_object.visible = false;
        }
        else {
            if(params.role === 'admin' || params.role === 'redactor'){
                if(['received_answer', 'archive', 'trash', 'back_in_work'].includes(params.status)){
                    permission_object.visible = true;
                }
            }
        }
    }

    else if (params.target === 'inwork'){
        if (params.is_feedback){
            permission_object.visible = false;
        }
        else {
            if(params.role === 'admin' || params.role === 'redactor'){
                if(['inwork'].includes(params.status)){
                    permission_object.visible = true;
                }
            }
        }
    }

    return permission_object;
}

export {setUserInfoPermissions}