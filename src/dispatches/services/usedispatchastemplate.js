import {getDispatchFiltersInfo} from "@/dispatches/services/dispatchfiltersinfo";


async function useDispatchAsTemplate(templateParams){
    if (templateParams.dispatches.$state.renderList.length > 0){
        for (let item of templateParams.dispatches.$state.renderList){
            if (Number(templateParams.dispatch_id) === Number(item.dispatch_id)){

                let filter_answer= await getDispatchFiltersInfo(item.dispatch_id);

                if (filter_answer.status === 'ok'){
                    let dispatchItem = JSON.parse(JSON.stringify(item));
                    templateParams.redactDispatch.$reset();
                    templateParams.redactDispatchFilter.$reset();
                    templateParams.preview.$reset();
                    templateParams.previewFilters.$reset();
                    templateParams.newDispatch.$reset();
                    templateParams.newDispatch.telegram_text = dispatchItem.telegram_text;
                    templateParams.newDispatch.scheduleType = 'rightaway';
                    templateParams.newDispatch.dispatch_files = dispatchItem.dispatch_files;
                    templateParams.newDispatchFilter.mu_params.mu_list = filter_answer.filters.mu_params.mu_list;
                    templateParams.newDispatchFilter.mu_params.prefill = filter_answer.filters.mu_params.prefill;
                    templateParams.newDispatchFilter.mu_params.category_list = filter_answer.filters.mu_params.category_list;
                    templateParams.newDispatchFilter.mo_params.mo_list = filter_answer.filters.mo_params.mo_list;
                    templateParams.newDispatchFilter.mo_params.prefill = filter_answer.filters.mo_params.prefill;
                    templateParams.newDispatchFilter.mo_params.category_list = filter_answer.filters.mo_params.category_list;
                    templateParams.newDispatchFilter.role_params.role_list = filter_answer.filters.role_params.role_list;
                    templateParams.newDispatchFilter.role_params.prefill = filter_answer.filters.role_params.prefill;
                    templateParams.newDispatchFilter.spec_params.spec_list = filter_answer.filters.spec_params.spec_list;
                    templateParams.newDispatchFilter.spec_params.prefill = filter_answer.filters.spec_params.prefill;
                    templateParams.newDispatchFilter.user_params.user_list = filter_answer.filters.user_params.user_list;
                    templateParams.newDispatchFilter.user_params.prefill = filter_answer.filters.user_params.prefill;
                    templateParams.appStore.activeComponent = 'newdispatch';
                }
            }
        }
    }

}

export {useDispatchAsTemplate}