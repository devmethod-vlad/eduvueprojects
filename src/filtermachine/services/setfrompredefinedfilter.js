function setFromPredefinedFilter(predefinedFilter, filter, mo, mu, role, spec, users, machine){
    console.log("setFromPredefinedFilter predefinedFilter: ", predefinedFilter);
    if(predefinedFilter.methodList){
        if(predefinedFilter.methodList.length>0){
            if(machine.$state.sendMethodsInclude){
                let copyFilter = JSON.parse(JSON.stringify(filter.$state));
                predefinedFilter.methodList.forEach((item)=>{
                    if(!copyFilter.methods.includes(item)){
                        copyFilter.methods.push(item)
                    }
                });
                filter.$patch(copyFilter);
            }
        }
    }


    filter.mu_params = predefinedFilter.mu_params;

    let copyMu = JSON.parse(JSON.stringify(mu.$state));

    copyMu.prefill = predefinedFilter.mu_params.prefill;

    if (predefinedFilter.mu_params.mu_list.length>0){

        predefinedFilter.mu_params.mu_list.forEach((id)=>{
            if (predefinedFilter.mu_params.prefill === 1){
                copyMu.checkListReverse.push(id.toString());
            }
            else {
                copyMu.checkList.push(id.toString());
            }
        });

    }

    mu.$patch(copyMu);

    filter.mo_params = predefinedFilter.mo_params;

    let copyMo = JSON.parse(JSON.stringify(mo.$state));

    copyMo.prefill = predefinedFilter.mo_params.prefill;

    if (predefinedFilter.mo_params.mo_list.length>0){
        predefinedFilter.mo_params.mo_list.forEach((id)=>{
            if (predefinedFilter.mo_params.prefill === 1){
                copyMo.checkListReverse.push(id.toString());
            }
            else {
                copyMo.checkList.push(id.toString());
            }
        });
    }

    mo.$patch(copyMo);

    filter.role_params = predefinedFilter.role_params;

    let copyRole = JSON.parse(JSON.stringify(role.$state));

    copyRole.prefill = predefinedFilter.role_params.prefill;

    if (predefinedFilter.role_params.role_list.length>0){

        predefinedFilter.role_params.role_list.forEach((id)=>{
            if (predefinedFilter.role_params.prefill === 1){
                copyRole.checkListReverse.push(id.toString());
            }
            else {
                copyRole.checkList.push(id.toString());
            }
        });

    }

    role.$patch(copyRole);

    filter.spec_params = predefinedFilter.spec_params;

    let copySpec = JSON.parse(JSON.stringify(spec.$state));

    copySpec.prefill = predefinedFilter.spec_params.prefill;

    if (predefinedFilter.spec_params.spec_list.length>0){

        predefinedFilter.spec_params.spec_list.forEach((id)=>{
            if (predefinedFilter.spec_params.prefill === 1){
                copySpec.checkListReverse.push(id.toString());
            }
            else {
                copySpec.checkList.push(id.toString());
            }
        });

    }

    spec.$patch(copySpec);

    filter.user_params = predefinedFilter.user_params;

    let copyUser = JSON.parse(JSON.stringify(users.$state));

    copyUser.prefill = predefinedFilter.user_params.prefill;

    if (predefinedFilter.user_params.user_list.length>0){

        predefinedFilter.user_params.user_list.forEach((id)=>{
            if (predefinedFilter.user_params.prefill === 1){
                copyUser.checkListReverse.push(id.toString());
            }
            else {
                copyUser.checkList.push(id.toString());
            }
        });

    }
    users.$patch(copyUser);
}

export {setFromPredefinedFilter}