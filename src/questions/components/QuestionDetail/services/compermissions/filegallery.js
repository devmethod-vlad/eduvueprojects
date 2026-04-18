
function setFileGalleryPermissions(params){
    let permission_object = params.permission_object;

    if (params.is_feedback){
        permission_object.visible = true;
        permission_object.approve_attachment=false;
        permission_object.edit = false;
    }
    else {
        // 'create', 'inwork', 'received_answer', 'archive', 'trash', 'back_in_work'
        if(params.target === 'question'){

            if(params.role === 'admin'){
                permission_object.visible = true;
                if(['create', 'inwork', 'received_answer', 'archive', 'back_in_work'].includes(params.status)){
                    if(!permission_object.question_public){
                        permission_object.approve_attachment=true;
                        permission_object.edit = true;
                    }
                }
            }
            else if (params.role === 'redactor'){
                permission_object.visible = true;
                if(['create'].includes(params.status)){
                    if(permission_object.question_author){
                        permission_object.edit = true;
                        permission_object.approve_attachment = true;
                    }
                }
                if(['inwork', 'received_answer', 'archive', 'back_in_work'].includes(params.status)){

                    if (permission_object.question_author){
                        if(!permission_object.question_public){
                            permission_object.edit = true;
                        }
                    }


                }

                if(['inwork'].includes(params.status)){
                    if (permission_object.inwork_user){
                        permission_object.approve_attachment = true;
                    }
                }

                if(['received_answer', 'archive', 'back_in_work'].includes(params.status)){
                    if (permission_object.answer_author){
                        if(!permission_object.question_public){
                            permission_object.approve_attachment = true;
                        }
                    }
                }

            }
            else if (params.role === 'personal'){
                permission_object.visible = true;
                if(['create', 'back_in_work'].includes(params.status)){
                    if (permission_object.question_author){
                        permission_object.edit = true;
                        permission_object.approve_attachment = true;
                    }
                }
            }
            else if (params.role === 'anonym'){
                permission_object.visible = true;
            }
        }
        else if (params.target === 'answer'){

            if(params.role === 'admin'){
                if(['inwork', 'received_answer', 'archive', 'trash', 'back_in_work'].includes(params.status)){
                    permission_object.visible = true;
                }
                if(['inwork', 'received_answer', 'archive', 'back_in_work'].includes(params.status)){
                    if(!permission_object.question_public){
                        permission_object.edit = true;
                        permission_object.approve_attachment = true;
                    }
                }
            }
            else if (params.role === 'redactor'){
                if(['inwork', 'received_answer', 'archive', 'trash', 'back_in_work'].includes(params.status)){
                    permission_object.visible = true;
                }

                if(['inwork', 'received_answer', 'archive', 'back_in_work'].includes(params.status)){
                    if(!permission_object.question_public){
                        permission_object.approve_attachment = true;
                    }
                }

                if(['inwork'].includes(params.status)){
                    if(permission_object.inwork_user){
                        permission_object.edit = true;
                    }
                }

                if(['received_answer', 'archive', 'back_in_work'].includes(params.status)){
                    if (permission_object.question_author){
                        if(!permission_object.question_public){
                            permission_object.edit = true;
                        }
                    }
                }

            }
            else if (params.role === 'personal'){
                if(['received_answer', 'archive', 'trash', 'archive', 'back_in_work'].includes(params.status)){
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

export {setFileGalleryPermissions}