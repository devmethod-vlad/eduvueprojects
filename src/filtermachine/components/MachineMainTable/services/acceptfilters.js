
function acceptTableFilters(filter, role, spec, mu, mo){
    let filterCopy = JSON.parse(JSON.stringify(filter.$state));

    let roleCopy = JSON.parse(JSON.stringify(role.$state));

    filterCopy.role_params.prefill = roleCopy.prefill;

    if(roleCopy.prefill === 1){
        if(filterCopy.role_params.role_list !== roleCopy.checkListReverse.map(Number)){
            filterCopy.role_params.role_list = roleCopy.checkListReverse.map(Number);
        }
    }
    else {
        if(filterCopy.role_params.role_list !== roleCopy.checkList.map(Number)){
            filterCopy.role_params.role_list = roleCopy.checkList.map(Number);
        }
    }

    let specCopy = JSON.parse(JSON.stringify(spec.$state));

    filterCopy.spec_params.prefill = specCopy.prefill;

    if(specCopy.prefill === 1){
        if(filterCopy.spec_params.spec_list !== specCopy.checkListReverse.map(Number)){
            filterCopy.spec_params.spec_list = specCopy.checkListReverse.map(Number);
        }
    }
    else {
        if(filterCopy.spec_params.spec_list !== specCopy.checkList.map(Number)){
            filterCopy.spec_params.spec_list = specCopy.checkList.map(Number);
        }
    }

    let moCopy = JSON.parse(JSON.stringify(mo.$state));

    filterCopy.mo_params.prefill = moCopy.prefill;

    if(moCopy.prefill === 1){
        if(filterCopy.mo_params.mo_list !== moCopy.checkListReverse.map(Number)){
            filterCopy.mo_params.mo_list = moCopy.checkListReverse.map(Number);
        }
    }
    else {
        if(filterCopy.mo_params.mo_list !== moCopy.checkList.map(Number)){
            filterCopy.mo_params.mo_list = moCopy.checkList.map(Number);
        }
    }

    filterCopy.mo_params.category_list = moCopy.activeCategory;

    let muCopy = JSON.parse(JSON.stringify(mu.$state));

    filterCopy.mu_params.prefill = muCopy.prefill;

    if(muCopy.prefill === 1){
        if(filterCopy.mu_params.mu_list !== muCopy.checkListReverse.map(Number)){
            filterCopy.mu_params.mu_list = muCopy.checkListReverse.map(Number);
        }
    }
    else {
        if(filterCopy.mu_params.mu_list !== muCopy.checkList.map(Number)){
            filterCopy.mu_params.mu_list = muCopy.checkList.map(Number);
        }
    }
    filterCopy.mu_params.category_list = muCopy.activeCategory;

    filter.$patch(filterCopy);
}

export {acceptTableFilters}