
function checkIfFilterSet(filter){
    // console.log("checkIfFilterSet");
    let isSet = false;

    if(filter.$state.mu_params.mu_list.length>0){
        isSet=true;
    }

    if(filter.$state.mu_params.category_list.length>0){
        isSet=true;
    }

    if(filter.$state.mo_params.mo_list.length>0){
        isSet=true;
    }

    if(filter.$state.mo_params.category_list.length>0){
        isSet=true;
    }

    if(filter.$state.role_params.role_list.length>0){
        isSet=true;
    }

    if(filter.$state.spec_params.spec_list.length>0){
        isSet=true;
    }

    if(filter.$state.user_params.user_list.length>0){
        isSet=true;
    }

    return isSet;
}

export {checkIfFilterSet}