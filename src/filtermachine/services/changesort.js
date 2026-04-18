import {resetSort} from "@/filtermachine/services/resetsort";

function changeSort(target, filter){
    resetSort(filter, target);

    if (target === 'login'){
        filter.login_sort.active = 1;
        if(filter.login_sort.type === 'asc'){
            filter.login_sort.type = 'desc';
        }
        else {
            filter.login_sort.type = 'asc';
        }
    }

    else if (target === 'fio'){
        filter.fio_sort.active = 1;
        if(filter.fio_sort.type === 'asc'){
            filter.fio_sort.type = 'desc';
        }
        else {
            filter.fio_sort.type = 'asc';
        }
    }

    else if (target === 'role'){
        filter.role_sort.active = 1;
        if(filter.role_sort.type === 'asc'){
            filter.role_sort.type = 'desc';
        }
        else {
            filter.role_sort.type = 'asc';
        }

    }

    else if (target === 'spec'){
        filter.spec_sort.active = 1;
        if(filter.spec_sort.type === 'asc'){
            filter.spec_sort.type = 'desc';
        }
        else {
            filter.spec_sort.type = 'asc';
        }
    }

    else if (target === 'mo'){
        filter.mo_name_sort.active = 1;
        if(filter.mo_name_sort.type === 'asc'){
            filter.mo_name_sort.type = 'desc';
        }
        else {
            filter.mo_name_sort.type = 'asc';
        }
    }

    else if (target === 'mu'){
        filter.mu_name_sort.active = 1;
        if(filter.mu_name_sort.type === 'asc'){
            filter.mu_name_sort.type = 'desc';
        }
        else {
            filter.mu_name_sort.type = 'asc';
        }

    }
    filter.page_number = 1;
    filter.page_count = 10;
}

export {changeSort}