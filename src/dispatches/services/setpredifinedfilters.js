function setPredifinedFilters(reqFilters, redactDispatchFilter){

    redactDispatchFilter.mu_params.prefill = reqFilters.mu_params.prefill;
    redactDispatchFilter.mu_params.mu_list = reqFilters.mu_params.mu_list;
    redactDispatchFilter.mu_params.category_list = reqFilters.mu_params.category_list;
    redactDispatchFilter.mo_params.prefill = reqFilters.mo_params.prefill;
    redactDispatchFilter.mo_params.category_list = reqFilters.mo_params.category_list;
    redactDispatchFilter.mo_params.mo_list = reqFilters.mo_params.mo_list;
    redactDispatchFilter.role_params.prefill = reqFilters.role_params.prefill;
    redactDispatchFilter.role_params.role_list = reqFilters.role_params.role_list;
    redactDispatchFilter.spec_params.prefill = reqFilters.spec_params.prefill;
    redactDispatchFilter.spec_params.spec_list = reqFilters.spec_params.spec_list;
    redactDispatchFilter.user_params.prefill = reqFilters.user_params.prefill;
    redactDispatchFilter.user_params.user_list = reqFilters.user_params.user_list;
}

export {setPredifinedFilters}